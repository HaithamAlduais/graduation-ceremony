"use client";

import { motion } from "framer-motion";
import { Users, Award, BookOpen, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "3,500+",
    label: "خريج وخريجة",
    description: "منذ تأسيس الكلية",
  },
  {
    icon: Award,
    value: "45+",
    label: "دفعة تخرج",
    description: "على مدار السنوات",
  },
  {
    icon: BookOpen,
    value: "12",
    label: "برنامج أكاديمي",
    description: "بكالوريوس وماجستير ودكتوراه",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "نسبة التوظيف",
    description: "خلال سنة من التخرج",
  },
];

export default function PreviousCeremonies() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-ksu-gray to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ksu-navy mb-4 font-display">
            إنجازات الكلية
          </h2>
          <p className="text-lg text-ksu-navy/60 max-w-2xl mx-auto">
            أرقام تتحدث عن تاريخ كلية علوم الحاسب والمعلومات
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl p-8 text-center shadow-sm border border-ksu-green/10 hover:shadow-lg hover:border-ksu-green/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-ksu-green/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-ksu-green" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-ksu-green mb-1 font-display">
                {stat.value}
              </p>
              <p className="text-lg font-semibold text-ksu-navy mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-ksu-navy/50">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Previous cohorts preview */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              year: "2025",
              title: "دفعة 44",
              desc: "تخرج 480 خريج وخريجة في تخصصات متنوعة",
            },
            {
              year: "2024",
              title: "دفعة 43",
              desc: "تخرج 520 خريج وخريجة بمعدلات امتياز",
            },
            {
              year: "2023",
              title: "دفعة 42",
              desc: "تخرج 490 خريج وخريجة في برامج الكلية",
            },
          ].map((cohort, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className="bg-ksu-navy rounded-2xl p-6 text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-ksu-green/20 rounded-full blur-2xl group-hover:bg-ksu-green/30 transition-colors" />
              <div className="relative z-10">
                <span className="text-ksu-gold font-bold text-sm">
                  {cohort.year}
                </span>
                <h3 className="text-xl font-bold mt-1 mb-2 font-display">
                  {cohort.title}
                </h3>
                <p className="text-white/70 text-sm">{cohort.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
