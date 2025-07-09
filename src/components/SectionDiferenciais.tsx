import { GlowCard } from "@/components/spotlight-card";
import { Bot, Puzzle, Handshake, Shield, BarChart2, Lightbulb } from 'lucide-react';
import { ElegantShape } from "@/components/ui/shape-landing-hero";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SectionDiferenciais() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  return (
    <section id="diferenciais" className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-900 py-8 md:py-24 px-2 sm:px-4 md:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Shapes decorativos no fundo */}
      <ElegantShape
        delay={0.3}
        width={400}
        height={100}
        rotate={10}
        gradient="from-indigo-500/[0.10]"
        className="left-[-8%] top-[10%] absolute z-0"
      />
      <ElegantShape
        delay={0.5}
        width={300}
        height={80}
        rotate={-15}
        gradient="from-rose-500/[0.10]"
        className="right-[-5%] top-[60%] absolute z-0"
      />
      <ElegantShape
        delay={0.4}
        width={200}
        height={60}
        rotate={-8}
        gradient="from-violet-500/[0.10]"
        className="left-[10%] bottom-[5%] absolute z-0"
      />
      <ElegantShape
        delay={0.6}
        width={150}
        height={40}
        rotate={20}
        gradient="from-amber-500/[0.10]"
        className="right-[15%] top-[15%] absolute z-0"
      />
      <ElegantShape
        delay={0.8}
        width={250}
        height={60}
        rotate={-30}
        gradient="from-green-400/[0.10]"
        className="left-[40%] top-[30%] absolute z-0"
      />
      <ElegantShape
        delay={0.9}
        width={180}
        height={40}
        rotate={15}
        gradient="from-pink-400/[0.10]"
        className="right-[25%] bottom-[15%] absolute z-0"
      />
      <ElegantShape
        delay={1.0}
        width={120}
        height={30}
        rotate={-12}
        gradient="from-blue-400/[0.10]"
        className="left-[60%] bottom-[10%] absolute z-0"
      />
      <motion.h2
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-10"
      >
        Nossos Diferenciais
      </motion.h2>
      <div className="grid gap-1 md:gap-2 w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center relative z-10">
        {[
          {
            icon: <Bot size={40} className="text-cyan-400 flex-shrink-0 mt-1" />, title: "Foco no que Importa", text: "Elimine tarefas manuais e repetitivas. Criamos um sistema que trabalha por você 24/7, liberando sua equipe para focar em estratégia e crescimento."
          },
          {
            icon: <Puzzle size={40} className="text-cyan-400 flex-shrink-0 mt-1" />, title: "Ecossistema Unificado", text: "Suas ferramentas favoritas, finalmente conversando entre si. Integramos seus sistemas para um fluxo de trabalho completo e sem falhas manuais."
          },
          {
            icon: <Handshake size={40} className="text-cyan-400 flex-shrink-0 mt-1" />, title: "Parceria Humana e Ágil", text: "Você nunca está sozinho. Tenha acesso direto a especialistas que entendem seu negócio e respondem rápido quando você mais precisa."
          },
          {
            icon: <Shield size={40} className="text-cyan-400 flex-shrink-0 mt-1" />, title: "Segurança em Primeiro Lugar", text: "Operações e dados protegidos com criptografia de ponta e as melhores práticas. Sua tranquilidade é nossa prioridade."
          },
          {
            icon: <BarChart2 size={40} className="text-cyan-400 flex-shrink-0 mt-1" />, title: "Crescimento sem Limites", text: "Construímos soluções que não apenas resolvem seu problema hoje, mas que escalam junto com seu sucesso, sem necessidade de retrabalho."
          },
          {
            icon: <Lightbulb size={40} className="text-cyan-400 flex-shrink-0 mt-1" />, title: "Decisões Baseadas em Dados", text: "Transformamos dados brutos em dashboards visuais e insights claros, para que você tome decisões mais inteligentes e rápidas que a concorrência"
          }
        ].map((card, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-100px" });
          return (
            <motion.div
              ref={ref}
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="w-full max-w-md min-w-0 p-3 flex flex-col gap-2"
            >
              {/* Desktop: GlowCard interativo */}
              <GlowCard glowColor="lightblue" className="hidden md:block w-full max-w-md min-w-0 p-3 flex flex-col gap-2">
                <div className="flex flex-row items-start gap-4">
                  {card.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-1 text-left">{card.title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed text-left break-words whitespace-normal">
                      {card.text}
                    </p>
                  </div>
                </div>
              </GlowCard>
              {/* Mobile: apenas visualização, sem interação */}
              <div className="block md:hidden w-full max-w-md min-w-0 p-3 flex flex-col gap-2 rounded-2xl bg-[#181c23] shadow-[0_1rem_2rem_-1rem_black]">
                <div className="flex flex-row items-start gap-4">
                  {card.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-1 text-left">{card.title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed text-left break-words whitespace-normal">
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
} 