'use client';

import Link from 'next/link';
import { Home, Bot, Wrench, MessageCircle, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { TopHeader } from './TopHeader';

const items = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/services', label: 'Services', Icon: Wrench },
  { href: '/bot', label: 'Bot', Icon: Bot, center: true },
  { href: '/contact', label: 'Contact', Icon: MessageCircle },
  { href: '/reviews', label: 'Reviews', Icon: Star },
];

export function BottomNavigation() {
  const pathname = usePathname();
  return (
    <>
      <TopHeader />
      <div className="bottom-nav-wrap" aria-label="Primary navigation">
        <nav className="bottom-nav" aria-label="Quick page navigation">
          <div className="bottom-nav-inner">
            {items.map(({ href, label, Icon, center }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={`Open ${label} page`}
                  aria-current={active ? 'page' : undefined}
                  className={`bottom-nav-item ${center ? 'bottom-nav-center' : ''} ${active ? 'is-active' : ''} focus-ring`}
                >
                  <span className={center ? 'bottom-nav-center-button' : 'bottom-nav-icon'}><Icon size={center ? 23 : 20} strokeWidth={center ? 2.2 : 1.9} /></span>
                  <span className="bottom-nav-label">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
