"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "تفاصيل الحفل", href: "#about" },
  { label: "معرض الصور", href: "#gallery" },
];

const socialLinks = [
  { label: "تويتر", href: "https://twitter.com/KSU" },
  { label: "إنستغرام", href: "https://instagram.com/KSU" },
  { label: "يوتيوب", href: "https://youtube.com/KSU" },
  { label: "لينكدإن", href: "https://linkedin.com/school/KSU" },
];

export default function Footer() {
  return (
    <footer className="bg-ksu-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logos/ksu-shield-white.png"
                alt="شعار جامعة الملك سعود"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <div>
                <h3 className="font-bold text-lg font-display">
                  جامعة الملك سعود
                </h3>
                <p className="text-white/50 text-sm">
                  كلية علوم الحاسب والمعلومات
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              نحتفل معاً بإنجازات خريجي كلية علوم الحاسب والمعلومات، ونفتخر
              بمساهماتهم في بناء مستقبل رقمي مزدهر.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-ksu-gold transition-colors text-sm flex items-center gap-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-ksu-gold shrink-0 mt-0.5" />
                <span>
                  كلية علوم الحاسب والمعلومات
                  <br />
                  جامعة الملك سعود، الرياض
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-ksu-gold shrink-0" />
                <span>ccis@ksu.edu.sa</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-ksu-gold shrink-0" />
                <span dir="ltr">+966 11 469 0000</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-white mb-4">تابعنا</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-ksu-gold/20 rounded-full text-sm text-white/70 hover:text-ksu-gold transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-6">
              <Image
                src="/logos/ksu-master-white.png"
                alt="جامعة الملك سعود"
                width={160}
                height={60}
                className="h-14 w-auto object-contain opacity-50"
              />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>جميع الحقوق محفوظة © 2026 جامعة الملك سعود</p>
          <p>كلية علوم الحاسب والمعلومات - حفل التخرج</p>
        </div>
      </div>
    </footer>
  );
}
