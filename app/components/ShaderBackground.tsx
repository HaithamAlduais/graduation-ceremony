"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// KSU Color Palette (normalized to 0-1)
const KSU_NAVY = new THREE.Color("#0f172a");
const KSU_GREEN = new THREE.Color("#008DC3");
const KSU_DARK_GREEN = new THREE.Color("#00608F");
const KSU_GOLD = new THREE.Color("#C8A415");
const KSU_LIGHT = new THREE.Color("#E0F2F7");

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColorNavy;
  uniform vec3 uColorGreen;
  uniform vec3 uColorDarkGreen;
  uniform vec3 uColorGold;
  uniform vec3 uColorLight;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Smooth color blending
  vec3 blendUndertones(vec2 uv, float t) {
    // Layer 1: Slow deep navy base flow
    float n1 = fbm(uv * 1.5 + vec2(t * 0.03, t * 0.02));
    // Layer 2: Medium green/teal flow
    float n2 = fbm(uv * 2.0 + vec2(t * 0.05 + 100.0, t * 0.04 + 50.0));
    // Layer 3: Faster gold highlights
    float n3 = fbm(uv * 3.5 + vec2(t * 0.08 + 200.0, t * 0.06 + 150.0));
    // Layer 4: Fine detail dark green
    float n4 = fbm(uv * 5.0 + vec2(t * 0.04 + 300.0, t * 0.03 + 250.0));

    // Normalize noise to 0-1 range
    n1 = n1 * 0.5 + 0.5;
    n2 = n2 * 0.5 + 0.5;
    n3 = n3 * 0.5 + 0.5;
    n4 = n4 * 0.5 + 0.5;

    // Build undertone layers
    vec3 color = uColorNavy;

    // Add green undertone (subtle, flowing)
    float greenMask = smoothstep(0.3, 0.7, n2) * 0.35;
    color = mix(color, uColorGreen, greenMask);

    // Add dark green depth
    float darkGreenMask = smoothstep(0.4, 0.8, n4) * 0.25;
    color = mix(color, uColorDarkGreen, darkGreenMask);

    // Add gold highlights (very subtle, selective)
    float goldMask = smoothstep(0.6, 0.9, n3) * smoothstep(0.2, 0.5, n1) * 0.2;
    color = mix(color, uColorGold, goldMask);

    // Add light cyan wisps (very subtle)
    float lightMask = smoothstep(0.7, 0.95, n1) * 0.08;
    color = mix(color, uColorLight, lightMask);

    // Vignette for depth
    float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.5);
    color *= 0.85 + vignette * 0.15;

    return color;
  }

  void main() {
    vec2 uv = vUv;
    // Aspect ratio correction
    vec2 aspectUv = uv;
    aspectUv.x *= uResolution.x / uResolution.y;

    vec3 color = blendUndertones(aspectUv, uTime);

    // Subtle film grain
    float grain = fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.015;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Shader material
    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          container.clientWidth,
          container.clientHeight
        ),
      },
      uColorNavy: { value: KSU_NAVY },
      uColorGreen: { value: KSU_GREEN },
      uColorDarkGreen: { value: KSU_DARK_GREEN },
      uColorGold: { value: KSU_GOLD },
      uColorLight: { value: KSU_LIGHT },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    // Full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const startTime = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <canvas
        data-renderer="shaders"
        data-engine="three.js r184 webgpu"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
