"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

import GlitterBackground from "../../../../components/GlitterBackground";

export default function MessagePage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]">
      <GlitterBackground />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F2C1A8]/30"
        >
          <Heart
            size={35}
            strokeWidth={1.2}
            className="text-[#8068A8]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#8068A8]"
        >
          A message from your sister
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 font-serif text-4xl leading-tight"
        >
          Some words
          <span className="block italic text-[#8068A8]">
            just for you...
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass mt-9 w-full max-w-md rounded-[30px] px-7 py-9 shadow-[0_20px_60px_rgba(128,104,168,0.10)]"
        >
          <Sparkles
            size={18}
            className="mx-auto text-[#D9B77A]"
          />

          <p className="mt-6 font-serif text-xl leading-9 italic text-[#5C4B73]">
            No matter how many kilometres are between us,
            you will always have a special place in my heart.
            Happy Rakhi, bhai. ♡
          </p>

          <div className="mx-auto mt-6 h-px w-16 bg-[#D9B77A]/50" />

          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[#AAA2AC]">
            With all my love
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/rakhi/demo/memory")}
          className="group mt-9 flex items-center gap-3 rounded-full bg-[#8068A8] px-8 py-4 text-sm font-medium tracking-[0.12em] text-white shadow-[0_12px_35px_rgba(128,104,168,0.22)]"
        >
          SEE OUR MEMORY

          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>
      </section>
    </main>
  );
}