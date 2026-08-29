"use client";

import { motion } from "framer-motion";
import {
  Download,
  Heart,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import GlitterBackground from "../../../../components/GlitterBackground";

export default function MemoryPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateMemory = () => {
    setGenerating(true);

    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 3000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]">
      <GlitterBackground />

      <section className="relative z-10 min-h-screen px-5 py-10">
        <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Sparkles
              size={25}
              className="text-[#D9B77A]"
            />
          </motion.div>

          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[#8068A8]">
            Your Rakhi memory
          </p>

          <h1 className="mt-3 font-serif text-4xl leading-tight">
            Together,
            <span className="block italic text-[#8068A8]">
              even from afar.
            </span>
          </h1>

          {!generated ? (
            <>
              <div className="glass mt-10 flex h-[390px] w-full flex-col items-center justify-center rounded-[32px] px-8">
                {generating ? (
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D9B77A]/50"
                  >
                    <Sparkles
                      size={25}
                      className="text-[#8068A8]"
                    />
                  </motion.div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2C1A8]/25">
                    <ImageIcon
                      size={27}
                      strokeWidth={1.3}
                      className="text-[#8068A8]"
                    />
                  </div>
                )}

                <h2 className="mt-7 font-serif text-2xl">
                  {generating
                    ? "Creating your memory..."
                    : "A picture of you both"}
                </h2>

                <p className="mt-3 max-w-[260px] text-sm leading-6 text-[#756C78]">
                  {generating
                    ? "A little magic is being added to your Rakhi story."
                    : "We'll bring both your photos together into one beautiful Rakhi memory."}
                </p>
              </div>

              {!generating && (
                <button
                  onClick={generateMemory}
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#8068A8] px-8 py-4 text-sm font-medium tracking-[0.12em] text-white shadow-[0_12px_35px_rgba(128,104,168,0.22)]"
                >
                  <Sparkles size={17} />
                  CREATE OUR MEMORY
                </button>
              )}
            </>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="w-full"
            >
              {/* Temporary AI image area */}

              <div className="mt-10 overflow-hidden rounded-[32px] border border-[#D9B77A]/30 bg-gradient-to-br from-[#F2C1A8]/30 via-white to-[#B9A7D9]/30 p-3 shadow-[0_20px_70px_rgba(128,104,168,0.15)]">
                <div className="flex h-[420px] flex-col items-center justify-center rounded-[25px] bg-white/60 px-8">
                  <Heart
                    size={50}
                    strokeWidth={1.1}
                    className="text-[#8068A8]"
                  />

                  <p className="mt-6 font-serif text-2xl italic text-[#5C4B73]">
                    Your Rakhi memory
                  </p>

                  <p className="mt-3 text-xs leading-6 text-[#756C78]">
                    Gemini AI image will appear here.
                  </p>
                </div>
              </div>

              <p className="mt-6 font-serif text-lg italic text-[#8068A8]">
                Some memories do not need distance to be real. ♡
              </p>

              <button
                onClick={() => alert("The final AI image download will be connected with Gemini next.")}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#8068A8] px-8 py-4 text-sm font-medium tracking-[0.12em] text-white shadow-[0_12px_35px_rgba(128,104,168,0.22)]"
              >
                <Download size={17} />
                DOWNLOAD MEMORY
              </button>
            </motion.div>
          )}

          <div className="mt-8 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#AAA2AC]">
            <Heart size={10} />
            Made with love
            <Heart size={10} />
          </div>
        </div>
      </section>
    </main>
  );
}