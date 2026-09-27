export function GlassCard({children,className='' }:{children:React.ReactNode;className?:string}){
  return <div className={`glass glass-hover rounded-3xl p-5 ${className}`}>{children}</div>
}
