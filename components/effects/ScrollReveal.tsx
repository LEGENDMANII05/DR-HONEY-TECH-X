'use client';
import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveal = (node: HTMLElement) => {
      if (reduce) node.classList.add('scroll-reveal-visible');
      else observer.observe(node);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const node = entry.target as HTMLElement;
          node.classList.add('scroll-reveal-visible');
          observer.unobserve(node);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach(reveal);
    const mutation = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches('[data-scroll-reveal]')) reveal(node);
        node.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach(reveal);
      }));
    });
    mutation.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutation.disconnect(); };
  }, []);
  return null;
}
