==========================
==========================
Preparando el proyecto:

- Usando ngram respecto a proyecto landings realizados (estructura / estilos / animaciones y efectos profesionales)

- planificamos en otro archivo .md basado en SDD.md pero sin tocar ese archivo

==========================
==========================
Sobbre el proyecto:

El proyecto es una landing para "Hoyle Otorrinos"

Contexto con texto de Banner principal:
"En Hoyle Otorrinolaringólogos combinamos experiencia clínica, tecnología y un trato cercano para ofrecer diagnósticos precisos y tratamientos personalizados para niños y adultos."

-----------------
Rol:
Experto en diseño web UI/UX

-----------------
Reglas:

1) La Arquitectura de informacióm se basa en los siguientes puntos
- en info/img/ enccontramos las imágenes y decoreadores que se asignarán la sección que corresponda de la landing
- los frames por section como está protoypado en figma y te comparto como imagenes de info/prototype/  cada uno con su sección correspondiente

2) Secciones:
- con OCR leemos las imágenes estructuradas que están en prototype y desarrollamos uno por uno

- Respecto a la section 1 tiene cards aplicado fixed en la parte inferior del banner (al 50% del height del group de cards), además los números con animación de conteo

- Respecto a la sección de artículos se tiene el carousel de previsualización y al presionar se apertura el modal cuyos prototipos están en /prototype/articleX

3) Funcionalidades
- Usamos animaciones y efectos modernas y profesionales (al scrollear por secciones en la web)
- Para el menu desplegable en responsive que se apertura con el button hamburguer usamos clippy

4) Respecto al formulario
- Vincularlo con el whatssap


5) Procedimientos:
- Vamos ir desarrollando sección por sección
- comenzamos con el header y hero banner (ambas)
- luego con las demás 1 por 1, consultamos para continuar al proceder


-----------------
Detalles técnicos:

1) Para maquetado y estilos:
- React island y typescript: pages, componentes, hooks y buenas prácticas para un rendimiento óptimo de los renders
- Tailwindcss 4 con tailwind.config.ts: estilos con orden jerárquico y buenas prácticas, en casos especiales usar css puro
- React Icons: Para iconos
- Framer-motion: Para efectos y animaciones, en casos especiales usar css puro
- Clippy css: Para aperutra de main en responsive y donde sea necesario
- Swiper: Para carousel de cards, reseñas, contenidos.

1.1)
- Diseño responsive profesional acorde al desktop

2) Para SEO y GEO:
- crear config/seoConfig.ts y config/site.config.ts: Preparado para personalizar datos del cliente
- además preparar el file de robots y sitemap

2.1) Dominio principal:
- hoyleotorrinos.pe

3) Helpers
- utils/helpers.ts: En caso de que se necesiten funciones comunes


4) Para el gestor de depndencias:
- pnpm

5) Consideramos tailwind.config.ts y responsive:
- "import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "1.2rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "6rem",
        },
      },
      fontFamily: {
      },
      colors: {
        primary: {
        },
        text: {
        },
        background: {

        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient()',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
"

6) Basado en el package.json:
- "  "dependencies": {
    "@astrojs/react": "^4.4.0",
    "@astrojs/sitemap": "^3.6.0",
    "@astrojs/tailwind": "^6.0.2",
    "astro": "^5.15.3",
    "framer-motion": "^12.23.24",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.19",
    "@types/node": "^24.9.1",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "react-icons": "^5.5.0",
    "tailwindcss": "^3.4.18",
    "typescript": "^5.9.3",
  }" 


7) En caso sea landing basado en el astro.config.mjs cuyo ejemplo es (readaptamos):
- "// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.biotraining.pe",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2025-11-12"),
    }),
  ],
  output: "static",
});
"

==========================
==========================

