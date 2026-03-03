"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeHeroBackground = () => {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // --- Neon Grid Plane ---
    const geometry = new THREE.PlaneGeometry(16, 16, 70, 70);
    const positions = geometry.attributes.position;
    const colors = [];
    const layers = [];

    // Neon color palettes per layer
    const palettes = [
      [new THREE.Color("#00aaff"), new THREE.Color("#33bbff"), new THREE.Color("#66ccff")],
      [new THREE.Color("#ff6ec7"), new THREE.Color("#ff4dab"), new THREE.Color("#ff2a90")],
      [new THREE.Color("#7fff7f"), new THREE.Color("#4eff4e"), new THREE.Color("#1eff1e")],
    ];

    let currentPalette = 0;
    let nextPalette = 1;
    let lastSwitch = 0;

    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const layer = y > 2.5 ? 0 : y < -2.5 ? 2 : 1;
      layers.push(layer);
      const c = palettes[currentPalette][layer];
      colors.push(c.r, c.g, c.b, 0.3);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4));

    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -2;
    scene.add(grid);
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    // --- Mouse & Scroll ---
    const handleScroll = () => (scrollRef.current = window.scrollY || 0);
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Visibility observer
    const observer = new IntersectionObserver(([entry]) => (isVisibleRef.current = entry.isIntersecting), { threshold: 0.1 });
    observer.observe(mount);

    const clock = new THREE.Clock();
    let frameId;

    const animate = (time) => {
      frameId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const t = clock.getElapsedTime();
      const scrollOffset = scrollRef.current * 0.001;
      const { x: mouseX, y: mouseY } = mouseRef.current;

      // Color interpolation for neon pulse
      if (t - lastSwitch > 6) {
        currentPalette = nextPalette;
        nextPalette = (nextPalette + 1) % palettes.length;
        lastSwitch = t;
      }
      const interp = (t - lastSwitch) / 6;
      const colorAttr = geometry.attributes.color;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const layer = layers[i];
        const speed = layer === 0 ? 1 : layer === 1 ? 0.5 : 0.25;

        // Floating neon vertices
        const z = Math.sin(t * 0.9 * speed + x * 0.6 + y * 0.4 + scrollOffset * 0.5) * 0.14 +
                  Math.cos(t * 0.7 * speed + x * 0.4 + y * 0.3 + scrollOffset * 0.5) * 0.09;
        positions.setZ(i, z);

        // Interpolate neon color
        const s = palettes[currentPalette][layer];
        const e = palettes[nextPalette][layer];
        colorAttr.setXYZW(
          i,
          THREE.MathUtils.lerp(s.r, e.r, interp),
          THREE.MathUtils.lerp(s.g, e.g, interp),
          THREE.MathUtils.lerp(s.b, e.b, interp),
          0.35
        );
      }

      positions.needsUpdate = true;
      colorAttr.needsUpdate = true;

      // Grid parallax
      const pulse = Math.sin(t * 0.25) * 0.04 + scrollOffset * 0.02;
      grid.rotation.z = pulse + mouseX * 0.05;
      grid.position.x = pulse * 6 + mouseX * 0.5;
      grid.position.y = Math.sin(t * 0.35) * 0.18 + scrollOffset * 0.12 + mouseY * 0.5;

      // Background gradient motion
      const bg = mount.parentElement?.querySelector(".hero-gradient-layer");
      if (bg) {
        bg.style.backgroundPosition = `${50 + Math.sin(t * 0.18) * 25}% ${50 + Math.cos(t * 0.15) * 25}%`;
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, isolation: "isolate" }}
    />
  );
};

export default ThreeHeroBackground;