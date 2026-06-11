"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type AnimatedDotWaveBackgroundProps = {
  className?: string;
};

const vertexShader = `
uniform float uTime;
uniform float uNoiseScale;
uniform float uAmplitude;
uniform vec2 uMouse;
uniform float uHoverRadius;
uniform float uHoverStrength;

varying vec2 vUv;
varying float vElevation;

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vUv = uv;
  vec3 pos = position;

  float n = snoise(vec3(pos.x * uNoiseScale, pos.y * uNoiseScale, uTime));
  n += 0.4 * snoise(vec3(pos.x * uNoiseScale * 2.0, pos.y * uNoiseScale * 2.0, uTime * 1.5));
  n = n / 1.4;

  float mouseDist = distance(pos.xy, uMouse);
  float hoverEffect = smoothstep(uHoverRadius, 0.0, mouseDist);
  pos.z += (n * uAmplitude) + (hoverEffect * uHoverStrength);
  vElevation = n + (hoverEffect * 0.5);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColorPeak;
uniform vec3 uColorValley;
uniform vec3 uColorBase;
uniform float uRingsScale;
uniform float uRingRadius;
uniform float uRingThickness;

varying vec2 vUv;
varying float vElevation;

void main() {
  float elev = smoothstep(-0.8, 0.8, vElevation);
  float gridX = fract(vUv.x * uRingsScale);
  float gridY = fract(vUv.y * uRingsScale);
  float dist = distance(vec2(gridX, gridY), vec2(0.5));
  float fw = max(fwidth(dist), 0.01);

  float outerEdge = 1.0 - smoothstep(uRingRadius - fw, uRingRadius + fw, dist);
  float innerEdge = 1.0 - smoothstep(uRingRadius - uRingThickness - fw, uRingRadius - uRingThickness + fw, dist);
  float pattern = outerEdge - innerEdge;

  vec3 waveColor = mix(uColorValley, uColorPeak, elev);
  float vignette = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x)
    * smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.84, vUv.y);
  float lift = pattern * vignette;
  vec3 finalColor = mix(uColorBase, waveColor, lift);
  finalColor += uColorPeak * smoothstep(0.72, 1.0, lift) * 0.12;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function AnimatedDotWaveBackground({
  className,
}: AnimatedDotWaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    let visible = true;
    let mouseInside = false;
    let currentHoverStrength = 0;
    const startedAt = performance.now();
    const planeSize = 50;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#00608F");

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 4, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 640 ? 1.25 : 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(
      planeSize,
      planeSize,
      window.innerWidth < 640 ? 160 : 280,
      window.innerWidth < 640 ? 160 : 280,
    );
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uNoiseScale: { value: 0.08 },
        uAmplitude: { value: window.innerWidth < 640 ? 1.2 : 1.55 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHoverRadius: { value: 5 },
        uHoverStrength: { value: 0 },
        uColorPeak: { value: new THREE.Color("#E0F2F7") },
        uColorValley: { value: new THREE.Color("#0f172a") },
        uColorBase: { value: new THREE.Color("#00608F") },
        uRingsScale: { value: window.innerWidth < 640 ? 82 : 105 },
        uRingRadius: { value: 0.35 },
        uRingThickness: { value: 0.08 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -(30 * Math.PI) / 180;
    scene.add(mesh);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.position.set(0, width < 640 ? 5.4 : 4, width < 640 ? 14 : 12);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 640 ? 1.25 : 2));
      renderer.setSize(width, height);
      material.uniforms.uAmplitude.value = width < 640 ? 1.2 : 1.55;
      material.uniforms.uRingsScale.value = width < 640 ? 82 : 105;
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseInside = true;
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.set(x, y);
      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObject(mesh);
      if (intersections[0]?.uv) {
        targetMouse.set(
          (intersections[0].uv.x - 0.5) * planeSize,
          (intersections[0].uv.y - 0.5) * planeSize,
        );
      }
    };

    const onMouseLeave = () => {
      mouseInside = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!visible) return;

      const elapsed = (performance.now() - startedAt) / 1000;
      currentMouse.lerp(targetMouse, 0.15);
      currentHoverStrength += ((mouseInside ? 2.5 : 0) - currentHoverStrength) * 0.1;

      material.uniforms.uTime.value = elapsed * 0.05;
      material.uniforms.uMouse.value.copy(currentMouse);
      material.uniforms.uHoverStrength.value = currentHoverStrength;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      geometry.dispose();
      material.dispose();
      scene.clear();
      renderer.forceContextLoss();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #00608F 48%, #008DC3 100%)",
      }}
    />
  );
}
