"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<typeof motion.button> & { children: ReactNode; secondary?: boolean; icon?: boolean };

export default function RakhiButton({ children, secondary, icon = true, className = "", ...props }: Props) {
  return <motion.button whileTap={{ scale: 0.97 }} {...props} className={`flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-medium tracking-[0.12em] shadow-[0_12px_35px_rgba(128,104,168,0.18)] ${secondary ? "border border-[#8068A8]/20 bg-white/70 text-[#8068A8]" : "bg-[#8068A8] text-white"} ${className}`}>
    {children}{icon && <ArrowRight size={17} />}
  </motion.button>;
}
