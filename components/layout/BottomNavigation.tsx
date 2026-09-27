'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, Menu, MessageCircle, Wrench } from 'lucide-react';

const items=[
  {label:'Home',href:'/',Icon:Home},
  {label:'Services',href:'/services',Icon:Wrench},
  {label:'Bot',href:'/bot',Icon:Bot,bot:true},
  {label:'Contact',href:'/contact',Icon:MessageCircle},
  {label:'Menu',href:'#menu',Icon:Menu,menu:true},
];

export function BottomNavigation(){
  const pathname=usePathname();
  function handleMenu(event:React.MouseEvent<HTMLAnchorElement>){
    event.preventDefault();
    window.dispatchEvent(new Event('toggle-main-menu'));
  }
  return <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] md:hidden">
    <div className="glass mx-auto flex max-w-md items-center justify-around rounded-3xl p-2 shadow-[0_16px_45px_rgba(71,85,105,.18)]">
      {items.map(({label,href,Icon,bot,menu})=>{
        const active=!menu&&(href==='/'?pathname==='/':pathname.startsWith(href));
        return <Link key={href} aria-label={label} aria-current={active?'page':undefined} onClick={menu?handleMenu:undefined} className={`ios-nav-item ${bot?'ios-nav-bot':''} ${active?'ios-nav-active':''} ${active&&bot?'ios-nav-bot-active':''}`} href={href}>
          <Icon size={bot?22:19} strokeWidth={active||bot?2.5:1.9}/><span>{label}</span>
        </Link>;
      })}
    </div>
  </nav>
}
