import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { openContactNotice } from "@lib/contact-notice";
import { DEFAULT_WA_MESSAGE } from "@utils/helpers";

export default function WhatsAppButton() {
  return (
    <motion.button
      type="button"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => openContactNotice(DEFAULT_WA_MESSAGE)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-5 right-5 z-30 flex h-20 w-20 items-center justify-center rounded-full bg-[#24d367] text-white shadow-lg transition duration-500 hover:scale-110 md:right-20"
    >
      <FaWhatsapp className="text-5xl" aria-hidden="true" />
    </motion.button>
  );
}
