import { siteConfig } from "./site.config";

const title = "Hoyle Otorrinos | Otorrinos para niños y adultos";
const description =
  "En Hoyle Otorrinos combinamos experiencia clínica, tecnología y un trato cercano para ofrecer diagnósticos precisos y tratamientos personalizados para niños y adultos.";
const ogImagePath = "/assets/hero/hero--desktop.webp";
const ogImage = `${siteConfig.siteUrl}${ogImagePath}`;

export const seoConfig = {
  title,
  description,
  lang: siteConfig.lang,
  canonical: siteConfig.siteUrl,
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#0D1146",
  author: siteConfig.legalName,
  keywords: [
    "Hoyle Otorrinos",
    "otorrino Perú",
    "otorrino Lima",
    "rinoplastia",
    "endoscopía nasal",
    "apnea del sueño",
    "audiometría",
    "cirugía plástica facial",
  ],
  openGraph: {
    title,
    description,
    url: siteConfig.siteUrl,
    type: "website" as const,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    image: ogImage,
    imagePath: ogImagePath,
    imageWidth: 1440,
    imageHeight: 630,
    imageAlt:
      "Médico otorrino de Hoyle Otorrinos realizando una evaluación clínica",
  },
  twitter: {
    card: "summary_large_image" as const,
    title,
    description,
    image: ogImage,
  },
  hreflang: [
    { lang: "es-PE", href: siteConfig.siteUrl },
    { lang: "x-default", href: siteConfig.siteUrl },
  ],
} as const;

export type SeoConfig = typeof seoConfig;
