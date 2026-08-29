"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
} from "lucide-react";

import { useRouter } from "next/navigation";

import GlitterBackground from "../../components/GlitterBackground";

export default function CreatePage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]">
      <GlitterBackground />

      <section className="relative z-10 flex min-h-screen flex-col px-6 py-8">
        <button
          onClick={() => router.back()}
          className="flex w-fit items-center gap-2 text-sm text-[#8068A8]"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart
              className="mx-auto mb-6 text-[#D9B77A]"
              size={28}
              strokeWidth={1.4}
            />

            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#8068A8]">
              <Sparkles size={12} />
              Begin your journey
              <Sparkles size={12} />
            </div>

            <h1 className="mt-4 font-serif text-4xl leading-tight">
              Who are you

              <span className="block italic text-[#8068A8]">
                today?
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[290px] text-sm leading-7 text-[#756C78]">
              Because love deserves to travel both ways.
            </p>
          </motion.div>

          <div className="mt-10 space-y-4">
            <RoleCard
              symbol="♡"
              title="Sister"
              subtitle="I want to send a Rakhi"
              onClick={() => router.push("/create/sister")}
              delay={0.2}
            />

            <RoleCard
              symbol="♡"
              title="Brother"
              subtitle="I want to send a Rakhi"
              onClick={() => router.push("/create/brother")}
              delay={0.35}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function RoleCard({
  symbol,
  title,
  subtitle,
  onClick,
  delay,
}: {
  symbol: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass group w-full rounded-[28px] p-6 text-left shadow-[0_15px_50px_rgba(128,104,168,0.08)] transition hover:-translate-y-1"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F2C1A8]/30 font-serif text-2xl text-[#8068A8]">
          {symbol}
        </div>

        <div className="flex-1">
          <h2 className="font-serif text-2xl">
            {title}
          </h2>

          <p className="mt-1 text-sm text-[#756C78]">
            {subtitle}
          </p>
        </div>

        <ArrowRight
          size={18}
          className="text-[#D9B77A] transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </motion.button>
  );
}