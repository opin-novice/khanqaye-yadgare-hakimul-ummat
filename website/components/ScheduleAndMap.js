"use client";

import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

export default function ScheduleAndMap() {
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-4">
      {/* Collapsible Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white border border-[#e8dfce] rounded-[2rem] p-6 md:p-8 shadow-sm hover:border-[#c4a962] hover:bg-[#fcfaf7] transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f3eee1] flex items-center justify-center group-hover:bg-[#1f4e3d] transition-colors">
            <MapPin className="w-6 h-6 text-[#1f4e3d] group-hover:text-[#fcfaf7] transition-colors" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1f4e3d]">শিডিউল এবং মানচিত্র</h2>
        </div>
        <ChevronDown className={`w-6 h-6 text-[#1f4e3d] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Expandable Content */}
      {open && (
        <div className="bg-white border border-[#e8dfce] rounded-[2rem] p-6 md:p-10 shadow-md space-y-8 animate-fade-in">
          {/* Schedule Info */}
          <div className="bg-[#f3eee1] border border-[#e8dfce] rounded-2xl p-6 md:p-8">
            <p className="text-lg md:text-xl font-bold text-[#1f4e3d] leading-relaxed">
              📅 মাসিক ইজতিমা প্রতি মাসের প্রথম বৃহস্পতিবার দুপুর ২.৩০ মিনিট হতে
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-2xl overflow-hidden border border-[#e8dfce] shadow-sm">
            <iframe
              title="Jamia Yunusia Madrasa Location"
              src="https://maps.google.com/maps?q=Jamia+Yunusia+Madrasa+Brahmanbaria&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <a
            href="https://maps.app.goo.gl/kn98iSfrqWM3XnMH9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1f4e3d] text-[#fcfaf7] font-bold px-6 py-3 rounded-xl hover:bg-[#163a2d] transition-colors shadow-md"
          >
            <MapPin className="w-4 h-4" />
            Google Maps-এ দেখুন →
          </a>
        </div>
      )}
    </section>
  );
}
