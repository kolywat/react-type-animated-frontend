import './AnimatedBackground.css';
import { useEffect, useRef, type ReactNode } from 'react';
import { getWaveColors } from '../../../utils/themeColors';

interface AnimatedBackgroundProps {
  theme: string;
  children: ReactNode;
  className?: string;
}

interface StarProperties {
  x: number;
  y: number;
  size: number;
  targetSize: number;
  color: string;
  life: number;
  maxLife: number;
  growthSpeed: number;
  rotation: number;
  spikeLength: number;
  spikeRatio: number;
}

interface RainDropProperties {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}


const AnimatedBackground = ({ theme, children, className = '' }: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<Array<StarProperties | RainDropProperties>>([]);
  const animationType = theme === 'dark' ? 'stars' : 'rain';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    document.documentElement.setAttribute('data-theme', theme);
    const colors = getWaveColors();

    const maxObjects = animationType === 'stars' ? 30 : 50;
    const spawnChance = animationType === 'stars' ? 0.01 : 0.03;
    
    objectsRef.current = [];

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      objectsRef.current = [];
      createInitialObjects();
    };

    const createInitialObjects = () => {
      const count = animationType === 'stars' ? 5 : 20;
      for (let i = 0; i < count; i++) {
        createObject();
      }
    };

    const createObject = () => {
      if (!canvas) return;
      
      if (animationType === 'stars') {
        const star: StarProperties = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 1,
          targetSize: 1 + Math.random() * 7,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 80 + Math.random() * 500,
          growthSpeed: 0.03 + Math.random() * 0.05,
          rotation: Math.random() * Math.PI * 2,
          spikeLength: 0.8 + Math.random() * 0.5,
          spikeRatio: 0.15 + Math.random() * 0.1,
        };
        objectsRef.current.push(star);
      } else {
        const drop: RainDropProperties = {
          x: Math.random() * canvas.width,
          y: -10 - Math.random() * 100,
          length: 10 + Math.random() * 15,
          speed: 2 + Math.random() * 3,
          opacity: 0.3 + Math.random() * 0.4,
        };
        objectsRef.current.push(drop);
      }
    };
    
    const updateObjects = () => {
      for (let i = objectsRef.current.length - 1; i >= 0; i--) {
        const obj = objectsRef.current[i];
        
        if (animationType === 'stars') {
          const star = obj as StarProperties;
          if (star.size < star.targetSize) {
            star.size += star.growthSpeed;
          }
          
          star.life++;
          
          if (star.life > star.maxLife) {
            if (objectsRef.current.length < maxObjects * 0.7) {
              star.x = Math.random() * canvas.width;
              star.y = Math.random() * canvas.height;
              star.life = 0;
              star.size = 1;
              star.color = colors[Math.floor(Math.random() * colors.length)];
            } else {
              objectsRef.current.splice(i, 1);
            }
          }
        } else {
          const drop = obj as RainDropProperties;
          drop.y += drop.speed;
          
          if (drop.y > canvas.height + 50) {
            if (objectsRef.current.length < maxObjects * 0.8) {
              drop.x = Math.random() * canvas.width;
              drop.y = -10 - Math.random() * 50;
              drop.opacity = 0.3 + Math.random() * 0.4;
            } else {
              objectsRef.current.splice(i, 1);
            }
          }
        }
      }
    };
    
    const drawObjects = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      objectsRef.current.forEach(obj => {
        if (animationType === 'stars') {
          const star = obj as StarProperties;
          const progress = star.life / star.maxLife;
          const alphaMultiplier = 1 - Math.pow(progress, 3);
          
          const glowColor = star.color.replace(/[\d.]+\)$/, (0.1 * alphaMultiplier) + ')');
          ctx.save();
          ctx.translate(star.x, star.y);
          ctx.rotate(star.rotation);
          
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, star.size * 2.5);
          gradient.addColorStop(0, glowColor);
          gradient.addColorStop(1, 'rgba(40, 28, 68, 0)');
          
          ctx.beginPath();
          ctx.arc(0, 0, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          ctx.fillStyle = star.color.replace(/[\d.]+\)$/, (0.6 * alphaMultiplier) + ')');
          
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            ctx.lineTo(
              Math.cos(angle) * star.size * star.spikeLength,
              Math.sin(angle) * star.size * star.spikeLength
            );
            const nextAngle = ((i + 0.5) / 4) * Math.PI * 2;
            ctx.lineTo(
              Math.cos(nextAngle) * star.size * star.spikeRatio,
              Math.sin(nextAngle) * star.size * star.spikeRatio
            );
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else {
          const drop = obj as RainDropProperties;
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          const rgbMatch = color.match(/\d+/g);
          if (!rgbMatch || rgbMatch.length < 3) return;
          
          const rgb = rgbMatch.slice(0, 3).join(', ');
          
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + drop.length);
          
          const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
          gradient.addColorStop(0, `rgba(${rgb}, ${drop.opacity})`);
          gradient.addColorStop(1, `rgba(${rgb}, ${drop.opacity * 0.3})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
    };
    
    const animate = () => {
      if (!canvas || !ctx) return;
      
      updateObjects();
      drawObjects();
      
      if (objectsRef.current.length < maxObjects && Math.random() < spawnChance) {
        createObject();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    createInitialObjects();
    animate();
    
    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]); 

  return (
    <div 
      ref={containerRef}
      className={`animated-background-container ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <canvas 
        ref={canvasRef} 
        className="animated-background-canvas" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;