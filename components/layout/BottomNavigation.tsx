'use client';

import Link from 'next/link';
import { Home, Bot, Wrench, MessageCircle, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TopHeader } from './TopHeader';

const items = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/services', label: 'Services', Icon: Wrench },
  { href: '/bot', label: 'Bot', Icon: Bot, center: true },
  { href: '/contact', label: 'Contact', Icon: MessageCircle },
];

export function BottomNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('site-menu-close', close);
    return () => window.removeEventListener('site-menu-close', close);
  }, []);

  return (
    <>
      <TopHeader externalOpen={menuOpen} onOpenChange={setMenuOpen} />
      <div className="bottom-nav-wrap" aria-label="Primary mobile navigation">
        <nav className="bottom-nav glass" aria-label="Mobile navigation">
          <div className="bottom-nav-inner">
            {items.map(({ href, label, Icon, center }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={center ? 'bottom-nav-item bottom-nav-center focus-ring' : 'bottom-nav-item focus-ring'}
              >
                <span className={center ? 'bottom-nav-center-button' : 'bottom-nav-icon'}>
                  <Icon size={center ? 23 : 20} strokeWidth={center ? 2.2 : 1.9} />
                </span>
                <span className="bottom-nav-label">{label}</span>
              </Link>
            ))}
            <Link
              href="/reviews"
              aria-label="Reviews"
              className="bottom-nav-item focus-ring"
            >
              <span className="bottom-nav-icon"><Star size={20} strokeWidth={1.9} /></span>
              <span className="bottom-nav-label">Reviews</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
