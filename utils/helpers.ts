const DOCTORS_LINE = "Consulta por los doctores Roger Hoyle y Connan Hoyle.";

export const DEFAULT_WA_MESSAGE = [
  "Hola, quiero agendar una cita en Hoyle Otorrinos.",
  DOCTORS_LINE,
].join("\n");

export function appointmentWhatsAppMessage(details?: {
  specialty: string;
  attention: string;
  message: string;
}): string {
  if (!details) return DEFAULT_WA_MESSAGE;
  return [
    "Hola, quiero agendar una cita en Hoyle Otorrinos.",
    DOCTORS_LINE,
    "",
    `Especialidad: ${details.specialty}`,
    `Tipo de atención: ${details.attention}`,
    "",
    details.message.trim(),
  ].join("\n");
}

export function buildWhatsAppUrl(
  phone: string,
  message = DEFAULT_WA_MESSAGE,
): string {
  const digits = phone.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  if (!digits) return `https://wa.me/?text=${text}`;
  return `https://api.whatsapp.com/send?phone=${digits}&text=${text}`;
}

export function parseCountToken(token: string) {
  const prefix = token.startsWith("+") ? "+" : "";
  const numMatch = token.match(/\d+/);
  const value = numMatch ? Number(numMatch[0]) : 0;
  const suffix = token.replace(/^[^\d]*\d+/, "");
  return {
    prefix,
    suffix,
    value,
    hasNumber: numMatch !== null && Number.isFinite(value),
  };
}
