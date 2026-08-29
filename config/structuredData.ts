import { seoConfig } from "./seoConfig";
import { siteConfig } from "./site.config";

export function buildStructuredData(canonical: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${siteConfig.siteUrl}/#clinic`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.siteUrl,
        description: seoConfig.description,
        image: seoConfig.openGraph.image,
        medicalSpecialty: "https://schema.org/Otolaryngologic",
        areaServed: {
          "@type": "Country",
          name: "Perú",
        },
        ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
        ...(siteConfig.email ? { email: siteConfig.email } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        url: canonical,
        name: siteConfig.name,
        inLanguage: siteConfig.lang,
        publisher: { "@id": `${siteConfig.siteUrl}/#clinic` },
      },
    ],
  };
}
