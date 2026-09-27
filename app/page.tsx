import Link from 'next/link';
import { ArrowRight, Bot, Cloud, Instagram, Layers3, MessageCircle, Send, Sparkles, Youtube } from 'lucide-react';
import { getHero,getServices,getBot,getSocialLinks } from '@/lib/db/content';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';

function socialIcon(name:string){
  const value=name.toLowerCase();
  if(value.includes('instagram')) return Instagram;
  if(value.includes('youtube')) return Youtube;
  if(value.includes('telegram')) return Send;
  return MessageCircle;
}

export default async function Home(){
  const [hero,services,bot,socialLinks]=await Promise.all([getHero(),getServices(),getBot(),getSocialLinks()]);
  const socials=socialLinks.filter(link=>['whatsapp','instagram','youtube','whatsapp channel','telegram'].includes(link.name.toLowerCase())).slice(0,5);
  const cards=[
    {Icon:Bot,title:'AI & Automation',text:'Intelligent systems that learn, adapt and automate complex tasks.'},
    {Icon:Layers3,title:'Web & Mobile Development',text:'Scalable, secure and beautiful applications built for the future.'},
    {Icon:Cloud,title:'Cloud & DevOps',text:'Reliable infrastructure and seamless delivery at global scale.'},
  ];
  return <div className="approved-home">
    <section className="approved-hero mx-auto max-w-6xl px-5 pb-8 pt-28 sm:pt-36">
      <div className="approved-topline"><span className="approved-kicker">BUILDING INTELLIGENCE. SHAPING THE FUTURE.</span></div>
      <div className="approved-copy">
        <h1><span>Intelligent</span><span>Solutions.</span><strong>Limitless Possibilities.</strong></h1>
        <p>{hero?.description||'AI-powered systems, modern applications and digital experiences that drive real impact.'}</p>
        <GlassButton href="/services"><Sparkles size={18}/>Explore Our Services</GlassButton>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-4 px-5 py-8 sm:grid-cols-3">
      {cards.map(({Icon,title,text})=><GlassCard key={title} className="approved-feature-card"><span className="approved-icon"><Icon size={26}/></span><h2>{title}</h2><p>{text}</p><ArrowRight className="approved-card-arrow" size={20}/></GlassCard>)}
    </section>
    <section className="mx-auto max-w-6xl px-5 py-5">
      <GlassCard className="approved-connect"><div><h2>Let&apos;s Connect <Sparkles size={16}/></h2><p>We&apos;re here to bring your ideas to life.</p></div><div className="approved-socials">{socials.map(link=>{const Icon=socialIcon(link.name);return <Link key={link.id} href={link.url} target="_blank" rel="noreferrer" aria-label={link.name} className="approved-social"><Icon size={25}/></Link>})}</div></GlassCard>
    </section>
    <section className="sr-only"><Link href={bot?.externalUrl||'/bot'}>DR-HONEY-MINI BOT</Link></section>
  </div>
}
