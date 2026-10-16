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
  whatsapp: "51999342480",
  phone: "01 7123456",
  phoneTel: "+5117123456",
  email: "citas@jockeysalud.com.pe",
  place: {
    name: "jockeysalud",
    street: "Av. Javier Prado Este 4200",
    locality: "Santiago de Surco",
    region: "Lima",
    postalCode: "15023",
    country: "PE",
  },
} as const;

export type SiteConfig = typeof siteConfig;
