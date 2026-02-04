import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import char1Left from '/characters/Sanrio_Characters_Kuromi_Image016.webp';
 import char1Right from '/characters/2607768_43550.png';
import char2Left from '/characters/dbc600a13be629874b146ac73bdc78b6.png';
import char2Right from '/characters/18d9b2b3c221b8b8d74542eeaa58be2b.jpg';
/*import char3Left from '/characters/character3-left.webp';
import char3Right from '/characters/character3-right.webp'; */
const ValentineCard = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);


  const cardsData = [
    {
      id: 1,
      title: "Para x",
      message: "lorem",
      leftCharacter: <img src={char1Left} alt="Kuromi" className="w-full h-full object-contain p-2" />,
      rightCharacter: <img src={char1Right} alt="Tomie" className="w-full h-full object-contain p-2" />,
      bgGradient: "from-pink-900/40 via-rose-900/30 to-pink-800/40"
    },
    {
      id: 2,
      title: "Para Mi pequeño microbio",
      message: "lorem",
      leftCharacter: <img src={char2Left} alt="Emergencie" className="w-full h-full object-contain p-2" />,
      rightCharacter: <img src={char2Right} alt="Emergencie" className="w-full h-full object-contain p-2" />,
      bgGradient: "from-rose-900/40 via-pink-900/30 to-rose-800/40"
    },
    {
      id: 3,
      title: "Para x",
      message: "lorem",
      leftCharacter: "🌺",
      rightCharacter: "💖",
      bgGradient: "from-pink-800/40 via-rose-800/30 to-pink-900/40"
    },
     {
      id: 4,
      title: "Para x",
      message: "lorem.",
      leftCharacter: "🌺🌺🌺",
      rightCharacter: "💖",
      bgGradient: "from-pink-800/40 via-rose-800/30 to-pink-900/40"
    },
    {
      id: 5,
      title: "Para x",
      message: "lorem.",
      leftCharacter: "🌺🌺🌺",
      rightCharacter: "💖💖💖💖",
      bgGradient: "from-pink-800/40 via-rose-800/30 to-pink-900/40"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-950 to-pink-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-700/20 text-4xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: -100,
              rotate: Math.random() * 360 + 360,
              x: Math.random() * window.innerWidth
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Main container */}
      <div className="w-full max-w-md relative z-10">
        {/* Characters and card container */}
        <div className="relative flex items-center justify-center gap-2">
          {/* Left character */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${selectedIndex}`}
              initial={{ x: -100, opacity: 0, rotate: -180 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -100, opacity: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl bg-gradient-to-br from-pink-800/30 to-rose-900/30 backdrop-blur-sm rounded-2xl border border-pink-700/30 shadow-2xl"
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {currentCard.leftCharacter}
              </motion.span>
            </motion.div>
          </AnimatePresence>

          {/* Carousel */}
          <div className="flex-1 overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {cardsData.map((card, index) => (
                <div key={card.id} className="flex-[0_0_100%] min-w-0 px-2">
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className={`bg-gradient-to-br ${card.bgGradient} backdrop-blur-md rounded-3xl shadow-2xl border border-pink-700/30 overflow-hidden`}
                      >
                        {/* Card header */}
                        <div className="bg-gradient-to-r from-pink-800/50 to-rose-800/50 p-6 text-center border-b border-pink-700/30">
                          <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-4xl font-serif text-pink-100 tracking-wide"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {card.title}
                          </motion.h2>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="mt-3 flex justify-center gap-2"
                          >
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-150"></div>
                          </motion.div>
                        </div>

                        {/* Card content */}
                        <div className="p-8 min-h-[200px] flex items-center justify-center">
                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-xl text-pink-100 leading-relaxed text-center font-light"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {card.message}
                          </motion.p>
                        </div>

                        {/* Card footer with dots */}
                        <div className="p-6 flex justify-center gap-3 bg-gradient-to-t from-pink-900/30 to-transparent">
                          {cardsData.map((_, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => emblaApi?.scrollTo(idx)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                idx === selectedIndex 
                                  ? 'bg-pink-400 w-8' 
                                  : 'bg-pink-700/50 hover:bg-pink-600/70'
                              }`}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right character */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${selectedIndex}`}
              initial={{ x: 100, opacity: 0, rotate: 180 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: 100, opacity: 0, rotate: -180 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl bg-gradient-to-br from-rose-900/30 to-pink-800/30 backdrop-blur-sm rounded-2xl border border-pink-700/30 shadow-2xl"
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 0.5
                }}
              >
                {currentCard.rightCharacter}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            onClick={scrollPrev}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-700/50 to-rose-700/50 backdrop-blur-sm border border-pink-600/40 flex items-center justify-center text-pink-100 text-2xl shadow-xl hover:shadow-pink-900/50 transition-shadow"
          >
            ←
          </motion.button>
          <motion.button
            onClick={scrollNext}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-700/50 to-pink-700/50 backdrop-blur-sm border border-pink-600/40 flex items-center justify-center text-pink-100 text-2xl shadow-xl hover:shadow-pink-900/50 transition-shadow"
          >
            →
          </motion.button>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -left-10 w-24 h-24 border-2 border-pink-700/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -right-10 w-32 h-32 border-2 border-rose-700/20 rounded-full"
        />
      </div>

      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@300;400&display=swap');
        
        .delay-75 {
          animation-delay: 75ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default ValentineCard;
