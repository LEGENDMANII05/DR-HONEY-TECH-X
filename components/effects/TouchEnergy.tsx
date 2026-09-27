'use client';

import { useEffect } from 'react';

export function TouchEnergy() {
  useEffect(() => {
    const fn = (e: PointerEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const target = e.target as HTMLElement;
      const clickable = target.closest('button,a,[data-animate-click]') as HTMLElement | null;
      if (!clickable) return;
      clickable.classList.remove('click-glow');
      void clickable.offsetWidth;
      clickable.classList.add('click-glow');
      window.setTimeout(() => clickable.classList.remove('click-glow'), 620);

      for (let i = 0; i < 6; i += 1) {
        const particle = document.createElement('i');
        const angle = Math.random() * Math.PI * 2;
        const distance = 14 + Math.random() * 30;
        particle.className = 'touch-particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
        document.body.appendChild(particle);
        particle.animate(
          [{ transform: 'translate(-50%, -50%) scale(.7)', opacity: 1 }, { transform: 'translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0)', opacity: 0 }],
          { duration: 550 + Math.random() * 250, easing: 'cubic-bezier(.2,.8,.2,1)' },
        ).onfinish = () => particle.remove();
      }
    };
    window.addEventListener('pointerdown', fn);
    return () => window.removeEventListener('pointerdown', fn);
  }, []);
  return null;
}
