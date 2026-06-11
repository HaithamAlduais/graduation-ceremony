"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// KSU Color Palette (normalized to 0-1)
const KSU_NAVY = new THREE.Color("#0f172a");
const KSU_GREEN = new THREE.Color("#008DC3");
const KSU_DARK_GREEN = new THREE.Color("#00608F");
const KSU_GOLD = new THREE.Color("#C8A415");
const KSU_LIGHT = new THREE.Color("#E0F2F7");
const DARK_BASE = new THREE.Color("#18181a");
const NEAR_BLACK = new THREE.Color("#0a0a0a");

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
  uniform vec3 uDarkBase;
  uniform vec3 uNearBlack;
  varying vec2 vUv;

  // --- Simplex 2D noise ---
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

  // --- Fractional Brownian Motion ---
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

  // --- Layer 1: Swirl (dark base) ---
  // Creates a slow, dark swirling motion
  float swirl(vec2 uv, float t) {
    vec2 centered = uv - 0.5;
    float angle = atan(centered.y, centered.x);
    float radius = length(centered);
    
    // Slow rotation
    float rot = angle + t * 0.08 + radius * 2.5;
    vec2 rotUV = vec2(cos(rot), sin(rot)) * radius;
    
    // Multi-octave noise for organic swirl
    float n = fbm(rotUV * 3.0 + t * 0.05);
    n += fbm(rotUV * 6.0 - t * 0.03) * 0.5;
    n += fbm(rotUV * 12.0 + t * 0.02) * 0.25;
    
    return n * 0.5 + 0.5;
  }

  // --- Layer 2: ChromaFlow (directional color streaks) ---
  // Creates flowing color in 4 directions
  vec3 chromaFlow(vec2 uv, float t) {
    // Directional noise fields
    float up = fbm(uv * 2.0 + vec2(t * 0.13, 0.0) + vec2(0.0, 50.0));
    float down = fbm(uv * 2.0 + vec2(-t * 0.11, 0.0) + vec2(0.0, 150.0));
    float left = fbm(uv * 2.0 + vec2(0.0, t * 0.12) + vec2(100.0, 0.0));
    float right = fbm(uv * 2.0 + vec2(0.0, -t * 0.09) + vec2(200.0, 0.0));
    
    // Normalize to 0-1
    up = up * 0.5 + 0.5;
    down = down * 0.5 + 0.5;
    left = left * 0.5 + 0.5;
    right = right * 0.5 + 0.5;
    
    // Momentum effect - smear the colors (simulated with smoothstep)
    up = smoothstep(0.35, 0.75, up);
    down = smoothstep(0.35, 0.75, down);
    left = smoothstep(0.35, 0.75, left);
    right = smoothstep(0.35, 0.75, right);
    
    // Build color from directional contributions
    vec3 color = uDarkBase;
    
    // Up direction - green
    color = mix(color, uColorGreen, up * 0.4);
    // Down direction - dark green
    color = mix(color, uColorDarkGreen, down * 0.35);
    // Left direction - gold
    color = mix(color, uColorGold, left * 0.3);
    // Right direction - light cyan
    color = mix(color, uColorLight, right * 0.15);
    
    return color;
  }

  // --- Layer 3: FlutedGlass (diagonal refraction lines) ---
  // Creates the characteristic diagonal prismatic streaks
  float flutedGlass(vec2 uv, float t) {
    // Diagonal coordinate system (28 degrees)
    float angle = 28.0 * 3.14159 / 180.0;
    vec2 diagonal = vec2(
      uv.x * cos(angle) + uv.y * sin(angle),
      -uv.x * sin(angle) + uv.y * cos(angle)
    );
    
    // Frequency 8 - creates the flute spacing
    float flute = sin(diagonal.x * 8.0 * 3.14159) * 0.5 + 0.5;
    
    // Refraction 4 - intensity of the fluting
    float refraction = pow(flute, 4.0);
    
    // Aberration 0.61 - chromatic separation
    float aberration = snoise(diagonal * 3.0 + t * 0.02) * 0.61;
    
    // Combine for the fluted effect
    float glass = refraction * (0.5 + aberration * 0.5);
    
    return glass;
  }

  // --- Layer 4: FilmGrain (subtle texture) ---
  float filmGrain(vec2 uv, float t) {
    float grain = fract(sin(dot(uv * 500.0 + t, vec2(12.9898, 78.233))) * 43758.5453);
    grain = (grain - 0.5) * 0.05; // strength 0.05
    
    // Bias 2 - makes grain more visible in dark areas
    float luminance = dot(uv, vec2(0.5));
    grain *= (2.0 - luminance);
    
    return grain;
  }

  void main() {
    vec2 uv = vUv;
    // Aspect ratio correction
    vec2 aspectUv = uv;
    aspectUv.x *= uResolution.x / uResolution.y;

    // --- Build the 4-layer stack ---
    
    // Layer 1: Swirl - dark base
    float swirlVal = swirl(aspectUv, uTime);
    vec3 baseColor = mix(uNearBlack, uColorNavy, swirlVal * 0.25);
    
    // Layer 2: ChromaFlow - color injection
    vec3 chromaColor = chromaFlow(aspectUv, uTime);
    
    // Blend ChromaFlow over base (very subtle - undertones are subtle)
    vec3 color = mix(baseColor, chromaColor, 0.35);
    
    // Layer 3: FlutedGlass - diagonal refraction streaks
    float glass = flutedGlass(aspectUv, uTime);
    
    // The flutes create bright streaks that pick up the chroma colors
    float streakIntensity = glass * 0.4;
    vec3 streakColor = mix(uColorGreen, uColorGold, snoise(aspectUv * 2.0 + uTime * 0.05) * 0.5 + 0.5);
    color = mix(color, streakColor, streakIntensity);
    
    // Additional subtle bright streaks from the fluting
    float brightStreak = smoothstep(0.7, 0.95, glass) * 0.15;
    color = mix(color, uColorLight, brightStreak);
    
    // Layer 4: FilmGrain - texture
    float grain = filmGrain(uv, uTime);
    color += grain;
    
    // Vignette for depth (darkens edges)
    float vignette = 1.0 - smoothstep(0.4, 1.3, length(uv - 0.5) * 1.4);
    color *= 0.88 + vignette * 0.12;
    
    // Final darkening to match the very dark Undertones aesthetic
    color = mix(color, uNearBlack, 0.15);
    
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
      uDarkBase: { value: DARK_BASE },
      uNearBlack: { value: NEAR_BLACK },
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
