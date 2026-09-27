import { getBot } from '@/lib/db/content';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { ExpandableDetails } from '@/components/ui/ExpandableDetails';
import { ArrowUpRight, Bot as BotIcon, Command, Sparkles } from 'lucide-react';
import { BOT_COMMAND_COUNT, BOT_COMMAND_GROUPS, BOT_FEATURES, BOT_OWNER, BOT_POWERED_BY } from '@/lib/botCommands';

export default async function Bot(){
 const b=await getBot();
 const dbFeatures=Array.isArray(b?.features) ? b.features as string[] : [];
 const dbGroups=Array.isArray(b?.commands) ? b.commands as Array<Record<string,unknown>> : [];
 const features=dbFeatures.length ? dbFeatures : BOT_FEATURES;
 const groups=dbGroups.length ? dbGroups : BOT_COMMAND_GROUPS.map((g)=>({category:g.category,command:g.commands}));
 const total=groups.reduce((n,g)=>n+(Array.isArray(g.command)?g.command.length:0),0) || BOT_COMMAND_COUNT;
 return <section className="mx-auto max-w-5xl px-5 py-28">
  <p className="accent text-sm font-semibold reveal-up">BOT COMMANDS</p>
  <GlassCard className="mt-4 reveal-up reveal-delay-1 overflow-hidden bot-showcase">
   <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
    <div><div className="bot-icon-orb"><BotIcon size={27}/></div><div className="mt-4 flex flex-wrap gap-2"><span className="bot-chip">OWNER • {BOT_OWNER}</span><span className="bot-chip">{total} COMMANDS</span></div><h1 className="mt-5 text-4xl font-black">{b?.name||'DR-HONEY-MINI MD BOT'}</h1><p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{b?.description||'WhatsApp MD bot project.'}</p><p className="mt-4 text-sm text-slate-500">Command library • {groups.length || 9} categories</p><div className="mt-7 flex flex-wrap gap-2"><GlassButton href={b?.externalUrl||'https://dr-honey-mini.vercel.app/'} external>OPEN DR-HONEY-MINI <ArrowUpRight size={18}/></GlassButton><GlassButton href="/contact" variant="secondary">REQUEST A BOT</GlassButton></div></div>
    <div className="bot-side-card glass"><Sparkles className="accent" size={18}/><p className="mt-3 text-sm font-bold">COMMAND LIBRARY</p><p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">The public page now reflects the command list you provided, grouped exactly by its command categories.</p></div>
   </div>
  </GlassCard>
  <div className="mt-6 grid gap-4 sm:grid-cols-2">
   <GlassCard className="reveal-up reveal-delay-2"><div className="flex items-center gap-2"><Sparkles className="accent" size={18}/><h2 className="text-xl font-bold">Bot Areas</h2></div>{features.length ? <div className="mt-4 grid gap-2">{features.map((x,i)=><div key={i} className="bot-list-item">{x}</div>)}</div> : <p className="mt-4 text-sm text-slate-500">No areas published.</p>}</GlassCard>
   <GlassCard className="reveal-up reveal-delay-3"><div className="flex items-center gap-2"><Command className="accent" size={18}/><h2 className="text-xl font-bold">Command Library</h2></div><div className="mt-4 grid gap-3">{groups.map((g,i)=><details key={i} className="bot-command-group"><summary className="cursor-pointer list-none flex items-center justify-between gap-3"><strong>{String(g.category||'Commands')}</strong><span className="bot-chip">{Array.isArray(g.command)?g.command.length:0}</span></summary><div className="mt-3 grid gap-2">{(Array.isArray(g.command)?g.command:[]).map((c:string,j:number)=><div key={j} className="bot-command"><strong>{c}</strong></div>)}</div></details>)}</div></GlassCard>
  </div>
  <GlassCard className="mt-6 reveal-up"><p className="text-xs font-black uppercase tracking-[.18em] accent">Powered by</p><p className="mt-2 text-sm text-slate-500 dark:text-slate-300">© ᴩᴏᴡᴇʀᴇᴅ ʙʏ : {BOT_POWERED_BY}</p></GlassCard>
 </section>
}
