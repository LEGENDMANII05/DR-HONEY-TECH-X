import './globals.css';
import type { Metadata } from 'next';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { TouchEnergy } from '@/components/effects/TouchEnergy';
import { getSiteSettings } from '@/lib/db/content';

export async function generateMetadata(): Promise<Metadata> {
 const s=await getSiteSettings(); return { title:{default:s.siteName,template:`%s | ${s.siteName}`}, description:s.description, metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'), robots:{index:true,follow:true}, openGraph:{title:s.siteName,description:s.description,type:'website'} };
}
export default async function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><TouchEnergy/><BottomNavigation/><main className="safe-bottom">{children}</main></body></html>}
