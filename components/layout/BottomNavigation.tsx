'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bot, Wrench, MessageCircle } from 'lucide-react';

const items=[
  {label:'Home',href:'/',Icon:Home},
  {label:'Bot',href:'/bot',Icon:Bot},
  {label:'Services',href:'/services',Icon:Wrench},
  {label:'Contact',href:'/contact',Icon:MessageCircle},
];

export function BottomNavigation(){
  const pathname=usePathname();
  return <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] md:hidden">
    <div className="glass mx-auto flex max-w-md items-center justify-around rounded-3xl p-2 shadow-[0_16px_45px_rgba(71,85,105,.18)]">
      {items.map(({label,href,Icon})=>{
        const active=href==='/'?pathname==='/':pathname.startsWith(href);
        return <Link key={href} aria-label={label} aria-current={active?'page':undefined} className={`ios-nav-item ${active?'ios-nav-active':''}`} href={href}>
          <Icon size={19} strokeWidth={active?2.5:1.9}/><span>{label}</span>
        </Link>;
      })}
    </div>
  </nav>
}
