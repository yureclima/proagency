'use client'

import React, { Suspense, memo, useCallback } from 'react';
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { TextScramble } from "@/components/ui/text-scramble"
 
const SplineSceneBasic = memo(() => {
  const SplineScene = React.lazy(() =>
    import("@/components/ui/splite").then(m => ({ default: m.SplineScene }))
  );

  const handleScrollToSection = useCallback(() => {
    const section = document.getElementById('diferenciais');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <Card className="relative w-full h-screen bg-black/[0.96] overflow-hidden rounded-none border-0 shadow-none p-0 m-0">
      {/* Imagem de fundo n8n-bg */}
      <img 
        src="/images/n8n-bg.png" 
        alt="n8n background" 
        className="absolute left-1/4 md:left-2/4 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full max-h-[80%] object-contain opacity-40 z-0 pointer-events-none select-none"
        aria-hidden="true"
        loading="eager"
        decoding="async"
      />
      {/* SplineScene como background apenas no mobile */}
      <div className="absolute inset-0 w-full h-full z-0 block md:hidden">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />}>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full opacity-80"
          />
        </Suspense>
      </div>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="flex flex-col md:flex-row h-full relative z-10">
        {/* Left content */}
        <div className="flex-1 p-4 md:p-8 flex flex-col justify-center items-center pt-8 md:pt-0">
          <TextScramble as="h1" className="text-center text-2xl sm:text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700/80 via-cyan-500/70 to-blue-900/80 animate-gradient-x glow-tech">
            Pro Agency
          </TextScramble>
          <TextScramble
            as="p"
            className="
              mt-3
              text-white
              text-base
              sm:text-lg
              md:text-2xl
              max-w-md
              mx-auto
              text-center
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]
              bg-black/30
              rounded-lg
              px-3
              py-2
              font-medium
            "
          >
            Desenvolvemos automações e sistemas web inteligentes que eliminam tarefas repetitivas e impulsionam seu crescimento, para que você possa focar no que realmente importa.
          </TextScramble>
          <button
            className="mt-5 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600/90 via-cyan-600/90 to-blue-600/90 text-white text-base font-semibold shadow-md shadow-blue-900/20 border border-blue-400/30 backdrop-blur-sm transition hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            onClick={handleScrollToSection}
          >
            Automatize
          </button>
        </div>
        {/* SplineScene à direita em desktop e telas médias */}
        <div className="flex-1 relative hidden md:block">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />}>
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </Suspense>
        </div>
      </div>
    </Card>
  )