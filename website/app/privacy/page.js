import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Privacy Policy | শায়খের বয়ান",
  description: "Privacy and Data Protection at Khanqaye Yadgare Hakimul Ummat.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-fade-up">
      <ScrollReveal>
        <div className="bg-[#1f4e3d] text-[#fcfaf7] p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4a962] rounded-full opacity-20 blur-3xl -mr-24 -mt-24"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10">Privacy Policy</h1>
          <p className="text-[#d4c398] text-xl md:text-2xl font-medium relative z-10 leading-relaxed">
            Framing Data Privacy as an **Amanah** (Sacred Trust) 
            in the service of **Sadqaye Jariya**.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-12 text-[#2c3e30] leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#1f4e3d] border-l-4 border-[#c4a962] pl-4">1. Our Commitment (Amanah)</h2>
          <p className="text-lg">
            At <strong>Khanqaye Yadgare Hakimul Ummat</strong>, we consider your privacy a sacred trust (Amanah). Our website is designed as a platform for <strong>Sadqaye Jariya</strong> (on-going charity), dedicated to spreading spiritual wisdom and the teachings of Islam without commercial interest.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#1f4e3d] border-l-4 border-[#c4a962] pl-4">2. Data Collection</h2>
          <p className="text-lg">
            We do not require any personal registration, login, or account creation to access our Bayans, Fatwas, or Kitabs. We do not track individuals or use cookies to profile your personal behavior. Any technical logs required for website performance are treated as temporary and are never sold or shared.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#1f4e3d] border-l-4 border-[#c4a962] pl-4">3. Content & Sharing (Islamic Free Share)</h2>
          <p className="text-lg">
            Our content is provided for the sake of Allah. We encourage the sharing of these spiritual resources (Malfuzat, Bayans) for the purpose of Dawah and self-rectification. All we ask is that the content is shared in its original, unedited form to maintain the integrity of the teachings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#1f4e3d] border-l-4 border-[#c4a962] pl-4">4. Support & Transparency</h2>
          <p className="text-lg">
            This platform is maintained as a voluntary effort. If you have any concerns regarding how your interaction with this site is handled, or if you find any discrepancies, please reach out directly via the support links provided in our footer.
          </p>
        </section>

        <section className="bg-[#fcfaf7] p-8 rounded-3xl border border-[#e8dfce] italic text-[#708474]">
          <p>
            "O you who have believed, do not betray Allah and the Messenger or betray your trusts while you know [the consequence]." — Surah Al-Anfal [8:27]
          </p>
        </section>

        <div className="text-center pt-8">
          <p className="text-sm font-bold text-[#8c7435]">Last Updated: Ramadan 1447 / March 2026</p>
        </div>
      </div>
    </div>
  );
}
