"use client";

import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const galleryImages = [
  {
    src: "/images/grad-1.jpg",
    alt: "حفل تخرج سابق - لحظات التكريم",
    category: "all",
  },
  {
    src: "/images/grad-2.jpg",
    alt: "حفل تخرج سابق - الخريجون",
    category: "all",
  },
  {
    src: "/images/grad-3.jpg",
    alt: "كلية علوم الحاسب والمعلومات",
    category: "all",
  },
  {
    src: "/images/grad-4.jpg",
    alt: "حفل تخرج سابق - الاحتفال",
    category: "all",
  },
  {
    src: "/images/grad-5.jpg",
    alt: "حفل تخرج سابق - لحظات فرح",
    category: "all",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-ksu-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ksu-navy mb-4 font-display">
            معرض الصور
          </h2>
          <p className="text-lg text-ksu-navy/60 max-w-2xl mx-auto">
            لحظات لا تُنسى من حفلات التخرج السابقة
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mx-auto mb-8 flex justify-center">
            <TabsTrigger value="all">جميع الصور</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${
                    index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ksu-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 right-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-medium text-sm">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
