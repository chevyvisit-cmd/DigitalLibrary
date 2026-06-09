'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const MovingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
      }

      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        if (mouse.current.active) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = 150;
          const force = (maxDistance - distance) / maxDistance;

          if (distance < maxDistance) {
            // Attraction / Repulsion logic
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
          } else {
            // Return to path
            if (this.x !== this.baseX) {
              const dxBase = this.x - this.baseX;
              this.x -= dxBase / 20;
            }
            if (this.y !== this.baseY) {
              const dyBase = this.y - this.baseY;
              this.y -= dyBase / 20;
            }
          }
        }
      }

      draw() {
        if (!ctx) return;
        const color = theme === 'tun' ? '34, 197, 94' : '16, 185, 129';
        ctx.fillStyle = `rgba(${color}, 0.6)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 9000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Matrix-like flow in background
      if (theme === 'tun') {
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.02)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < canvas.width; i += 100) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + Math.sin(Date.now() * 0.001) * 20, canvas.height);
          ctx.stroke();
        }
      }

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const color = theme === 'tun' ? '34, 197, 94' : '16, 185, 129';
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.current.active) {
          const dxMouse = particles[i].x - mouse.current.x;
          const dyMouse = particles[i].y - mouse.current.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 200) {
            const color = theme === 'tun' ? '34, 197, 94' : '16, 185, 129';
            const opacity = 1 - distMouse / 200;
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-1000"
      style={{ 
        opacity: theme === 'tun' ? 0.8 : 0.4,
        background: theme === 'tun' ? '#060608' : '#fafafa'
      }}
    />
  );
};

export default MovingBackground;
