"use client";

import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Heart,
  MapPin,
  Sparkles,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";

import GlitterBackground from "../../../components/GlitterBackground";

export default function BrotherPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleContinue = () => {
    if (!name.trim() || !location.trim() || !image) {
      alert("Please add your name, location and photo first. ♡");
      return;
    }

    sessionStorage.setItem(
      "brotherDetails",
      JSON.stringify({
        name,
        location,
        image,
      })
    );

    router.push("/rakhi/demo/travel");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]">
      <GlitterBackground />

      <section className="relative z-10 min-h-screen px-5 py-7">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-[#8068A8]"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mx-auto w-full max-w-md pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-center"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2C1A8]/30">
              <Heart
                size={22}
                strokeWidth={1.5}
                className="text-[#8068A8]"
              />
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8068A8]">
              Brother side
            </p>

            <h1 className="mt-3 font-serif text-4xl leading-tight">
              Where are you
              <span className="block italic text-[#8068A8]">
                waiting from?
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-[310px] text-sm leading-7 text-[#756C78]">
              Tell us where you are, so your Rakhi can find its way
              to you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-9 space-y-5"
          >
            {/* Name */}

            <div>
              <label className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">
                Your name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should she call you?"
                className="w-full rounded-2xl border border-[#D9B77A]/30 bg-white/65 px-5 py-4 text-sm outline-none backdrop-blur-md transition placeholder:text-[#AAA2AC] focus:border-[#8068A8]/50 focus:ring-2 focus:ring-[#8068A8]/10"
              />
            </div>

            {/* Location */}

            <div>
              <label className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">
                Where are you right now?
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D9B77A]"
                />

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State / Country"
                  className="w-full rounded-2xl border border-[#D9B77A]/30 bg-white/65 py-4 pl-11 pr-5 text-sm outline-none backdrop-blur-md transition placeholder:text-[#AAA2AC] focus:border-[#8068A8]/50 focus:ring-2 focus:ring-[#8068A8]/10"
                />
              </div>
            </div>

            {/* Photo */}

            <div>
              <label className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">
                Your photo
              </label>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />

                {image ? (
                  <div className="relative overflow-hidden rounded-[24px] border border-[#D9B77A]/30 bg-white/60 p-2">
                    <img
                      src={image}
                      alt="Brother preview"
                      className="h-64 w-full rounded-[18px] object-cover"
                    />

                    <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs text-[#5C4B73] shadow-lg backdrop-blur-md">
                      <Camera size={14} />
                      Change photo
                    </div>
                  </div>
                ) : (
                  <div className="flex h-52 flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D9B77A]/50 bg-white/45 text-center backdrop-blur-md">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2C1A8]/25">
                      <Upload
                        size={19}
                        className="text-[#8068A8]"
                      />
                    </div>

                    <p className="text-sm font-medium text-[#5C4B73]">
                      Add your photo
                    </p>

                    <p className="mt-1 text-xs text-[#9B929D]">
                      Let her see the person receiving her Rakhi ♡
                    </p>
                  </div>
                )}
              </label>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#8068A8] px-7 py-4 text-white shadow-[0_12px_35px_rgba(128,104,168,0.22)]"
          >
            <span className="text-sm font-medium tracking-[0.15em]">
              BEGIN THE JOURNEY
            </span>

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>

          <div className="mt-7 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#AAA2AC]">
            <Sparkles size={11} />
            Your Rakhi is waiting
            <Sparkles size={11} />
          </div>
        </div>
      </section>
    </main>
  );
}