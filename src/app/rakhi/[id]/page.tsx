"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import GlitterBackground from "../../../components/GlitterBackground";
import PhotoUpload from "../../../components/PhotoUpload";
import RakhiButton from "../../../components/RakhiButton";
import { getRakhi, readPhoto, getRakhiOnline, saveRakhi, setActiveRakhi } from "../../../lib/rakhi";

export default function ReceivePage()
 { const {id}=useParams<{id:string}>(); 
 const router=useRouter();
  const [exists,setExists]=useState<boolean>();
  const [name,setName]=useState("");
  const [location,setLocation]=useState("");
  const [photo,setPhoto]=useState("");
  const [error,setError]=useState("");
 useEffect(() => {
  const loadRakhi = async () => {
    const localRecord = getRakhi(id);

    if (localRecord) {
      setExists(true);
      setActiveRakhi(id);
      return;
    }

    const onlineRecord = await getRakhiOnline(id);

    setExists(Boolean(onlineRecord));
    setActiveRakhi(id);
  };

  loadRakhi();
}, [id]);
  const choose=async(e:ChangeEvent<HTMLInputElement>)=>{const file=e.target.files?.[0];if(file)setPhoto(await readPhoto(file));}; 
  const submit=()=>{if(!name.trim()||!location.trim()||!photo){setError("Please add your name, location, and photo.");return;}
  const record=getRakhi(id);if(!record)return;saveRakhi({...record,brother:{name,location,photo}});
  router.push("/rakhi/journey");}; if(exists===undefined)return null; if(!exists)return 
  <main className="relative min-h-screen bg-[#FFFDF8] text-[#40364A]"><GlitterBackground/>
  <section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center"><Heart className="text-[#8068A8]"/>
  <h1 className="mt-6 font-serif text-4xl">Your Rakhi is waiting for you.</h1>
  <p className="mt-4 text-sm leading-6 text-[#756C78]">Your Rakhi is ready. Please tap continue to begin your journey.</p>
<RakhiButton
  onClick={() => window.location.reload()}
  className="mt-8"
>
  CONTINUE
</RakhiButton>
</section></main>; return <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]"><GlitterBackground/><section className="relative z-10 mx-auto min-h-screen max-w-md px-5 py-10"><header className="text-center">
    <Heart className="mx-auto text-[#8068A8]" fill="currentColor"/><p className="mt-6 text-[10px] uppercase tracking-[.3em] text-[#8068A8]">A Rakhi has arrived</p><h1 className="mt-3 font-serif text-5xl">Happy Rakhi <span className="text-[#8068A8]">❤️</span></h1><p className="mt-5 text-sm leading-7 text-[#756C78]">A Rakhi is travelling across the distance, carrying a little love especially for you.</p></header><div className="glass mt-8 rounded-[28px] p-6 text-center"><p className="font-serif text-xl">Before it reaches you, tell us where it should go.</p></div><div className="mt-7 space-y-5"><label className="block"><span className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">Your name</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="field"/></label><label className="block"><span className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">Your current city</span><span className="relative block"><MapPin size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D9B77A]"/><input value={location} onChange={e=>setLocation(e.target.value)} placeholder="City, State / Country" className="field pl-11"/></span></label><PhotoUpload value={photo} onChange={choose} label="Your photo"/></div>{error&&<p className="mt-4 text-center text-sm text-[#a85f76]">{error}</p>}<RakhiButton onClick={submit} className="mt-7">START THE JOURNEY</RakhiButton><p className="mt-7 text-center text-[9px] uppercase tracking-[.2em] text-[#AAA2AC]"><Sparkles className="inline" size={11}/> Across every mile, still connected</p></section></main>; }
