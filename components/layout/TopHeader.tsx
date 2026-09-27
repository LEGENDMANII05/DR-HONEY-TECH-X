'use client';

import Link from 'next/link';
import { EllipsisVertical, X, Home, UserRound, Bot, Wrench, FolderKanban, Megaphone, MessageCircle, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const items = [
  ['Home', '/', Home],
  ['About', '/about', UserRound],
  ['Bot', '/bot', Bot],
  ['Services', '/services', Wrench],
  ['Projects', '/projects', FolderKanban],
  ['Promotions', '/promotions', Megaphone],
  ['Contact', '/contact', MessageCircle],
  ['Admin Login', '/admin/login', ShieldCheck],
] as const;

type Props = { externalOpen?: boolean; onOpenChange?: (open: boolean) => void };

export function TopHeader({ externalOpen, onOpenChange }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = (value: boolean | ((v: boolean) => boolean)) => {
    const next = typeof value === 'function' ? value(open) : value;
    onOpenChange?.(next);
    setInternalOpen(next);
  };
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('dr-honey-theme');
    const next = stored === 'dark' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.body.classList.toggle('menu-open', open);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const changeTheme = (next: 'light' | 'dark') => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('dr-honey-theme', next);
  };

  return (
    <header className="top-header">
      <div ref={menuRef} className="top-header-shell">
        <div className="top-header-bar glass">
          <Link href="/" className="top-brand" onClick={() => setOpen(false)}>
            <span className="brand-mark">DX</span>
            <span>DR HONEY <span className="accent">TECH X</span></span>
          </Link>
          <button type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation-menu" className={`top-menu-button focus-ring ${open ? 'is-active' : ''}`} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={25} /> : <EllipsisVertical size={25} />}
          </button>
        </div>

        <div id="mobile-navigation-menu" className={`top-menu-panel glass ${open ? 'top-menu-panel-open' : ''}`} aria-hidden={!open}>
          <nav aria-label="Site menu" className="top-menu-list">
            {items.map(([label, href, Icon]) => (
              <Link key={href} href={href} tabIndex={open ? 0 : -1} className="top-menu-link focus-ring" onClick={() => setOpen(false)}>
                <Icon size={17} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="menu-divider" />
          <div className="theme-row" aria-label="Appearance">
            <span className="theme-label">Appearance</span>
            <div className="theme-switch">
              <button type="button" className={theme === 'light' ? 'theme-choice active' : 'theme-choice'} onClick={() => changeTheme('light')}><Sun size={16}/> Light</button>
              <button type="button" className={theme === 'dark' ? 'theme-choice active' : 'theme-choice'} onClick={() => changeTheme('dark')}><Moon size={16}/> Dark</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
