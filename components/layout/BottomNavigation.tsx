'use client';
import Link from 'next/link';
import { Home, Bot, Wrench, MessageCircle, Star, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { TopHeader } from './TopHeader';

const items = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/services', label: 'Services', Icon: Wrench },
  { href: '/bot', label: 'Bot', Icon: Bot, center: true },
  { href: '/contact', label: 'Contact', Icon: MessageCircle },
];

export function BottomNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [botOpen, setBotOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <TopHeader externalOpen={menuOpen} onOpenChange={setMenuOpen} />
      <div className="bottom-nav-wrap" aria-label="Primary mobile navigation">
        <nav className="bottom-nav glass" aria-label="Mobile navigation">
          <div className="bottom-nav-inner">
            {items.map(({ href, label, Icon, center }) => {
              const active = pathname === href;
              if (center) return <button key={href} type="button" aria-label="Open Bot" aria-expanded={botOpen}
                className={`bottom-nav-item bottom-nav-center focus-ring ${active ? 'is-active' : ''}`} onClick={() => setBotOpen((v)=>!v)}>
                <span className="bottom-nav-center-button"><Icon size={23} strokeWidth={2.2} /></span>
                <span className="bottom-nav-label">Bot</span>
              </button>;
              return <Link key={href} href={href} aria-label={label} aria-current={active ? 'page' : undefined}
                className={`bottom-nav-item focus-ring ${active ? 'is-active' : ''}`}>
                <span className="bottom-nav-icon"><Icon size={20} strokeWidth={1.9} /></span>
                <span className="bottom-nav-label">{label}</span>
              </Link>;
            })}
            <Link href="/reviews" aria-label="Reviews" aria-current={pathname === '/reviews' ? 'page' : undefined}
              className={`bottom-nav-item review-nav-item focus-ring ${pathname === '/reviews' ? 'is-active' : ''}`}>
              <span className="bottom-nav-icon"><Star size={20} strokeWidth={1.9} /></span>
              <span className="bottom-nav-label">Reviews</span>
            </Link>
          </div>
        </nav>
      </div>
      {botOpen && <div className="bot-sheet-backdrop" role="presentation" onClick={() => setBotOpen(false)}>
        <section className="bot-sheet glass glass-card" role="dialog" aria-modal="true" aria-label="DR-HONEY-MINI quick panel" onClick={(e)=>e.stopPropagation()}>
          <div className="flex items-start justify-between gap-4"><div><span className="bot-sheet-kicker"><Sparkles size={14}/> AI BOT</span><h2 className="mt-2 text-2xl font-black">DR-HONEY-MINI</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-300">AI-powered WhatsApp automation, useful commands and smart digital workflows.</p></div><button type="button" className="top-menu-button" aria-label="Close bot panel" onClick={()=>setBotOpen(false)}><X size={20}/></button></div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-bold"><div className="glass rounded-2xl p-3"><span className="accent">AI</span><br/><span className="text-slate-500">Assist</span></div><div className="glass rounded-2xl p-3"><span className="accent">BOT</span><br/><span className="text-slate-500">Automation</span></div><div className="glass rounded-2xl p-3"><span className="accent">MD</span><br/><span className="text-slate-500">Commands</span></div></div>
          <div className="mt-5 flex gap-2"><Link href="/bot" className="glass-button flex-1 justify-center" onClick={()=>setBotOpen(false)}>VIEW BOT <ArrowUpRight size={16}/></Link><a href="https://dr-honey-mini.vercel.app/" target="_blank" rel="noopener noreferrer" className="glass-button flex-1 justify-center" onClick={()=>setBotOpen(false)}>OPEN LIVE <ArrowUpRight size={16}/></a></div>
        </section>
      </div>}
    </>
  );
}
