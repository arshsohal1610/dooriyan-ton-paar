"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import GlitterBackground from "../../../components/GlitterBackground";
import PhotoUpload from "../../../components/PhotoUpload";
import RakhiButton from "../../../components/RakhiButton";

import {
  getRakhi,
  readPhoto,
  saveRakhi,
  setActiveRakhi,
  RakhiRecord,
} from "../../../lib/rakhi";

export default function ReceivePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<RakhiRecord | null>(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const loadRakhi = async () => {
      try {
        /*
         * First try MongoDB.
         * This is the important part for the brother's device.
         */
        const response = await fetch(`/api/rakhi/${id}`, {
          method: "GET",
          cache: "no-store",
        });

        if (response.ok) {
          const onlineRecord = (await response.json()) as RakhiRecord;

          if (!cancelled) {
            setRecord(onlineRecord);
            setActiveRakhi(id);

            // Keep a local copy for the rest of the journey.
            localStorage.setItem(
              `doorian-ton-paar:rakhi:${id}`,
              JSON.stringify(onlineRecord)
            );

            setLoading(false);
          }

          return;
        }

        /*
         * If MongoDB cannot be reached, try local storage.
         * This keeps the local development flow working.
         */
        const localRecord = getRakhi(id);

        if (!cancelled) {
          if (localRecord) {
            setRecord(localRecord);
            setActiveRakhi(id);
          } else {
            setRecord(null);
          }

          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load Rakhi:", err);

        /*
         * Final fallback to local storage.
         */
        const localRecord = getRakhi(id);

        if (!cancelled) {
          if (localRecord) {
            setRecord(localRecord);
            setActiveRakhi(id);
          } else {
            setRecord(null);
          }

          setLoading(false);
        }
      }
    };

    loadRakhi();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const choose = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const result = await readPhoto(file);
      setPhoto(result);
      setError("");
    } catch {
      setError("We couldn't read that photo. Please try another one.");
    }
  };

  const submit = async () => {
    setError("");

    if (!name.trim() || !location.trim() || !photo) {
      setError("Please add your name, location, and photo.");
      return;
    }

    if (!record) {
      setError(
        "We couldn't find this Rakhi. Please reopen the complete link."
      );
      return;
    }

    const updatedRecord: RakhiRecord = {
      ...record,
      brother: {
        name: name.trim(),
        location: location.trim(),
        photo,
      },
    };

    /*
     * Save locally immediately.
     */
    saveRakhi(updatedRecord);

    /*
     * Also explicitly save the brother's details online.
     * Wait for this before moving to the journey.
     */
    try {
      const response = await fetch(`/api/rakhi/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        console.error(
          "Failed to save brother details:",
          await response.text()
        );
      }
    } catch (err) {
      console.error("Could not save brother details online:", err);
    }

    setActiveRakhi(id);

    /*
     * Brother now enters the Rakhi journey.
     */
    router.push("/rakhi/journey");
  };

  if (loading) {
    return (
      <main className="relative min-h-screen bg-[#FFFDF8] text-[#40364A]">
        <GlitterBackground />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <Heart
            className="text-[#8068A8]"
            fill="currentColor"
          />

          <p className="mt-6 text-[10px] uppercase tracking-[.3em] text-[#8068A8]">
            A Rakhi is travelling
          </p>

          <h1 className="mt-3 font-serif text-4xl">
            Your Rakhi is arriving...
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#756C78]">
            Please wait while we bring your Rakhi to you.
          </p>
        </section>
      </main>
    );
  }

  /*
   * Only show this when the shared ID genuinely cannot be found.
   *
   * IMPORTANT:
   * We do NOT send the brother to the home/create page here.
   */
  if (!record) {
    return (
      <main className="relative min-h-screen bg-[#FFFDF8] text-[#40364A]">
        <GlitterBackground />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <Heart className="text-[#8068A8]" />

          <h1 className="mt-6 font-serif text-4xl">
            This Rakhi link has expired.
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#756C78]">
            We couldn't find the Rakhi connected to this link.
            Please ask your sister to send you the Rakhi link again.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]">
      <GlitterBackground />

      <section className="relative z-10 mx-auto min-h-screen max-w-md px-5 py-10">
        <header className="text-center">
          <Heart
            className="mx-auto text-[#8068A8]"
            fill="currentColor"
          />

          <p className="mt-6 text-[10px] uppercase tracking-[.3em] text-[#8068A8]">
            A Rakhi has arrived
          </p>

          <h1 className="mt-3 font-serif text-5xl">
            Happy Rakhi{" "}
            <span className="text-[#8068A8]">❤️</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#756C78]">
            A Rakhi is travelling across the distance, carrying a
            little love especially for you.
          </p>
        </header>

        <div className="glass mt-8 rounded-[28px] p-6 text-center">
          <p className="font-serif text-xl">
            Before it reaches you, tell us where it should go.
          </p>
        </div>

        <div className="mt-7 space-y-5">
          <label className="block">
            <span className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">
              Your name
            </span>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="field"
            />
          </label>

          <label className="block">
            <span className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">
              Your current city
            </span>

            <span className="relative block">
              <MapPin
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D9B77A]"
              />

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State / Country"
                className="field pl-11"
              />
            </span>
          </label>

          <PhotoUpload
            value={photo}
            onChange={choose}
            label="Your photo"
          />
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-[#a85f76]">
            {error}
          </p>
        )}

        <RakhiButton
          onClick={submit}
          className="mt-7"
        >
          START THE JOURNEY
        </RakhiButton>

        <p className="mt-7 text-center text-[9px] uppercase tracking-[.2em] text-[#AAA2AC]">
          <Sparkles className="inline" size={11} /> Across every mile,
          still connected
        </p>
      </section>
    </main>
  );
}