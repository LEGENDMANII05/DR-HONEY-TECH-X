'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle({compact=false}:{compact?:boolean}){
  const [dark,setDark]=useState(false);
  useEffect(()=>{
    const saved=window.localStorage.getItem('dr-honey-theme');
    const prefers=window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next=saved?saved==='dark':prefers;
    setDark(next);
    document.documentElement.dataset.theme=next?'dark':'light';
  },[]);
  function toggle(){
    const next=!dark;
    setDark(next);
    document.documentElement.dataset.theme=next?'dark':'light';
    window.localStorage.setItem('dr-honey-theme',next?'dark':'light');
  }
  return <button type="button" aria-label={dark?'Switch to light mode':'Switch to dark mode'} title={dark?'Light mode':'Dark mode'} onClick={toggle} className={`theme-toggle focus-ring ${compact?'theme-toggle-compact':''}`}>
    {dark?<Sun size={18}/>:<Moon size={18}/>}<span>{dark?'Light mode':'Dark mode'}</span>
  </button>
}
