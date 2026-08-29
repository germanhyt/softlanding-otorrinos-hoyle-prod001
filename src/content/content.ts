import { siteConfig } from "@config/site.config";

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Atención especializada", href: "#atencion" },
  { label: "Contáctanos", href: "#contacto" },
  { label: "Preguntas frecuentes", href: "#faq" },
] as const;

export const logos = {
  white: {
    src: "/assets/logos/logo-hoyle-white.png",
    alt: "Hoyle Otorrinos",
  },
  dark: {
    src: "/assets/logos/logo-hoyle-dark.png",
    alt: "Hoyle Otorrinos",
  },
} as const;

export const hero = {
  id: "inicio",
  title: "Hoyle Otorrinolaringólogos",
  headline: "Cuidamos tu salud respiratoria, auditiva y de garganta",
  body: "En Hoyle Otorrinolaringólogos combinamos experiencia clínica, tecnología y un trato cercano para ofrecer diagnósticos precisos y tratamientos personalizados para niños y adultos.",
  cta: { label: "Agenda tu cita", href: siteConfig.ctaHref },
  image: {
    src: "/assets/hero/hero--desktop.webp",
    alt: "Médico otorrinolaringólogo de Hoyle Otorrinos evaluando a una paciente",
  },
  imageMobile: {
    src: "/assets/hero/hero--mobile.webp",
    alt: "Médico otorrinolaringólogo de Hoyle Otorrinos evaluando a una paciente",
  },
  stats: [
    { value: "20+", label: "Años de experiencia" },
    { value: "5000+", label: "Pacientes atendidos" },
    { value: "", label: "Especialistas certificados" },
    { value: "100%", label: "Compromiso con el paciente" },
  ],
} as const;

export const nosotros = {
  id: "nosotros",
  headline: "Más de una generación dedicada a la salud",
  paragraphs: [
    "Somos un equipo de médicos otorrinolaringólogos comprometidos con brindar una atención basada en evidencia científica, experiencia clínica y un acompañamiento cercano a cada paciente.",
    "En Hoyle Otorrinolaringólogos creemos que cada paciente merece una evaluación integral, un diagnóstico preciso y un plan de tratamiento diseñado específicamente para sus necesidades, ya sea un niño o un adulto.",
  ],
  image: {
    src: "/assets/sections/2/nosotros.webp",
    alt: "Dres. Juan F. Cano y Juan V. Cano, otorrinolaringólogos de Hoyle Otorrinos",
  },
} as const;

export const servicios = {
  id: "servicios",
  headline: "Atención integral de la cabeza y el cuello",
  intro:
    "Atendemos enfermedades y procedimientos relacionados con nariz, oído, garganta, trastornos del sueño, alergias respiratorias y problemas del equilibrio.",
  cards: [
    {
      title: "Nariz",
      body: "Diagnóstico y tratamiento de enfermedades nasales y sinusales.",
      icon: "/assets/sections/3/oido.png",
      iconAlt: "Icono de nariz",
    },
    {
      title: "Oído",
      body: "Evaluación auditiva, infecciones y procedimientos de oído.",
      icon: "/assets/sections/3/nariz.png",
      iconAlt: "Icono de oído",
    },
    {
      title: "Garganta",
      body: "Patologías de garganta, laringe, voz y amígdalas.",
      icon: "/assets/sections/3/garganta.png",
      iconAlt: "Icono de garganta",
    },
    {
      title: "Sueño",
      body: "Evaluación y tratamiento de ronquidos y apnea del sueño.",
      icon: "/assets/sections/3/sueno.png",
      iconAlt: "Icono de sueño",
    },
    {
      title: "Alergias respiratorias",
      body: "Diagnóstico y manejo de alergias que afectan las vías respiratorias.",
      icon: "/assets/sections/3/alergias.png",
      iconAlt: "Icono de alergias respiratorias",
    },
    {
      title: "Equilibrio",
      body: "Evaluación del vértigo y trastornos del sistema vestibular.",
      icon: "/assets/sections/3/equilibrio.png",
      iconAlt: "Icono de equilibrio",
    },
  ],
} as const;

