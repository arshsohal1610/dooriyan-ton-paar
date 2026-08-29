"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Heart, MessageCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import GlitterBackground from "../../../../components/GlitterBackground";
import RakhiButton from "../../../../components/RakhiButton";
import { createRakhiId, RakhiRecord, saveRakhi } from "../../../../lib/rakhi";

export default function SendPage() {
 const router=useRouter(); const [link,setLink]=useState(""); const [copied,setCopied]=useState(false);
 useEffect(()=>{const timer=window.setTimeout(()=>{const draft=sessionStorage.getItem("doorian-ton-paar:draft");if(!draft){router.replace("/create/sister");return;} const sister=JSON.parse(draft);const record:RakhiRecord={id:createRakhiId(),sister,createdAt:new Date().toISOString()};saveRakhi(record);setLink(`${window.location.origin}/rakhi/${record.id}`);},0);return()=>window.clearTimeout(timer);},[router]);
 const copy=async()=>{if(!link)return;await navigator.clipboard.writeText(link);setCopied(true);setTimeout(()=>setCopied(false),1800);}; const whatsapp=()=>window.open(`https://wa.me/?text=${encodeURIComponent(`I made something special for you this Rakhi. ❤️ Open this when you have a moment.\n${link}`)}`,"_blank");
 return <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]"><GlitterBackground/><section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 text-center"><Heart className="mx-auto text-[#8068A8]" fill="currentColor"/><p className="mt-6 text-[10px] uppercase tracking-[.3em] text-[#8068A8]">Ready with love</p><h1 className="mt-3 font-serif text-4xl">Your Rakhi is <span className="block italic text-[#8068A8]">ready to travel</span></h1><p className="mt-5 text-sm leading-7 text-[#756C78]">Send this private link to your brother when the moment feels right.</p><article className="glass mt-9 rounded-[28px] p-6 text-left shadow-[0_20px_60px_rgba(80,60,100,.08)]"><p className="text-center font-serif text-xl">Distance means so little when someone means so much.</p><div className="my-6 h-px bg-[#D9B77A]/20"/><p className="mb-2 text-xs font-medium text-[#5C4B73]">Your special Rakhi link</p><div className="flex gap-2 rounded-2xl border border-[#D9B77A]/30 p-2"><input value={link} readOnly className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none"/><button onClick={copy} aria-label="Copy link" className="rounded-xl bg-[#F2C1A8]/30 p-3 text-[#8068A8]">{copied?<Check size={16}/>:<Copy size={16}/>}</button></div></article><RakhiButton onClick={whatsapp} className="mt-6" icon={false}><MessageCircle size={18}/> SEND ON WHATSAPP</RakhiButton><RakhiButton onClick={copy} secondary className="mt-3" icon={false}>{copied?"LINK COPIED":"COPY LINK"}</RakhiButton><p className="mt-7 text-[9px] uppercase tracking-[.2em] text-[#AAA2AC]"><Sparkles className="inline" size={11}/> Made with love, from sister to brother</p></section></main>;
}
