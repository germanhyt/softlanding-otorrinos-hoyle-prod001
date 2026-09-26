import { useState, type FormEvent } from "react";
import Swal from "sweetalert2";
import { buildWhatsAppUrl } from "@utils/helpers";

type Props = {
  whatsapp: string;
  specialties: readonly string[];
  attentionTypes: readonly string[];
  fields: {
    specialty: { label: string; placeholder: string };
    attention: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  submitLabel: string;
  validationTitle: string;
  validationBody: string;
};

const fieldClass =
  "w-full rounded-2xl border border-[#D9D6E3] bg-white px-4 py-3.5 text-sm text-brand-navy placeholder:text-[#8B8AA0] transition focus:border-[#7C63C9] focus:outline-none sm:px-5 sm:text-[0.95rem]";

export default function ContactForm({
  whatsapp,
  specialties,
  attentionTypes,
  fields,
  submitLabel,
  validationTitle,
  validationBody,
}: Props) {
  const [specialty, setSpecialty] = useState("");
  const [attention, setAttention] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!specialty || !attention || !message.trim()) {
      await Swal.fire({
        icon: "warning",
        title: validationTitle,
        text: validationBody,
        confirmButtonColor: "#7C63C9",
      });
      return;
    }

    const composed = [
      "Hola, quiero agendar una cita en Hoyle Otorrinos.",
      "",
      `Especialidad: ${specialty}`,
      `Tipo de atención: ${attention}`,
      "",
      message.trim(),
    ].join("\n");

    const url = buildWhatsAppUrl(whatsapp, composed);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  };

  return (
    <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor="contacto-especialidad">
        {fields.specialty.label}
      </label>
      <select
        id="contacto-especialidad"
        className={`${fieldClass} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230D1146'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
        }}
        value={specialty}
        onChange={(event) => setSpecialty(event.target.value)}
        required
      >
        <option value="">{fields.specialty.placeholder}</option>
        {specialties.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="contacto-atencion">
        {fields.attention.label}
      </label>
      <select
        id="contacto-atencion"
        className={`${fieldClass} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230D1146'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
        }}
        value={attention}
        onChange={(event) => setAttention(event.target.value)}
        required
      >
        <option value="">{fields.attention.placeholder}</option>
        {attentionTypes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="contacto-mensaje">
        {fields.message.label}
      </label>
      <textarea
        id="contacto-mensaje"
        data-lenis-prevent
        className={`${fieldClass} min-h-[8.5rem] resize-y sm:min-h-[9.5rem]`}
        placeholder={fields.message.placeholder}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />

      <button
        type="submit"
        className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-[#7C63C9] px-8 py-3.5 text-[0.95rem] font-semibold text-white transition hover:bg-[#6d54b8]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
