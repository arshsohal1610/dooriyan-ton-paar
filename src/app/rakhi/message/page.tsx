"use client";
import { Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import GlitterBackground from "../../../components/GlitterBackground";
import MessageReveal from "../../../components/MessageReveal";
import RakhiButton from "../../../components/RakhiButton";
import { getActiveRecord } from "../../../lib/rakhi";
export default function MessagePage(){const router=useRouter();const record=typeof window!=="undefined"?getActiveRecord():null;return <main className="relative min-h-screen overflow-hidden bg-[#FFFDF8] text-[#40364A]"><GlitterBackground/><section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center"><Heart size={35} className="text-[#8068A8]"/><p className="mt-8 text-[10px] uppercase tracking-[.3em] text-[#8068A8]">A message from someone who loves you</p><h1 className="mt-4 font-serif text-4xl">Some words <span className="block italic text-[#8068A8]">just for you...</span></h1><MessageReveal message={record?.sister.message??""} from={record?.sister.name??"your sister"}/><p className="mt-7 text-sm text-[#756C78]">There&apos;s one more little surprise...</p><RakhiButton onClick={()=>router.push("/rakhi/memory")} className="mt-5">SEE YOUR MEMORY</RakhiButton><Sparkles className="mt-8 text-[#D9B77A]" size={15}/></section></main>}
