import type { Metadata } from "next";
import { Cinzel, Karla } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "İBONUN YERİ MANGAL EVİ | Ateşin Lezzetle Buluştuğu Yer",
  description:
    "Ustasının elinden çıkan gerçek mangal lezzeti. İBONUN YERİ MANGAL EVİ'nde tavuk, kanat ve köfte keyfi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${karla.variable}`}>
      <body>{children}</body>
    </html>
  );
}
