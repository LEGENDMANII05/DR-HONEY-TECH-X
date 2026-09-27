import Link from 'next/link'; import { LoaderCircle } from 'lucide-react';
export function GlassButton({children,href,variant='primary',loading=false,onClick,type='button'}:{children:React.ReactNode;href?:string;variant?:'primary'|'secondary';loading?:boolean;onClick?:()=>void;type?:'button'|'submit'}){
  const cls=`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition duration-300 hover:-translate-y-1 active:scale-[.97] ${variant==='primary'?'border border-blue-400/40 bg-blue-500/10 text-blue-700 shadow-[0_10px_30px_rgba(59,130,246,.14)] hover:bg-blue-500/15 hover:shadow-[0_16px_38px_rgba(59,130,246,.22)]':'glass text-slate-700 hover:bg-white/80'}`;
  if(href)return <Link className={cls} href={href}>{children}</Link>;
  return <button type={type} className={cls} onClick={onClick} disabled={loading}>{loading?<LoaderCircle className="animate-spin" size={18}/>:children}</button>
}
