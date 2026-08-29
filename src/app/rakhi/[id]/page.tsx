"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import GlitterBackground from "../../../components/GlitterBackground";
import PhotoUpload from "../../../components/PhotoUpload";
import RakhiButton from "../../../components/RakhiButton";

import {
  getRakhi,
  getRakhiOnline,
  readPhoto,
  setActiveRakhi,
  RakhiRecord,
} from "../../../lib/rakhi";

export default function ReceivePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [record, setRecord] = useState<RakhiRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const local = getRakhi(id);

        if (local) {
          if (!cancelled) {
            setRecord(local);
            setActiveRakhi(id);
            setLoading(false);
          }
          return;
        }

        const online = await getRakhiOnline(id);

        if (!cancelled) {
          if (online) {
            setRecord(online);
            setActiveRakhi(id);
          } else {
            setRecord(null);
          }

          setLoading(false);
        }
      } catch (err) {
        console.error("Could not load Rakhi:", err);

        if (!cancelled) {
          setRecord(null);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const choose = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setError("");
      const data = await readPhoto(file);
      setPhoto(data);
    } catch {
      setError("We couldn't read that photo. Please try another one.");
    }
  };

  const submit = async () => {
    if (submitting) return;

    setError("");

    if (!name.trim() || !location.trim() || !photo) {
      setError("Please add your name, location, and photo.");
      return;
    }

    if (!record) {
      setError("We couldn't find this Rakhi. Please reopen the link.");
      return;
    }

    try {
      setSubmitting(true);

      const updatedRecord: RakhiRecord = {
        ...record,
        brother: {
          name: name.trim(),
          location: location.trim(),
          photo,
        },
      };

      /*
       * Save the brother's details locally first.
       * This makes the journey page available immediately.
       */
      localStorage.setItem(
        `doorian-ton-paar:rakhi:${id}`,
        JSON.stringify(updatedRecord)
      );

      setActiveRakhi(id);

      /*
       * Also save the updated Rakhi online.
       */
      try {
        await fetch(`/api/rakhi/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecord),
        });
      } catch (onlineError) {
        console.error("Online save failed:", onlineError);
      }

      /*
       * Now move to the journey.
       */
      router.push("/rakhi/journey");
    } catch (err) {
      console.error("Could not start journey:", err);
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="relative min-h-screen bg-[#FFFDF8] text-[#40364A]">
        <GlitterBackground />

        <section className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
          <p className="text-sm text-[#756C78]">
            Preparing your Rakhi...
          </p>
        </section>
      </main>
    );
  }

  if (!record) {
    return (
      <main className="relative min-h-screen bg-[#FFFDF8] text-[#40364A]">
        <GlitterBackground />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <Heart className="text-[#8068A8]" />

          <h1 className="mt-6 font-serif text-4xl">
            This Rakhi is waiting to travel.
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#756C78]">
            We couldn't find this Rakhi. Please make sure you opened the
            complete link that was shared with you.
          </p>

          <RakhiButton
            onClick={() => router.push("/")}
            className="mt-8"
          >
            GO HOME
          </RakhiButton>
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
            A Rakhi is travelling across the distance, carrying a little
            love especially for you.
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
              disabled={submitting}
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
                disabled={submitting}
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
          {submitting ? "STARTING..." : "START THE JOURNEY"}
        </RakhiButton>

        <p className="mt-7 text-center text-[9px] uppercase tracking-[.2em] text-[#AAA2AC]">
          <Sparkles className="inline" size={11} /> Across every mile,
          still connected
        </p>
      </section>
    </main>
  );
}