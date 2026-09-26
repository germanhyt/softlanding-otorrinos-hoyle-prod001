# Plan de implementación — Hoyle Otorrinos

Landing estática de una sola página para **Hoyle Otorrinos**. El objetivo es presentar la clínica, sus servicios y tecnología, y convertir visitas en citas (CTA **Agenda tu cita** → formulario → WhatsApp). Este plan se basa en [`SDD.md`](./SDD.md) y los prototipos en [`info/prototype/`](./info/prototype/), **sin modificar `SDD.md`**.

Arquitectura, tokens de motion y convenciones reutilizan las landings Astro recientes (Laboratoria × L'Oréal / Colsubsidio / UTP): islands selectivos, `content.ts` centralizado, clip-path en menú mobile, count-up de stats, scroll-reveal suave.

## Ruta rápida

1. Scaffold Astro 5 + React 19 + Tailwind `^3.4.18` + dependencias del SDD (pnpm).
2. Migrar assets de `info/img/` → `public/assets/` con nombres semánticos (**hoy `info/img/` está vacío** — bloquea fidelidad visual).
3. Layout base: `Layout.astro`, `content.ts`, `site.config.ts`, `seoConfig.ts`, `robots.txt`.
4. Construir **header + hero** (cards glass + count-up). Consultar antes de seguir.
5. Resto de secciones 1 por 1, consultando al proceder.

## Stack y decisiones clave

| Tema | Decisión |
|------|----------|
| Framework | Astro 5 estático (`output: "static"`) + React 19 islands selectivos |
| Lenguaje | TypeScript estricto |
| Estilos | Tailwind CSS `^3.4.18` + `tailwind.config.ts` (el SDD dice “v4” en prosa; el `package.json` pina 3.4.x — igual que landings previas) |
| Animaciones | Framer Motion `^12.23.24`; CSS puro en casos especiales. Sistema suave: 12px travel, 0.9s ease `[0.22, 1, 0.36, 1]`, `prefers-reduced-motion` |
| Iconos | React Icons `^5.5.0` (nav, FAQ chevron, “Ver más”, form) |
| Carousel | Swiper `^12.0.3` — artículos (§10) y, si hace falta, congresos (§8) en mobile |
| Menú responsive | Clip-path CSS (Clippy) para apertura del panel hamburguesa |
| Formulario | Island React → mensaje prearmado a WhatsApp (`api.whatsapp.com/send`) |
| Alertas | SweetAlert2 `^11.26.3` — opcional (confirmación / error de campos) |
| Gestor | pnpm |
| SEO / GEO | `config/seoConfig.ts` + `config/site.config.ts` + `@astrojs/sitemap` + `public/robots.txt` |
| Dominio | `https://hoyleotorrinos.pe` |
| Locale | `es-PE` / `es_PE` |
| Helpers | `utils/helpers.ts` (WhatsApp URL, count-up, slug) |
| Copy | Todo el texto vive en `src/content/content.ts` — no hardcodear en secciones |

### Tokens de diseño (de prototipos)

Valores aproximados a extraer con precisión de Figma / assets cuando existan.

| Token | Valor |
|-------|-------|
| Fuente | Sans moderna (definir familia al extraer de Figma; candidata: Plus Jakarta Sans / Manrope) |
| Navy / texto | `#0D1146` aprox. (títulos, FAQ, footer links) |
| Overlay hero | Gradiente L→R navy-púrpura `#2E2A6E` → transparente |
| CTA / acento | Azul vivo `#3A5AFE` / `#2563EB` (botones pill) |
| Footer | Azul oscuro `#1A3673` aprox. |
| Lavanda sección | Fondo de §3 y card de §9 |
| Off-white | `#F9F8F6` (§4, §5, §7, §10) |
| Glass cards | `rgba(255,255,255,0.2)` + `backdrop-filter: blur` + borde blanco suave |
| Breakpoints | `xs 375 / sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536 / 3xl 1920 / 4xl 2560` |
| Container | `DEFAULT 1rem / sm 1.2 / md 1.5 / lg 2 / xl 3 / 2xl 6` |

## Arquitectura de archivos

```
OTORRINOS/
├── SDD.md                      # NO tocar
├── PLAN.md                     # este archivo
├── astro.config.mjs            # site: hoyleotorrinos.pe; aliases @config @utils @content
├── tailwind.config.ts
├── tsconfig.json
├── package.json                # pnpm
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   └── assets/
│       ├── logos/              # logo-hoyle-white / logo-hoyle-dark
│       ├── hero/               # hero--desktop / hero--mobile
│       ├── sections/           # fotos por sección
│       ├── articles/           # thumbs + covers de artículos
│       └── decorators/         # iconos de especialidades si vienen como SVG/PNG
├── config/
│   ├── site.config.ts          # siteUrl, whatsapp, phone, email
│   └── seoConfig.ts            # meta, OG, JSON-LD MedicalBusiness / Physician
├── utils/
│   └── helpers.ts
└── src/
    ├── pages/index.astro
    ├── layouts/Layout.astro
    ├── styles/global.css
    ├── lib/motion.ts           # mismos tokens suaves que L'Oréal
    ├── content/content.ts
    └── components/
        ├── sections/           # *.astro (server)
        │   ├── Header.astro
        │   ├── Hero.astro
        │   ├── Nosotros.astro
        │   ├── Servicios.astro
        │   ├── Alcance.astro
        │   ├── Tecnologia.astro
        │   ├── Equipos.astro
        │   ├── Atencion.astro
        │   ├── Congresos.astro
        │   ├── Contacto.astro
        │   ├── Articulos.astro
        │   ├── Faq.astro
        │   └── Footer.astro
        └── islands/            # *.tsx (client)
            ├── MobileNav.tsx
            ├── HeroStats.tsx
            ├── ProceduresTabs.tsx
            ├── ContactForm.tsx
            ├── ArticlesCarousel.tsx
            ├── ArticleModal.tsx
            ├── FaqAccordion.tsx
            ├── MotionReveal.tsx
            └── MotionScope.tsx
```

## Inventario de secciones (de `info/prototype/`)

| # | Archivo | Sección | ID anchor | Tipo | Notas |
|---|---------|---------|-----------|------|-------|
| 0 | `sectiion1.png` | Header | — | Astro + `MobileNav` | Logo 3 iconos (oído / garganta / nariz) + “Hoyle Otorrinos”. Links blancos sobre hero. Mobile: hamburguesa + clip-path |
| 1 | `sectiion1.png` | Hero | `#inicio` | Astro + `HeroStats` | Copy del SDD + CTA “Agenda tu cita”. Vignette L→R. **4 cards glass fijas al 50% de su alto** (sobresalen hacia §2). Count-up: `20+`, `5000+`, `100%` |
| 2 | `section2.png` | Nosotros | `#nosotros` | Astro | “Más de una generación dedicada a la salud” + 2 párrafos + foto 2 médicos. Las cards del hero aterrizan aquí |
| 3 | `section3.png` | Servicios | `#servicios` | Astro | “Atención integral de la cabeza y el cuello”. Grid 2×3: Nariz, Oído, Garganta, Sueño, Alergias respiratorias, Equilibrio. Icono circular recortado abajo-derecha |
| 4 | `section4.png` | Alcance | `#alcance` | Astro + `ProceduresTabs` | Tabs: Nariz y senos / Oído y audición / Garganta y voz / Sueño y respiración. Card foto + lista “Procedimientos incluidos”. CTA Agenda. **Solo está prototipado el tab 1** |
| 5 | `section5.png` | Tecnología | `#tecnologia` | Astro | “Tecnología para un diagnóstico más preciso.” + foto quirófano |
| 6 | `section6.png` | Equipos | `#tecnologia` | Astro | Foto endoscopía + 4 cápsulas: Endoscopía nasal, Audiometría digital, Videolaringoscopía, Microscopía de oído |
| 7 | `section7.png` | Atención | `#atencion` | Astro | “Atención especializada, de principio a fin”. 3 cards: Consulta médica / Procedimientos en oficina / Cirugía especializada |
| 8 | `section8.png` | Congresos | `#congresos` | Astro (+ Swiper mobile) | “Congresos y participaciones”. Collage 5 fotos (ABORL-CCF, SEORL-CCC 2023, #OTOMTG24, Vogue/rinoplastia, AAO-HNSF 2025) |
| 9 | `section9.png` | Contacto | `#contacto` | Astro + `ContactForm` | Card gradiente lavanda. Copy + form (especialidad, tipo de atención, mensaje) → WhatsApp. Botón “Enviar” |
| 10 | `section10.png` | Artículos | `#articulos` | Swiper + `ArticleModal` | “Artículos relacionados”. 3 cards preview. Click abre modal (`article1`–`article3`) |
| 11 | `section11.png` | FAQ | `#faq` | `FaqAccordion` | 5 preguntas con chevron. Respuestas ya están en el prototipo |
| — | `section11.png` | Footer | — | Astro | Fondo navy. Logo + placeholders teléfono/email + nav + `© 2026 · Hoyleotorrinos.pe` |

### Nav (header y footer)

| Label | Anchor |
|-------|--------|
| Inicio | `#inicio` |
| Nosotros | `#nosotros` |
| Servicios | `#servicios` |
| Atención especializada | `#atencion` |
| Contáctanos | `#contacto` |
| Preguntas frecuentes | `#faq` |

### Hero stats (count-up)

| Valor | Label |
|-------|-------|
| `20+` | Años de experiencia |
| `5000+` | Pacientes atendidos |
| — | Especialistas certificados (sin número) |
| `100%` | Compromiso con el paciente |

Cards: glass sobre la foto del hero; el grupo se posiciona al fondo del banner y **baja el 50% de su propio alto** hacia Nosotros (mismo patrón de overhang que Resultados en L'Oréal). Un solo componente; no duplicar las cards en §2.

### Artículos → modales

| Card | Modal | Título |
|------|-------|--------|
| 1 | `article1.png` | Rinoplastia: ¿qué tipos existen y cuál es adecuada para cada paciente? |
| 2 | `article2.png` | Cirugía plástica facial: procedimientos para rejuvenecer y armonizar el rostro |
| 3 | `article3.png` | ¿Cómo saber si soy candidato para una cirugía plástica facial? |

CTA de card: “Ver más →”. Modal: overlay + panel con cover, título, cuerpo estructurado (H2/H3, listas), cierre. Copy se extrae de los prototipos a `content.ts`. En `article2` el prototipo **repite** “¿Qué significa armonizar el rostro?” y el cuerpo de “Cirugía de mentón…” parece duplicado del lifting — consolidar al pasar a contenido (una sola vez, sin inventar el párrafo faltante).

### Formulario → WhatsApp

Campos del prototipo:

1. ¿Qué especialidad necesitas consultar? — select con las 6 de §3.
2. ¿Qué tipo de atención buscas? — select con las 3 de §7.
3. Cuéntanos brevemente qué necesitas — textarea.

`Enviar` abre `https://api.whatsapp.com/send?phone={whatsapp}&text={mensaje}`. Número en `site.config.ts` (placeholder hasta que el cliente lo entregue). CTA “Agenda tu cita” del hero / §4 hace scroll a `#contacto`.

## Islands (cuándo hidratar)

| Island | Hydration | Motivo |
|--------|-----------|--------|
| `MobileNav` | `client:load` | Menú + clip-path desde el primer paint mobile |
| `HeroStats` | `client:visible` | Count-up al entrar en viewport; **sin** MotionScope encima (evitar double-fade, lección L'Oréal Resultados) |
| `ProceduresTabs` | `client:visible` | Cambio de tab + imagen/lista |
| `ContactForm` | `client:visible` | Validación + deep link WhatsApp |
| `ArticlesCarousel` | `client:visible` | Swiper |
| `ArticleModal` | `client:idle` | Portal / overlay |
| `FaqAccordion` | `client:visible` | Abrir/cerrar |
| `MotionReveal` / `MotionScope` | `client:visible` | Entradas por scroll |

## Orden de ejecución

1. **Scaffold** — Astro 5, deps del `package.json` del SDD, `astro.config.mjs` (`site: https://hoyleotorrinos.pe`), `tailwind.config.ts`, aliases.
2. **Assets** — `info/img/**` → `public/assets/` con nombres semánticos. Favicon a `public/`.
3. **Layout base** — `Layout.astro`, `global.css`, `content.ts`, configs SEO, `robots.txt`.
4. **Header + Hero** — nav, overlay, CTA, cards glass + count-up. **Consultar.**
5. **§2 Nosotros.** Consultar.
6. **§3 Servicios.** Consultar.
7. **§4 Alcance** (tabs; tab 1 completo, resto placeholder o extraído si hay más frames). Consultar.
8. **§5 Tecnología + §6 Equipos.** Consultar.
9. **§7 Atención.** Consultar.
10. **§8 Congresos.** Consultar.
11. **§9 Contacto / WhatsApp.** Consultar.
12. **§10 Artículos + modal.** Consultar.
13. **§11 FAQ + Footer.** Consultar.
14. **SEO final** — meta, OG, JSON-LD (`MedicalBusiness` / `Physician`), sitemap, robots.
15. **QA global** — build, responsive xs→4xl, reduced-motion, sin copy residual de Laboratoria/L'Oréal.

## Checklist de aceptación

- [ ] `pnpm build` verde
- [ ] `SDD.md` intacto
- [ ] Header: logo + 6 links; mobile clip-path; sólido al scroll si el prototipo/Figma lo pide
- [ ] Hero: overlay L→R, copy del SDD, CTA Agenda, 4 cards glass al 50% de su alto, count-up
- [ ] Formulario envía a WhatsApp con especialidad + tipo + mensaje
- [ ] Artículos: Swiper + modal fiel a `article1`–`article3`
- [ ] FAQ: 5 ítems con accordion
- [ ] Footer: logo, teléfono, email, nav, `© 2026 · Hoyleotorrinos.pe`
- [ ] SEO: `hoyleotorrinos.pe`, `es-PE`, sitemap, robots
- [ ] Responsive xs → 4xl
- [ ] `prefers-reduced-motion` respetado
- [ ] QA visual contra `info/prototype/` por sección

## Pendientes del cliente

| Ítem | Estado |
|------|--------|
| Imágenes y decoradores en `info/img/` | **Vacío** — sin esto el hero/secciones van con placeholders |
| Número de WhatsApp | Placeholder en `site.config` |
| Teléfono y correo del footer | El prototipo solo muestra labels |
| Contenido de tabs 2–4 de §4 | Solo prototipado “Nariz y senos paranasales” |
| Familia tipográfica exacta | Extraer de Figma |
| Favicon / logo vectorial | Pendiente |
| URL Figma (si se quiere pixel-perfect extra) | No está en el SDD |

## Próximo paso

Confirmar este plan. En cuanto haya assets en `info/img/` (o se autorice placeholders), arrancar **scaffold + layout + header + hero** y parar a revisión.
