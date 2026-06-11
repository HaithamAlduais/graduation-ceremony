"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type LiquidShaderTwistProps = {
  className?: string;
};

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_twistSpeed;
uniform vec2 u_position;
uniform float u_foldWidth;
uniform float u_foldBillow;
uniform float u_foldTension;
uniform float u_foldRotation;
uniform vec3 u_coreColor;
uniform vec3 u_blueBand;
uniform vec3 u_purpleBand;
uniform vec3 u_cyanBand;
uniform vec3 u_orangeBand;
uniform vec3 u_highlightColor;

#define MAX_STEPS 120
#define MAX_DIST 15.0
#define SURF_DIST 0.002

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float map(vec3 p) {
  vec3 q = p;
  q.xy *= rot(u_foldRotation);

  float billow = sin(q.y * 1.2 + u_time * u_twistSpeed * 0.15) * u_foldBillow;
  q.z += billow;

  float taper = smoothstep(7.0, 1.0, abs(q.y));
  float reach = smoothstep(8.0, 0.0, abs(q.y));
  float twistPhase = (q.y * 0.8) * reach - u_time * (u_twistSpeed * 0.2);
  q.xz *= rot(twistPhase);
  q.z += sin(q.x * 1.0) * u_foldTension;

  float w = u_foldWidth * taper;
  float t = 0.015 * taper;
  vec2 d2 = vec2(max(abs(q.x) - w, 0.0), max(abs(q.z) - t, 0.0));

  return (length(d2) - 0.25) * 0.4;
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(0.003, 0.0);
  vec3 n = vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  );
  return normalize(n);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  uv /= 1.15;
  uv -= u_position;

  vec3 ro = vec3(0.0, 0.0, 6.0);
  vec3 rd = normalize(vec3(uv, -1.5));

  float d0 = 0.0;
  vec3 p = vec3(0.0);
  bool hit = false;

  for(int i = 0; i < MAX_STEPS; i++) {
    p = ro + rd * d0;
    float ds = map(p);
    d0 += ds;
    if(d0 > MAX_DIST) break;
    if(abs(ds) < SURF_DIST) {
      hit = true;
      break;
    }
  }

  vec3 color = vec3(0.0);
  float alpha = 0.0;

  if(hit) {
    vec3 n = getNormal(p);
    vec3 v = normalize(ro - p);

    float fresnel = 1.0 - max(dot(n, v), 0.0);
    float f2 = pow(fresnel, 1.4);
    float f4 = pow(fresnel, 4.0);

    color = u_coreColor;
    color = mix(color, u_blueBand, smoothstep(0.0, 0.35, f2));
    color = mix(color, u_cyanBand, smoothstep(0.35, 0.55, f2));
    color = mix(color, u_purpleBand, smoothstep(0.55, 0.75, f2));
    color = mix(color, u_orangeBand, smoothstep(0.75, 1.0, f2));

    vec3 l1 = normalize(vec3(1.5, 2.0, 2.5));
    vec3 h1 = normalize(l1 + v);
    float spec1 = pow(max(dot(n, h1), 0.0), 12.0);

    vec3 l2 = normalize(vec3(-2.0, -1.0, -1.0));
    vec3 h2 = normalize(l2 + v);
    float spec2 = pow(max(dot(n, h2), 0.0), 8.0);

    float edgeGlow = smoothstep(0.6, 1.0, f2) * 0.5;
    vec3 ref = reflect(-v, n);
    float envMap = smoothstep(-0.2, 1.0, ref.y);

    color += u_blueBand * envMap * 0.5;
    color += spec1 * u_highlightColor * 1.1;
    color += spec2 * u_highlightColor * 0.7;
    color += u_orangeBand * edgeGlow * f4 * 2.5;
    color = pow(color, vec3(0.9));
    alpha = 0.68;
  }

  gl_FragColor = vec4(color, alpha);
}
`;

export default function LiquidShaderTwist({ className }: LiquidShaderTwistProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId = 0;
    let isVisible = true;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 640 ? 1.35 : 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_twistSpeed: { value: 0.35 },
        u_position: { value: new THREE.Vector2(width < 640 ? -0.08 : 0, width < 640 ? 0.1 : 0) },
        u_foldWidth: { value: width < 640 ? 3.1 : 4.0 },
        u_foldBillow: { value: width < 640 ? 1.15 : 1.5 },
        u_foldTension: { value: width < 640 ? 0.45 : 0.6 },
        u_foldRotation: { value: -0.35 },
        u_coreColor: { value: new THREE.Color("#00608F") },
        u_blueBand: { value: new THREE.Color("#008DC3") },
        u_cyanBand: { value: new THREE.Color("#36B6DC") },
        u_purpleBand: { value: new THREE.Color("#E0F2F7") },
        u_orangeBand: { value: new THREE.Color("#C8A415") },
        u_highlightColor: { value: new THREE.Color("#FFFFFF") },
      },
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const nextWidth = entry.contentRect.width;
      const nextHeight = entry.contentRect.height;
      if (nextWidth === 0 || nextHeight === 0) return;

      renderer.setSize(nextWidth, nextHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, nextWidth < 640 ? 1.35 : 2));
      material.uniforms.u_resolution.value.set(nextWidth, nextHeight);
      material.uniforms.u_position.value.set(
        nextWidth < 640 ? -0.08 : 0,
        nextWidth < 640 ? 0.1 : 0,
      );
      material.uniforms.u_foldWidth.value = nextWidth < 640 ? 3.1 : 4.0;
      material.uniforms.u_foldBillow.value = nextWidth < 640 ? 1.15 : 1.5;
      material.uniforms.u_foldTension.value = nextWidth < 640 ? 0.45 : 0.6;
    });
    resizeObserver.observe(container);

    const animationStart = performance.now();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      material.uniforms.u_time.value = (performance.now() - animationStart) / 1000;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      resizeObserver.disconnect();
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
      ref={mountRef}
      className={className}
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 70% 28%, rgba(0, 141, 195, 0.42), transparent 34%), linear-gradient(135deg, #0f172a 0%, #00608F 46%, #008DC3 100%)",
      }}
    />
  );
}
