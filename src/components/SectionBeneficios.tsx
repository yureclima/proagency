import { memo, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Monitor, Smartphone, ExternalLink } from "lucide-react";
import { ElegantShape } from "@/components/ui/shape-landing-hero";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import SimulatedChat from "./SimulatedChat";

const projetos = [
  {
    titulo: "Barbearia SrLopes",
    categoria: "Site",
    imagem: "/images/srlopes-preview.jpg",
    url: "https://site.barbearialopes.shop"
  },
  {
    titulo: "Gestão de Dados",
    categoria: "Dashboard",
    imagem: "/images/dash-preview.jpg",
    url: "http://eclectic-chaja-a1933a.netlify.app/"
  }
];

const timelineData = [
  {
    id: 1,
    title: "Planejamento",
    date: "Jan 2024",
    content: "Fase de planejamento do projeto e levantamento de requisitos.",
    category: "Planejamento",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Fev 2024",
    content: "Design UI/UX e arquitetura do sistema.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Desenvolvimento",
    date: "Mar 2024",
    content: "Implementação das funcionalidades principais e testes.",
    category: "Desenvolvimento",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Testes",
    date: "Abr 2024",
    content: "Testes de usuário e correção de bugs.",
    category: "Testes",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Entrega",
    date: "Mai 2024",
    content: "Deploy final e entrega do projeto.",
    category: "Entrega",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

const ProjectCard = memo(({ projeto, index, onOpen }: { 
  projeto: typeof projetos[0], 
  index: number, 
  onOpen: (index: number) => void 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const handleClick = useCallback(() => {
    onOpen(index);
  }, [index, onOpen]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="w-full max-w-xl mx-auto"
    >
      {/* Desktop: botão interativo */}
      <button
        className="hidden md:block relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl mb-0 bg-[#181c23] group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-transform duration-300 md:cursor-pointer md:hover:scale-105"
        onClick={handleClick}
        aria-label={`Abrir preview do projeto ${projeto.titulo}`}
        tabIndex={0}
      >
        <img
          src={projeto.imagem}
          alt={`Preview do site ${projeto.titulo}`}
          className="w-full h-72 object-cover object-center pointer-events-none select-none transition-all duration-300"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        {/* Overlay gradiente escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-sky-600/90 text-white text-xs font-semibold">{projeto.categoria}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white drop-shadow-md">{projeto.titulo}</span>
            {/* Botão como texto com drop shadow */}
            <span className="flex items-center gap-1 text-base font-semibold text-white drop-shadow-lg group-hover:underline">
              Ver Projeto <ExternalLink className="w-4 h-4" />
            </span>
          </div>
        </div>
      </button>
      {/* Mobile: agora também abre modal ao tocar */}
      <button
        className="block md:hidden relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl mb-0 bg-[#181c23] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95 transition-transform duration-200"
        onClick={handleClick}
        aria-label={`Abrir preview do projeto ${projeto.titulo}`}
        tabIndex={0}
      >
        <img
          src={projeto.imagem}
          alt={`Preview do site ${projeto.titulo}`}
          className="w-full h-72 object-cover object-center pointer-events-none select-none transition-all duration-300"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        {/* Overlay gradiente escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-sky-600/90 text-white text-xs font-semibold">{projeto.categoria}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white drop-shadow-md">{projeto.titulo}</span>
          </div>
        </div>
      </button>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export const SectionBeneficios = memo(() => {
  const [mode, setMode] = useState<'desktop' | 'mobile'>("desktop");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = useCallback((index: number) => {
    setSelectedIndex(index);
    setMode('desktop');
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedIndex(null);
  }, []);

  const handleModeChange = useCallback((newMode: 'desktop' | 'mobile') => {
    setMode(newMode);
  }, []);

  const selectedProject = selectedIndex !== null ? projetos[selectedIndex] : null;

  return (
    <section id="beneficios" className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 md:py-24 px-2 sm:px-4 md:px-8 flex flex-col items-start relative overflow-hidden">
      {/* Shapes decorativos no fundo */}
      <ElegantShape
        delay={0.3}
        width={350}
        height={90}
        rotate={8}
        gradient="from-indigo-400/[0.10]"
        className="left-[-6%] top-[12%]"
      />
      <ElegantShape
        delay={0.5}
        width={220}
        height={60}
        rotate={-18}
        gradient="from-rose-400/[0.10]"
        className="right-[-8%] top-[65%]"
      />
      <ElegantShape
        delay={0.7}
        width={180}
        height={40}
        rotate={22}
        gradient="from-amber-400/[0.10]"
        className="right-[18%] top-[18%]"
      />
      <ElegantShape
        delay={0.9}
        width={120}
        height={30}
        rotate={-10}
        gradient="from-cyan-400/[0.10]"
        className="left-[55%] bottom-[8%]"
      />
      <ElegantShape
        delay={1.1}
        width={200}
        height={50}
        rotate={-25}
        gradient="from-green-400/[0.10]"
        className="left-[35%] top-[40%]"
      />
      <ElegantShape
        delay={1.3}
        width={140}
        height={35}
        rotate={18}
        gradient="from-pink-400/[0.10]"
        className="right-[30%] bottom-[18%]"
      />
      <ElegantShape
        delay={1.5}
        width={100}
        height={25}
        rotate={-14}
        gradient="from-blue-400/[0.10]"
        className="left-[65%] bottom-[12%]"
      />
      <h2 className="w-full text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 mb-4">
        Nosso Portifólio
      </h2>
      <p className="w-full text-center text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto">
        Conheça alguns dos projetos e soluções que desenvolvemos para transformar negócios com tecnologia, web design e automação.
      </p>
      <p className="w-full text-center text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto">
        Explore os cases abaixo e veja como podemos impulsionar o seu negócio também.
      </p>
      <div className="w-full relative flex flex-col md:flex-row gap-8 items-start justify-center">
        {/* GIF decorativo com efeito de surgir (fade-in) - só desktop */}
        <motion.img
          src="/videos/bg-chat.gif"
          alt="Decorativo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.2 }}
          className="hidden md:block chat-bg-video"
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            top: 0,
            left: -100,
            width: '20%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        {/* Chat: sempre visível em mobile, à esquerda em desktop */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center order-1 md:order-none mb-6 md:mb-0" style={{position: 'relative', zIndex: 1}}>
          <SimulatedChat />
        </div>
        {/* Cards */}
        <div className="w-full md:w-1/3 flex flex-col gap-8 items-center order-2 md:order-none" style={{position: 'relative', zIndex: 1}}>
          {projetos.map((projeto, index) => (
            <ProjectCard 
              key={projeto.titulo} 
              projeto={projeto} 
              index={index} 
              onOpen={handleOpen} 
            />
          ))}
          {/* Modal global para o projeto selecionado */}
          <Dialog open={open} onOpenChange={val => !val && handleClose()}>
            <DialogContent className="max-w-3xl w-full p-0 bg-transparent border-none shadow-none flex flex-col items-center">
              {selectedProject && (
                <>
                  <div className="flex justify-between items-center w-full px-6 pt-6">
                    <div className="flex gap-2">
                      <button
                        className={`p-2 rounded-lg border ${mode === 'desktop' ? 'bg-gray-900 text-pink-400 border-pink-400' : 'bg-gray-800 text-gray-400 border-transparent'} transition`}
                        onClick={() => handleModeChange('desktop')}
                        aria-label="Visualizar como desktop"
                      >
                        <Monitor className="w-5 h-5" />
                      </button>
                      <button
                        className={`p-2 rounded-lg border ${mode === 'mobile' ? 'bg-gray-900 text-yellow-400 border-yellow-400' : 'bg-gray-800 text-gray-400 border-transparent'} transition`}
                        onClick={() => handleModeChange('mobile')}
                        aria-label="Visualizar como mobile"
                      >
                        <Smartphone className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full px-6 pb-6">
                    <div
                      className={
                        mode === 'desktop'
                          ? 'w-[900px] max-w-full h-[500px] bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-gray-800'
                          : 'w-[350px] h-[700px] max-w-full bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-800'
                      }
                      style={{ transition: 'width 0.3s, height 0.3s' }}
                    >
                      <iframe
                        src={selectedProject.url}
                        title={`Site ${selectedProject.titulo}`}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
        {/* Orbital timeline à direita - só desktop */}
        <div className="hidden md:flex w-1/3 h-[600px] items-center justify-center" style={{position: 'relative', zIndex: 1}}>
          <RadialOrbitalTimeline
            timelineData={timelineData}
            className="bg-transparent h-full"
          />
        </div>
      </div>
    </section>
  );
});

SectionBeneficios.displayName = 'SectionBeneficios';