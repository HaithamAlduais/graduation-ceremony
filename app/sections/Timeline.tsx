"use client";

import { motion } from "framer-motion";
import { Clock, Users, Mic2, GraduationCap, Camera } from "lucide-react";

const timelineStages = [
  {
    time: "5:00 - 6:00 م",
    title: "الاستقبال والتسجيل",
    description: "استقبال الخريجين والضيوف وتسجيل الحضور",
    icon: Users,
    color: "bg-ksu-green",
  },
  {
    time: "6:00 - 6:15 م",
    title: "افتتاح الحفل",
    description: "القرآن الكريم والنشيد الوطني السعودي",
    icon: Clock,
    color: "bg-ksu-gold",
  },
  {
    time: "6:15 - 6:45 م",
    title: "الكلمة الرسمية",
    description: "كلمة سعادة عميد الكلية وكلمة ممثل الخريجين",
    icon: Mic2,
    color: "bg-ksu-green",
  },
  {
    time: "6:45 - 8:00 م",
    title: "تكريم الخريجين",
    description: "تسليم الشهادات وتكريم الخريجين والخريجات",
    icon: GraduationCap,
    color: "bg-ksu-gold",
  },
  {
    time: "8:00 - 9:00 م",
    title: "التقاط الصور",
    description: "جلسات تصوير تذكارية للخريجين مع ذويهم",
    icon: Camera,
    color: "bg-ksu-green",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ksu-navy mb-4 font-display">
            الجدول الزمني للحفل
          </h2>
          <p className="text-lg text-ksu-navy/60 max-w-2xl mx-auto">
            خطوات الحفل من البداية حتى الختام
          </p>
        </div>

        <div className="relative">
          {/* Desktop horizontal line */}
          <div className="hidden lg:block absolute top-12 right-0 left-0 h-1 bg-gradient-to-l from-ksu-green via-ksu-gold to-ksu-green rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {timelineStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                {/* Desktop dot on line */}
                <div className="hidden lg:flex absolute -top-1 right-1/2 translate-x-1/2 z-10">
                  <div
                    className={`w-6 h-6 rounded-full ${stage.color} border-4 border-white shadow-lg`}
                  />
                </div>

                <div className="lg:pt-16 text-center">
                  <div
                    className={`w-14 h-14 rounded-2xl ${stage.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <stage.icon className="w-7 h-7 text-white" />
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3 ${stage.color}`}
                  >
                    {stage.time}
                  </span>

                  <h3 className="text-lg font-bold text-ksu-navy mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-ksu-navy/60 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
