import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { formatBengaliDate } from "@/lib/bengali";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";

export const revalidate = 60;

async function getMalfuzat(slug) {
  return await client.fetch(
    `*[_type == "malfuzat" && (slug.current == $slug || _id == $slug || _id == "drafts." + $slug)][0]`,
    { slug }
  );
}

export default async function MalfuzatDetailPage({ params }) {
  const { slug: urlSlug } = await params;
  const slug = decodeURIComponent(urlSlug);
  const malfuzat = await getMalfuzat(slug);

  if (!malfuzat) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-[#1f4e3d]">প্রবন্ধটি পাওয়া যায়নি</h1>
        <Link href="/malfuzat" className="mt-4 text-[#8c7435] hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> মালফুজাত তালিকায় ফিরে যান
        </Link>
      </div>
    );
  }

  const components = {
    block: {
      normal: ({ children }) => <p className="bangla mb-4">{children}</p>,
      h1: ({ children }) => <h1 className="header-title text-center text-3xl md:text-4xl font-bold mb-6">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 text-[#1a3a2a] border-b border-[#c9a84c]/30 pb-2">{children}</h2>,
      hukmHeading: ({ children }) => {
        // Extract the number if possible, or just render it nicely
        return (
          <h2 className="hukm-heading flex items-center gap-3">
            <span className="hukm-num">হুকুম</span>
            {children}
          </h2>
        );
      },
      sectionTitle: ({ children }) => (
        <h2 className="section-title">{children}</h2>
      ),
    },
    types: {
      arabic: ({ value }) => (
        <div className="arabic font-amiri">
          {value.text.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < value.text.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
      ),
      urduShair: ({ value }) => (
        <div className="urdu-shair font-urdu">
          {value.text.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < value.text.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
      ),
      farmaya: ({ value }) => (
        <div className="farmaya bangla">
          "{value.text}"
        </div>
      ),
      waquia: ({ value }) => (
        <div className="waquia-container my-8">
          <div className="waquia-title">{value.title}</div>
          <div className="bangla bg-white/50 p-4 rounded-b-lg border-x border-b border-[#c9a84c]/20">
            {value.text}
          </div>
        </div>
      ),
      islamicPhrase: ({ value }) => (
        <span className="subhanallah block">{value.text}</span>
      ),
      summaryList: ({ value }) => (
        <div className="section mt-12 bg-white/80 p-8 rounded-xl border border-[#c9a84c]/30">
          <h2 className="section-title">বয়ানের খুলাসা</h2>
          <ul className="summary-list space-y-4">
            {value.items.map((item, i) => (
              <li key={i} data-n={i + 1} className="relative pl-10 py-2 border-b border-dotted border-[#c9a84c]/30 last:border-0">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#2d5a3d] text-white rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-[#c9a84c]/20">
                  {i + 1}
                </span>
                <span className="bangla">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-[#1a3a2a]">{children}</strong>,
    },
  };

  return (
    <div className="malfuzat-detail-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .malfuzat-detail-wrapper {
          --cream: #f5f0e8;
          --parchment: #ede5d0;
          --deep-green: #1a3a2a;
          --mid-green: #2d5a3d;
          --gold: #b8962e;
          --gold-light: #d4af5a;
          --rust: #7a3b1e;
          --ink: #1c1209;
          --ink-soft: #2e2010;
          --border-gold: #c9a84c;
          --shadow: rgba(26,40,20,0.18);
        }

        .malfuzat-container {
          background-color: var(--cream);
          background-image: 
            radial-gradient(ellipse at 10% 20%, rgba(180,150,80,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 90% 80%, rgba(45,90,60,0.06) 0%, transparent 60%);
          min-height: 100vh;
          padding-bottom: 60px;
          color: var(--ink);
        }

        .site-header {
          background: var(--deep-green);
          background-image: linear-gradient(135deg, #0e2218 0%, #1a3a2a 50%, #0e2218 100%);
          padding: 60px 24px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 40px;
          border-radius: 0 0 40px 40px;
        }

        .site-header::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
        }

        .bismillah {
          font-family: var(--font-amiri), serif;
          font-size: clamp(1.6rem, 5vw, 2.6rem);
          color: var(--gold-light);
          direction: rtl;
          margin-bottom: 20px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }

        .header-title {
          font-size: clamp(1.5rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .section {
          background: #fff;
          border: 1px solid rgba(185,148,50,0.25);
          border-top: 3px solid var(--gold);
          padding: 40px;
          box-shadow: 0 4px 24px var(--shadow);
          margin-bottom: 32px;
          border-radius: 4px;
        }

        .hukm-heading {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--deep-green);
          border-left: 4px solid var(--gold);
          padding-left: 16px;
          margin-bottom: 24px;
          margin-top: 32px;
        }

        .hukm-num {
          background: var(--mid-green);
          color: #fff;
          font-size: 0.8rem;
          padding: 2px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--deep-green);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(185,148,50,0.3);
          margin-top: 40px;
        }

        .arabic {
          font-family: var(--font-amiri), serif;
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          direction: rtl;
          text-align: center;
          color: var(--rust);
          line-height: 2.5;
          background: linear-gradient(135deg, #fdf8ee, #f9f3e3);
          border: 1px solid rgba(185,148,50,0.3);
          border-radius: 8px;
          padding: 24px;
          margin: 32px 0;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
        }

        .urdu-shair {
          font-family: var(--font-noto-urdu), serif;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          direction: rtl;
          text-align: center;
          color: var(--mid-green);
          line-height: 3;
          background: linear-gradient(135deg, #f0f7f2, #eaf3ee);
          border-right: 5px solid var(--gold);
          padding: 24px;
          margin: 32px 0;
          font-style: italic;
          border-radius: 0 8px 8px 0;
        }

        .bangla {
          font-size: 1.15rem;
          line-height: 2.2;
          color: var(--ink-soft);
        }

        .farmaya {
          border-left: 4px solid var(--gold);
          background: rgba(185,148,50,0.08);
          padding: 20px 24px;
          margin: 24px 0;
          border-radius: 0 8px 8px 0;
          font-style: italic;
        }

        .waquia-title {
          display: inline-block;
          background: var(--deep-green);
          color: var(--gold-light);
          font-size: 0.95rem;
          font-weight: 600;
          padding: 6px 18px;
          border-radius: 4px 4px 0 0;
          letter-spacing: 0.05em;
        }

        .subhanallah {
          font-family: var(--font-amiri), serif;
          font-size: 1.4rem;
          color: var(--gold);
          direction: rtl;
          text-align: center;
          margin: 24px 0;
        }

        .back-nav {
          max-width: 900px;
          margin: 0 auto 20px;
          padding: 0 20px;
        }

        @media (max-width: 640px) {
          .section { padding: 24px 20px; }
          .site-header { padding: 40px 16px 30px; }
        }
      ` }} />

      <div className="malfuzat-container font-bengali">
        <header className="site-header">
          <div className="bismillah">بِسْمِ اللہِ الرَّحْمٰنِ الرَّحِیْم</div>
          <h1 className="header-title">{malfuzat.title}</h1>
          <div className="flex justify-center items-center gap-4 text-white/70 text-sm mt-4">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {malfuzat.date ? formatBengaliDate(malfuzat.date) : "মালফুজাত"}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <span>খানকায়ে ইয়াদগারে হাকিমুল উম্মত</span>
          </div>
        </header>

        <div className="back-nav">
          <Link href="/malfuzat" className="inline-flex items-center gap-2 text-[#8c7435] hover:text-[#1f4e3d] font-bold transition-colors group">
            <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-[#1f4e3d] group-hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            তালিকায় ফিরে যান
          </Link>
        </div>

        <main className="max-w-[900px] mx-auto px-4 sm:px-6">
          <article className="section">
            <div className="rich-text-content">
              <PortableText value={malfuzat.content} components={components} />
            </div>
          </article>

          <footer className="text-center mt-12 mb-8">
            <div className="subhanallah mb-4">سُبْحَانَ اللّٰه — اللّٰهُ أَكْبَر — اَلْحَمْدُ لِلّٰه</div>
            <p className="text-[#6b7c6e] text-sm max-w-md mx-auto italic">
              আল্লাহ তাআলা আমাদের এসকল মালফুজাত থেকে হেদায়েত লাভের তাওফিক দান করুন। আমিন।
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
