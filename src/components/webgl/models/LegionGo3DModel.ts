import * as THREE from 'three';
import { createScreenTexture } from '../textures/createScreenTexture';

export function createLegionGo3DModel(): {
  group: THREE.Group;
  update: (time: number) => void;
  screenMesh: THREE.Mesh;
} {
  const group = new THREE.Group();
  group.name = 'LenovoLegionGo';

  // Materials
  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x16181e,
    roughness: 0.38,
    metalness: 0.28
  });

  const controllerMat = new THREE.MeshStandardMaterial({
    color: 0x121419,
    roughness: 0.5,
    metalness: 0.2
  });

  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x22252e,
    roughness: 0.25,
    metalness: 0.3
  });

  const rgbHaloMat = new THREE.MeshStandardMaterial({
    color: 0x7655ff,
    emissive: 0x7655ff,
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.1
  });

  // 1. Central 8.8" Tablet Body
  const tabletGeo = new THREE.BoxGeometry(3.6, 2.2, 0.42);
  const tabletMesh = new THREE.Mesh(tabletGeo, chassisMat);
  tabletMesh.castShadow = true;
  tabletMesh.receiveShadow = true;
  group.add(tabletMesh);

  // 2. Active 8.8" QHD+ 144Hz Screen (16:10 aspect ratio)
  const { texture: screenTex, update: updateScreen } = createScreenTexture(
    'FORZA HORIZON 5',
    '144.0 FPS',
    '8.8" QHD+ 144HZ',
    '#7655FF'
  );

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    emissive: 0xffffff,
    emissiveMap: screenTex,
    emissiveIntensity: 0.95,
    roughness: 0.1,
    metalness: 0.05
  });

  const screenGeo = new THREE.PlaneGeometry(3.1, 1.94);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(0, 0.02, 0.215);
  group.add(screenMesh);

  // Outer Screen Bezel Frame
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x07080b,
    roughness: 0.15,
    metalness: 0.2
  });
  const bezelGeo = new THREE.BoxGeometry(3.24, 2.06, 0.03);
  const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
  bezelMesh.position.set(0, 0.02, 0.205);
  group.add(bezelMesh);

  // 3. TrueStrike Left Detachable Controller
  const leftCtrlGeo = new THREE.BoxGeometry(0.85, 2.22, 0.46);
  const leftController = new THREE.Mesh(leftCtrlGeo, controllerMat);
  leftController.position.set(-2.23, 0, 0.01);
  leftController.castShadow = true;
  group.add(leftController);

  // Controller Seam Indicator (Left)
  const seamGeo = new THREE.BoxGeometry(0.02, 2.24, 0.47);
  const seamMat = new THREE.MeshStandardMaterial({ color: 0x0b0d12, roughness: 0.8 });
  const leftSeam = new THREE.Mesh(seamGeo, seamMat);
  leftSeam.position.set(-1.81, 0, 0.01);
  group.add(leftSeam);

  // 4. TrueStrike Right Detachable Controller
  const rightCtrlGeo = new THREE.BoxGeometry(0.85, 2.22, 0.46);
  const rightController = new THREE.Mesh(rightCtrlGeo, controllerMat);
  rightController.position.set(2.23, 0, 0.01);
  rightController.castShadow = true;
  group.add(rightController);

  // Controller Seam Indicator (Right)
  const rightSeam = new THREE.Mesh(seamGeo, seamMat);
  rightSeam.position.set(1.81, 0, 0.01);
  group.add(rightSeam);

  // 5. Hall Effect Joysticks with Glowing RGB Ring Halos
  const haloGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 32);
  const stickGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.14, 24);

  // Left Joystick + RGB Halo
  const leftHalo = new THREE.Mesh(haloGeo, rgbHaloMat);
  leftHalo.rotation.x = Math.PI / 2;
  leftHalo.position.set(-2.22, 0.58, 0.24);
  const leftStick = new THREE.Mesh(stickGeo, buttonMat);
  leftStick.rotation.x = Math.PI / 2;
  leftStick.position.set(-2.22, 0.58, 0.32);
  group.add(leftHalo, leftStick);

  // Right Joystick + RGB Halo
  const rightHalo = new THREE.Mesh(haloGeo, rgbHaloMat);
  rightHalo.rotation.x = Math.PI / 2;
  rightHalo.position.set(2.22, -0.05, 0.24);
  const rightStick = new THREE.Mesh(stickGeo, buttonMat);
  rightStick.rotation.x = Math.PI / 2;
  rightStick.position.set(2.22, -0.05, 0.32);
  group.add(rightHalo, rightStick);

  // 6. Left Cross D-Pad
  const dpadV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.46, 0.08), buttonMat);
  const dpadH = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.14, 0.08), buttonMat);
  dpadV.position.set(-2.22, -0.15, 0.24);
  dpadH.position.set(-2.22, -0.15, 0.24);
  group.add(dpadV, dpadH);

  // 7. Right ABXY Buttons
  const btnGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16);
  const abxy = [
    { x: 2.22, y: 0.65 }, // Y
    { x: 2.39, y: 0.48 }, // B
    { x: 2.22, y: 0.31 }, // A
    { x: 2.05, y: 0.48 }  // X
  ];
  abxy.forEach((b) => {
    const btnMesh = new THREE.Mesh(btnGeo, buttonMat);
    btnMesh.rotation.x = Math.PI / 2;
    btnMesh.position.set(b.x, b.y, 0.25);
    group.add(btnMesh);
  });

  // 8. Optical Trackpad on Right Controller
  const padGeo = new THREE.BoxGeometry(0.36, 0.42, 0.03);
  const padMat = new THREE.MeshStandardMaterial({ color: 0x0d0e12, roughness: 0.2, metalness: 0.5 });
  const rightPad = new THREE.Mesh(padGeo, padMat);
  rightPad.position.set(2.22, -0.62, 0.24);
  group.add(rightPad);

  // 9. Back Integrated Kickstand Plate
  const standGeo = new THREE.BoxGeometry(3.3, 1.4, 0.04);
  const standMat = new THREE.MeshStandardMaterial({ color: 0x1e2028, roughness: 0.25, metalness: 0.8 });
  const standMesh = new THREE.Mesh(standGeo, standMat);
  standMesh.position.set(0, -0.25, -0.22);
  group.add(standMesh);

  return {
    group,
    update: (time: number) => {
      updateScreen(time);
      // Subtle RGB halo pulse
      const intensity = 1.2 + Math.sin(time * 3) * 0.4;
      rgbHaloMat.emissiveIntensity = intensity;
    },
    screenMesh
  };
}
