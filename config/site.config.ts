/**
 * Client-swappable clinic data. Fill WhatsApp / phone / email when delivered.
 */
export const siteConfig = {
  name: "Hoyle Otorrinos",
  legalName: "Hoyle Otorrinos",
  siteUrl: "https://www.hoyleotorrinos.com.pe",
  lang: "es-PE",
  locale: "es_PE",
  ctaHref: "#contacto",
  whatsapp: "",
  phone: "",
  email: "",
} as const;

export type SiteConfig = typeof siteConfig;
