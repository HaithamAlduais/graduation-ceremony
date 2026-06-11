"use client";

import Image from "next/image";

const partners = [
  { name: "جامعة الملك سعود", logo: "/logos/ksu-master.png" },
  { name: "كلية علوم الحاسب", logo: "/logos/ksu-shield.png" },
  { name: "جامعة الملك سعود", logo: "/logos/ksu-master.png" },
  { name: "كلية علوم الحاسب", logo: "/logos/ksu-shield.png" },
  { name: "جامعة الملك سعود", logo: "/logos/ksu-master.png" },
  { name: "كلية علوم الحاسب", logo: "/logos/ksu-shield.png" },
  { name: "جامعة الملك سعود", logo: "/logos/ksu-master.png" },
  { name: "كلية علوم الحاسب", logo: "/logos/ksu-shield.png" },
];

export default function Partners() {
  return (
    <section className="py-12 bg-ksu-gray border-y border-ksu-green/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-sm text-ksu-navy/60 font-medium">
          برعاية
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee items-center gap-16 px-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity bg-white rounded-xl px-4 py-2 shadow-sm"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <span className="text-ksu-navy font-medium whitespace-nowrap text-sm">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex animate-marquee items-center gap-16 px-8" aria-hidden="true">
          {partners.map((partner, index) => (
            <div
              key={`dup-${index}`}
              className="flex items-center gap-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity bg-white rounded-xl px-4 py-2 shadow-sm"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <span className="text-ksu-navy font-medium whitespace-nowrap text-sm">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
