"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

/* ------------------------------------------------------------------ */
/*  Veri                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Menü", href: "#menu" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "İletişim", href: "#iletisim" },
];

const TELEFON = "0542 429 99 32";
const TELEFON_TEL = "+905424299932";
const WHATSAPP = "https://wa.me/905424299932";
const INSTAGRAM = "https://www.instagram.com/ibonunyeri_mangal/";

type Boyut = {
  ad: string;
  fiyat: number;
};

type Urun = {
  ad: string;
  fiyat?: number;
  birim?: string;
  one?: boolean;
  boyutlar?: Boyut[];
};

type MenuKategorisi = {
  baslik: string;
  aciklama: string;
  urunler: Urun[];
};

const MENU: MenuKategorisi[] = [
  {
    baslik: "Ekmek Arası",
    aciklama: "Çeyrek veya 3 çeyrek, ocaktan sıcak.",
    urunler: [
      {
        ad: "Köfte",
        one: true,
        boyutlar: [
          { ad: "Çeyrek", fiyat: 180 },
          { ad: "3 Çeyrek", fiyat: 250 },
        ],
      },
      {
        ad: "Tavuk",
        boyutlar: [
          { ad: "Çeyrek", fiyat: 150 },
          { ad: "3 Çeyrek", fiyat: 220 },
        ],
      },
      {
        ad: "İncik",
        boyutlar: [
          { ad: "Çeyrek", fiyat: 150 },
          { ad: "3 Çeyrek", fiyat: 220 },
        ],
      },
    ],
  },
  {
    baslik: "Porsiyon",
    aciklama: "Tek başına, garnitürüyle.",
    urunler: [
      { ad: "Tavuk Şiş", fiyat: 150 },
      { ad: "Kokoreç", fiyat: 200, one: true },
    ],
  },
  {
    baslik: "Kiloluk Mangal",
    aciklama: "Ocaktan pişmiş, kilo hesabı.",
    urunler: [
      { ad: "Köfte", birim: "1 kg", fiyat: 1300, one: true },
      { ad: "Kanat", birim: "1 kg", fiyat: 550 },
      { ad: "Pirzola", birim: "1 kg", fiyat: 450 },
      { ad: "Kelebek", birim: "1 kg", fiyat: 400 },
    ],
  },
  {
    baslik: "Tost & Kumru",
    aciklama: "Izgarada, tereyağlı.",
    urunler: [
      { ad: "Kumru", fiyat: 120 },
      { ad: "Sucuklu Kaşarlı Tost", fiyat: 110 },
      { ad: "Kaşarlı Tost", fiyat: 90 },
    ],
  },
  {
    baslik: "İçecekler",
    aciklama: "Buzlu dolaptan.",
    urunler: [
      { ad: "Coca Cola", birim: "1 L", fiyat: 80 },
      { ad: "Coca Cola", birim: "330 ml", fiyat: 60 },
      { ad: "Fuse Tea", fiyat: 60 },
      { ad: "Cola Turka", birim: "330 ml", fiyat: 50 },
      { ad: "Doğanay Şalgam", birim: "200 ml · acılı/acısız", fiyat: 40 },
      { ad: "Sade Soda", fiyat: 30 },
      { ad: "Eker Ayran", birim: "170 ml", fiyat: 25 },
      { ad: "Su", fiyat: 20 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  İkonlar (emoji yerine inline SVG)                                  */
/* ------------------------------------------------------------------ */

type IkonProps = { className?: string };

