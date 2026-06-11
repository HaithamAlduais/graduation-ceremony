"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ksu-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 border-b border-white/10 pb-8 text-center md:flex-row md:text-right">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
            <Image
              src="/logos/ksu-shield-white.png"
              alt="شعار جامعة الملك سعود"
              width={31}
              height={48}
              className="h-12 w-auto"
              style={{ width: "auto" }}
            />
            <div>
              <h3 className="font-display text-lg font-bold">
                حفل تخرج كلية علوم الحاسب والمعلومات
              </h3>
              <p className="mt-1 text-sm text-white/55">
                جامعة الملك سعود
              </p>
            </div>
          </div>

          <a
            href="https://bufferco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] py-2 pl-5 pr-2 transition-colors hover:border-ksu-gold/40 hover:bg-white/[0.1]"
          >
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/logos/bufferco.svg"
                alt="Bufferco"
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-left text-sm leading-tight text-white/70 group-hover:text-white">
              <span className="block text-xs uppercase tracking-[0.18em] text-white/40">
                Made by
              </span>
              <span className="font-semibold text-ksu-gold">bufferco.com</span>
            </span>
          </a>
        </div>

        <div className="pt-6 text-center text-sm text-white/40 md:text-right">
          حفل تخرج كلية علوم الحاسب والمعلومات - 2026
        </div>
      </div>
    </footer>
  );
}
