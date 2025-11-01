"use client";

import React from "react";

type LayananItem = {
  label: string;
  href?: string;
  imgSrc: string;
  bgClass: string; // e.g., "bg-yellow-400"
};

const items: LayananItem[] = [
  // Existing 5 items
  { label: "PPDB Online", imgSrc: "/images/ppdb.png", bgClass: "bg-yellow-200", href: "#" },
  { label: "Info Publik", imgSrc: "/images/info-publik.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "SuREK", imgSrc: "/images/surek.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "Survey Kepuasan Masyarakat", imgSrc: "/images/survey.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "SPJ Online", imgSrc: "/images/spj.png", bgClass: "bg-yellow-200", href: "#" },
  // New 5 items (icons reuse existing assets to avoid broken images)
  { label: "Perizinan Online", imgSrc: "/images/info-publik.png", bgClass: "bg-yellow-200", href: "#" },
  { label: "Pajak Daerah", imgSrc: "/images/survey.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "Layanan Kesehatan", imgSrc: "/images/info-publik.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "Bantuan Sosial", imgSrc: "/images/survey.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "Layanan Aduan", imgSrc: "/images/info-publik.png", bgClass: "bg-yellow-200", href: "#" },
  // Additional 10 items
  { label: "Kependudukan (Dukcapil)", imgSrc: "/images/ppdb.png", bgClass: "bg-yellow-200", href: "#" },
  { label: "Perpajakan Kendaraan", imgSrc: "/images/survey.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "E-Procurement", imgSrc: "/images/info-publik.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "UMKM & IKM", imgSrc: "/images/spj.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "Beasiswa Pendidikan", imgSrc: "/images/ppdb.png", bgClass: "bg-yellow-200", href: "#" },
  { label: "Transportasi Publik", imgSrc: "/images/info-publik.png", bgClass: "bg-yellow-200", href: "#" },
  { label: "Pariwisata", imgSrc: "/images/survey.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "Pertanian & Pangan", imgSrc: "/images/spj.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "Lingkungan Hidup", imgSrc: "/images/info-publik.png", bgClass: "bg-yellow-400", href: "#" },
  { label: "Pelaporan Infrastruktur", imgSrc: "/images/surek.png", bgClass: "bg-yellow-200", href: "#" },
];

export default function LayananCarousel() {
  const [paused, setPaused] = React.useState(false);
  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.src.includes("info-publik.png")) return; // avoid loop
    target.src = "/images/info-publik.png";
  };

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Layanan Masyarakat
      </h2>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Marquee wrapper: hover untuk pause */}
        <div
          className="marquee-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className="marquee"
            style={{
              animationPlayState: paused ? "paused" : "running",
              ["--duration" as any]: "30s",
            }}
          >
            {/* Konten 1 */}
            <div className="flex gap-8 px-2 pr-8">
              {items.map((it, i) => (
                <a
                  key={`${it.label}-${i}`}
                  href={it.href ?? "#"}
                  className={`flex flex-col items-center justify-center w-48 h-56 rounded-xl ${it.bgClass} hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md text-center px-3`}
                >
                  <img src={it.imgSrc} alt={it.label} className="h-16 mb-4" onError={onImgError} />
                  <span className="text-lg font-semibold text-gray-800 leading-snug">{it.label}</span>
                </a>
              ))}
            </div>

            {/* Konten 2 (duplikasi untuk loop mulus) */}
            <div className="flex gap-8 px-2 pr-8" aria-hidden>
              {items.map((it, i) => (
                <a
                  key={`dup-${it.label}-${i}`}
                  href={it.href ?? "#"}
                  className={`flex flex-col items-center justify-center w-48 h-56 rounded-xl ${it.bgClass} hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md text-center px-3`}
                >
                  <img src={it.imgSrc} alt="" className="h-16 mb-4" onError={onImgError} />
                  <span className="text-lg font-semibold text-gray-800 leading-snug">{it.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS khusus marquee */}
      <style jsx>{`
        .marquee-wrap { overflow: hidden; }
        .marquee {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee var(--duration, 30s) linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
