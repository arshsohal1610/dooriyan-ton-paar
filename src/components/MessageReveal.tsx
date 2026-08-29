"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function MessageReveal({ message, from }: { message: string; from: string }) {
  return <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass mt-9 w-full rounded-[30px] px-7 py-9 text-center shadow-[0_20px_60px_rgba(128,104,168,0.10)]"><Sparkles size={18} className="mx-auto text-[#D9B77A]" /><p className="mt-6 font-serif text-xl leading-9 italic text-[#5C4B73]">{message || "No matter how far we are, you are always close to my heart. Happy Rakhi."}</p><div className="mx-auto mt-6 h-px w-16 bg-[#D9B77A]/50" /><p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[#AAA2AC]">With love, {from}</p></motion.article>;
}
