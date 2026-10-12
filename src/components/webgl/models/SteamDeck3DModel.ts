import * as THREE from 'three';
import { createScreenTexture } from '../textures/createScreenTexture';

export function createSteamDeck3DModel(): {
  group: THREE.Group;
  update: (time: number) => void;
  screenMesh: THREE.Mesh;
} {
  const group = new THREE.Group();
  group.name = 'SteamDeckOLED';

  // Materials
  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x14161b,
    roughness: 0.42,
    metalness: 0.18
  });

  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x111317,
    roughness: 0.65,
    metalness: 0.1
  });

  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x1e2128,
    roughness: 0.35,
    metalness: 0.25
  });

  const accentMetalMat = new THREE.MeshStandardMaterial({
    color: 0x2a303e,
    roughness: 0.2,
    metalness: 0.8
  });

  // 1. Central Chassis Body
  const bodyGeo = new THREE.BoxGeometry(4.4, 2.0, 0.45);
  const bodyMesh = new THREE.Mesh(bodyGeo, chassisMat);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  group.add(bodyMesh);

  // 2. Ergonomic Left & Right Grip Flanks
  const gripGeo = new THREE.CylinderGeometry(0.55, 0.55, 2.05, 32);
  const leftGrip = new THREE.Mesh(gripGeo, gripMat);
  leftGrip.position.set(-2.25, 0, -0.05);
  leftGrip.rotation.z = Math.PI;
  leftGrip.scale.set(0.85, 1, 1.25);
  leftGrip.castShadow = true;
  group.add(leftGrip);

  const rightGrip = new THREE.Mesh(gripGeo, gripMat);
  rightGrip.position.set(2.25, 0, -0.05);
  rightGrip.scale.set(0.85, 1, 1.25);
  rightGrip.castShadow = true;
  group.add(rightGrip);

  // 3. Active 7.4" OLED Display Screen
  const { texture: screenTex, update: updateScreen } = createScreenTexture(
    'CYBERPUNK 2077',
    '90.0 FPS',
    '7.4" OLED HDR',
    '#3678FF'
  );

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    emissive: 0xffffff,
    emissiveMap: screenTex,
    emissiveIntensity: 0.95,
    roughness: 0.1,
    metalness: 0.05
  });

  const screenGeo = new THREE.PlaneGeometry(2.6, 1.62);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(0, 0.02, 0.23);
  group.add(screenMesh);

  // Screen Glass Outer Bezel Frame
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x07080b,
    roughness: 0.15,
    metalness: 0.3
  });
  const bezelGeo = new THREE.BoxGeometry(2.76, 1.76, 0.04);
  const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
  bezelMesh.position.set(0, 0.02, 0.215);
  group.add(bezelMesh);

  // 4. Analog Thumbsticks
  const stickBaseGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.12, 24);
  const stickCapGeo = new THREE.CylinderGeometry(0.22, 0.2, 0.08, 24);

  // Left Thumbstick
  const leftStickBase = new THREE.Mesh(stickBaseGeo, accentMetalMat);
  leftStickBase.rotation.x = Math.PI / 2;
  leftStickBase.position.set(-1.7, 0.52, 0.24);
  const leftStickCap = new THREE.Mesh(stickCapGeo, buttonMat);
  leftStickCap.rotation.x = Math.PI / 2;
  leftStickCap.position.set(-1.7, 0.52, 0.32);
  group.add(leftStickBase, leftStickCap);

  // Right Thumbstick
  const rightStickBase = new THREE.Mesh(stickBaseGeo, accentMetalMat);
  rightStickBase.rotation.x = Math.PI / 2;
  rightStickBase.position.set(1.7, -0.05, 0.24);
  const rightStickCap = new THREE.Mesh(stickCapGeo, buttonMat);
  rightStickCap.rotation.x = Math.PI / 2;
  rightStickCap.position.set(1.7, -0.05, 0.32);
  group.add(rightStickBase, rightStickCap);

  // 5. Left D-Pad (Cross geometry)
  const dpadMat = new THREE.MeshStandardMaterial({
    color: 0x1b1e25,
    roughness: 0.4,
    metalness: 0.2
  });
  const dpadV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.46, 0.08), dpadMat);
  const dpadH = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.14, 0.08), dpadMat);
  dpadV.position.set(-1.7, -0.08, 0.24);
  dpadH.position.set(-1.7, -0.08, 0.24);
  group.add(dpadV, dpadH);

  // 6. Right ABXY Buttons
  const btnGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16);
  const abxyPositions = [
    { x: 1.7, y: 0.65, color: 0xcccccc }, // Y
    { x: 1.88, y: 0.47, color: 0xe05252 }, // B
    { x: 1.7, y: 0.29, color: 0x4ade80 }, // A
    { x: 1.52, y: 0.47, color: 0x60a5fa } // X
  ];

  abxyPositions.forEach((b) => {
    const mat = new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.3, metalness: 0.3 });
    const mesh = new THREE.Mesh(btnGeo, mat);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(b.x, b.y, 0.25);
    group.add(mesh);
  });

  // 7. Dual Haptic Trackpads
  const trackpadGeo = new THREE.BoxGeometry(0.42, 0.42, 0.02);
  const trackpadMat = new THREE.MeshStandardMaterial({
    color: 0x15171d,
    roughness: 0.25,
    metalness: 0.4
  });

  const leftPad = new THREE.Mesh(trackpadGeo, trackpadMat);
  leftPad.position.set(-1.7, -0.58, 0.23);
  const rightPad = new THREE.Mesh(trackpadGeo, trackpadMat);
  rightPad.position.set(1.7, -0.58, 0.23);
  group.add(leftPad, rightPad);

  // 8. Top Bumpers & Triggers (L1, R1, L2, R2)
  const bumperGeo = new THREE.BoxGeometry(0.9, 0.18, 0.28);
  const leftBumper = new THREE.Mesh(bumperGeo, buttonMat);
  leftBumper.position.set(-1.8, 1.05, -0.04);
  const rightBumper = new THREE.Mesh(bumperGeo, buttonMat);
  rightBumper.position.set(1.8, 1.05, -0.04);
  group.add(leftBumper, rightBumper);

  // Top Exhaust Vent Fins
  const ventGeo = new THREE.BoxGeometry(1.2, 0.08, 0.22);
  const ventMesh = new THREE.Mesh(ventGeo, accentMetalMat);
  ventMesh.position.set(0.1, 1.02, -0.05);
  group.add(ventMesh);

  // Scale and center entire group nicely in Three.js world space
  group.scale.set(1, 1, 1);

  return {
    group,
    update: (time: number) => {
      updateScreen(time);
    },
    screenMesh
  };
}
