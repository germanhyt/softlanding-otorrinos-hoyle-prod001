const DEFAULT_WA_MESSAGE =
  "Hola, quiero agendar una cita en Hoyle Otorrinos.";

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
