"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "متى وأين سيقام حفل التخرج؟",
    answer:
      "سيقام حفل التخرج يوم الاثنين 29 يونيو 2026 في قاعة حمد الجاسر بجامعة الملك سعود، ويبدأ الحفل الساعة 6:00 مساءً. يُفضل الوصول قبل موعد الحفل بساعة للتسجيل واستلام البطاقات.",
  },
  {
    question: "من يحق له حضور الحفل؟",
    answer:
      "يحق لجميع خريجي وخريجات كلية علوم الحاسب والمعلومات للدفعة الحالية حضور الحفل. كما يمكن لكل خريج إحضار عدد محدد من الضيوف (عائلته) بعد التسجيل المسبق.",
  },
  {
    question: "كيف يمكنني التسجيل للحضور؟",
    answer:
      "يمكنك التسجيل للحضور من خلال الضغط على زر 'احجز مقعدك' في أعلى الصفحة أو أسفلها. ستحتاج إلى إدخال رقمك الجامعي والبريد الإلكتروني لإتمام التسجيل.",
  },
  {
    question: "ما هي الزي الرسمي للحفل؟",
    answer:
      "الزي الرسمي للخريجين هو الزي الأكاديمي (العباءة) الذي سيتم توزيعه قبل الحفل. أما الضيوف فيُفضل ارتداء الزي الرسمي أو الزي التقليدي.",
  },
  {
    question: "هل سيتم توفير موقف للسيارات؟",
    answer:
      "نعم، سيتم توفير مواقف مخصصة للخريجين والضيوف بالقرب من قاعة حمد الجاسر. سيتم إرسال تفاصيل الموقف بعد إتمام عملية التسجيل.",
  },
  {
    question: "هل سيتم بث الحفل أونلاين؟",
    answer:
      "نعم، سيتم بث الحفل مباشرة عبر قناة الكلية على اليوتيوب. سيتم مشاركة رابط البث مع جميع المسجلين قبل موعد الحفل بيوم واحد.",
  },
  {
    question: "ماذا يجب أن أحضر معي؟",
    answer:
      "يُنصح بإحضار بطاقة التسجيل (التي ستُرسل إلكترونياً)، وبطاقة الهوية الوطنية، والهاتف المحمول لاستلام التنبيهات. كما يُنصح بإحضار كاميرا للتقاط الصور التذكارية.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ksu-navy mb-4 font-display">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-ksu-navy/60">
            إجابات على أهم الأسئلة المتعلقة بحفل التخرج
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-right text-ksu-navy hover:text-ksu-green text-base md:text-lg font-semibold py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-ksu-navy/70 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