export const alcance = {
  id: "alcance",
  headline: "Alcance completo de atención",
  intro:
    "Realizamos procedimientos diagnósticos y quirúrgicos con los más altos estándares de seguridad y precisión.",
  proceduresLabel: "Procedimientos incluidos",
  cta: { label: "Agenda tu cita", href: siteConfig.ctaHref },
  tabs: [
    {
      id: "nariz",
      label: "Nariz y Senos Paranasales",
      image: {
        src: "/assets/sections/4/nariz.webp",
        alt: "Evaluación endoscópica nasal en consultorio",
      },
      procedures: [
        "Cirugía endoscópica nasal",
        "Septoplastia",
        "Turbinoplastia",
        "Cirugía de pólipos nasales",
      ],
    },
    {
      id: "oido",
      label: "Oído y Audición",
      image: {
        src: "/assets/sections/4/oido.webp",
        alt: "Evaluación y procedimiento de oído",
      },
      procedures: [
        "Microscopía de oído",
        "Evaluación audiológica",
        "Tratamiento de infecciones de oído",
        "Procedimientos de oído medio",
      ],
    },
    {
      id: "garganta",
      label: "Garganta y Voz",
      image: {
        src: "/assets/sections/4/garganta.webp",
        alt: "Evaluación de garganta y voz",
      },
      procedures: [
        "Videolaringoscopía",
        "Cirugía de amígdalas",
        "Evaluación de la voz",
        "Patologías de laringe",
      ],
    },
    {
      id: "sueno",
      label: "Sueño y Respiración",
      image: {
        src: "/assets/sections/4/sueno.webp",
        alt: "Evaluación de sueño y respiración",
      },
      procedures: [
        "Evaluación de ronquidos",
        "Estudio de apnea del sueño",
        "Cirugía de vías aéreas superiores",
        "Tratamiento de obstrucción respiratoria",
      ],
    },
  ],
} as const;

export const tecnologia = {
  id: "tecnologia",
  headline: "Tecnología para un diagnóstico más preciso.",
  body: "Contamos con equipos especializados que permiten realizar evaluaciones completas y ofrecer tratamientos seguros y oportunos.",
  image: {
    src: "/assets/sections/5/tecnologia.png",
    alt: "Equipo quirúrgico de Hoyle Otorrinos en un procedimiento en quirófano",
  },
} as const;

export const equipos = {
  headline: "Equipos",
  image: {
    src: "/assets/sections/6/equipos.png",
    alt: "Médicos de Hoyle Otorrinos realizando una endoscopía nasal con monitor de alta definición",
  },
  items: [
    {
      title: "Endoscopía Nasal",
      body: "Evaluación detallada de las fosas nasales y senos paranasales con imagen de alta definición.",
    },
    {
      title: "Audiometría Digital",
      body: "Evaluación precisa de la capacidad auditiva mediante tecnología digital avanzada.",
    },
    {
      title: "Videolaringoscopía",
      body: "Visualización directa de la laringe y cuerdas vocales para diagnóstico preciso.",
    },
    {
      title: "Microscopía de Oído",
      body: "Limpieza y evaluación microscópica del conducto auditivo y tímpano.",
    },
  ],
} as const;

export const atencion = {
  id: "atencion",
  headline: "Atención especializada, de principio a fin",
  cards: [
    {
      title: "Consulta médica",
      body: "Atención especializada para identificar el origen de tus síntomas y definir el tratamiento más adecuado para cada caso.",
    },
    {
      title: "Procedimientos en oficina",
      body: "Evaluación y procedimientos especializados para el diagnóstico y tratamiento de afecciones de oído, nariz, garganta, audición y equilibrio.",
    },
    {
      title: "Cirugía especializada",
      body: "Tratamiento quirúrgico de patologías de oído, nariz y garganta, con procedimientos especializados según las necesidades de cada paciente.",
    },
  ],
} as const;

