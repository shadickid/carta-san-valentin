import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import kuromi from '/characters/kuromi.webp';
import tomie from '/characters/junjiito4.png';
import emergencychar from '/characters/hentai7.png';
import zenitsu from '/characters/zenitsu1.jpg';
import zenitsu2 from '/characters/zenitsu2.jpg';
import fern1 from '/characters/fern1.jpg';
import fern2 from '/characters/fern2.jpg';
import hentai1 from '/characters/hentai1.jpg';
import hentai2 from '/characters/hentai2.webp';
import hentai3 from '/characters/hentai3.webp';
import hentai4 from '/characters/hentai4.webp';
import hentai5 from '/characters/hentai5.webp';
import hentai6 from '/characters/hentai6.webp';
import hentai8 from '/characters/hentai8.jpg';
import hentai9 from '/characters/hentai9.png';
import hentai10 from '/characters/hentai10.jpg';
import hentai11 from '/characters/hentai11.jpg';
import junjiito1 from '/characters/junjiito1.jpg';
import junjiito2 from '/characters/junjiito2.jpg';
import junjiito3 from '/characters/junjiito3.jpg';
import junjiito4 from '/characters/junjiito5.jpg';
import maomao1 from '/characters/maomao1.jpg';
import maomao2 from '/characters/maomao2.jpg';
import mitsuri1 from '/characters/mitsuri1.jpg';
import mitsuri2 from '/characters/mitsuri2.jpg';
import mitsuri3 from '/characters/mitsuri3.jpg';
import yumeko1 from '/characters/yumeko1.jpg';
import senku from '/characters/senku.jpg';
import toji from '/characters/toji.jpg';
import sunkenrock1 from '/characters/sunkenrock1.jpg';
import loquita from '/characters/loquita.jpg';
import kuromi2 from '/characters/kuromi2.png';
import kuromi3 from '/characters/kuromi3.png';
import kuromi4 from '/characters/kuromi4.png';
import regalo from '/characters/regalo.jpg';

