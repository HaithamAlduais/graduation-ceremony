"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "تفاصيل الحفل" },
  { href: "#gallery", label: "معرض الصور" },
];

const registerUrl =
  "https://bufferco.com/events/6EFEBwWnrAvCsQ/register?token=eyJldmVudElkIjoiNkVGRUJ3V25yQXZDc1EiLCJzbHVnIjoiZ3JhZHVhdGlvbi1jZXJlbW9ueSIsImlhdCI6MTc4MTE5MDY2NSwiZXhwIjoxODEyNzI2NjY1LCJqdGkiOiI1MTRhZDNmOC05MTIzLTRlMTAtYjJiYy01YzllZDc5MDFjYTAifQ.kyaMbqkPkwobxQDrOGG6TxZ0DNRJZkckv-ApBBBv7qY";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ksu-green/10 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <a href="#" className="flex shrink-0 items-center gap-2">
            <Image
              src={
                scrolled
                  ? "/logos/ceremony-logo-gold.png"
                  : "/logos/ceremony-logo-white-gold.png"
              }
              alt="شعار حفل التخرج"
              width={156}
              height={100}
              className="h-12 w-auto md:h-14"
              style={{ width: "auto" }}
              priority
            />
            <span
              className={`hidden text-sm font-bold transition-colors sm:block md:text-base ${
                scrolled ? "text-ksu-navy" : "text-white"
              }`}
            >
              حفل التخرج
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-ksu-green ${
                  scrolled ? "text-ksu-navy/80" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              asChild
              className="rounded-full bg-ksu-gold px-6 text-white hover:bg-ksu-gold/90"
            >
              <a href={registerUrl} data-buffer-register="true">
                احجز مقعدك
              </a>
            </Button>
          </div>

          <button
            className={`rounded-full border p-2 backdrop-blur transition-colors md:hidden ${
              scrolled
                ? "border-ksu-navy/10 bg-white/70"
                : "border-white/15 bg-white/10"
            }`}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="فتح القائمة"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X
                className={`h-5 w-5 ${
                  scrolled ? "text-ksu-navy" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`h-5 w-5 ${
                  scrolled ? "text-ksu-navy" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-ksu-green/10 bg-white/96 shadow-xl backdrop-blur-xl md:hidden">
          <div className="space-y-2 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-2xl px-4 py-3 text-sm font-bold text-ksu-navy transition-colors hover:bg-ksu-green/10 hover:text-ksu-green"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="mt-3 w-full rounded-full bg-ksu-gold py-6 font-bold text-white hover:bg-ksu-gold/90">
              <a href={registerUrl} data-buffer-register="true">
                احجز مقعدك
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