export const congresos = {
  id: "congresos",
  headline: "Congresos y participaciones",
  intro:
    "Formación continua y experiencia compartida en escenarios de referencia internacional.",
  photos: [
    {
      src: "/assets/sections/8/congreso-1.webp",
      alt: "Participación en el Congreso Panamericano de Otorrinolaringología",
      area: "a",
    },
    {
      src: "/assets/sections/8/congreso-3.webp",
      alt: "Participación en el Congreso Nacional SEORL-CCC",
      area: "b",
    },
    {
      src: "/assets/sections/8/congreso-2.webp",
      alt: "Participación en la reunión otológica #OTOMTG24",
      area: "c",
    },
    {
      src: "/assets/sections/8/congreso-4.webp",
      alt: "Participación en curso internacional de rinoplastia",
      area: "d",
    },
    {
      src: "/assets/sections/8/congreso-5.webp",
      alt: "Participación en el Annual Meeting AAO-HNSF",
      area: "e",
    },
  ],
} as const;

export const contacto = {
  id: "contacto",
  headline: "Agenda tu atención especializada",
  body: "Atención especializada para identificar el origen de tus síntomas y definir el tratamiento más adecuado para cada caso.",
  fields: {
    specialty: {
      label: "Especialidad",
      placeholder: "¿Qué especialidad necesitas consultar?",
    },
    attention: {
      label: "Tipo de atención",
      placeholder: "¿Qué tipo de atención buscas?",
    },
    message: {
      label: "Mensaje",
      placeholder: "Cuéntanos brevemente qué necesitas",
    },
  },
  submit: "Enviar",
  validationTitle: "Completa el formulario",
  validationBody:
    "Elige la especialidad, el tipo de atención y cuéntanos brevemente qué necesitas.",
  specialties: [
    "Nariz",
    "Oído",
    "Garganta",
    "Sueño",
    "Alergias respiratorias",
    "Equilibrio",
  ],
  attentionTypes: [
    "Consulta médica",
    "Procedimientos en oficina",
    "Cirugía especializada",
  ],
} as const;

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: readonly string[] };

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  image: { src: string; alt: string };
  body: readonly ArticleBlock[];
};

