import * as THREE from 'three';

/**
 * Creates an animated / high-dynamic-range canvas texture for the console display
 */
export function createScreenTexture(
  gameTitle: string,
  fps: string,
  panelTag: string,
  accentColor: string
): { texture: THREE.CanvasTexture; update: (time: number) => void } {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  function draw(time: number) {
    const w = canvas.width;
    const h = canvas.height;

    // Deep space black / dark blue background
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#060810');
    bgGrad.addColorStop(0.4, '#0D1429');
    bgGrad.addColorStop(0.7, '#1C1236');
    bgGrad.addColorStop(1, '#05070D');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Glowing Cyber Sun / Core
    const pulse = Math.sin(time * 2) * 10;
    const sunGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.45, 180 + pulse);
    sunGrad.addColorStop(0, accentColor === '#7655FF' ? '#9E7BFF' : '#4EA5FF');
    sunGrad.addColorStop(0.4, accentColor);
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.45, 180 + pulse, 0, Math.PI * 2);
    ctx.fill();

    // Perspective Cyber Grid Ground
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.35;
    const horizon = h * 0.6;

    // Horizontal grid lines
    for (let y = horizon; y <= h; y += 22) {
      const progress = (y - horizon) / (h - horizon);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.globalAlpha = 0.15 + progress * 0.4;
      ctx.stroke();
    }

    // Converging vertical lines
    const lineCount = 18;
    for (let i = 0; i <= lineCount; i++) {
      const xTarget = (w / lineCount) * i;
      ctx.beginPath();
      ctx.moveTo(w * 0.5, horizon - 20);
      ctx.lineTo(xTarget, h);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;

    // Neon Horizon Mountains
    ctx.fillStyle = '#060A14';
    ctx.beginPath();
    ctx.moveTo(0, horizon + 50);
    ctx.lineTo(150, horizon - 40);
    ctx.lineTo(320, horizon + 30);
    ctx.lineTo(512, horizon - 80);
    ctx.lineTo(700, horizon + 10);
    ctx.lineTo(880, horizon - 50);
    ctx.lineTo(w, horizon + 40);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, horizon + 50);
    ctx.lineTo(150, horizon - 40);
    ctx.lineTo(320, horizon + 30);
    ctx.lineTo(512, horizon - 80);
    ctx.lineTo(700, horizon + 10);
    ctx.lineTo(880, horizon - 50);
    ctx.lineTo(w, horizon + 40);
    ctx.stroke();

    // Animated Scanline Sheen
    const scanY = (time * 180) % h;
    const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    scanGrad.addColorStop(0, 'transparent');
    scanGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
    scanGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 30, w, 60);

    // Live HUD Telemetry (Top Left - FPS counter)
    ctx.fillStyle = 'rgba(5, 7, 13, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(30, 30, 220, 52, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00F0FF';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(`● ${fps}`, 48, 64);

    // Panel Tag (Top Right)
    ctx.fillStyle = 'rgba(5, 7, 13, 0.85)';
    ctx.beginPath();
    ctx.roundRect(w - 260, 30, 230, 52, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(panelTag, w - 245, 63);

    // Title & Brand Overlay (Bottom Center)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText(gameTitle, w * 0.5, h - 80);

    ctx.fillStyle = accentColor;
    ctx.font = '600 16px monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('HANDHELD HIGH-PERFORMANCE NATIVE ENGINE', w * 0.5, h - 45);

    // Curved Glass Specular Highlight (Simulating 2.5D optical glass reflection)
    const glassGrad = ctx.createLinearGradient(0, 0, w * 0.6, h);
    glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
    glassGrad.addColorStop(0.7, 'transparent');
    ctx.fillStyle = glassGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w * 0.5, 0);
    ctx.lineTo(w * 0.2, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
  }

  draw(0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  let lastUpdate = 0;
  return {
    texture,
    update: (time: number) => {
      // Throttle canvas draw to ~30fps for buttery performance while WebGL runs at 60fps
      if (time - lastUpdate > 0.033) {
        lastUpdate = time;
        draw(time);
        texture.needsUpdate = true;
      }
    }
  };
}
