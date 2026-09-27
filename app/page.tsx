import Link from 'next/link';
import { ArrowUpRight, Bot, BrainCircuit, Workflow, Sparkles, ShieldCheck, Layers3, Zap, ChevronRight } from 'lucide-react';
import { getHero,getServices,getProjects,getBot } from '@/lib/db/content';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { ExpandableDetails } from '@/components/ui/ExpandableDetails';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { ParallaxHero } from '@/components/effects/ParallaxHero';

const process = [
  ['01','Understand','We start with what you actually need, not a copy-paste template.'],
  ['02','Build','The right mix of bot logic, AI, automation and web engineering is assembled around the project.'],
  ['03','Polish','Interactions, responsive layouts, performance and the small details get refined before launch.'],
];

export default async function Home(){
 const [hero,services,projects,bot]=await Promise.all([getHero(),getServices(),getProjects(),getBot()]);
 return <div className="relative overflow-hidden">
  <section data-scroll-reveal className="hero-shell mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-5 py-28 relative">
   <div className="hero-art" aria-hidden="true" />
   <ParallaxHero />
   <div className="hero-copy relative z-10">
    <div className="reveal-up inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/30 px-4 py-2 text-sm font-bold text-blue-700 backdrop-blur-xl dark:text-cyan-200"><Sparkles size={16}/> BUILDING INTELLIGENCE. SHAPING THE FUTURE.</div>
    <h1 className="reveal-up reveal-delay-1 hero-title mt-7 text-5xl font-black tracking-tight">{hero?.title||'DR HONEY TECH X'}</h1>
    <p className="reveal-up reveal-delay-2 hero-kicker mt-5 max-w-2xl text-lg font-semibold text-blue-700 dark:text-cyan-200">{hero?.subtitle||'WHATSAPP BOT DEVELOPER • AI • TECHNOLOGY'}</p>
    <p className="reveal-up reveal-delay-3 mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{hero?.description||'Professional WhatsApp bots, AI automation, websites and digital solutions built with a clean, modern engineering mindset.'}</p>
    <div className="reveal-up reveal-delay-4 mt-8 flex flex-wrap gap-3"><GlassButton href={bot?.externalUrl||'https://dr-honey-mini.vercel.app/'} external>OPEN DR-HONEY-MINI <ArrowUpRight size={18}/></GlassButton><GlassButton href="/contact" variant="secondary">CONTACT DR HONEY</GlassButton></div>
    <div className="reveal-up reveal-delay-4 mt-5 flex flex-wrap gap-2 text-[11px] font-bold tracking-wide text-slate-500 dark:text-slate-400"><span className="hero-proof"><ShieldCheck size={13}/> CUSTOM UI</span><span className="hero-proof"><Zap size={13}/> FAST INTERACTIONS</span><span className="hero-proof"><Layers3 size={13}/> BUILT TO EVOLVE</span></div>
   </div>
  </section>

  <section data-scroll-reveal className="mx-auto max-w-6xl px-5 py-12">
   <div className="mb-6"><p className="accent text-sm font-semibold">THE DR HONEY APPROACH</p><h2 className="mt-2 text-3xl font-black">Not another copy-paste template.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">Each project is shaped around the actual goal. The polish lives in the details: useful interactions, clear content, responsive behavior and a visual identity that feels intentional.</p></div>
   <div className="grid gap-4 sm:grid-cols-3">{process.map(([n,t,d],i)=><GlassCard key={n} className={`reveal-up reveal-delay-${i+1}`}><span className="process-number">{n}</span><h3 className="mt-5 text-xl font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{d}</p></GlassCard>)}</div>
  </section>

  <section data-scroll-reveal className="mx-auto max-w-6xl px-5 py-12"><div className="grid gap-4 sm:grid-cols-3">
   {[[Bot,'WhatsApp Bots','Custom bot systems and command development.','Build, customize and maintain WhatsApp automation.'],[BrainCircuit,'AI Development','AI-powered workflows and useful automation.','Design practical AI assistants and workflow automation around your needs.'],[Workflow,'Automation','Digital processes designed to reduce repetitive work.','Connect repetitive tasks into reliable, maintainable automation flows.']].map(([Icon,title,desc,details],i)=>{const I=Icon as typeof Bot;return <GlassCard key={String(title)} className={`reveal-up reveal-delay-${i+1}`}><I className="accent"/><h2 className="mt-4 text-xl font-bold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{desc as string}</p><ExpandableDetails><p>{details as string}</p></ExpandableDetails></GlassCard>})}
  </div></section>

  <section data-scroll-reveal className="mx-auto max-w-6xl px-5 py-12"><GlassCard className="bot-showcase reveal-up"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="accent text-sm font-semibold">SIGNATURE PROJECT</p><h2 className="mt-2 text-3xl font-black">{bot?.name||'DR-HONEY-MINI MD BOT'}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{bot?.description||'A WhatsApp MD bot built for useful automation and extensible commands.'}</p><div className="mt-4 flex flex-wrap gap-2"><span className="bot-chip">WHATSAPP</span><span className="bot-chip">AUTOMATION</span><span className="bot-chip">COMMAND-DRIVEN</span></div></div><div className="flex shrink-0 gap-2"><GlassButton href="/bot">EXPLORE BOT <ChevronRight size={17}/></GlassButton><GlassButton href={bot?.externalUrl||'https://dr-honey-mini.vercel.app/'} external variant="secondary">OPEN LIVE <ArrowUpRight size={17}/></GlassButton></div></div></GlassCard></section>

  <section data-scroll-reveal className="mx-auto max-w-6xl px-5 py-12"><div className="mb-6 flex items-end justify-between"><div><p className="accent text-sm font-semibold">SELECTED WORK</p><h2 className="mt-2 text-3xl font-bold">Projects</h2></div><Link className="text-sm font-semibold text-blue-700 dark:text-cyan-200" href="/projects">View all</Link></div><div className="grid gap-4 sm:grid-cols-2">{projects.slice(0,4).map((p,i)=><GlassCard key={p.id} className={`reveal-up reveal-delay-${(i%4)+1}`}><h3 className="text-xl font-bold">{p.title}</h3><p className="mt-2 text-slate-500 dark:text-slate-400">{p.description}</p><ExpandableDetails><p>{p.category ? `${p.category}. ` : ''}{Array.isArray(p.technologies) ? `Technologies: ${(p.technologies as string[]).join(', ')}.` : 'Project details are managed from the admin panel.'}</p></ExpandableDetails>{p.url&&<div className="mt-4"><GlassButton href={p.url} external>OPEN PROJECT <ArrowUpRight size={16}/></GlassButton></div>}</GlassCard>)}</div>{!projects.length&&<p className="mt-8 text-slate-500">NO PROJECTS YET</p>}</section>

  <section data-scroll-reveal className="mx-auto max-w-6xl px-5 py-12"><GlassCard><p className="accent text-sm font-semibold">SERVICES</p><h2 className="mt-2 text-3xl font-bold">Build something useful.</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{services.slice(0,8).map((s,i)=><div key={s.id} className={`reveal-up reveal-delay-${(i%4)+1} rounded-2xl border border-blue-900/10 bg-white/20 p-4 dark:border-white/5`}><p className="font-semibold">{s.title}</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.shortDescription}</p><ExpandableDetails title="MORE"><p>{s.fullDescription}</p></ExpandableDetails></div>)}</div></GlassCard></section>

  <section data-scroll-reveal className="mx-auto max-w-6xl px-5 pb-20"><GlassCard className="reveal-up"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xl font-bold">Let&apos;s Connect <span className="accent">✦</span></p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Direct buttons only — no long URLs cluttering the interface.</p></div><SocialLinks/></div></GlassCard></section>
 </div>
}
