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
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1f4e3d]">শিডিউল এবং লোকেশন</h2>
        </div>
        <ChevronDown className={`w-6 h-6 text-[#1f4e3d] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="bg-white border border-[#e8dfce] rounded-[2rem] p-6 md:p-10 shadow-md space-y-8">
          {/* Schedule Info */}
          <div className="bg-[#f3eee1] border border-[#e8dfce] rounded-2xl p-6 md:p-8">
            <p className="text-lg md:text-xl font-bold text-[#1f4e3d] leading-relaxed">
              📅 মাসিক ইজতিমা প্রতি মাসের প্রথম বৃহস্পতিবার দুপুর ২.৩০ মিনিট হতে
            </p>
          </div>

          {/* Exact Google Maps Embed from user's pin */}
          <div className="rounded-2xl overflow-hidden border border-[#e8dfce] shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7500!2d91.112759!3d23.972181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDU4JzE5LjkiTiA5McKwMDYnNDUuOSJF!5e0!3m2!1sen!2sbd!4v1711100000000!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="খানকায়ে ইয়াদগারে হাকিমুল উম্মত — লোকেশন"
            />
          </div>

          <a
            href="https://maps.app.goo.gl/ziKvkhMp5SwQ1jKD9" 
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
