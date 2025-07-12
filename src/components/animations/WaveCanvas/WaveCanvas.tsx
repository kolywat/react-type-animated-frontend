import React, { useEffect, useRef } from 'react';
import { getWaveColors } from '../../../utils/themeColors';
import './WaveCanvas.css';

interface WaveCanvasProps {
  theme: string;
  children?: React.ReactNode;
}

const WaveCanvas: React.FC<WaveCanvasProps> = ({ theme, children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = containerRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = wrapper.getBoundingClientRect();

      const waveHeight = 60;      
      const contentOffset = 30;   
      const canvasHeight = rect.height + waveHeight + contentOffset;
      

      canvas.width = rect.width * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    document.documentElement.setAttribute('data-theme', theme);
    const waveColors = getWaveColors();

    const waves = [
      { amplitude: 25, wavelength: 400, speed: 0.1, phase: 0, color: waveColors[0] },
      { amplitude: 18, wavelength: 450, speed: 0.25, phase: 0, color: waveColors[1] },
      { amplitude: 12, wavelength: 350, speed: 0.38, phase: 0, color: waveColors[2] },
    ];

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const baseY = 30;

      waves.forEach((wave) => {
        wave.phase += wave.speed;
        ctx.beginPath();
        for (let x = 0; x <= width; x++) {
          const y = baseY + wave.amplitude * Math.sin((x / wave.wavelength) * Math.PI * 2 + wave.phase * 0.02);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="wave-footer-container" ref={containerRef}>
      <canvas ref={canvasRef} className="wave-footer-canvas" />
      <div className="wave-footer-content">
        {children}
      </div>
    </div>
  );
};

export default WaveCanvas;