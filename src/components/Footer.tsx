import { memo } from "react";
import { AnimatedDock } from "./ui/animated-dock";
import { Instagram, MapPin } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

const dockItems = [
  {
    link: "https://instagram.com/proagency.ai/",
    Icon: <Instagram className="w-6 h-6 text-white hover:text-red-400 transition-colors duration-200" />,
    target: "_blank"
  },
  {
    link: "https://wa.me/5511962661116",
    Icon: <FaWhatsapp className="w-6 h-6 text-white hover:text-green-500 transition-colors duration-200" />,
    target: "_blank"
  },
  {
    link: "https://www.google.com/maps/place/Manoel+Viana,+RS,+97640-000/",
    Icon: <MapPin className="w-6 h-6 text-white hover:text-orange-500 transition-colors duration-200" />,
    target: "_blank"
  }
];

const Footer = memo(() => {
  return (
    <footer className="w-full bg-gradient-to-br from-[#0f172a] to-[#181c2a] px-4 pt-12 pb-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Removido FAQ, Contato e textos, mantendo apenas o dock e copyright */}
      </div>
      {/* Animated Dock centralizado */}
      <div className="flex justify-center w-full my-6">
        <AnimatedDock
          items={dockItems}
        />
      </div>
      {/* Copyright */}
      <div className="flex justify-center mt-4">
        <span className="text-white text-center text-sm group cursor-pointer">
          <span className="font-bold relative group-hover:text-white-400 transition-colors duration-200">
            © 2025 PRO Agency
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-0.5 bg-sky-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </span>
        </span>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;