'use client';
import { useEffect, useRef } from 'react';

export function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - .5) * 2;
      const y = (event.clientY / window.innerHeight - .5) * 2;
      node.style.setProperty('--px', `${x * 8}px`);
      node.style.setProperty('--py', `${y * 6}px`);
    };
    const reset = () => { node.style.setProperty('--px','0px'); node.style.setProperty('--py','0px'); };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', reset);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('blur', reset); };
  }, []);
  return <div ref={ref} className="hero-parallax-layer" aria-hidden="true" />;
}
