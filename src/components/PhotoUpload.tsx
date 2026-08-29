"use client";

import { Camera, Upload } from "lucide-react";
import { ChangeEvent } from "react";

export default function PhotoUpload({ value, onChange, label = "Your photo" }: { value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; label?: string }) {
  return <div><label className="mb-2 block px-1 text-xs font-medium text-[#5C4B73]">{label}</label><label className="block cursor-pointer"><input type="file" accept="image/*" onChange={onChange} className="hidden" />{value ? <div className="relative overflow-hidden rounded-[24px] border border-[#D9B77A]/30 bg-white/60 p-2"><img src={value} alt="Photo preview" className="h-56 w-full rounded-[18px] object-cover" /><span className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs text-[#5C4B73] shadow-lg"><Camera size={14} />Change photo</span></div> : <div className="flex h-48 flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D9B77A]/50 bg-white/45 text-center"><span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2C1A8]/25"><Upload size={19} className="text-[#8068A8]" /></span><p className="text-sm font-medium text-[#5C4B73]">Add your photo</p><p className="mt-1 px-6 text-xs leading-5 text-[#9B929D]">It will become part of your final Rakhi memory.</p></div>}</label></div>;
}
