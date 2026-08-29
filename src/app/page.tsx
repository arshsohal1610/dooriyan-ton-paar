"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import GlitterBackground from "../components/GlitterBackground";
import RakhiButton from "../components/RakhiButton";

export default function Home() {
  const router = useRouter();
  return <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]"><GlitterBackground /><section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center"><motion.p initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-[10px] uppercase tracking-[.3em] text-[#8068A8]"><Sparkles size={13} />Doorian Ton Paar<Sparkles size={13} /></motion.p><motion.div initial={{ opacity: 0, scale: .65, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.1 }} className="relative my-9 flex h-32 w-32 items-center justify-center rounded-full border border-[#D9B77A]/50 bg-white/50 shadow-[0_12px_45px_rgba(128,104,168,.13)]"><div className="absolute inset-4 rounded-full border-2 border-[#D9B77A]/50" /><div className="flex h-14 w-14 rotate-45 items-center justify-center rounded-xl border border-[#D9B77A] bg-gradient-to-br from-white to-[#F2C1A8]/40"><Heart className="-rotate-45 text-[#8068A8]" size={23} fill="currentColor" /></div></motion.div><motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className="font-serif text-5xl tracking-[-.04em]">Happy <span className="italic text-[#8068A8]">Rakhi</span></motion.h1><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className="mt-5 font-serif text-xl italic text-[#8068A8]">Some bonds travel beyond distance.</motion.p><p className="mt-5 max-w-[300px] text-sm leading-7 text-[#756C78]">A little Rakhi journey, made with love for the ones who are far away.</p><RakhiButton onClick={() => router.push("/create")} className="mt-10 max-w-[280px]">ENTER THE JOURNEY</RakhiButton></section></main>;
}
