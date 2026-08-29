"use client";

import { motion } from "framer-motion";

const sparkles = [
  { left: "8%", top: "18%", delay: 0 },
  { left: "18%", top: "72%", delay: 1.2 },
  { left: "32%", top: "28%", delay: 2 },
  { left: "76%", top: "18%", delay: 0.8 },
  { left: "88%", top: "64%", delay: 1.7 },
  { left: "68%", top: "82%", delay: 2.5 },
  { left: "48%", top: "12%", delay: 1.4 },
];

export default function GlitterBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#E8B6B8]/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#B9A7D9]/20 blur-3xl" />

      {sparkles.map((sparkle, index) => (
        <motion.div
          key={index}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          animate={{
            opacity: [0.15, 0.8, 0.15],
            scale: [0.7, 1.4, 0.7],
          }}
          transition={{
            duration: 3.5,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}