import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "حفل تخرج كلية علوم الحاسب والمعلومات - جامعة الملك سعود",
  description:
    "حفل تخرج كلية علوم الحاسب والمعلومات بجامعة الملك سعود - 29 يونيو 2026 - قاعة حمد الجاسر",
  keywords: [
    "جامعة الملك سعود",
    "كلية علوم الحاسب",
    "حفل تخرج",
    "KSU",
    "CCIS",
    "Graduation",
  ],
  openGraph: {
    title: "حفل تخرج كلية علوم الحاسب والمعلومات - جامعة الملك سعود",
    description:
      "حفل تخرج كلية علوم الحاسب والمعلومات بجامعة الملك سعود - 29 يونيو 2026 - قاعة حمد الجاسر",
    images: ["/logos/ceremony-logo-gold.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
