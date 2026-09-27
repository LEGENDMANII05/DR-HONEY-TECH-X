import { Instagram, Send, Youtube, MessageCircle, ExternalLink } from 'lucide-react';
import { getSocialLinks } from '@/lib/db/content';

function Icon({name}:{name:string}) {
  const key=name.toLowerCase();
  if(key.includes('instagram')) return <Instagram size={19}/>;
  if(key.includes('youtube')) return <Youtube size={19}/>;
  if(key.includes('telegram')) return <Send size={19}/>;
  if(key.includes('whatsapp')) return <MessageCircle size={19}/>;
  return <ExternalLink size={19}/>;
}

export async function SocialLinks() {
  const links=await getSocialLinks();
  return <div className="social-links" aria-label="Social links">
    {links.map(link=><a key={link.id} className="social-link focus-ring" href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${link.name}`} title={link.name} data-animate-click><Icon name={link.name}/><span>{link.name}</span></a>)}
  </div>;
}