export const articulos = {
  id: "articulos",
  headline: "Artículos relacionados",
  moreLabel: "Ver más",
  closeLabel: "Cerrar artículo",
  items: [
    {
      id: "rinoplastia-tipos",
      title:
        "Rinoplastia: ¿qué tipos existen y cuál es adecuada para cada paciente?",
      excerpt:
        "Conoce las principales alternativas de rinoplastia y qué aspectos se evalúan para determinar el procedimiento más adecuado.",
      image: {
        src: "/assets/sections/10/articulo-1.webp",
        alt: "Procedimiento de rinoplastia en quirófano",
      },
      body: [
        {
          type: "p",
          text: "La rinoplastia es un procedimiento quirúrgico que modifica la forma, el tamaño y las proporciones de la nariz. Puede realizarse por motivos estéticos, funcionales o combinados, según las necesidades de cada paciente.",
        },
        {
          type: "h2",
          text: "¿Qué tipos de rinoplastia existen?",
        },
        {
          type: "p",
          text: "La rinoplastia se clasifica según el objetivo del procedimiento y la técnica quirúrgica utilizada.",
        },
        { type: "h3", text: "Rinoplastia estética" },
        {
          type: "p",
          text: "Busca mejorar la forma de la nariz en relación con el resto del rostro. Puede actuar sobre el dorso, la punta, el tamaño o las fosas nasales para lograr una mayor armonía facial.",
        },
        { type: "h3", text: "Rinoplastia funcional" },
        {
          type: "p",
          text: "Está orientada a resolver problemas de respiración, desviación del tabique nasal u otras alteraciones de las estructuras internas. En muchos casos se combina con una septoplastia.",
        },
        {
          type: "h3",
          text: "Rinoplastia abierta y rinoplastia cerrada",
        },
        {
          type: "p",
          text: "La técnica cerrada utiliza incisiones por dentro de las fosas nasales. La técnica abierta incluye una pequeña incisión en la columela, el tejido que separa ambas fosas, para una visualización más directa de las estructuras.",
        },
        {
          type: "h2",
          text: "¿Cómo saber qué tipo de rinoplastia necesito?",
        },
        {
          type: "p",
          text: "La elección del procedimiento requiere una evaluación médica. El especialista considera, entre otros, estos aspectos:",
        },
        {
          type: "ul",
          items: [
            "Estructura interna y externa de la nariz.",
            "Capacidad respiratoria.",
            "Forma y proporción del rostro.",
            "Antecedentes de traumatismos o cirugías previas.",
            "Características de la piel y los tejidos nasales.",
            "Expectativas y objetivos del paciente.",
          ],
        },
        {
          type: "h2",
          text: "¿La rinoplastia puede mejorar la respiración?",
        },
        {
          type: "p",
          text: "Sí. Cuando existe una desviación del tabique u otra alteración interna, la rinoplastia funcional —a menudo junto con una septoplastia— puede mejorar el paso del aire.",
        },
        {
          type: "h2",
          text: "¿Qué se puede esperar después de una rinoplastia?",
        },
        {
          type: "p",
          text: "Es habitual presentar inflamación y moretones en las primeras semanas. La recuperación inicial ocurre en semanas, mientras que el resultado definitivo se define de forma más gradual.",
        },
        {
          type: "h2",
          text: "Una rinoplastia debe ser personalizada",
        },
        {
          type: "p",
          text: "Como la nariz es una estructura central del rostro, el procedimiento requiere una planificación individual que equilibre función respiratoria y armonía facial.",
        },
      ],
    },
    {
      id: "cirugia-plastica-facial",
      title:
        "Cirugía plástica facial: procedimientos para rejuvenecer y armonizar el rostro",
      excerpt:
        "Una guía para conocer las diferentes opciones de cirugía facial y los objetivos que puede abordar cada procedimiento.",
      image: {
        src: "/assets/sections/10/articulo-2.png",
        alt: "Evaluación clínica de cirugía plástica facial",
      },
      body: [
        {
          type: "p",
          text: "La cirugía plástica facial agrupa procedimientos que modifican, reconstruyen o rejuvenecen estructuras como la nariz, los párpados, el mentón y los pómulos. El objetivo es lograr armonía entre todas las estructuras del rostro, no solo cambiar un rasgo aislado.",
        },
        {
          type: "h2",
          text: "¿Qué procedimientos forman parte de la cirugía plástica facial?",
        },
        { type: "h3", text: "Rinoplastia" },
        {
          type: "p",
          text: "Modifica la forma o el tamaño de la nariz por motivos estéticos, funcionales o combinados.",
        },
        { type: "h3", text: "Blefaroplastia" },
        {
          type: "p",
          text: "Trata los párpados y el contorno de los ojos para atenuar signos de cansancio o envejecimiento.",
        },
        { type: "h3", text: "Lifting facial" },
        {
          type: "p",
          text: "Actúa sobre los signos de envejecimiento en el rostro y el cuello, mejorando la flacidez de los tejidos.",
        },
        {
          type: "h3",
          text: "Cirugía de mentón y contorno facial",
        },
        {
          type: "p",
          text: "Actúa sobre el mentón y el contorno del rostro, estructuras que el plan quirúrgico considera junto con la nariz, los párpados y los pómulos.",
        },
        {
          type: "h2",
          text: "¿Qué significa armonizar el rostro?",
        },
        {
          type: "p",
          text: "Armonizar el rostro busca una relación equilibrada entre estructuras como la nariz, el mentón y los pómulos. La planificación considera el rostro en conjunto, no solo la zona que el paciente desea modificar.",
        },
        {
          type: "h2",
          text: "¿Cómo se determina qué procedimiento es adecuado?",
        },
        {
          type: "p",
          text: "Durante la evaluación médica, el especialista analiza los objetivos, los antecedentes, la anatomía y las expectativas del paciente para determinar si la cirugía está indicada y cuál es el procedimiento más adecuado.",
        },
        {
          type: "h2",
          text: "¿Qué factores se deben considerar antes de una cirugía facial?",
        },
        {
          type: "ul",
          items: [
            "Estado general de salud.",
            "Antecedentes médicos y quirúrgicos.",
            "Medicación actual.",
            "Características anatómicas del rostro.",
            "Calidad y características de la piel.",
            "Objetivos estéticos o funcionales.",
            "Expectativas respecto al resultado.",
            "Posibles riesgos y complicaciones.",
          ],
        },
        {
          type: "h2",
          text: "Un tratamiento personalizado para cada rostro",
        },
        {
          type: "p",
          text: "Los procedimientos no son iguales para todas las personas. Una planificación personalizada, basada en las características de cada rostro y en las necesidades del paciente, es esencial para un resultado equilibrado.",
        },
      ],
    },
    {
      id: "candidato-cirugia-facial",
      title: "¿Cómo saber si soy candidato para una cirugía plástica facial?",
      excerpt:
        "Conoce los principales aspectos que se consideran durante la evaluación previa a una cirugía facial.",
      image: {
        src: "/assets/sections/10/articulo-3.png",
        alt: "Consulta de evaluación para cirugía plástica facial",
      },
      body: [
        {
          type: "p",
          text: "Decidir realizarse una cirugía plástica facial requiere una evaluación médica individual. No existe una lista única de requisitos que determine por sí sola si una persona puede someterse a una cirugía, ya que cada procedimiento y cada paciente presentan características diferentes.",
        },
        {
          type: "p",
          text: "Durante la consulta, el especialista analiza el estado de salud, la anatomía facial, los objetivos del paciente y otros factores que pueden influir en la seguridad y el resultado del procedimiento.",
        },
        {
          type: "h2",
          text: "¿Qué se evalúa durante la consulta?",
        },
        {
          type: "p",
          text: "La primera consulta es una parte fundamental del proceso. El especialista puede revisar diferentes aspectos antes de determinar si una cirugía es adecuada.",
        },
        { type: "h3", text: "Estado general de salud" },
        {
          type: "p",
          text: "Es importante conocer los antecedentes médicos y cualquier condición que pueda influir en la cirugía o en la recuperación. También se deben informar los medicamentos, suplementos, alergias y tratamientos que se estén realizando.",
        },
        { type: "h3", text: "Objetivos del paciente" },
        {
          type: "p",
          text: "La cirugía debe responder a objetivos personales y realistas. Durante la consulta, el paciente puede explicar qué característica desea modificar y qué espera conseguir con el procedimiento. Comprender las expectativas permite al especialista determinar si los objetivos pueden alcanzarse mediante cirugía y explicar cuáles pueden ser los resultados razonables.",
        },
        {
          type: "h3",
          text: "Anatomía y características del rostro",
        },
        {
          type: "p",
          text: "Cada rostro tiene características diferentes. Por ello, el especialista puede analizar las proporciones faciales, la estructura ósea, los tejidos blandos, la piel y la zona que se desea modificar. En procedimientos como la rinoplastia también se evalúa la estructura interna de la nariz y su función respiratoria.",
        },
        {
          type: "h3",
          text: "Antecedentes de cirugías o traumatismos",
        },
        {
          type: "p",
          text: "Las cirugías anteriores, lesiones o traumatismos pueden modificar la anatomía de una zona y deben considerarse antes de planificar una nueva intervención. Conocer estos antecedentes ayuda a establecer una estrategia quirúrgica adecuada.",
        },
        {
          type: "h2",
          text: "¿Qué características puede tener un buen candidato?",
        },
        {
          type: "p",
          text: "En procedimientos como la rinoplastia, algunas características asociadas a una buena candidatura incluyen haber completado el desarrollo facial, encontrarse en condiciones físicas adecuadas, no fumar y mantener expectativas realistas sobre el resultado.",
        },
        {
          type: "p",
          text: "Sin embargo, estos criterios no sustituyen una evaluación médica. La candidatura depende del procedimiento específico y de las características individuales de cada paciente.",
        },
        {
          type: "h2",
          text: "¿Qué pasa si tengo expectativas muy específicas?",
        },
        {
          type: "p",
          text: "Es importante conversar abiertamente sobre el resultado que se espera obtener. El especialista debe explicar qué cambios pueden realizarse, cuáles son las limitaciones del procedimiento y qué resultados son razonables.",
        },
        {
          type: "p",
          text: "La cirugía plástica facial busca mejorar determinadas características, pero no puede garantizar que el resultado sea idéntico a una fotografía de referencia o a una expectativa determinada.",
        },
        {
          type: "h2",
          text: "¿Qué estudios pueden solicitarse antes de la cirugía?",
        },
        {
          type: "p",
          text: "Dependiendo del procedimiento y de los antecedentes del paciente, el especialista puede solicitar una evaluación médica o determinados estudios antes de programar la intervención.",
        },
        {
          type: "p",
          text: "La preparación preoperatoria puede incluir revisión de medicamentos, antecedentes médicos, evaluación del estado general de salud y otras pruebas según cada caso.",
        },
        {
          type: "h2",
          text: "¿Qué factores pueden aumentar los riesgos?",
        },
        {
          type: "p",
          text: "Como cualquier cirugía, los procedimientos faciales pueden presentar complicaciones. Factores relacionados con el estado de salud, determinados medicamentos, el tabaquismo y otras condiciones pueden influir en el riesgo quirúrgico o en la recuperación.",
        },
        {
          type: "p",
          text: "Por eso, es importante proporcionar al especialista información completa y precisa durante la consulta.",
        },
        {
          type: "h2",
          text: "La evaluación médica es el primer paso",
        },
        {
          type: "p",
          text: "No es posible determinar si una persona es candidata a una cirugía plástica facial únicamente a través de fotografías, cuestionarios o información general.",
        },
        {
          type: "p",
          text: "La evaluación presencial con un especialista permite analizar las características de cada paciente, resolver dudas, establecer objetivos realistas y determinar qué procedimiento, si alguno, puede ser adecuado.",
        },
        {
          type: "p",
          text: "Si estás considerando una cirugía plástica facial, una consulta especializada es el primer paso para conocer tus opciones de manera segura y personalizada.",
        },
      ],
    },
  ] satisfies readonly Article[],
} as const;

