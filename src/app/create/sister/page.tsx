"use client";

import { ChangeEvent, useState } from "react";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import GlitterBackground from "../../../components/GlitterBackground";
import PhotoUpload from "../../../components/PhotoUpload";
import RakhiButton from "../../../components/RakhiButton";
import { readPhoto } from "../../../lib/rakhi";

export default function SisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const choose = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setError("");

      const photoData = await readPhoto(file);

      setPhoto(photoData);
    } catch (error) {
      console.error("Photo error:", error);
      setError("We couldn't read that photo. Please try another photo.");
    }
  };

  const submit = () => {
    setError("");

    if (
      !name.trim() ||
      !location.trim() ||
      !message.trim() ||
      !photo
    ) {
      setError("Please complete every part of your Rakhi.");
      return;
    }

    try {
      const draft = {
        name: name.trim(),
        location: location.trim(),
        message: message.trim(),
        photo,
      };

      sessionStorage.setItem(
        "doorian-ton-paar:draft",
        JSON.stringify(draft)
      );

      router.push("/create/sister/send");
    } catch (error) {
      console.error("Could not save Rakhi draft:", error);

      setError(
        "The photo is too large for this device. Please choose a smaller photo."
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]">
      <GlitterBackground />

      <section className="relative z-10 mx-auto min-h-screen max-w-md px-5 py-8">

        <button
          onClick={() => router.back()}
          className="text-sm text-[#8068A8]"
          type="button"
        >
          ← Back
        </button>

        <header className="mt-9 text-center">
          <Heart className="mx-auto text-[#8068A8]" />

          <p className="mt-5 text-[10px] uppercase tracking-[.3em] text-[#8068A8]">
            Sister side
          </p>

          <h1 className="mt-3 font-serif text-4xl">
            Send a Rakhi
            <span className="block italic text-[#8068A8]">
              across the distance
            </span>
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#756C78]">
            Tell us a little about yourself before your Rakhi begins its
            journey.
          </p>
        </header>

        <div className="mt-9 space-y-5">

          <Field
            label="Your name"
            value={name}
            change={setName}
            placeholder="Your beautiful name"
          />

          <label className="block">
            <span className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">
              Where are you?
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

          <label className="block">
            <span className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">
              A personal message for your brother
            </span>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Write something from your heart..."
              className="field resize-none"
            />
          </label>

          <PhotoUpload
            value={photo}
            onChange={choose}
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
          CONTINUE
        </RakhiButton>

        <p className="mt-7 text-center text-[9px] uppercase tracking-[.2em] text-[#AAA2AC]">
          <Sparkles className="inline" size={11} /> Sending love across the
          distance
        </p>

      </section>
    </main>
  );
}

function Field({
  label,
  value,
  change,
  placeholder,
}: {
  label: string;
  value: string;
  change: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">
        {label}
      </span>

      <input
        value={value}
        onChange={(e) => change(e.target.value)}
        placeholder={placeholder}
        className="field"
      />
    </label>
  );
}