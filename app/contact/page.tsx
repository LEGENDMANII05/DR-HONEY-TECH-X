import Link from 'next/link';
import { ExternalLink, Github, Globe2, Instagram, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ContactForm } from '@/components/forms/ContactForm';
import { getSocialLinks } from '@/lib/db/content';

function iconFor(name:string){
  const value=name.toLowerCase();
  if(value.includes('whatsapp')) return MessageCircle;
  if(value.includes('instagram')) return Instagram;
  if(value.includes('github')) return Github;
  if(value.includes('telegram')) return Send;
  if(value.includes('email') || value.includes('mail')) return Mail;
  if(value.includes('phone') || value.includes('call')) return Phone;
  return Globe2;
}

export default async function Contact(){
  const allowed=['whatsapp','instagram','youtube','whatsapp channel','telegram'];
  const links=(await getSocialLinks()).filter(link=>allowed.includes(link.name.toLowerCase()));
  return <section className="mx-auto max-w-4xl px-5 py-28">
    <p className="accent text-sm font-semibold tracking-[.2em]">CONTACT</p>
    <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Let&apos;s build something useful.</h1>
    <p className="mt-4 max-w-2xl text-slate-500">Reach DR HONEY TECH X through any of the links below, or send a project request directly.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {links.map(link=>{const Icon=iconFor(link.name);return <Link key={link.id} href={link.url} target="_blank" rel="noreferrer" className="group">
        <GlassCard className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-500/10 text-blue-600 transition group-hover:scale-110 group-hover:bg-blue-500/15"><Icon size={22}/></span>
          <span className="min-w-0 flex-1"><span className="block font-bold text-slate-800">{link.name}</span><span className="block truncate text-sm text-slate-500">{link.url}</span></span>
          <ExternalLink size={17} className="text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"/>
        </GlassCard>
      </Link>})}
    </div>
    <GlassCard className="mt-8"><ContactForm/></GlassCard>
  </section>
}