const ValentineCard = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [kuromiMode, setKuromiMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const audioRef = React.useRef(null);
  const kuromiImages = [kuromi4, kuromi2, kuromi3];
  
  // ⏰ FECHA DE REENCUENTRO - 12 de julio 2024
  const reunionDate = new Date(2024, 6, 12); 

  const calculateDaysTogether = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    reunionDate.setHours(0, 0, 0, 0);
    const diffTime = today - reunionDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysTogether = calculateDaysTogether();

  // 🎭 POOL DE PERSONAJES
  const allCharacters = [
    { img: <img src={kuromi} alt="Kuromi" className="w-full h-full object-cover" />, id: 'char1' },
    { img: <img src={tomie} alt="Tomie" className="w-full h-full object-cover" />, id: 'char2' },
    { img: <img src={emergencychar} alt="emergency-char" className="w-full h-full object-fill" />, id: 'char3' },
    { img: <img src={zenitsu} alt="zenitsu" className="w-full h-full object-cover" />, id: 'char4' },
    { img: <img src={zenitsu2} alt="zenitsu 2" className="w-full h-full object-cover" />, id: 'char5' },
    { img: <img src={fern1} alt="fern 1" className="w-full h-full object-cover" />, id: 'char6' },
    { img: <img src={fern2} alt="fern 2" className="w-full h-full object-cover" />, id: 'char7' },
    { img: <img src={hentai1} alt="hentai1" className="w-full h-full object-cover" />, id: 'char8' },
    { img: <img src={hentai2} alt="hentai2" className="w-full h-full object-cover" />, id: 'char9' },
    { img: <img src={hentai3} alt="hentai3" className="w-full h-full object-cover" />, id: 'char10' },
    { img: <img src={hentai4} alt="hentai4" className="w-full h-full object-cover" />, id: 'char11' },
    { img: <img src={hentai5} alt="hentai5" className="w-full h-full object-cover" />, id: 'char12' },
    { img: <img src={hentai6} alt="hentai6" className="w-full h-full object-cover" />, id: 'char13' },
    { img: <img src={hentai8} alt="hentai8" className="w-full h-full object-cover" />, id: 'char14' },
    { img: <img src={mitsuri2} alt="mitsuri2" className="w-full h-full object-cover" />, id: 'char15' },
    { img: <img src={hentai9} alt="hentai9" className="w-full h-full object-cover" />, id: 'char16' },
    { img: <img src={junjiito1} alt="junjiito1" className="w-full h-full object-cover" />, id: 'char17' },
    { img: <img src={junjiito2} alt="junjiito2" className="w-full h-full object-cover" />, id: 'char18' },
    { img: <img src={junjiito3} alt="junjiito3" className="w-full h-full object-cover" />, id: 'char19' },
    { img: <img src={maomao1} alt="maomao1" className="w-full h-full object-cover" />, id: 'char20' },
    { img: <img src={maomao2} alt="maomao2" className="w-full h-full object-cover" />, id: 'char21' },
    { img: <img src={mitsuri1} alt="mitsuri1" className="w-full h-full object-cover" />, id: 'char22' },
    { img: <img src={yumeko1} alt="yumeko1" className="w-full h-full object-cover" />, id: 'char23' },
    { img: <img src={junjiito4} alt="junjiito4" className="w-full h-full object-cover" />, id: 'char24' },
    { img: <img src={mitsuri3} alt="mitsuri3" className="w-full h-full object-cover" />, id: 'char25' },
    { img: <img src={hentai10} alt="hentai10" className="w-full h-full object-cover" />, id: 'char26' },
    { img: <img src={hentai11} alt="hentai11" className="w-full h-full object-cover" />, id: 'char27' },
    { img: <img src={senku} alt="senku" className="w-full h-full object-cover" />, id: 'char28' },
    { img: <img src={toji} alt="toji" className="w-full h-full object-cover" />, id: 'char29' },
    { img: <img src={sunkenrock1} alt="senku" className="w-full h-full object-cover" />, id: 'char30' },
    { img: <img src={loquita} alt="loquita" className="w-full h-full object-cover" />, id: 'char31' },
  ];

  // 📸 FOTOS CON MARA
  const photoGalleries = {
    gallery1: [
      '/characters/mara1.jpg',
      '/characters/mara11.jpg',
      '/characters/mara3.jpg',
    ],
    gallery2: [
      '/characters/mara7.jpg',
      '/characters/mara4.jpg',
      '/characters/mara5.jpg',
    ],
    gallery3: [
      '/characters/mara14.jpg',
      '/characters/mara12.jpg',
      '/characters/mara13.jpg',
    ]
  };

  // 🖼️ SISTEMA DE PRECARGA DE IMÁGENES
  useEffect(() => {
    const imagesToPreload = [
      kuromi, tomie, emergencychar, zenitsu, zenitsu2, fern1, fern2,
      hentai1, hentai2, hentai3, hentai4, hentai5, hentai6, hentai8, hentai9,
      hentai10, hentai11, junjiito1, junjiito2, junjiito3, junjiito4,
      maomao1, maomao2, mitsuri1, mitsuri2, mitsuri3, yumeko1,
      senku, toji, sunkenrock1, loquita, kuromi2, kuromi3, kuromi4,
      ...photoGalleries.gallery1,
      ...photoGalleries.gallery2,
      ...photoGalleries.gallery3,
      regalo
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load: ${src}`);
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(imagesToPreload.map(src => preloadImage(src)))
      .then(() => {
        setTimeout(() => {
          setImagesLoaded(true);
        }, 500);
      });
  }, []);

  // 🎲 Función para obtener personajes únicos
  const getUniqueCharacters = (usedIds) => {
    let available = allCharacters.filter(char => !usedIds.includes(char.id));
    
    if (available.length < 6) {
      available = [...allCharacters];
    }
    
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);
    return selected.map((char, idx) => ({
      ...char,
      delay: 0.1 + idx * 0.1
    }));
  };

  // 🎨 TEMAS
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

  const kuromiThemes = {
    kawaii: themes.blackPink,
    pastel: themes.purple,
    lavender: themes.neon,
    magenta: themes.gothic,
    bubblegum: themes.blackPink
  };

  // 🎵 GENERAR CARTAS CON PERSONAJES ÚNICOS
  const generateCards = () => {
    const cards = [];
    let used = [];

    // Carta 1
    const chars1 = getUniqueCharacters(used);
    used = [...used, ...chars1.map(c => c.id)];
    cards.push({
      id: 1,
      title: "Mara",
      message: "Con vos sentí cosas que no me pasaron con nadie más no por lo perfecto, sino por lo real. Me gustaste cuando estabas bien y también cuando estabas hecha un caos. Me importás sin condiciones y sin promesas y aun así con todo el amor que me nace",
      theme: kuromiMode ? kuromiThemes.kawaii : themes.blackPink,
      characters: chars1,
      musicTimestamp: 0
    });

    // Carta 2
    const chars2 = getUniqueCharacters(used);
    used = [...used, ...chars2.map(c => c.id)];
    cards.push({
      id: 2,
      title: "Marita",
      message: "Hay una versión tuya que aparece en los detalles chicos: en cómo mirás, en cómo te reís sin darte cuenta, en cómo te enojás y a los cinco minutos ya no. Esa versión tuya es la que se me quedó en el pecho.",
      theme: kuromiMode ? kuromiThemes.pastel : themes.horror,
      characters: chars2,
      musicTimestamp: 0
    });

    // Carta 3 - GALERÍA 1 📸
    const chars3 = getUniqueCharacters(used);
    used = [...used, ...chars3.map(c => c.id)];
    cards.push({
      id: 3,
      title: "Nuestros Momentos 💕",
      message: "Cada foto guarda un recuerdo especial de nosotros.",
      theme: kuromiMode ? kuromiThemes.kawaii : themes.blackPink,
      characters: chars3,
      musicTimestamp: 0,
      isPhotoGallery: true,
      photos: photoGalleries.gallery1
    });

    // Carta 4
    const chars4 = getUniqueCharacters(used);
    used = [...used, ...chars4.map(c => c.id)];
    cards.push({
      id: 4,
      title: "Sangrona",
      message: "Me enamoré incluso de tu carácter. De tu forma de decir las cosas, de no maquillarlas, de ser intensa cuando algo te importa. Nunca quise que seas distinta. Solo quise aprender a querer lo que ya sos.",
      theme: kuromiMode ? kuromiThemes.lavender : themes.purple,
      characters: chars4,
      musicTimestamp: 0
    });

    // Carta 5 - GALERÍA 2 📸
    const chars5 = getUniqueCharacters(used);
    used = [...used, ...chars5.map(c => c.id)];
    cards.push({
      id: 5,
      title: "Más Recuerdos 🌸",
      message: "Momentos que siempre llevaré en mi corazón.",
      theme: kuromiMode ? kuromiThemes.magenta : themes.gothic,
      characters: chars5,
      musicTimestamp: 0,
      isPhotoGallery: true,
      photos: photoGalleries.gallery2
    });

    // Carta 6
    const chars6 = getUniqueCharacters(used);
    used = [...used, ...chars6.map(c => c.id)];
    cards.push({
      id: 6,
      title: "Enojona",
      message: "A veces no te entiendo, y está bien. Porque querer a alguien no es comprenderlo todo, es elegirlo incluso cuando no se entiende. Y yo, en ese tiempo, te elegí",
      theme: kuromiMode ? kuromiThemes.magenta : themes.gothic,
      characters: chars6,
      musicTimestamp: 124
    });
    
    // Carta 7
    const chars7 = getUniqueCharacters(used);
    used = [...used, ...chars7.map(c => c.id)];
    cards.push({
      id: 7,
      title: "Mi pequeño microbio",
      message: "Tenés una forma muy tuya de provocar sin que parezca que lo hacés, como si no fuera intencional pero sabiendo perfectamente el efecto que generás, me atraés, sí, y no voy a fingir que no, pero lo que más me desarma no es solo tu cuerpo sino esa mezcla tuya de seguridad y juego, de carácter fuerte y sonrisa inesperada, porque no te deseo solo porque me gustás, te deseo porque sos vos, y eso para mí lo cambia todo.",
      theme: kuromiMode ? kuromiThemes.pastel : themes.horror,
      characters: chars7,
      musicTimestamp: 0
    });

    // Carta 8 - GALERÍA 3 📸
    const chars8 = getUniqueCharacters(used);
    used = [...used, ...chars8.map(c => c.id)];
    cards.push({
      id: 8,
      title: "Juntos Siempre 💖",
      message: "Cada momento contigo es un tesoro que aprecio mucho.",
      theme: kuromiMode ? kuromiThemes.kawaii : themes.purple,
      characters: chars8,
      musicTimestamp: 0,
      isPhotoGallery: true,
      photos: photoGalleries.gallery3
    });

    // Carta 9 - Genuino 🎀
    const chars9 = getUniqueCharacters(used);
    used = [...used, ...chars9.map(c => c.id)];
    cards.push({
      id: 9,
      title: "Genuino",
      message: "Este regalo no es para convencerte de nada. Es para mostrarte quién soy cuando te amo. Soy intenso, sí. Soy sensible, sí. A veces me pierdo en lo que siento, también. Pero cuando amo, amo de verdad. Y hoy, sin dramatismo, sin presión, sin condiciones… puedo decirlo claro: Estoy enamorado de vos. Si querés caminar conmigo, voy a estar. Si necesitás volar distinto, también voy a respetarlo. Porque el amor que siento no quiere atarte. Quiere ser genuino. Y eso es lo que sos para mí: algo genuino.",
      theme: kuromiMode ? kuromiThemes.kawaii : themes.blackPink,
      characters: chars9,
      musicTimestamp: 0
    });

    // Carta 10 - Te Elijo 💕
    const chars10 = getUniqueCharacters(used);
    used = [...used, ...chars10.map(c => c.id)];
    cards.push({
      id: 10,
      title: "Te Elijo",
      message: "Amar no siempre es entender todo. Amar es elegir. Y yo te elijo. Te elijo cuando estamos bien. Te elijo cuando discutimos. Te elijo cuando no coincidimos. Te elijo incluso cuando no te entiendo del todo. Porque lo que siento por vos no es capricho, ni obsesión, ni costumbre. Es esa tranquilidad extraña que aparece cuando pienso en tu nombre. No necesito promesas eternas para sentir lo que siento. No necesito garantías para quererte. Solo necesito saber que lo que hay entre nosotros es real. Y lo es.",
      theme: kuromiMode ? kuromiThemes.pastel : themes.purple,
      characters: chars10,
      musicTimestamp: 0
    });

    // Carta 11 - Enamorado 💖
    const chars11 = getUniqueCharacters(used);
    used = [...used, ...chars11.map(c => c.id)];
    cards.push({
      id: 11,
      title: "Enamorado",
      message: "No quiero escribirte desde el miedo. Quiero escribirte desde lo que siento hoy, ahora, sin vueltas: Estoy enamorado de vos. No de una idea tuya. No de lo que podría ser. Estoy enamorado de la que sos. De tu carácter que a veces choca y a veces abraza. De tu forma de mirar cuando algo te importa. De tus silencios cuando estás pensando demasiado. De tu risa cuando se te escapa sin filtro. No te quiero perfecta. Te quiero real. Y real sos incluso cuando estás enojada, confundida o intensa.",
      theme: kuromiMode ? kuromiThemes.magenta : themes.gothic,
      characters: chars11,
      musicTimestamp: 0
    });

    // Carta 12 - Real 🌟
    const chars12 = getUniqueCharacters(used);
    used = [...used, ...chars12.map(c => c.id)];
    cards.push({
      id: 12,
      title: "Real",
      message: "No quiero escribirte algo perfecto. Quiero escribirte algo real. No soy el tipo más tranquilo cuando siente. No soy el más frío. No soy el que se hace el indiferente. Cuando algo me importa… me importa de verdad. Y vos me importás. No por lo que podrías ser. No por lo que imaginamos. Sino por lo que ya sos en mi vida. Me gusta cómo pensás. Me gusta cómo defendés lo que creés. Me gusta que no seas simple. No quiero una historia cómoda. Quiero una historia sincera.",
      theme: kuromiMode ? kuromiThemes.lavender : themes.neon,
      characters: chars12,
      musicTimestamp: 0
    });

    // Carta 13 - Ahora ⏰
    const chars13 = getUniqueCharacters(used);
    used = [...used, ...chars13.map(c => c.id)];
    cards.push({
      id: 13,
      title: "Ahora",
      message: "No sé si esto es amor eterno. No sé si esto es destino. No sé si dentro de diez años vamos a recordar esto riéndonos. Lo único que sé es lo que siento ahora. Y ahora siento algo fuerte. Algo que no me deja indiferente. Algo que me hace escribirte así. Si esto es amor, quiero que sea libre. Que no sea presión. Que no sea miedo. Que sea elección. Yo te estoy eligiendo. Yo estoy acá. No a medias.",
      theme: kuromiMode ? kuromiThemes.pastel : themes.horror,
      characters: chars13,
      musicTimestamp: 0
    });

    // Carta 14 - CUENTA REGRESIVA 📅
    const chars14 = getUniqueCharacters(used);
    used = [...used, ...chars14.map(c => c.id)];
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const reunionDay = reunionDate.getDate();
    const reunionMonth = monthNames[reunionDate.getMonth()];
    const reunionYear = reunionDate.getFullYear();
    
    cards.push({
      id: 14,
      title: `${daysTogether} Días Juntos 💕`,
      message: `Desde aquel ${reunionDay} de ${reunionMonth} de ${reunionYear}, han pasado ${daysTogether} días increíbles. Cada momento contigo es un regalo que atesoro.`,
      theme: kuromiMode ? kuromiThemes.bubblegum : themes.neon,
      characters: chars14,
      musicTimestamp: 0
    });

    // Carta 15 - FOTO DEL REGALO (ÚLTIMA) 🎁
    const chars15 = getUniqueCharacters(used);
    cards.push({
      id: 15,
      title: "Para Mi AMOR 💝",
      message: "Espero que estés disfrutando este día especial. Este regalo es solo una pequeña muestra de todo lo que significas para mí. No escribí todo esto para impresionarte, lo escribí porque sos vos. Porque con vos quiero intentar algo real, y si se da, construirlo juntos.",
      theme: kuromiMode ? kuromiThemes.kawaii : themes.blackPink,
      characters: chars15,
      musicTimestamp: 0,
      isPhotoCard: true
    });

    return cards;
  };

  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    if (imagesLoaded) {
      setCardsData(generateCards());
    }
  }, [kuromiMode, daysTogether, imagesLoaded]);

  // 🎵 CONTROL DE MÚSICA
  const [hasTriggeredClimax, setHasTriggeredClimax] = useState(false);

  useEffect(() => {
    if (!audioRef.current || !isPlaying || cardsData.length === 0) return;
    
    const currentCardTimestamp = cardsData[selectedIndex]?.musicTimestamp;
    
    if (currentCardTimestamp > 0 && !hasTriggeredClimax) {
      audioRef.current.currentTime = currentCardTimestamp;
      setHasTriggeredClimax(true);
    }
    
    if (selectedIndex === 0 && hasTriggeredClimax) {
      setHasTriggeredClimax(false);
    }
  }, [selectedIndex, cardsData, isPlaying, hasTriggeredClimax]);

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

  const handleStart = () => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const currentCard = cardsData[selectedIndex] || cardsData[0];
  const theme = currentCard?.theme || themes.blackPink;

  // 🔄 PANTALLA DE CARGA
  if (!imagesLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-950 to-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl lg:text-8xl mb-6"
          >
            💖
          </motion.div>
          
          <h2 className="text-2xl lg:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Preparando tu regalo...
          </h2>
          
          <div className="w-64 lg:w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <p className="mt-4 text-pink-200 text-lg">
            {loadingProgress}%
          </p>
        </motion.div>
      </div>
    );
  }

  if (cardsData.length === 0) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando...</div>;
  }

  return (
    <>
      {/* 🎬 PANTALLA DE INTRO */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-950 via-rose-950 to-black flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl lg:text-6xl"
                  initial={{ 
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: -100,
                    rotate: Math.random() * 360,
                    opacity: 0.7
                  }}
                  animate={{ 
                    y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
                    rotate: Math.random() * 360 + 360
                  }}
                  transition={{ 
                    duration: 5 + Math.random() * 5, 
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear"
                  }}
                >
                  💖
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 text-center px-4">
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-5xl lg:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Para Mara
              </motion.h1>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                <motion.button
                  onClick={handleStart}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-6 text-2xl lg:text-3xl font-bold text-white rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    💕 Toque para Empezar 💕
                  </span>
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-pink-200 text-lg lg:text-xl"
              >
                Active el sonido del dispositivo para una mejor experiencia
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} loop>
        <source src="/music/in-the-pool.mp3" type="audio/mpeg" />
      </audio>

      {/* 💌 CARTA PRINCIPAL */}
      <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br ${theme.bg} flex items-center justify-center p-3 sm:p-4 lg:p-8 overflow-hidden relative transition-all duration-700`}>
        
        {/* Botón de Música */}
        {!showIntro && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            onClick={toggleMusic}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`fixed top-4 left-4 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying 
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/50' 
                : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
            }`}
          >
            {isPlaying ? '🔊' : '🔇'}
          </motion.button>
        )}

        {/* Botón Modo Kuromi */}
        {!showIntro && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            onClick={() => setKuromiMode(!kuromiMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`fixed top-4 right-4 z-50 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-sm lg:text-base transition-all duration-300 ${
              kuromiMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-500/50' 
                : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
            }`}
          >
            {kuromiMode ? '💜 Kuromi Mode ON' : '🎀 Activate Kuromi Mode'}
          </motion.button>
        )}

        {/* Efectos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${kuromiMode ? 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24' : 'text-4xl'}`}
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
                rotate: kuromiMode ? Math.random() * 360 : 0,
              }}
              animate={{ 
                y: -100,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                rotate: kuromiMode ? Math.random() * 360 + 360 : 0,
              }}
              transition={{ 
                duration: 20 + Math.random() * 10, 
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
            >
              {kuromiMode ? (
                <img 
                  src={kuromiImages[i % kuromiImages.length]} 
                  alt="Kuromi" 
                  className="w-full h-full object-contain filter drop-shadow-lg"
                  style={{ 
                    transform: `scale(${0.8 + Math.random() * 0.4})`,
                    opacity: 0.6 + Math.random() * 0.4 
                  }}
                />
              ) : (
                <span className={
                  theme.name === "Horror Manga" ? 'text-red-900' :
                  theme.name === "Black & Pink" ? 'text-pink-500' :
                  theme.name === "Purple Dream" ? 'text-purple-500' :
                  theme.name === "Gothic Rose" ? 'text-rose-800' :
                  theme.name === "Neon Night" ? 'text-cyan-500' :
                  'text-pink-400'
                }>
                  {theme.name === "Horror Manga" ? '🩸' : '♥'}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            
            <div className="hidden lg:flex flex-col gap-4">
              {currentCard.characters.slice(0, 3).map((char, idx) => (
                <motion.div
                  key={`left-${selectedIndex}-${idx}`}
                  initial={{ x: -100, opacity: 0, scale: 0.5 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: char.delay, type: "spring", damping: 15 }}
                  className={`w-32 h-32 xl:w-36 xl:h-36 bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-2xl border ${theme.border} ${theme.shadow} shadow-xl overflow-hidden flex items-center justify-center`}
                >
                  {char.img}
                </motion.div>
              ))}
            </div>

            <div className="flex-1 w-full max-w-2xl">
              <div className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 px-1">
                {currentCard.characters.map((char, idx) => (
                  <motion.div
                    key={`mobile-${selectedIndex}-${idx}`}
                    initial={{ y: -50, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: char.delay, type: "spring", damping: 20 }}
                    className={`w-full aspect-square bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-xl sm:rounded-2xl border ${theme.border} ${theme.shadow} shadow-lg overflow-hidden flex items-center justify-center`}
                  >
                    {char.img}
                  </motion.div>
                ))}
              </div>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {cardsData.map((card, index) => (
                    <div key={card.id} className="flex-[0_0_100%] min-w-0 px-1 sm:px-2">
                      {selectedIndex === index && (
                        <div className={`bg-gradient-to-br ${card.theme.cardBg} backdrop-blur-xl rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] border ${card.theme.border} ${card.theme.shadow} shadow-2xl overflow-hidden transition-all duration-300`}>
                          
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

                          <div className="p-6 sm:p-8 lg:p-16 min-h-[200px] sm:min-h-[260px] lg:min-h-[400px] flex flex-col items-center justify-center gap-6">
                            
                            {/* 📸 GALERÍA DE FOTOS */}
                            {card.isPhotoGallery && card.photos && (
                              <div className="w-full max-w-lg">
                                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                  {card.photos.map((photo, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ scale: 0, rotate: -10 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      transition={{ delay: 0.1 * idx, type: "spring", damping: 10 }}
                                      className="relative aspect-square"
                                    >
                                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-xl blur opacity-50" />
                                      <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-pink-300/50 shadow-lg">
                                        <img 
                                          src={photo} 
                                          alt={`Momento ${idx + 1}`} 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* 🎁 FOTO DEL REGALO */}
                            {card.isPhotoCard && (
                              <motion.div
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                                className="relative"
                              >
                                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-3xl blur-xl opacity-70" />
                                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-4 border-pink-300/50 shadow-2xl">
                                  <img 
                                    src={regalo} 
                                    alt="Para ti" 
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                              </motion.div>
                            )}
                            
                            <p
                              className={`text-lg sm:text-xl lg:text-3xl ${card.theme.textColor} leading-relaxed text-center font-light ${(card.isPhotoCard || card.isPhotoGallery) ? 'max-w-lg' : ''}`}
                              style={{ 
                                fontFamily: (!kuromiMode && card.theme.name === "Horror Manga") ? "'Creepster', cursive" : "'Cormorant Garamond', serif",
                                textShadow: (!kuromiMode && card.theme.name === "Horror Manga") ? '0 0 20px rgba(0,0,0,0.8)' : '0 2px 20px rgba(0,0,0,0.3)'
                              }}
                            >
                              {card.message}
                            </p>
                          </div>

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

            <div className="hidden lg:flex flex-col gap-4">
              {currentCard.characters.slice(3, 6).map((char, idx) => (
                <motion.div
                  key={`right-${selectedIndex}-${idx}`}
                  initial={{ x: 100, opacity: 0, scale: 0.5 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: char.delay, type: "spring", damping: 15 }}
                  className={`w-32 h-32 xl:w-36 xl:h-36 bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-2xl border ${theme.border} ${theme.shadow} shadow-xl overflow-hidden flex items-center justify-center`}
                >
                  {char.img}
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@300;400&family=Creepster&display=swap');
        `}</style>
      </div>
    </>
  );
};

export default ValentineCard;