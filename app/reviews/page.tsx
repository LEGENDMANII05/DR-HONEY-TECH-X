'use client';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Star, Send, MessageSquareQuote, Sparkles } from 'lucide-react';

type Review = { id: string; name: string; rating: number; title: string | null; comment: string; page: string | null; createdAt: string };

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]), [rating, setRating] = useState(5);
  const [form, setForm] = useState({ name:'', email:'', title:'', comment:'', page:'Website' }), [status, setStatus] = useState(''), [sending, setSending] = useState(false);
  const load = async () => { const res=await fetch('/api/reviews',{cache:'no-store'}); if(res.ok)setReviews(await res.json()); };
  useEffect(()=>{load();},[]);
  const average = useMemo(() => reviews.length ? (reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length).toFixed(1) : '5.0', [reviews]);
  const submit=async(e:FormEvent)=>{e.preventDefault();setSending(true);setStatus('');const res=await fetch('/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,rating})});const data=await res.json();if(res.ok){setStatus('Review submit ho gaya — shukriya!');setForm({name:'',email:'',title:'',comment:'',page:'Website'});setRating(5);load();}else setStatus(data.error||'Review submit nahi ho saka.');setSending(false);};
  return <main className="mx-auto max-w-6xl px-5 py-28">
    <div data-scroll-reveal>
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/25 px-4 py-2 text-xs font-extrabold tracking-[.12em] text-blue-700 backdrop-blur-xl dark:text-cyan-200"><Sparkles size={14}/> REAL FEEDBACK</div>
      <h1 className="hero-title mt-4 text-4xl font-black md:text-5xl">Apna experience share karein.</h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Website, services, projects, bot aur overall experience ke bare mein apni honest feedback de sakte hain.</p>
      <div className="mt-5 inline-flex items-center gap-3 rounded-2xl px-4 py-3 review-rating-badge glass-card"><div className="flex review-stars-glow">{[1,2,3,4,5].map(n=><Star key={n} size={17} fill="currentColor" className="accent"/>)}</div><span className="font-black">{average}/5</span><span className="text-xs text-slate-500 dark:text-slate-400">{reviews.length} review{reviews.length===1?'':'s'}</span></div>
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <form onSubmit={submit} className="glass glass-card rounded-[28px] p-6" data-scroll-reveal>
        <div className="flex items-center gap-2"><MessageSquareQuote className="accent" size={20}/><h2 className="text-xl font-extrabold">Write a Review</h2></div>
        <div className="mt-5 flex gap-1" aria-label="Rating">{[1,2,3,4,5].map(n=><button key={n} type="button" onClick={()=>setRating(n)} aria-label={`${n} stars`} className="interactive-button rounded-full p-1 transition hover:scale-110"><Star size={25} fill={n<=rating?'currentColor':'none'} className={n<=rating?'accent review-stars-glow':'text-slate-400'}/></button>)}</div>
        <div className="mt-5 grid gap-3"><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" className="glass-input"/><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email (optional)" type="email" className="glass-input"/><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Review title (optional)" className="glass-input"/><select value={form.page} onChange={e=>setForm({...form,page:e.target.value})} className="glass-input"><option>Website</option><option>Services</option><option>Projects</option><option>Bot</option><option>Contact</option><option>Other</option></select><textarea required minLength={5} maxLength={1200} value={form.comment} onChange={e=>setForm({...form,comment:e.target.value})} placeholder="Apna experience likhein..." rows={6} className="glass-input resize-none"/></div>
        <button disabled={sending} className="glass-button mt-4 inline-flex items-center gap-2 interactive-button"><Send size={17}/>{sending?'Sending...':'Submit Review'}</button>{status&&<p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{status}</p>}
      </form>
      <section className="space-y-4">{reviews.length===0?<div className="glass glass-card rounded-[28px] p-8 text-slate-600 dark:text-slate-300" data-scroll-reveal>Abhi koi review nahi hai. Sab se pehle aap apna experience share karein.</div>:reviews.map((r,i)=><article key={r.id} className="glass glass-card rounded-[24px] p-5" data-scroll-reveal style={{transitionDelay:`${Math.min(i,5)*70}ms`}}><div className="flex items-center justify-between gap-3"><div><p className="font-bold">{r.name}</p><p className="text-xs text-slate-500">{r.page||'Website'}</p></div><div className="flex">{[1,2,3,4,5].map(n=><Star key={n} size={15} fill={n<=r.rating?'currentColor':'none'} className={n<=r.rating?'accent':'text-slate-400'}/>)}</div></div>{r.title&&<h3 className="mt-3 font-extrabold">{r.title}</h3>}<p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{r.comment}</p></article>)}</section>
    </div>
  </main>;
}
