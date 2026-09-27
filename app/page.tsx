import Link from 'next/link';
import { ArrowUpRight, Bot, BrainCircuit, Workflow } from 'lucide-react';
import { getHero,getServices,getProjects,getBot } from '@/lib/db/content';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';

export default async function Home(){
  const [hero,services,projects,bot]=await Promise.all([getHero(),getServices(),getProjects(),getBot()]);
  return <div>
    <section className="hero-shell relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center overflow-hidden px-5 py-24 lg:min-h-[84vh]">
      <div className="hero-bg-art" aria-hidden="true"/><span className="ambient-orb ambient-orb-blue -left-16 top-24"/>
      <div className="relative z-10 max-w-3xl">
        <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-600"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 shadow-[0_0_18px_#60a5fa]"/>TECHNOLOGY • AUTOMATION • AI</div>
        <h1 className="max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">{hero?.title||'DR HONEY TECH X'}</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">{hero?.subtitle||'WHATSAPP BOT DEVELOPER • AI • TECHNOLOGY'}</p>
        <p className="mt-4 max-w-2xl leading-7 text-slate-400">{hero?.description||'Professional WhatsApp bots, AI automation, websites and digital solutions built with a clean, modern engineering mindset.'}</p>
        <div className="mt-8 flex flex-wrap gap-3"><GlassButton href={bot?.externalUrl||'https://dr-honey-mini.vercel.app/'}>OPEN DR-HONEY-MINI <ArrowUpRight size={18}/></GlassButton><GlassButton href="/contact" variant="secondary">CONTACT DR HONEY</GlassButton></div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-12"><div className="grid gap-4 sm:grid-cols-3">{[[Bot,'WhatsApp Bots','Custom bot systems and command development.'],[BrainCircuit,'AI Development','AI-powered workflows and useful automation.'],[Workflow,'Automation','Digital processes designed to reduce repetitive work.']].map(([Icon,title,desc])=>{const I=Icon as typeof Bot;return <GlassCard key={String(title)}><I className="accent"/><h2 className="mt-4 text-xl font-bold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{desc as string}</p></GlassCard>})}</div></section>
    <section className="mx-auto max-w-6xl px-5 py-12"><div className="mb-6 flex items-end justify-between"><div><p className="accent text-sm font-semibold">SELECTED WORK</p><h2 className="mt-2 text-3xl font-bold">Projects</h2></div><Link className="text-sm text-slate-300" href="/projects">View all</Link></div><div className="grid gap-4 sm:grid-cols-2">{projects.slice(0,4).map(p=><GlassCard key={p.id}><h3 className="text-xl font-bold">{p.title}</h3><p className="mt-2 text-slate-400">{p.description}</p></GlassCard>)}</div></section>
    <section className="mx-auto max-w-6xl px-5 py-16"><GlassCard><p className="accent text-sm font-semibold">SERVICES</p><h2 className="mt-2 text-3xl font-bold">Build something useful.</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{services.slice(0,8).map(s=><div key={s.id} className="rounded-2xl border border-slate-200/70 p-4 transition hover:-translate-y-1 hover:bg-white/50"><p className="font-semibold">{s.title}</p><p className="mt-1 text-sm text-slate-400">{s.shortDescription}</p></div>)}</div></GlassCard></section>
  </div>
}