export const faq = {
  id: "faq",
  headline: "Preguntas frecuentes",
  items: [
    {
      id: "cuando-consultar",
      question: "¿Cuándo debería consultar con un otorrinolaringólogo?",
      answer:
        "Si presentas síntomas persistentes como congestión nasal, pérdida de audición, dolor de oído, ronquera, vértigo o ronquidos frecuentes.",
    },
    {
      id: "ninos-adultos",
      question: "¿Atienden niños y adultos?",
      answer:
        "Sí, brindamos atención especializada para pacientes de todas las edades.",
    },
    {
      id: "primera-consulta",
      question: "¿En la primera consulta sabré si necesito una cirugía?",
      answer:
        "La mayoría de los diagnósticos pueden orientarse desde la primera evaluación. Si se requieren estudios adicionales, te indicaremos cuáles son y por qué.",
    },
    {
      id: "estudios",
      question: "¿Qué estudios puedo realizarme durante la consulta?",
      answer:
        "Dependiendo de tu caso, podemos realizar evaluaciones especializadas que faciliten un diagnóstico más preciso.",
    },
    {
      id: "agendar",
      question: "¿Cómo puedo agendar una cita?",
      answer:
        "Puedes hacerlo por WhatsApp, teléfono o mediante el formulario de contacto.",
    },
  ],
} as const;

export const footer = {
  phoneLabel: "Número de teléfono",
  emailLabel: "Correo electrónico",
  copyright: "© 2026 · Hoyleotorrinos.pe",
} as const;
