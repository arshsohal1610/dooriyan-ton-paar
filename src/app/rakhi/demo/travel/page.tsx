"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

import GlitterBackground from "../../../../components/GlitterBackground";

export default function TravelPage() {
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [arrived, setArrived] = useState(false);

  const sisterCity = "Amritsar";
  const brotherCity = "Delhi";

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, 800);

    const arrivalTimer = setTimeout(() => {
      setArrived(true);
    }, 6500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(arrivalTimer);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]">
      <GlitterBackground />

      <section className="relative z-10 flex min-h-screen flex-col px-5 py-8">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center text-center">

          {!arrived ? (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F2C1A8]/30">
                  <Heart
                    size={27}
                    strokeWidth={1.3}
                    className="text-[#8068A8]"
                  />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-7 text-[10px] uppercase tracking-[0.3em] text-[#8068A8]"
              >
                The journey begins
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 font-serif text-4xl leading-tight"
              >
                Your Rakhi is
                <span className="block italic text-[#8068A8]">
                  travelling to you...
                </span>
              </motion.h1>

              {/* Map */}

              <div className="relative mt-12 h-[300px] overflow-hidden rounded-[30px] border border-[#D9B77A]/25 bg-[#F8F4EE] shadow-[0_20px_60px_rgba(128,104,168,0.10)]">

                {/* Decorative map lines */}

                <div className="absolute left-[15%] top-[25%] h-px w-[70%] rotate-[12deg] bg-[#D9B77A]/25" />

                <div className="absolute left-[10%] top-[60%] h-px w-[80%] -rotate-[15deg] bg-[#D9B77A]/20" />

                <div className="absolute left-[40%] top-[5%] h-[90%] w-px rotate-[20deg] bg-[#D9B77A]/15" />

                <div className="absolute left-[65%] top-[5%] h-[90%] w-px -rotate-[15deg] bg-[#D9B77A]/15" />

                {/* Route */}

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 400 300"
                  fill="none"
                >
                  <path
                    d="M70 220 C130 120 210 250 330 80"
                    stroke="#B9A7D9"
                    strokeWidth="2"
                    strokeDasharray="6 7"
                    opacity="0.7"
                  />
                </svg>

                {/* Sister */}

                <div className="absolute left-[12%] bottom-[18%]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#E8B6B8] shadow-lg">
                    <MapPin
                      size={20}
                      className="text-[#8068A8]"
                    />
                  </div>

                  <p className="mt-2 text-xs font-medium text-[#5C4B73]">
                    {sisterCity}
                  </p>

                  <p className="text-[9px] uppercase tracking-wider text-[#AAA2AC]">
                    Rakhi starts
                  </p>
                </div>

                {/* Brother */}

                <div className="absolute right-[10%] top-[12%]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#B9A7D9]/40 shadow-lg">
                    <MapPin
                      size={20}
                      className="text-[#8068A8]"
                    />
                  </div>

                  <p className="mt-2 text-xs font-medium text-[#5C4B73]">
                    {brotherCity}
                  </p>

                  <p className="text-[9px] uppercase tracking-wider text-[#AAA2AC]">
                    Destination
                  </p>
                </div>

                {/* Travelling Rakhi */}

                {started && (
                  <motion.div
                    initial={{
                      left: "15%",
                      top: "70%",
                    }}
                    animate={{
                      left: ["15%", "38%", "55%", "72%", "82%"],
                      top: ["70%", "45%", "60%", "32%", "20%"],
                    }}
                    transition={{
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="absolute z-20"
                  >
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#D9B77A]/60 bg-white shadow-[0_5px_25px_rgba(217,183,122,0.35)]">
                      <span className="text-xl">
                        🪢
                      </span>
                    </div>

                    <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[9px] uppercase tracking-wider text-[#8068A8] shadow-md backdrop-blur-md">
                      travelling with love
                    </div>
                  </motion.div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 flex items-center justify-center gap-2 text-xs text-[#756C78]"
              >
                <Sparkles size={13} className="text-[#D9B77A]" />

                From {sisterCity} to {brotherCity}

                <Sparkles size={13} className="text-[#D9B77A]" />
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F2C1A8]/30">
                <Heart
                  size={40}
                  strokeWidth={1.2}
                  className="text-[#8068A8]"
                />
              </div>

              <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#8068A8]">
                Destination reached
              </p>

              <h1 className="mt-4 font-serif text-4xl leading-tight">
                Your Rakhi
                <span className="block italic text-[#8068A8]">
                  has arrived. ♡
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-[300px] text-sm leading-7 text-[#756C78]">
                Distance could not stop a thread of love from finding
                its way to you.
              </p>

              <button
                onClick={() => router.push("/rakhi/demo/message")}
                className="mt-9 rounded-full bg-[#8068A8] px-8 py-4 text-sm font-medium tracking-[0.12em] text-white shadow-[0_12px_35px_rgba(128,104,168,0.22)]"
              >
                OPEN YOUR RAKHI
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}