function TelefonIkonu({ className }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.1A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

function KonumIkonu({ className }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function SaatIkonu({ className }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function WhatsAppIkonu({ className }: IkonProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.86 9.86 0 0 1-5.02-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.82 9.82 0 0 1-1.5-5.23c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.9a9.82 9.82 0 0 1 2.88 6.96c0 5.43-4.42 9.84-9.83 9.84Zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.49 1.9.82 2.38.83 3.24.7.52-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function InstagramIkonu({ className }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AlevIkonu({ className }: IkonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 3.48Z" />
      <path d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cizgi/70 bg-komur/55 backdrop-blur-xl">
      <div className="flex h-[72px] items-center justify-between gap-4 px-5 md:h-[82px] md:px-9 lg:h-[88px] lg:px-12">
        <a
          href="#"
          className="flex shrink-0 items-center"
          aria-label="İBONUN YERİ MANGAL EVİ — ana sayfa"
        >
          <Image
            src="/logo.png"
            alt="İBONUN YERİ MANGAL EVİ"
            width={442}
            height={106}
            unoptimized
            className="h-[34px] w-auto max-w-[min(58vw,220px)] object-contain object-left md:h-[42px] md:max-w-[260px] lg:h-[48px] lg:max-w-none"
            style={{ width: "auto" }}
          />
        </a>

        <nav
          aria-label="Ana menü"
          className="flex items-center gap-0.5 sm:gap-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative cursor-pointer rounded-md px-2.5 py-2 text-xs font-medium text-krem/85 transition-colors duration-200 hover:text-altin sm:px-4 sm:text-sm"
            >
              {link.label}
              <span className="absolute inset-x-2.5 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-alev to-transparent transition-transform duration-200 group-hover:scale-x-100 sm:inset-x-4" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/*  İlk kaydırmada video scroll ile senkron. Yazı yerinde kalır.       */
/*  Çevirme bitince döngü; yenilemeden scroll videoyu bir daha sürmez. */
/* ------------------------------------------------------------------ */

function Hero() {
  const izRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const donguRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const arayuzRef = useRef<HTMLDivElement>(null);
  const ipucuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const dongu = donguRef.current;
    const poster = posterRef.current;
    const iz = izRef.current;
    if (!video || !dongu || !iz) return;

    const dokunmatik =
      /iP(hone|od|ad)/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
      window.matchMedia("(pointer: coarse)").matches;

    const iosHazirla = (el: HTMLVideoElement) => {
      el.muted = true;
      el.defaultMuted = true;
      el.volume = 0;
      el.controls = false;
      el.playsInline = true;
      el.setAttribute("playsinline", "true");
      el.setAttribute("webkit-playsinline", "true");
      el.setAttribute("x-webkit-airplay", "deny");
    };
    iosHazirla(video);
    iosHazirla(dongu);
    dongu.hidden = true;
    dongu.loop = true;
    video.loop = false;
    video.pause();
    video.currentTime = 0;
    iz.style.height = "280svh";

    const oynat = (el: HTMLVideoElement) => {
      el.muted = true;
      el.defaultMuted = true;
      el.controls = false;
      return el.play().catch(() => undefined);
    };

    const posterGizle = () => {
      if (poster) gsap.set(poster, { autoAlpha: 0 });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      iz.style.height = "100dvh";
      return () => undefined;
    }

    let bitti = false;
    let tickerId = 0;

    const ilerleme = () => {
      const pay = iz.offsetHeight - window.innerHeight;
      if (pay <= 1) return 0;
      return Math.min(1, Math.max(0, -iz.getBoundingClientRect().top / pay));
    };

    const donguyaDevret = () => {
      if (bitti) return;
      bitti = true;
      window.removeEventListener("scroll", sar);
      window.removeEventListener("touchmove", sar);
      window.removeEventListener("touchstart", kilidiAc);
      window.removeEventListener("touchend", jestBitti);
      window.removeEventListener("wheel", sar);
      cancelAnimationFrame(tickerId);
      video.pause();
      dongu.hidden = false;
      gsap.set(dongu, { autoAlpha: 1 });
      void oynat(dongu);
      posterGizle();
      gsap.set(ipucuRef.current, { autoAlpha: 0, display: "none" });

      const sayfa = document.documentElement;
      const oncekiYukseklik = sayfa.scrollHeight;
      const oncekiScroll = window.scrollY;
      iz.style.height = "100dvh";
      const kisalma = oncekiYukseklik - sayfa.scrollHeight;
      window.scrollTo({
        top: Math.max(0, oncekiScroll - kisalma),
        left: 0,
        behavior: "instant",
      });
    };

    const sar = () => {
      if (bitti) return;
      const p = ilerleme();
      if (p > 0.008) {
        posterGizle();
        gsap.set(ipucuRef.current, { autoAlpha: 0 });
      }
      const sure = video.duration;
      if (Number.isFinite(sure) && sure > 0 && p > 0) {
        const hedef = p * sure;
        if (Math.abs(video.currentTime - hedef) >= 1 / 40) {
          try {
            video.currentTime = hedef;
          } catch {
            /* */
          }
        }
        if (dokunmatik && video.paused) void oynat(video);
      }
      if (p >= 0.985) donguyaDevret();
    };

    const donguSar = () => {
      sar();
      if (!bitti) tickerId = requestAnimationFrame(donguSar);
    };

    const kilidiAc = () => {
      if (bitti) return;
      void oynat(video);
    };
    const jestBitti = () => {
      if (bitti || ilerleme() > 0.008) return;
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", sar);
    window.addEventListener("scroll", sar, { passive: true });
    window.addEventListener("touchmove", sar, { passive: true });
    window.addEventListener("wheel", sar, { passive: true });
    window.addEventListener("touchstart", kilidiAc, { passive: true });
    window.addEventListener("touchend", jestBitti, { passive: true });
    tickerId = requestAnimationFrame(donguSar);

    return () => {
      bitti = true;
      cancelAnimationFrame(tickerId);
      window.removeEventListener("scroll", sar);
      window.removeEventListener("touchmove", sar);
      window.removeEventListener("touchstart", kilidiAc);
      window.removeEventListener("touchend", jestBitti);
      window.removeEventListener("wheel", sar);
      video.removeEventListener("loadedmetadata", sar);
      video.pause();
      dongu.pause();
    };
  }, []);

  return (
    <div ref={izRef} className="hero-iz">
      <section
        aria-label="İBONUN YERİ MANGAL EVİ tanıtım"
        className="hero-sahne"
      >
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 z-0 size-full object-cover"
          src="/mangal-izgara.mp4?v=nologo"
          poster="/mangal-poster.jpg"
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
        />

        <video
          ref={donguRef}
          hidden
          className="pointer-events-none absolute inset-0 z-[1] size-full object-cover"
          src="/mangal-dongu.mp4?v=nologo"
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
        />

        <img
          ref={posterRef}
          src="/mangal-poster.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 z-[2] size-full object-cover"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-komur/80 via-komur/15 to-komur/85" />
        <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_48%,color-mix(in_oklab,var(--color-komur)_82%,transparent)_100%)]" />

        <div
          ref={arayuzRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_48%_32%_at_50%_50%,color-mix(in_oklab,var(--color-komur)_78%,transparent)_0%,transparent_75%)]" />

          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.42em] text-altin/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.9)] sm:text-xs">
            İBONUN YERİ MANGAL EVİ
          </span>
          <h1 className="font-baslik mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[0.04em] [text-shadow:0_4px_30px_rgba(0,0,0,0.85)] sm:text-6xl lg:text-7xl">
            <span className="block text-krem">Ateşin Lezzetle</span>
            <span className="block bg-gradient-to-r from-altin via-alev to-kor-derin bg-clip-text text-transparent">
              Buluştuğu Yer
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-krem/80 [text-shadow:0_2px_16px_rgba(0,0,0,0.9)] sm:text-lg">
            Korun üzerinde tek tek çevrilen, dumanını içine çekmiş gerçek mangal
            lezzeti. Acele yok — iyi mangal sabır ister.
          </p>
          <a
            href="#menu"
            className="pointer-events-auto mt-9 cursor-pointer rounded-full border border-altin/25 bg-gradient-to-r from-kor to-alev px-8 py-4 text-sm font-bold text-black transition-all duration-200 hover:brightness-110"
          >
            Menüyü Keşfet
          </a>
        </div>

        <div
          ref={ipucuRef}
          className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-duman">
            Kaydırarak Çevir
          </span>
          <motion.span
            className="hareketli text-altin"
            initial={{ y: 0 }}
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
              aria-hidden="true"
            >
              <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </motion.span>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Kıvılcımlar — hero altındaki tüm bölümlerin arka planı              */
/* ------------------------------------------------------------------ */

const KIVILCIM_RENKLERI = ["#f5c24b", "#fb923c", "#f97316", "#ea580c"];

/*
  Lehmer üreteci: tamsayı aritmetiği 2^53'ün altında kaldığı için sunucu ve
  istemcide bit düzeyinde aynı sonucu verir. Math.random() hidrasyon
  uyumsuzluğu yaratır, Math.sin ise motorlar arasında son basamaklarda
  değişebilir — ikisi de burada kullanılamaz.
*/
function kivilcimUreteci(tohum: number) {
  let durum = (tohum * 16807) % 2147483647;
  return (en_az: number, en_cok: number, basamak = 2) => {
    durum = (durum * 48271) % 2147483647;
    const carpan = 10 ** basamak;
    return (
      Math.round((en_az + (durum / 2147483647) * (en_cok - en_az)) * carpan) /
      carpan
    );
  };
}

const KIVILCIMLAR = Array.from({ length: 52 }, (_, i) => {
  const rastgele = kivilcimUreteci(i + 7);
  const boyut = rastgele(2, 5);

  return {
    sol: rastgele(0, 100),
    boyut,
    hale: Math.round(boyut * 3.2 * 100) / 100,
    sure: rastgele(7, 16),
    gecikme: rastgele(-16, 0),
    kayma: rastgele(-64, 64),
    olcek: rastgele(0.7, 1.3, 3),
    opaklik: rastgele(0.5, 1, 3),
    titre: rastgele(0.6, 1.8),
    renk: KIVILCIM_RENKLERI[i % KIVILCIM_RENKLERI.length],
  };
});

function Kivilcimlar() {
  return (
    <div
      aria-hidden="true"
      className="hareketli pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Yukarıdaki ocaktan sızan çok hafif sıcak ışık */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-kor/[0.07] to-transparent" />

      {KIVILCIMLAR.map((k, i) => (
        <span
          key={i}
          className="kivilcim"
          style={
            {
              left: `${k.sol}%`,
              "--k-sure": `${k.sure}s`,
              "--k-gecikme": `${k.gecikme}s`,
              "--k-kayma": `${k.kayma}px`,
              "--k-olcek": `${k.olcek}`,
              "--k-opaklik": `${k.opaklik}`,
            } as React.CSSProperties
          }
        >
          <span
            className="kivilcim-nokta"
            style={
              {
                width: `${k.boyut}px`,
                height: `${k.boyut}px`,
                "--k-renk": k.renk,
                "--k-hale": `${k.hale}px`,
                "--k-titre": `${k.titre}s`,
              } as React.CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Öne Çıkan Lezzetler                                                */
/* ------------------------------------------------------------------ */

function OneCikanLezzetler() {
  return (
    <section
      id="menu"
      className="relative scroll-mt-24 border-t border-cizgi px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-alev">
            Menümüzden
          </span>
          <h2 className="font-baslik mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Menü
          </h2>
          <p className="mt-4 text-base leading-relaxed text-duman">
            Hepsi günlük, hepsi kömürde. Ustamızın elinden geçmeyen hiçbir tabak
            masaya gitmiyor.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {MENU.map((kategori, i) => (
            <motion.section
              key={kategori.baslik}
              aria-label={kategori.baslik}
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-krem/10 bg-kart/45 p-6 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors duration-250 hover:border-kor/50 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.16),transparent_70%)] opacity-0 transition-opacity duration-250 group-hover:opacity-100" />

              <div className="relative flex flex-col gap-1 border-b border-cizgi pb-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-baslik text-xl font-bold text-krem sm:text-2xl">
                  {kategori.baslik}
                </h3>
                <span className="text-xs leading-snug text-duman sm:text-right">
                  {kategori.aciklama}
                </span>
              </div>

              <ul className="relative mt-5 flex flex-col gap-5">
                {kategori.urunler.map((urun) => (
                  <li key={`${kategori.baslik}-${urun.ad}-${urun.birim ?? ""}`}>
                    {urun.boyutlar ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[0.95rem] font-semibold uppercase tracking-wide text-krem">
                            {urun.ad}
                          </span>
                          {urun.one && <AlevIkonu className="size-3.5 text-alev" />}
                        </div>
                        <ul className="mt-2 flex flex-col gap-2.5 pl-3">
                          {urun.boyutlar.map((boyut) => (
                            <li
                              key={`${urun.ad}-${boyut.ad}`}
                              className="flex items-baseline gap-3"
                            >
                              <span className="text-sm text-duman">{boyut.ad}</span>
                              <span
                                aria-hidden="true"
                                className="min-w-4 flex-1 translate-y-[-0.3rem] border-b border-dashed border-krem/20"
                              />
                              <span className="font-baslik shrink-0 text-base font-bold text-alev sm:text-lg">
                                {boyut.fiyat} ₺
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-3">
                        <span className="flex shrink-0 items-baseline gap-2">
                          <span className="text-[0.95rem] font-medium text-krem">
                            {urun.ad}
                          </span>
                          {urun.one && (
                            <AlevIkonu className="size-3.5 translate-y-px text-alev" />
                          )}
                          {urun.birim && (
                            <span className="text-xs text-duman">{urun.birim}</span>
                          )}
                        </span>
                        <span
                          aria-hidden="true"
                          className="min-w-4 flex-1 translate-y-[-0.3rem] border-b border-dashed border-krem/20"
                        />
                        <span className="font-baslik shrink-0 text-base font-bold text-alev sm:text-lg">
                          {urun.fiyat} ₺
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-duman">
          Fiyatlarımıza KDV dahildir. Paket servis ve kiloluk siparişler için bizi
          arayın.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Hakkımızda                                                         */
/* ------------------------------------------------------------------ */

function Hakkimizda() {
  return (
    <section
      id="hakkimizda"
      className="relative scroll-mt-24 border-t border-cizgi px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-alev">
            Hakkımızda
          </span>
          <h2 className="font-baslik mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Dumanı Üstünde
          </h2>
          <p className="mt-6 text-base leading-relaxed text-duman">
            İbo Usta&apos;nın kurduğu ocakta hiçbir şey değişmedi: aynı terbiye,
            aynı sabır. Eti korun üzerine koyup unutmuyoruz — her parçayı elimizle
            çeviriyor, kıvamına gelince masaya gönderiyoruz.
          </p>
          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-cizgi pt-8 sm:max-w-xs">
            {[
              { k: "Günlük", v: "Taze et" },
            ].map((istatistik) => (
              <div key={istatistik.k}>
                <dt className="font-baslik text-2xl font-bold text-alev sm:text-3xl">
                  {istatistik.k}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-duman">
                  {istatistik.v}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.figure
          initial={{ opacity: 1, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative m-0 aspect-4/3 overflow-hidden rounded-2xl border border-cizgi bg-yuzey"
        >
          <Image
            src="/izgara.png"
            alt="Kömür ateşinin üzerinde, ızgarada sıra sıra pişen tavuk parçaları"
            fill
            sizes="(max-width: 1024px) 100vw, 45rem"
            className="object-cover"
          />
          {/* Alt kenarda yazıyı okunur kılan degrade */}
          <div className="absolute inset-0 bg-gradient-to-t from-komur via-komur/25 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <span className="font-baslik text-lg font-bold text-krem sm:text-xl">
              Ocağımızdan
            </span>
            <p className="mt-1 text-sm text-duman">
              Her akşam aynı ritüel: kor hazırlanır, etler tek tek dizilir, elde
              çevrilir.
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Bize Ulaşın                                                        */
/* ------------------------------------------------------------------ */

const ILETISIM: {
  Ikon: (props: IkonProps) => React.ReactNode;
  baslik: string;
  satirlar: string[];
  href?: string;
  dis?: boolean;
}[] = [
  {
    Ikon: KonumIkonu,
    baslik: "Adres",
    satirlar: ["Sahil Caddesi No: 42", "Merkez / Türkiye"],
  },
  {
    Ikon: TelefonIkonu,
    baslik: "Telefon",
    satirlar: [TELEFON, "Paket servis mevcut"],
    href: `tel:${TELEFON_TEL}`,
  },
  {
    Ikon: InstagramIkonu,
    baslik: "Instagram",
    satirlar: ["@ibonunyeri_mangal", "Günlük lezzetler"],
    href: INSTAGRAM,
    dis: true,
  },
  {
    Ikon: SaatIkonu,
    baslik: "Çalışma Saatleri",
    satirlar: ["Her gün 11:00 – 23:30", "Pazartesi kapalı"],
  },
];

function BizeUlasin() {
  return (
    <section
      id="iletisim"
      className="relative scroll-mt-24 overflow-hidden border-t border-cizgi px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="kor-parlti absolute inset-x-0 bottom-0 h-1/2 opacity-45" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-alev">
            İletişim
          </span>
          <h2 className="font-baslik mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Bize Ulaşın
          </h2>
          <p className="mt-4 text-base leading-relaxed text-duman">
            Kalabalık akşamlar için masanızı önceden ayırtmanızı öneririz. Bir telefon
            yeterli.
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ILETISIM.map(({ Ikon, baslik, satirlar, href, dis }, i) => {
            const icerik = (
              <>
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-kor/30 bg-yuzey text-alev">
                  <Ikon className="size-5" />
                </span>
                <h3 className="font-baslik mt-5 text-lg font-bold text-krem">{baslik}</h3>
                {satirlar.map((satir) => (
                  <p key={satir} className="mt-1.5 text-sm text-duman">
                    {satir}
                  </p>
                ))}
              </>
            );

            return (
              <motion.li
                key={baslik}
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-2xl border border-cizgi bg-kart/90 p-7 transition-colors duration-200 hover:border-kor/50"
              >
                {href ? (
                  <a
                    href={href}
                    className="block cursor-pointer"
                    {...(dis ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {icerik}
                  </a>
                ) : (
                  icerik
                )}
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-gradient-to-r from-kor to-alev px-8 py-4 text-sm font-bold text-black transition-all duration-200 hover:shadow-[0_0_34px_-6px_var(--color-alev)] hover:brightness-110"
          >
            <WhatsAppIkonu className="size-4" />
            WhatsApp ile Yaz
          </a>
          <a
            href={`tel:${TELEFON_TEL}`}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cizgi px-8 py-4 text-sm font-semibold text-krem transition-colors duration-200 hover:border-kor/60 hover:text-altin"
          >
            <TelefonIkonu className="size-4" />
            {TELEFON}
          </a>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cizgi px-8 py-4 text-sm font-semibold text-krem transition-colors duration-200 hover:border-kor/60 hover:text-altin"
          >
            <InstagramIkonu className="size-4" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="relative border-t border-cizgi px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2.5 text-center">
        <span className="font-baslik bg-gradient-to-r from-altin to-kor bg-clip-text text-sm font-bold tracking-wide text-transparent">
          İBONUN YERİ MANGAL EVİ
        </span>
        <p className="text-xs text-duman">
          © {new Date().getFullYear()} Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Sayfa                                                              */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <>
      {/* Hero'nun altındaki bölümlerin arka planı — bölümler saydam olduğu
          için sabit kıvılcım katmanı onların ardından görünür */}
      <Kivilcimlar />
      <Header />
      <main>
        <Hero />
        <OneCikanLezzetler />
        <Hakkimizda />
        <BizeUlasin />
      </main>
      <Footer />
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.8)] transition-transform duration-200 hover:scale-105"
        aria-label="WhatsApp ile yaz"
      >
        <WhatsAppIkonu className="size-7" />
      </a>
    </>
  );
}
