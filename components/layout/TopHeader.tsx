'use client';

import Link from 'next/link';
import { EllipsisVertical, X, Home, UserRound, Bot, Wrench, FolderKanban, Megaphone, MessageCircle, Star, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

const items = [
  ['Home', '/', Home], ['About', '/about', UserRound], ['Bot', '/bot', Bot], ['Services', '/services', Wrench],
  ['Projects', '/projects', FolderKanban], ['Promotions', '/promotions', Megaphone], ['Contact', '/contact', MessageCircle],
  ['Reviews', '/reviews', Star], ['Admin Login', '/admin/login', ShieldCheck],
] as const;

type Props = { externalOpen?: boolean; onOpenChange?: (open: boolean) => void };

export function TopHeader(_props: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const next = window.localStorage.getItem('dr-honey-theme') === 'dark' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);
  const changeTheme = (next: 'light' | 'dark') => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('dr-honey-theme', next);
  };
  return (
    <header className="top-header">
      <div className="top-header-shell">
        <details className="top-menu-details">
          <summary className="top-header-bar glass top-menu-summary">
            <Link href="/" className="top-brand" aria-label="DR HONEY TECH X home" onClick={(event) => event.stopPropagation()}>
              <span className="brand-mark">DX</span><span>DR HONEY <span className="accent">TECH X</span></span>
            </Link>
            <span className="top-menu-button focus-ring" aria-label="Toggle navigation menu" role="button" tabIndex={0}>
              <span className="menu-icon-more"><EllipsisVertical size={25} aria-hidden="true" /></span>
              <span className="menu-icon-close"><X size={25} aria-hidden="true" /></span>
            </span>
          </summary>
          <div id="site-navigation-menu" className="top-menu-panel glass">
            <nav aria-label="Site menu" className="top-menu-list">
              {items.map(([label, href, Icon]) => <Link key={href} href={href} className="top-menu-link focus-ring"><Icon size={17} aria-hidden="true" /><span>{label}</span></Link>)}
            </nav>
            <div className="menu-divider" />
            <div className="theme-row" aria-label="Appearance">
              <span className="theme-label">Appearance</span>
              <div className="theme-switch">
                <button type="button" aria-pressed={theme === 'light'} className={theme === 'light' ? 'theme-choice active' : 'theme-choice'} onClick={() => changeTheme('light')}><Sun size={16} aria-hidden="true" /> Light</button>
                <button type="button" aria-pressed={theme === 'dark'} className={theme === 'dark' ? 'theme-choice active' : 'theme-choice'} onClick={() => changeTheme('dark')}><Moon size={16} aria-hidden="true" /> Dark</button>
              </div>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
