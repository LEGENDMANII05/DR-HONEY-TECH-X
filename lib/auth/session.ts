import { cookies } from 'next/headers';
import crypto from 'crypto';
const COOKIE='dr_honey_session';
function sign(value:string){return crypto.createHmac('sha256',process.env.AUTH_SECRET||'dev-only-secret').update(value).digest('hex')}
export async function setSession(userId:string){const raw=`${userId}.${Date.now()}`;const token=`${raw}.${sign(raw)}`;(await cookies()).set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*8});}
export async function clearSession(){(await cookies()).delete(COOKIE)}
export async function getSession(){const token=(await cookies()).get(COOKIE)?.value;if(!token)return null;const [userId,ts,sig]=token.split('.');if(!userId||!ts||!sig||sig!==sign(`${userId}.${ts}`))return null;if(Date.now()-Number(ts)>8*60*60*1000)return null;return userId;}
