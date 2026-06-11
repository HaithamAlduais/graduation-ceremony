"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Building2, Clock } from "lucide-react";

const details = [
  {
    icon: MapPin,
    title: "المكان",
    description: "قاعة حمد الجاسر",
    subtext: "جامعة الملك سعود - الرياض",
    color: "bg-ksu-green/10 text-ksu-green",
  },
  {
    icon: Calendar,
    title: "التاريخ",
    description: "29 يونيو 2026",
    subtext: "يوم الاثنين",
    color: "bg-ksu-gold/10 text-ksu-gold",
  },
  {
    icon: Building2,
    title: "الكلية",
    description: "علوم الحاسب والمعلومات",
    subtext: "جامعة الملك سعود",
    color: "bg-ksu-dark-green/10 text-ksu-dark-green",
  },
  {
    icon: Clock,
    title: "الوقت",
    description: "6:00 مساءً",
    subtext: "الوصول من 5:00 مساءً",
    color: "bg-ksu-navy/10 text-ksu-navy",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ksu-navy mb-4 font-display">
            تفاصيل الحفل
          </h2>
          <p className="text-lg text-ksu-navy/60 max-w-2xl mx-auto">
            كل ما تحتاج معرفته عن حفل تخرج كلية علوم الحاسب والمعلومات
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((detail, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-ksu-green/10 hover:border-ksu-green/30"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-14 h-14 rounded-2xl ${detail.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <detail.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-ksu-navy mb-1">
                  {detail.title}
                </h3>
                <p className="text-ksu-green font-semibold text-base">
                  {detail.description}
                </p>
                <p className="text-sm text-ksu-navy/50 mt-1">{detail.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-ksu-green to-ksu-dark-green rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-3 font-display">
              عن الكلية
            </h3>
            <p className="text-white/80 leading-relaxed">
              كلية علوم الحاسب والمعلومات بجامعة الملك سعود من أعرق الكليات
              المتخصصة في مجال التقنية بالمملكة. تخرجت منها أجيال من المبدعين
              والمبتكرين الذين أسهموا في بناء مستقبل رقمي مزدهر للوطن.
            </p>
          </div>
          <div className="bg-ksu-gray rounded-2xl p-8 border border-ksu-green/10">
            <h3 className="text-2xl font-bold text-ksu-navy mb-3 font-display">
              أجندة الحفل
            </h3>
            <ul className="space-y-3 text-ksu-navy/80">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-ksu-green rounded-full shrink-0" />
                استقبال الخريجين والضيوف
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-ksu-gold rounded-full shrink-0" />
                القرآن الكريم والنشيد الوطني
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-ksu-green rounded-full shrink-0" />
                كلمة سعادة العميد
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-ksu-gold rounded-full shrink-0" />
                تكريم الخريجين والخريجات
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-ksu-green rounded-full shrink-0" />
                التقاط الصور التذكارية
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
