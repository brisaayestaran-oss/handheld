import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createSteamDeck3DModel } from './models/SteamDeck3DModel';
import { createLegionGo3DModel } from './models/LegionGo3DModel';

gsap.registerPlugin(ScrollTrigger);

export interface HandheldCanvasProps {
  onStageChange?: (stage: number, progress: number) => void;
  interactiveMode?: 'free' | 'orbital' | 'zoom' | 'initial';
  activeConsoleOverride?: 'steam-deck' | 'legion-go' | null;
}

export const HandheldExperienceCanvas: React.FC<HandheldCanvasProps> = ({
  onStageChange,
  interactiveMode = 'initial',
  activeConsoleOverride = null
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });
  const userRotationRef = useRef({ x: 0, y: 0 });
  const targetUserRotationRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(false);
  const isZoomedRef = useRef(false);

  // Scroll progress ref
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !mountRef.current) return;

    const canvas = canvasRef.current;
    const container = mountRef.current;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050507);
    scene.fog = new THREE.FogExp2(0x050507, 0.04);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.8);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. LIGHTING (Studio Cinematographic Setup)
    const ambientLight = new THREE.AmbientLight(0x0e111a, 1.2);
    scene.add(ambientLight);

    // Key Light (Crisp White Directional)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 6, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Electric Blue Rim Light (Behind Right)
    const blueRimLight = new THREE.DirectionalLight(0x3678ff, 4.5);
    blueRimLight.position.set(-6, 3, -4);
    scene.add(blueRimLight);

    // Tech Violet Rim Light (Behind Left)
    const violetRimLight = new THREE.DirectionalLight(0x7655ff, 3.8);
    violetRimLight.position.set(6, -2, -4);
    scene.add(violetRimLight);

    // Top Fill Light
    const topFill = new THREE.DirectionalLight(0x28324a, 1.5);
    topFill.position.set(0, 8, 2);
    scene.add(topFill);

    // 4. FLOOR CONTACT SHADOW
    const shadowGeo = new THREE.PlaneGeometry(10, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.7
    });
    const floorShadow = new THREE.Mesh(shadowGeo, shadowMat);
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.y = -1.6;
    scene.add(floorShadow);

    // 5. 3D MODELS INITIALIZATION
    const steamDeckData = createSteamDeck3DModel();
    const legionGoData = createLegionGo3DModel();

    const steamDeckGroup = steamDeckData.group;
    const legionGoGroup = legionGoData.group;

    scene.add(steamDeckGroup);
    scene.add(legionGoGroup);

    // Initial positions
    steamDeckGroup.position.set(0, 0, 0);
    steamDeckGroup.scale.set(1, 1, 1);
    steamDeckGroup.visible = true;

    legionGoGroup.position.set(0, 0, -2);
    legionGoGroup.scale.set(0.95, 0.95, 0.95);
    legionGoGroup.visible = false;

    // 6. SCROLLTRIGGER SEQUENCING
    // We bind to the pinned container: #handheld-scroll-container
    const pinnedSection = document.getElementById('handheld-scroll-container');
    let st: ScrollTrigger | null = null;

    if (pinnedSection) {
      st = ScrollTrigger.create({
        trigger: pinnedSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          scrollProgressRef.current = p;

          // Determine current narrative stage (1 through 8)
          const currentStage = Math.min(Math.floor(p * 8) + 1, 8);
          if (onStageChange) {
            onStageChange(currentStage, p);
          }

          // Force override if user specifically picked a model in the UI
          const showLegion = activeConsoleOverride === 'legion-go' || (activeConsoleOverride === null && p >= 0.52);

          if (!showLegion) {
            // === STEAM DECK TIMELINE (p: 0.0 -> 0.52) ===
            steamDeckGroup.visible = true;
            legionGoGroup.visible = false;

            // Normalized local progress [0 to 1]
            const lp = p / 0.52;

            if (lp < 0.28) {
              // Escena 1: Emergence from darkness & monumentality
              const t = lp / 0.28;
              steamDeckGroup.position.set(0, (1 - t) * -0.6, (1 - t) * -2.5);
              steamDeckGroup.rotation.set((1 - t) * 0.4, (1 - t) * -0.3, 0);
              camera.position.set(0, 0, 7.8 - t * 0.8);
              keyLight.intensity = 1.0 + t * 1.8;
            } else if (lp < 0.6) {
              // Escena 2 & 3: Rotate showing side profile & ergonomic controls
              const t = (lp - 0.28) / 0.32;
              steamDeckGroup.position.set(t * 0.3, 0, 0);
              steamDeckGroup.rotation.set(-0.15 + t * 0.2, t * 0.75, t * -0.05);
              camera.position.set(0, 0, 7.0 - t * 1.2);
              blueRimLight.intensity = 3.5 + t * 2.5;
            } else {
              // Escena 4 & 5: Cinematic zoom into the 7.4" OLED screen
              const t = (lp - 0.6) / 0.4;
              steamDeckGroup.position.set(0.3 * (1 - t), 0, 0);
              steamDeckGroup.rotation.set(0.05 * (1 - t), 0.75 * (1 - t), 0);
              // Deep camera dive toward screen
              camera.position.set(0, 0, 5.8 - t * 2.6);
            }
          } else {
            // === LENOVO LEGION GO TIMELINE (p: 0.52 -> 1.0) ===
            steamDeckGroup.visible = false;
            legionGoGroup.visible = true;

            const lp = (p - 0.52) / 0.48;

            if (lp < 0.35) {
              // Escena 6: Legion Go emerges in tech-violet aura
              const t = lp / 0.35;
              legionGoGroup.position.set(0, (1 - t) * 0.5, (1 - t) * -2);
              legionGoGroup.rotation.set((1 - t) * -0.3, (1 - t) * 0.4, 0);
              camera.position.set(0, 0, 7.2 - t * 0.6);
              violetRimLight.intensity = 2.0 + t * 2.5;
            } else if (lp < 0.75) {
              // Escena 7: Legion Go rotates showing TrueStrike & kickstand
              const t = (lp - 0.35) / 0.4;
              legionGoGroup.position.set(t * -0.25, 0, 0);
              legionGoGroup.rotation.set(0.1 - t * 0.15, -0.2 - t * 0.7, t * 0.05);
              camera.position.set(0, 0, 6.6 - t * 0.8);
            } else {
              // Escena 8: Continuous descent into the Catalog
              const t = (lp - 0.75) / 0.25;
              legionGoGroup.position.set(-0.25 * (1 - t), -t * 0.4, 0);
              legionGoGroup.rotation.set(-0.05 * (1 - t), -0.9 * (1 - t), 0);
              camera.position.set(0, -t * 0.3, 5.8 + t * 0.5);
            }
          }
        }
      });
    }

    // 7. POINTER & TOUCH GESTURES (Drag to Rotate)
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointerPositionRef.current.x;
      const deltaY = clientY - previousPointerPositionRef.current.y;

      targetUserRotationRef.current.y += deltaX * 0.007;
      targetUserRotationRef.current.x += deltaY * 0.007;

      // Clamp X rotation to prevent flipping upside down
      targetUserRotationRef.current.x = Math.max(-1.0, Math.min(1.0, targetUserRotationRef.current.x));

      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 8. RENDER LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Update screen textures
      steamDeckData.update(elapsedTime);
      legionGoData.update(elapsedTime);

      // Smooth inertia damping for manual drag rotation
      userRotationRef.current.x += (targetUserRotationRef.current.x - userRotationRef.current.x) * 0.08;
      userRotationRef.current.y += (targetUserRotationRef.current.y - userRotationRef.current.y) * 0.08;

      // Orbital auto-rotation if active
      if (autoRotateRef.current) {
        targetUserRotationRef.current.y += 0.012;
      }

      // Apply user rotation to the active visible model
      const activeGroup = steamDeckGroup.visible ? steamDeckGroup : legionGoGroup;
      activeGroup.rotation.x += (userRotationRef.current.x * 0.8 - activeGroup.rotation.x * 0.02);
      activeGroup.rotation.y += userRotationRef.current.y * 0.05;

      // Subtle float motion
      const floatY = Math.sin(elapsedTime * 1.5) * 0.04;
      activeGroup.position.y += (floatY - activeGroup.position.y * 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // 9. RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (st) st.kill();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
    };
  }, [activeConsoleOverride]);

  // Respond to interactive mode commands from UI
  useEffect(() => {
    if (interactiveMode === 'orbital') {
      autoRotateRef.current = true;
      isZoomedRef.current = false;
    } else if (interactiveMode === 'zoom') {
      autoRotateRef.current = false;
      isZoomedRef.current = true;
      targetUserRotationRef.current = { x: 0.1, y: 0.2 };
    } else if (interactiveMode === 'initial') {
      autoRotateRef.current = false;
      isZoomedRef.current = false;
      targetUserRotationRef.current = { x: 0, y: 0 };
    } else if (interactiveMode === 'free') {
      autoRotateRef.current = false;
    }
  }, [interactiveMode]);

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
