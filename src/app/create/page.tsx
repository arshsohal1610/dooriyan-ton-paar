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

        {/* BACK BUTTON */}

        <button
          onClick={() => router.back()}
          className="flex w-fit items-center gap-2 text-sm text-[#8068A8]"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* MAIN CONTENT */}

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >

            {/* HEART */}

            <Heart
              className="mx-auto mb-6 text-[#D9B77A]"
              size={30}
              strokeWidth={1.4}
            />

            {/* SMALL HEADING */}

            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#8068A8]">
              <Sparkles size={12} />

              For the sister

              <Sparkles size={12} />
            </div>

            {/* MAIN HEADING */}

            <h1 className="mt-5 font-serif text-4xl leading-tight">
              Some bonds
              <span className="block italic text-[#8068A8]">
                know no distance.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p className="mx-auto mt-6 max-w-[310px] text-sm leading-7 text-[#756C78]">
              Even when you cannot tie a Rakhi yourself,
              love can still find its way across every mile.
            </p>

            {/* SMALL DECORATION */}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-8 flex items-center justify-center gap-3"
            >
              <span className="h-px w-10 bg-[#D9B77A]/50" />

              <span className="text-xl text-[#D9B77A]">
                🪢
              </span>

              <span className="h-px w-10 bg-[#D9B77A]/50" />
            </motion.div>

          </motion.div>

          {/* CONTINUE CARD */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-10"
          >

            <div className="glass rounded-[30px] p-6 shadow-[0_15px_50px_rgba(128,104,168,0.08)]">

              <p className="font-serif text-xl">
                Send a little piece of home.
              </p>

              <p className="mt-2 text-xs leading-6 text-[#756C78]">
                Tell us about yourself and the person
                waiting for your Rakhi.
              </p>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/create/sister")}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#8068A8] px-7 py-4 text-sm font-medium tracking-[0.12em] text-white shadow-[0_12px_35px_rgba(128,104,168,0.22)] transition hover:shadow-[0_15px_40px_rgba(128,104,168,0.3)]"
              >
                CONTINUE

                <ArrowRight size={17} />
              </motion.button>

            </div>

          </motion.div>

          {/* FOOTER */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#AAA2AC]"
          >
            <Sparkles size={11} />

            Made with love, across every distance

            <Sparkles size={11} />
          </motion.div>

        </div>
      </section>
    </main>
  );
}