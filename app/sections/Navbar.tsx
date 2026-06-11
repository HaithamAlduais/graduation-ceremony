"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "تفاصيل الحفل" },
  { href: "#gallery", label: "معرض الصور" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-ksu-green/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Right side in RTL */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logos/ksu-shield.png"
              alt="شعار جامعة الملك سعود"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span
              className={`hidden sm:block font-bold text-sm md:text-base transition-colors ${
                scrolled ? "text-ksu-navy" : "text-white"
              }`}
            >
              حفل التخرج
            </span>
          </a>

          {/* Desktop Nav Links - Center */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
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

          {/* CTA - Left side in RTL */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-ksu-gold hover:bg-ksu-gold/90 text-white rounded-full px-6"
            >
              <a
                href="http://localhost:5173/events/6EFEBwWnrAvCsQ/register?token=eyJldmVudElkIjoiNkVGRUJ3V25yQXZDc1EiLCJzbHVnIjoiZ3JhZHVhdGlvbi1jZXJlbW9ueSIsImlhdCI6MTc4MTE2NTI0OSwiZXhwIjoxODEyNzAxMjQ5LCJqdGkiOiJhZGJiMGFkYS0wMDA1LTQxZDQtYmQxMi0yOTdmNDE2NzMzMWYifQ.UTsuXBa1Ip7p1fKiZM4XQKibLFLEKX0W0hvfyaeQ8uI"
                data-buffer-register="true"
              >احجز مقعدك</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={scrolled ? "text-ksu-navy" : "text-white"} />
            ) : (
              <Menu className={scrolled ? "text-ksu-navy" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-ksu-green/10 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-ksu-navy hover:text-ksu-green font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full bg-ksu-gold hover:bg-ksu-gold/90 text-white rounded-full mt-2">
              <a
                href="http://localhost:5173/events/6EFEBwWnrAvCsQ/register?token=eyJldmVudElkIjoiNkVGRUJ3V25yQXZDc1EiLCJzbHVnIjoiZ3JhZHVhdGlvbi1jZXJlbW9ueSIsImlhdCI6MTc4MTE2NTI0OSwiZXhwIjoxODEyNzAxMjQ5LCJqdGkiOiJhZGJiMGFkYS0wMDA1LTQxZDQtYmQxMi0yOTdmNDE2NzMzMWYifQ.UTsuXBa1Ip7p1fKiZM4XQKibLFLEKX0W0hvfyaeQ8uI"
                data-buffer-register="true"
              >احجز مقعدك</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
