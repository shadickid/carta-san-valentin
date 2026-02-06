import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import char1Left from '/characters/Sanrio_Characters_Kuromi_Image016.webp';
import char1Right from '/characters/2607768_43550.png';
import char2Left from '/characters/dbc600a13be629874b146ac73bdc78b6.png';
import char2Right from '/characters/18d9b2b3c221b8b8d74542eeaa58be2b.jpg';

const ValentineCard = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [kuromiMode, setKuromiMode] = useState(false);

  // TEMAS para cada carta
  const themes = {
    blackPink: {
      name: "Black & Pink",
      bg: "from-black via-pink-950 to-black",
      cardBg: "from-pink-900/60 via-black/80 to-pink-900/60",
      textColor: "text-pink-100",
      titleColor: "from-pink-300 via-white to-pink-300",
      border: "border-pink-500/30",
      accentColor: "pink-500",
      characterBg: "from-pink-900/40 to-black/60",
      shadow: "shadow-pink-500/20"
    },
    horror: {
      name: "Horror Manga",
      bg: "from-zinc-950 via-red-950/20 to-zinc-950",
      cardBg: "from-zinc-900/80 via-red-950/40 to-zinc-900/80",
      textColor: "text-red-50",
      titleColor: "from-red-200 via-zinc-100 to-red-200",
      border: "border-red-900/50",
      accentColor: "red-900",
      characterBg: "from-red-950/30 to-zinc-900/60",
      shadow: "shadow-red-950/40"
    },
    purple: {
      name: "Purple Dream",
      bg: "from-indigo-950 via-purple-950 to-indigo-950",
      cardBg: "from-purple-900/60 via-indigo-950/80 to-purple-900/60",
      textColor: "text-purple-100",
      titleColor: "from-purple-300 via-white to-purple-300",
      border: "border-purple-500/30",
      accentColor: "purple-500",
      characterBg: "from-purple-900/40 to-indigo-950/60",
      shadow: "shadow-purple-500/20"
    },
    gothic: {
      name: "Gothic Rose",
      bg: "from-black via-rose-950/40 to-black",
      cardBg: "from-rose-950/70 via-black/90 to-rose-950/70",
      textColor: "text-rose-100",
      titleColor: "from-rose-300 via-zinc-100 to-rose-300",
      border: "border-rose-800/40",
      accentColor: "rose-800",
      characterBg: "from-rose-950/50 to-black/70",
      shadow: "shadow-rose-950/30"
    },
    neon: {
      name: "Neon Night",
      bg: "from-slate-950 via-cyan-950/30 to-slate-950",
      cardBg: "from-cyan-900/50 via-slate-900/90 to-cyan-900/50",
      textColor: "text-cyan-100",
      titleColor: "from-cyan-300 via-white to-cyan-300",
      border: "border-cyan-500/40",
      accentColor: "cyan-500",
      characterBg: "from-cyan-900/40 to-slate-950/70",
      shadow: "shadow-cyan-500/30"
    }
  };

  // TEMAS ALTERNATIVOS para Modo Kuromi
  const kuromiThemes = {
    kawaii: {
      name: "Kawaii Pink",
      bg: "from-pink-950 via-purple-900 to-pink-950",
      cardBg: "from-pink-900/70 via-purple-900/70 to-pink-900/70",
      textColor: "text-pink-100",
      titleColor: "from-pink-200 via-purple-200 to-pink-200",
      border: "border-pink-400/40",
      accentColor: "pink-400",
      characterBg: "from-pink-900/50 to-purple-900/50",
      shadow: "shadow-pink-400/30"
    },
    pastel: {
      name: "Pastel Dream",
      bg: "from-violet-950 via-fuchsia-950 to-violet-950",
      cardBg: "from-violet-900/60 via-fuchsia-900/60 to-violet-900/60",
      textColor: "text-fuchsia-100",
      titleColor: "from-fuchsia-200 via-violet-200 to-fuchsia-200",
      border: "border-fuchsia-400/40",
      accentColor: "fuchsia-400",
      characterBg: "from-fuchsia-900/50 to-violet-900/50",
      shadow: "shadow-fuchsia-400/30"
    },
    lavender: {
      name: "Lavender Love",
      bg: "from-purple-950 via-pink-950 to-purple-950",
      cardBg: "from-purple-900/70 via-pink-900/60 to-purple-900/70",
      textColor: "text-purple-100",
      titleColor: "from-purple-200 via-pink-200 to-purple-200",
      border: "border-purple-400/40",
      accentColor: "purple-400",
      characterBg: "from-purple-900/50 to-pink-900/50",
      shadow: "shadow-purple-400/30"
    },
    magenta: {
      name: "Magenta Magic",
      bg: "from-fuchsia-950 via-pink-950 to-fuchsia-950",
      cardBg: "from-fuchsia-900/70 via-pink-900/70 to-fuchsia-900/70",
      textColor: "text-fuchsia-100",
      titleColor: "from-fuchsia-200 via-pink-100 to-fuchsia-200",
      border: "border-fuchsia-400/40",
      accentColor: "fuchsia-400",
      characterBg: "from-fuchsia-900/50 to-pink-900/50",
      shadow: "shadow-fuchsia-400/30"
    },
    bubblegum: {
      name: "Bubblegum Pop",
      bg: "from-pink-950 via-rose-950 to-pink-950",
      cardBg: "from-pink-900/70 via-rose-900/70 to-pink-900/70",
      textColor: "text-pink-100",
      titleColor: "from-pink-200 via-rose-100 to-pink-200",
      border: "border-pink-400/40",
      accentColor: "pink-400",
      characterBg: "from-pink-900/50 to-rose-900/50",
      shadow: "shadow-pink-400/30"
    }
  };

  const cardsData = [
    {
      id: 1,
      title: "Para x",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      theme: kuromiMode ? kuromiThemes.kawaii : themes.blackPink,
      characters: [
        { img: <img src={char1Left} alt="1" className="w-full h-full object-cover" />, delay: 0.1 },
        { img: <img src={char1Right} alt="2" className="w-full h-full object-cover" />, delay: 0.2 },
        { img: <span className="text-6xl">🌸</span>, delay: 0.3 },
        { img: <img src={char2Left} alt="4" className="w-full h-full object-cover" />, delay: 0.4 },
        { img: <img src={char2Right} alt="5" className="w-full h-full object-cover" />, delay: 0.5 },
        { img: <span className="text-6xl">💖</span>, delay: 0.6 },
      ]
    },
    {
      id: 2,
      title: "Horror Love",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      theme: kuromiMode ? kuromiThemes.pastel : themes.horror,
      characters: [
        { img: <span className="text-6xl">🕷️</span>, delay: 0.1 },
        { img: <img src={char2Right} alt="2" className="w-full h-full object-cover grayscale contrast-125" />, delay: 0.2 },
        { img: <span className="text-6xl">💀</span>, delay: 0.3 },
        { img: <img src={char1Left} alt="4" className="w-full h-full object-cover grayscale" />, delay: 0.4 },
        { img: <span className="text-6xl">🩸</span>, delay: 0.5 },
        { img: <span className="text-6xl">👁️</span>, delay: 0.6 },
      ]
    },
    {
      id: 3,
      title: "Purple Dreams",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      theme: kuromiMode ? kuromiThemes.lavender : themes.purple,
      characters: [
        { img: <span className="text-6xl">🌙</span>, delay: 0.1 },
        { img: <span className="text-6xl">✨</span>, delay: 0.2 },
        { img: <img src={char1Left} alt="3" className="w-full h-full object-cover" />, delay: 0.3 },
        { img: <span className="text-6xl">🔮</span>, delay: 0.4 },
        { img: <span className="text-6xl">💜</span>, delay: 0.5 },
        { img: <img src={char2Left} alt="6" className="w-full h-full object-cover" />, delay: 0.6 },
      ]
    },
    {
      id: 4,
      title: "Gothic Romance",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      theme: kuromiMode ? kuromiThemes.magenta : themes.gothic,
      characters: [
        { img: <span className="text-6xl">🥀</span>, delay: 0.1 },
        { img: <img src={char1Right} alt="2" className="w-full h-full object-cover saturate-50" />, delay: 0.2 },
        { img: <span className="text-6xl">🖤</span>, delay: 0.3 },
        { img: <span className="text-6xl">⛓️</span>, delay: 0.4 },
        { img: <img src={char2Right} alt="5" className="w-full h-full object-cover saturate-50" />, delay: 0.5 },
        { img: <span className="text-6xl">🌹</span>, delay: 0.6 },
      ]
    },
    {
      id: 5,
      title: "Neon Nights",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      theme: kuromiMode ? kuromiThemes.bubblegum : themes.neon,
      characters: [
        { img: <span className="text-6xl">💠</span>, delay: 0.1 },
        { img: <span className="text-6xl">⚡</span>, delay: 0.2 },
        { img: <img src={char2Left} alt="3" className="w-full h-full object-cover" />, delay: 0.3 },
        { img: <span className="text-6xl">🌃</span>, delay: 0.4 },
        { img: <img src={char1Left} alt="5" className="w-full h-full object-cover" />, delay: 0.5 },
        { img: <span className="text-6xl">💎</span>, delay: 0.6 },
      ]
    }
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const currentCard = cardsData[selectedIndex];
  const theme = currentCard.theme;

  return (
    <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br ${theme.bg} flex items-center justify-center p-3 sm:p-4 lg:p-8 overflow-hidden relative transition-all duration-700`}>
      
      {/* Botón Modo Kuromi - DESHABILITADO (descomenta para activar) */}
      {/* 
      <motion.button
        onClick={() => setKuromiMode(!kuromiMode)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-full font-bold text-sm lg:text-base transition-all duration-300 ${
          kuromiMode 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-500/50' 
            : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
        }`}
      >
        {kuromiMode ? '💜 Kuromi Mode ON' : '🎀 Activate Kuromi Mode'}
      </motion.button>
      */}

      {/* Efectos de fondo según tema */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-4xl ${
              kuromiMode ? 'text-pink-400' :
              theme.name === "Horror Manga" ? 'text-red-900' :
              theme.name === "Black & Pink" ? 'text-pink-500' :
              theme.name === "Purple Dream" ? 'text-purple-500' :
              theme.name === "Gothic Rose" ? 'text-rose-800' :
              theme.name === "Neon Night" ? 'text-cyan-500' :
              'text-pink-400'
            }`}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
            }}
            animate={{ 
              y: -100,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            }}
            transition={{ 
              duration: 20 + Math.random() * 10, 
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            {kuromiMode ? '🎀' :
             theme.name === "Horror Manga" ? '🩸' : '♥'}
          </motion.div>
        ))}
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          
          {/* PERSONAJES IZQUIERDA - 3 personajes */}
          <div className="hidden lg:flex flex-col gap-4">
            {currentCard.characters.slice(0, 3).map((char, idx) => (
              <motion.div
                key={`left-${selectedIndex}-${idx}`}
                initial={{ x: -100, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: char.delay, 
                  type: "spring", 
                  damping: 15 
                }}
                className={`w-32 h-32 xl:w-36 xl:h-36 bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-2xl border ${theme.border} ${theme.shadow} shadow-xl overflow-hidden flex items-center justify-center`}
              >
                {char.img}
              </motion.div>
            ))}
          </div>

          {/* CARTA CENTRAL */}
          <div className="flex-1 w-full max-w-2xl">
            {/* Personajes móvil - arriba */}
            <div className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 px-1">
              {currentCard.characters.map((char, idx) => (
                <motion.div
                  key={`mobile-${selectedIndex}-${idx}`}
                  initial={{ y: -50, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: char.delay, 
                    type: "spring", 
                    damping: 20 
                  }}
                  className={`w-full aspect-square bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-xl sm:rounded-2xl border ${theme.border} ${theme.shadow} shadow-lg overflow-hidden flex items-center justify-center`}
                >
                  {char.img}
                </motion.div>
              ))}
            </div>

            {/* Carrusel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {cardsData.map((card, index) => (
                  <div key={card.id} className="flex-[0_0_100%] min-w-0 px-1 sm:px-2">
                    {selectedIndex === index && (
                      <div className={`bg-gradient-to-br ${card.theme.cardBg} backdrop-blur-xl rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] border ${card.theme.border} ${card.theme.shadow} shadow-2xl overflow-hidden transition-all duration-300`}>
                        
                        {/* Header */}
                        <div className={`bg-gradient-to-r ${card.theme.characterBg} p-4 sm:p-6 lg:p-10 text-center border-b ${card.theme.border}`}>
                          <h2
                            className={`text-3xl sm:text-4xl lg:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r ${card.theme.titleColor} tracking-wider`}
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {card.title}
                          </h2>
                          
                          <div
                            className={`mt-3 sm:mt-4 h-px w-32 sm:w-40 mx-auto ${
                              kuromiMode ? 'bg-gradient-to-r from-transparent via-pink-400 to-transparent' :
                              card.theme.name === "Black & Pink" ? 'bg-gradient-to-r from-transparent via-pink-500 to-transparent' :
                              card.theme.name === "Horror Manga" ? 'bg-gradient-to-r from-transparent via-red-900 to-transparent' :
                              card.theme.name === "Purple Dream" ? 'bg-gradient-to-r from-transparent via-purple-500 to-transparent' :
                              card.theme.name === "Gothic Rose" ? 'bg-gradient-to-r from-transparent via-rose-800 to-transparent' :
                              card.theme.name === "Neon Night" ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' :
                              'bg-gradient-to-r from-transparent via-pink-400 to-transparent'
                            }`}
                          />
                        </div>

                        {/* Contenido */}
                        <div className="p-6 sm:p-8 lg:p-16 min-h-[200px] sm:min-h-[260px] lg:min-h-[400px] flex items-center justify-center">
                          <p
                            className={`text-lg sm:text-xl lg:text-3xl ${card.theme.textColor} leading-relaxed text-center font-light`}
                            style={{ 
                              fontFamily: (!kuromiMode && card.theme.name === "Horror Manga") ? "'Creepster', cursive" : "'Cormorant Garamond', serif",
                              textShadow: (!kuromiMode && card.theme.name === "Horror Manga") ? '0 0 20px rgba(0,0,0,0.8)' : '0 2px 20px rgba(0,0,0,0.3)'
                            }}
                          >
                            {card.message}
                          </p>
                        </div>

                        {/* Dots */}
                        <div className={`p-4 sm:p-6 flex justify-center gap-2 sm:gap-3 bg-gradient-to-t ${card.theme.characterBg}`}>
                          {cardsData.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => emblaApi?.scrollTo(idx)}
                              className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
                                idx === selectedIndex ? (
                                  kuromiMode ? 'bg-pink-400 w-10 sm:w-12 shadow-lg shadow-pink-400/50' :
                                  card.theme.name === "Black & Pink" ? 'bg-pink-500 w-10 sm:w-12 shadow-lg shadow-pink-500/50' :
                                  card.theme.name === "Horror Manga" ? 'bg-red-900 w-10 sm:w-12 shadow-lg shadow-red-900/50' :
                                  card.theme.name === "Purple Dream" ? 'bg-purple-500 w-10 sm:w-12 shadow-lg shadow-purple-500/50' :
                                  card.theme.name === "Gothic Rose" ? 'bg-rose-800 w-10 sm:w-12 shadow-lg shadow-rose-800/50' :
                                  card.theme.name === "Neon Night" ? 'bg-cyan-500 w-10 sm:w-12 shadow-lg shadow-cyan-500/50' :
                                  'bg-pink-400 w-10 sm:w-12 shadow-lg shadow-pink-400/50'
                                ) : (
                                  kuromiMode ? 'bg-pink-400/30 w-2 sm:w-2.5 hover:bg-pink-400/50' :
                                  card.theme.name === "Black & Pink" ? 'bg-pink-500/30 w-2 sm:w-2.5 hover:bg-pink-500/50' :
                                  card.theme.name === "Horror Manga" ? 'bg-red-900/30 w-2 sm:w-2.5 hover:bg-red-900/50' :
                                  card.theme.name === "Purple Dream" ? 'bg-purple-500/30 w-2 sm:w-2.5 hover:bg-purple-500/50' :
                                  card.theme.name === "Gothic Rose" ? 'bg-rose-800/30 w-2 sm:w-2.5 hover:bg-rose-800/50' :
                                  card.theme.name === "Neon Night" ? 'bg-cyan-500/30 w-2 sm:w-2.5 hover:bg-cyan-500/50' :
                                  'bg-pink-400/30 w-2 sm:w-2.5 hover:bg-pink-400/50'
                                )
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botones navegación */}
            <div className="flex justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
              <motion.button
                onClick={scrollPrev}
                whileHover={{ scale: 1.15, x: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm border ${theme.border} flex items-center justify-center ${theme.textColor} text-xl sm:text-2xl lg:text-3xl ${theme.shadow} shadow-xl transition-all duration-300`}
              >
                ←
              </motion.button>
              
              <motion.button
                onClick={scrollNext}
                whileHover={{ scale: 1.15, x: 3 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm border ${theme.border} flex items-center justify-center ${theme.textColor} text-xl sm:text-2xl lg:text-3xl ${theme.shadow} shadow-xl transition-all duration-300`}
              >
                →
              </motion.button>
            </div>
          </div>

          {/* PERSONAJES DERECHA - 3 personajes */}
          <div className="hidden lg:flex flex-col gap-4">
            {currentCard.characters.slice(3, 6).map((char, idx) => (
              <motion.div
                key={`right-${selectedIndex}-${idx}`}
                initial={{ x: 100, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: char.delay, 
                  type: "spring", 
                  damping: 15 
                }}
                className={`w-32 h-32 xl:w-36 xl:h-36 bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-2xl border ${theme.border} ${theme.shadow} shadow-xl overflow-hidden flex items-center justify-center`}
              >
                {char.img}
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@300;400&family=Creepster&display=swap');
      `}</style>
    </div>
  );
};

export default ValentineCard;