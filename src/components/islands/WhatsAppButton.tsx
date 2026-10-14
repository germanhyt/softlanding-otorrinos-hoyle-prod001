import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@utils/helpers";

type Props = {
  phone: string;
};

export default function WhatsAppButton({ phone }: Props) {
  const href = buildWhatsAppUrl(phone);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-5 right-5 z-30 flex h-20 w-20 items-center justify-center rounded-full bg-[#24d367] text-white shadow-lg transition duration-500 hover:scale-110 md:right-20"
    >
      <FaWhatsapp className="text-5xl" aria-hidden="true" />
    </motion.a>
  );
}
