import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Analytics } from '@vercel/analytics/react';

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

// ✨ Partículas precalculadas para evitar re-render en cada frame
const READING_PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  startY: 110 + Math.random() * 20,
  endX: Math.random() * 100,
  duration: 18 + Math.random() * 12,
  delay: Math.random() * 10,
  scale: 0.6 + Math.random() * 0.8,
  kuromiIndex: i % 3,
}));

const CALENDAR_PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  startY: 110 + Math.random() * 20,
  endX: Math.random() * 100,
  duration: 20 + Math.random() * 14,
  delay: Math.random() * 12,
  scale: 0.5 + Math.random() * 0.7,
  kuromiIndex: i % 3,
  symbol: ['💖', '💕', '💗', '🌸', '✨', '💫'][i % 6],
}));

const ValentineCard = () => {
  const [viewMode, setViewMode] = useState('calendar');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, startIndex: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [kuromiMode, setKuromiMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [adultMode, setAdultMode] = useState(false);
  const [readCards, setReadCards] = useState([]);
  const audioRef = useRef(null);
  const isNavigatingRef = useRef(false); // 🔒 Bloquea onSelect durante navegación
  const kuromiImages = [kuromi4, kuromi2, kuromi3];

  const reunionDate = new Date(2025, 6, 12);
  const startDate = new Date(2026, 1, 16);

  const calculateDaysTogether = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reunion = new Date(reunionDate);
    reunion.setHours(0, 0, 0, 0);
    return Math.floor((today - reunion) / (1000 * 60 * 60 * 24));
  };
  const daysTogether = calculateDaysTogether();

  // 🔓 Sistema de desbloqueo
  const isCardUnlocked = useCallback((cardId) => {
    if (cardId <= 15) return true;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = new Date(startDate); start.setHours(0, 0, 0, 0);
    const daysAfterStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return (cardId - 15) <= daysAfterStart + 1;
  }, []);

  const getUnlockDate = (cardId) => {
    if (cardId <= 15) return null;
    const d = new Date(startDate);
    d.setDate(d.getDate() + (cardId - 16));
    return d;
  };

  const formatDate = (date) => {
    const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  // localStorage
  useEffect(() => {
    const saved = localStorage.getItem('readCards');
    if (saved) setReadCards(JSON.parse(saved));
  }, []);

  const markAsRead = useCallback((cardId) => {
    setReadCards(prev => {
      if (prev.includes(cardId)) return prev;
      const updated = [...prev, cardId];
      localStorage.setItem('readCards', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isCardNew = (cardId) => {
    if (!isCardUnlocked(cardId) || readCards.includes(cardId)) return false;
    const unlockDate = getUnlockDate(cardId);
    if (!unlockDate) return false;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    unlockDate.setHours(0, 0, 0, 0);
    return Math.floor((today - unlockDate) / (1000 * 60 * 60 * 24)) <= 2;
  };

  // Pool de personajes
  const allCharacters = [
    { img: <img src={kuromi} alt="Kuromi" className="w-full h-full object-cover" />, id: 'char1' },
    { img: <img src={tomie} alt="Tomie" className="w-full h-full object-cover" />, id: 'char2' },
    { img: <img src={emergencychar} alt="ec" className="w-full h-full object-fill" />, id: 'char3' },
    { img: <img src={zenitsu} alt="zenitsu" className="w-full h-full object-cover" />, id: 'char4' },
    { img: <img src={zenitsu2} alt="zenitsu2" className="w-full h-full object-cover" />, id: 'char5' },
    { img: <img src={fern1} alt="fern1" className="w-full h-full object-cover" />, id: 'char6' },
    { img: <img src={fern2} alt="fern2" className="w-full h-full object-cover" />, id: 'char7' },
    { img: <img src={hentai1} alt="h1" className="w-full h-full object-cover" />, id: 'char8' },
    { img: <img src={hentai2} alt="h2" className="w-full h-full object-cover" />, id: 'char9' },
    { img: <img src={hentai3} alt="h3" className="w-full h-full object-cover" />, id: 'char10' },
    { img: <img src={hentai4} alt="h4" className="w-full h-full object-cover" />, id: 'char11' },
    { img: <img src={hentai5} alt="h5" className="w-full h-full object-cover" />, id: 'char12' },
    { img: <img src={hentai6} alt="h6" className="w-full h-full object-cover" />, id: 'char13' },
    { img: <img src={hentai8} alt="h8" className="w-full h-full object-cover" />, id: 'char14' },
    { img: <img src={mitsuri2} alt="m2" className="w-full h-full object-cover" />, id: 'char15' },
    { img: <img src={hentai9} alt="h9" className="w-full h-full object-cover" />, id: 'char16' },
    { img: <img src={junjiito1} alt="j1" className="w-full h-full object-cover" />, id: 'char17' },
    { img: <img src={junjiito2} alt="j2" className="w-full h-full object-cover" />, id: 'char18' },
    { img: <img src={junjiito3} alt="j3" className="w-full h-full object-cover" />, id: 'char19' },
    { img: <img src={maomao1} alt="mm1" className="w-full h-full object-cover" />, id: 'char20' },
    { img: <img src={maomao2} alt="mm2" className="w-full h-full object-cover" />, id: 'char21' },
    { img: <img src={mitsuri1} alt="m1" className="w-full h-full object-cover" />, id: 'char22' },
    { img: <img src={yumeko1} alt="y1" className="w-full h-full object-cover" />, id: 'char23' },
    { img: <img src={junjiito4} alt="j4" className="w-full h-full object-cover" />, id: 'char24' },
    { img: <img src={mitsuri3} alt="m3" className="w-full h-full object-cover" />, id: 'char25' },
    { img: <img src={hentai10} alt="h10" className="w-full h-full object-cover" />, id: 'char26' },
    { img: <img src={hentai11} alt="h11" className="w-full h-full object-cover" />, id: 'char27' },
    { img: <img src={senku} alt="senku" className="w-full h-full object-cover" />, id: 'char28' },
    { img: <img src={toji} alt="toji" className="w-full h-full object-cover" />, id: 'char29' },
    { img: <img src={sunkenrock1} alt="sr1" className="w-full h-full object-cover" />, id: 'char30' },
    { img: <img src={loquita} alt="lq" className="w-full h-full object-cover" />, id: 'char31' },
  ];

  const photoGalleries = {
    gallery1: ['/characters/mara1.jpg', '/characters/mara11.jpg', '/characters/mara3.jpg'],
    gallery2: ['/characters/mara7.jpg', '/characters/mara4.jpg', '/characters/mara5.jpg'],
    gallery3: ['/characters/mara14.jpg', '/characters/mara12.jpg', '/characters/mara13.jpg']
  };

  // Precarga
  useEffect(() => {
    const imgs = [
      kuromi, tomie, emergencychar, zenitsu, zenitsu2, fern1, fern2,
      hentai1, hentai2, hentai3, hentai4, hentai5, hentai6, hentai8, hentai9,
      hentai10, hentai11, junjiito1, junjiito2, junjiito3, junjiito4,
      maomao1, maomao2, mitsuri1, mitsuri2, mitsuri3, yumeko1,
      senku, toji, sunkenrock1, loquita, kuromi2, kuromi3, kuromi4,
      ...photoGalleries.gallery1, ...photoGalleries.gallery2, ...photoGalleries.gallery3, regalo
    ];
    let loaded = 0;
    Promise.all(imgs.map(src => new Promise(res => {
      const img = new Image();
      img.onload = img.onerror = () => { loaded++; setLoadingProgress(Math.round(loaded / imgs.length * 100)); res(); };
      img.src = src;
    }))).then(() => setTimeout(() => setImagesLoaded(true), 500));
  }, []);

  const getUniqueCharacters = (usedIds) => {
    let available = allCharacters.filter(c => !usedIds.includes(c.id));
    if (available.length < 6) available = [...allCharacters];
    return [...available].sort(() => Math.random() - 0.5).slice(0, 6)
      .map((c, i) => ({ ...c, delay: 0.1 + i * 0.1 }));
  };

  // 🎨 Temas
  const themes = {
    blackPink: {
      name: "Black & Pink", bg: "from-black via-pink-950 to-black",
      cardBg: "from-pink-900/60 via-black/80 to-pink-900/60", textColor: "text-pink-100",
      titleColor: "from-pink-300 via-white to-pink-300", border: "border-pink-500/30",
      accentColor: "pink-500", characterBg: "from-pink-900/40 to-black/60", shadow: "shadow-pink-500/20",
      calendarBorder: "border-pink-500/60", calendarGlow: "shadow-pink-500/30", calendarAccent: "bg-pink-500/20"
    },
    horror: {
      name: "Horror Manga", bg: "from-zinc-950 via-red-950/20 to-zinc-950",
      cardBg: "from-zinc-900/80 via-red-950/40 to-zinc-900/80", textColor: "text-red-50",
      titleColor: "from-red-200 via-zinc-100 to-red-200", border: "border-red-900/50",
      accentColor: "red-900", characterBg: "from-red-950/30 to-zinc-900/60", shadow: "shadow-red-950/40",
      calendarBorder: "border-red-800/60", calendarGlow: "shadow-red-900/40", calendarAccent: "bg-red-900/20"
    },
    purple: {
      name: "Purple Dream", bg: "from-indigo-950 via-purple-950 to-indigo-950",
      cardBg: "from-purple-900/60 via-indigo-950/80 to-purple-900/60", textColor: "text-purple-100",
      titleColor: "from-purple-300 via-white to-purple-300", border: "border-purple-500/30",
      accentColor: "purple-500", characterBg: "from-purple-900/40 to-indigo-950/60", shadow: "shadow-purple-500/20",
      calendarBorder: "border-purple-500/60", calendarGlow: "shadow-purple-500/30", calendarAccent: "bg-purple-500/20"
    },
    gothic: {
      name: "Gothic Rose", bg: "from-black via-rose-950/40 to-black",
      cardBg: "from-rose-950/70 via-black/90 to-rose-950/70", textColor: "text-rose-100",
      titleColor: "from-rose-300 via-zinc-100 to-rose-300", border: "border-rose-800/40",
      accentColor: "rose-800", characterBg: "from-rose-950/50 to-black/70", shadow: "shadow-rose-950/30",
      calendarBorder: "border-rose-700/60", calendarGlow: "shadow-rose-800/30", calendarAccent: "bg-rose-900/20"
    },
    neon: {
      name: "Neon Night", bg: "from-slate-950 via-cyan-950/30 to-slate-950",
      cardBg: "from-cyan-900/50 via-slate-900/90 to-cyan-900/50", textColor: "text-cyan-100",
      titleColor: "from-cyan-300 via-white to-cyan-300", border: "border-cyan-500/40",
      accentColor: "cyan-500", characterBg: "from-cyan-900/40 to-slate-950/70", shadow: "shadow-cyan-500/30",
      calendarBorder: "border-cyan-500/60", calendarGlow: "shadow-cyan-500/30", calendarAccent: "bg-cyan-500/20"
    }
  };

  const kuromiThemes = {
    kawaii: themes.blackPink, pastel: themes.purple, lavender: themes.neon,
    magenta: themes.gothic, bubblegum: themes.blackPink
  };

  // 📇 Generación de cartas
  const generateCards = () => {
    const cards = []; let used = [];
    const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

    const push = (data) => {
      const chars = getUniqueCharacters(used);
      used = [...used, ...chars.map(c => c.id)];
      cards.push({ ...data, characters: chars, musicTimestamp: data.musicTimestamp ?? 0,
        theme: kuromiMode ? kuromiThemes.kawaii : data.theme });
    };

    push({ id:1, title:"Mara", message:"Con vos sentí cosas que no me pasaron con nadie más no por lo perfecto, sino por lo real. Me gustaste cuando estabas bien y también cuando estabas hecha un caos. Me importás sin condiciones y sin promesas y aun así con todo el amor que me nace", theme:themes.blackPink });
    push({ id:2, title:"Marita", message:"Hay una versión tuya que aparece en los detalles chicos: en cómo mirás, en cómo te reís sin darte cuenta, en cómo te enojás y a los cinco minutos ya no. Esa versión tuya es la que se me quedó en el pecho.", theme:themes.horror });
    push({ id:3, title:"Nuestros Momentos 💕", message:"Cada foto guarda un recuerdo especial de nosotros.", theme:themes.blackPink, isPhotoGallery:true, photos:photoGalleries.gallery1 });
    push({ id:4, title:"Sangrona", message:"Me enamoré incluso de tu carácter. De tu forma de decir las cosas, de no maquillarlas, de ser intensa cuando algo te importa. Nunca quise que seas distinta. Solo quise aprender a querer lo que ya sos.", theme:themes.purple });
    push({ id:5, title:"Más Recuerdos 🌸", message:"Momentos que siempre llevaré en mi corazón.", theme:themes.gothic, isPhotoGallery:true, photos:photoGalleries.gallery2 });
    push({ id:6, title:"Enojona", message:"A veces no te entiendo, y está bien. Porque querer a alguien no es comprenderlo todo, es elegirlo incluso cuando no se entiende. Y yo, en ese tiempo, te elegí", theme:themes.gothic, musicTimestamp:124 });
    
    // Carta 7 con modo +18
    const chars7 = getUniqueCharacters(used);
    used = [...used, ...chars7.map(c => c.id)];
    cards.push({ id:7, title:"Mi pequeño microbio",
      message: adultMode
        ? "Tenés esa forma tuya de hacerte la distraída mientras se me van los ojos a tus tetas y a cómo se te marca el culo sin ningún pudor. Tu ropa interior no es casualidad, es mensaje. Y esa parte tuya un poco exhibicionista, un poco pervertida, a mí me encanta. Jugás a provocar como si no importara, pero sabés muy bien lo que hacés y cómo me dejás."
        : "Tenés una forma muy tuya de provocar sin que parezca que lo hacés, como si no fuera intencional pero sabiendo perfectamente el efecto que generás, me atraés, sí, y no voy a fingir que no, pero lo que más me desarma no es solo tu cuerpo sino esa mezcla tuya de seguridad y juego, de carácter fuerte y sonrisa inesperada, porque no te deseo solo porque me gustás, te deseo porque sos vos, y eso para mí lo cambia todo.",
      theme: kuromiMode ? kuromiThemes.pastel : themes.horror, characters:chars7, musicTimestamp:0 });

    push({ id:8, title:"Juntos Siempre 💖", message:"Cada momento contigo es un tesoro que aprecio mucho.", theme:themes.purple, isPhotoGallery:true, photos:photoGalleries.gallery3 });
    push({ id:9, title:"Genuino", message:"Este regalo no es para convencerte de nada. Es para mostrarte quién soy cuando te amo. Soy intenso, sí. Soy sensible, sí. A veces me pierdo en lo que siento, también. Pero cuando amo, amo de verdad. Y hoy, sin dramatismo, sin presión, sin condiciones… puedo decirlo claro: Estoy enamorado de vos. Si querés caminar conmigo, voy a estar. Si necesitás volar distinto, también voy a respetarlo. Porque el amor que siento no quiere atarte. Quiere ser genuino. Y eso es lo que sos para mí: algo genuino.", theme:themes.blackPink });
    push({ id:10, title:"Te Elijo", message:"Amar no siempre es entender todo. Amar es elegir. Y yo te elijo. Te elijo cuando estamos bien. Te elijo cuando discutimos. Te elijo cuando no coincidimos. Te elijo incluso cuando no te entiendo del todo. Porque lo que siento por vos no es capricho, ni obsesión, ni costumbre. Es esa tranquilidad extraña que aparece cuando pienso en tu nombre. No necesito promesas eternas para sentir lo que siento. No necesito garantías para quererte. Solo necesito saber que lo que hay entre nosotros es real. Y lo es.", theme:themes.purple });
    push({ id:11, title:"Enamorado", message:"No quiero escribirte desde el miedo. Quiero escribirte desde lo que siento hoy, ahora, sin vueltas: Estoy enamorado de vos. No de una idea tuya. No de lo que podría ser. Estoy enamorado de la que sos. De tu carácter que a veces choca y a veces abraza. De tu forma de mirar cuando algo te importa. De tus silencios cuando estás pensando demasiado. De tu risa cuando se te escapa sin filtro. No te quiero perfecta. Te quiero real. Y real sos incluso cuando estás enojada, confundida o intensa.", theme:themes.gothic });
    push({ id:12, title:"Real", message:"No quiero escribirte algo perfecto. Quiero escribirte algo real. No soy el tipo más tranquilo cuando siente. No soy el más frío. No soy el que se hace el indiferente. Cuando algo me importa… me importa de verdad. Y vos me importás. No por lo que podrías ser. No por lo que imaginamos. Sino por lo que ya sos en mi vida. Me gusta cómo pensás. Me gusta cómo defendés lo que creés. Me gusta que no seas simple. No quiero una historia cómoda. Quiero una historia sincera.", theme:themes.neon });
    push({ id:13, title:"Ahora", message:"No sé si esto es amor eterno. No sé si esto es destino. No sé si dentro de diez años vamos a recordar esto riéndonos. Lo único que sé es lo que siento ahora. Y ahora siento algo fuerte. Algo que no me deja indiferente. Algo que me hace escribirte así. Si esto es amor, quiero que sea libre. Que no sea presión. Que no sea miedo. Que sea elección. Yo te estoy eligiendo. Yo estoy acá. No a medias.", theme:themes.horror });

    // Carta 14 - contador
    const chars14 = getUniqueCharacters(used); used = [...used, ...chars14.map(c => c.id)];
    const rDay = reunionDate.getDate(), rMonth = monthNames[reunionDate.getMonth()], rYear = reunionDate.getFullYear();
    cards.push({ id:14, title:`${daysTogether} Días Juntos 💕`,
      message:`Desde aquel ${rDay} de ${rMonth} de ${rYear}, han pasado ${daysTogether} días increíbles. Cada momento contigo es un regalo que atesoro.`,
      theme: kuromiMode ? kuromiThemes.bubblegum : themes.neon, characters:chars14, musicTimestamp:0 });

    push({ id:15, title:"Para Mi AMOR 💝", message:"Espero que estés disfrutando este día especial. Este regalo es solo una pequeña muestra de todo lo que significas para mí. No escribí todo esto para impresionarte, lo escribí porque sos vos. Porque con vos quiero intentar algo real, y si se da, construirlo juntos.", theme:themes.blackPink, isPhotoCard:true });

    // Cartas 16-45
    const newCards = [
      { id:16, title:"Equipo", message:"Quiero que seamos equipo. No dos personas que se quieren y ya, sino dos que eligen todos los días remar para el mismo lado. Que cuando uno afloje, el otro sostenga. Que cuando discutamos, recordemos que estamos del mismo lado. Porque el amor no es solo sentir, es decidir construir juntos.", theme:themes.gothic },
      { id:17, title:"Kuromis y Caos", message:"Me encanta que podamos ser intensos y boludos al mismo tiempo. Que un día hablemos de cosas profundas y al otro nos mandemos stickers de Kuromi todo el día. Que podamos ver horror juntos y después reírnos de cualquier pavada. Esa mezcla tuya de todo es lo que me tiene enganchado.", theme:themes.purple },
      { id:18, title:"Hogar", message:"Quiero que construyamos un lugar que sea nuestro. No hablo solo de paredes. Hablo de ese espacio donde podemos ser nosotros sin filtro. Donde tus días malos sean bienvenidos. Donde mis silencios no asusten. Un hogar que no sea un lugar, sino lo que generamos cuando estamos juntos.", theme:themes.blackPink },
      { id:19, title:"Tus Capas", message:"Me gusta que no seas simple. Que tengas capas que voy descubriendo de a poco. Que seas fuerte pero también vulnerable. Que tengas días donde estás imparable y días donde necesitás que te sostenga. Todas esas versiones tuyas me enamoran por igual.", theme:themes.neon },
      { id:20, title:"Pelear Bien", message:"No me asusta que discutamos. Me asusta que dejemos de hacerlo bien. Quiero que cuando estemos enojados, recordemos que nos queremos. Que podamos decir 'estoy molesto pero te amo' al mismo tiempo. Que nuestras peleas sean para entendernos mejor, no para lastimarnos más.", theme:themes.gothic },
      { id:21, title:"Planes Simples", message:"Quiero planes simples con vos. Ver una serie acurrucados. Ir a caminar sin rumbo. Quedarnos en la cama media hora más. Cocinar algo juntos aunque salga mal. Porque a veces lo mejor no son los grandes planes, sino el tiempo sin apuro.", theme:themes.purple },
      { id:22, title:"Crecer Juntos", message:"No quiero que seas la misma de hoy en 10 años. Quiero que crezcas, que cambies, que evoluciones. Y quiero estar ahí para ver cada versión nueva de vos. Porque amar no es aferrarse a quien sos hoy, es comprometerse a conocer a quien vas a ser mañana.", theme:themes.blackPink },
      { id:23, title:"Música Juntos", message:"Me encanta cuando agarrás mi celular y buscás canciones. Esa costumbre tuya de elegir qué escuchamos en el auto o cuando estamos en la puerta sin querer irte todavía. Cómo armás la vibe perfecta para cada momento. Esos ratos musicales son más nuestros que cualquier plan elaborado.", theme:themes.neon },
      { id:24, title:"Perdón Real", message:"Perdonar no es decir 'está bien' cuando no lo está. Es decir 'duele, pero te elijo igual'. Es soltar el rencor aunque cueste. Es entender que el error no define a la persona. Quiero que podamos perdonarnos de verdad, sin guardarnos cosas, sin venenos escondidos.", theme:themes.gothic },
      { id:25, title:"Momento Perfecto", message:"No necesito que todo sea perfecto. Necesito que sea real. Que sea nuestro. Que cuando me mires sepa que elegiste estar ahí. Eso para mí ya es perfecto.", theme:themes.purple },
      { id:26, title:"Refugio", message:"Quiero ser tu refugio cuando el mundo pese demasiado. Ese lugar donde no tengas que fingir que estás bien. Donde puedas llorar sin explicaciones. Donde tus miedos no sean ridículos. Porque a veces el amor es solo eso: ser el lugar donde el otro puede descansar.", theme:themes.blackPink },
      { id:27, title:"Reels de Terror", message:"Me gusta que nos pasemos reels y TikToks de películas de terror. Que después armemos la lista mental de cuáles ver. Que compartamos ese gusto medio oscuro. Es como nuestra forma rara de decir 'pensé en vos cuando vi esto' pero versión gore.", theme:themes.horror },
      { id:28, title:"Prioridad", message:"Hay días donde todo va a pedir nuestra atención: trabajo, familia, problemas, mil cosas. Y en esos días, quiero que recordemos ponernos primero. Que 10 minutos nuestros valgan más que 3 horas haciendo otras cosas. Porque si no nos cuidamos entre nosotros, nadie más lo va a hacer.", theme:themes.gothic },
      { id:29, title:"Presencia", message:"No necesito que estemos hablando todo el tiempo para sentirte cerca. A veces es solo saber que estás ahí. Un mensaje. Una foto. Saber que cuando nos veamos va a valer la espera.", theme:themes.neon },
      { id:30, title:"Futuro Sin Miedo", message:"No sé qué va a pasar mañana. No sé si vamos a tener todo lo que queremos. Pero sé que quiero intentarlo con vos. Que si hay tropiezos, los enfrentemos juntos. Que si hay dudas, las hablemos. Porque el futuro no me asusta si sé que vamos para el mismo lado.", theme:themes.blackPink },
      { id:31, title:"Complemento", message:"No somos iguales y está perfecto así. Donde vos sos más de una cosa, yo soy de otra. Y en vez de chocarnos, encajamos. Como dos piezas raras que solo tienen sentido juntas. Nuestras diferencias no nos separan, nos hacen más interesantes.", theme:themes.purple },
      { id:32, title:"Comunicar Mejor", message:"Prometo intentar decir las cosas antes de que exploten. Pedir lo que necesito en vez de esperar que lo adivines. Escucharte de verdad cuando hables. Porque la mayoría de los problemas no vienen del amor que falta, sino de las palabras que sobran o faltan.", theme:themes.gothic },
      { id:33, title:"Dos Locos", message:"A veces pienso que somos dos locos que se encontraron. Dos intensos que se entienden. Dos raros que encajan. Y no lo cambiaría por nada más normal del mundo.", theme:themes.neon },
      { id:34, title:"Paciencia", message:"No todo va a fluir siempre. Habrá momentos donde uno esté bien y el otro mal. Donde queramos cosas distintas al mismo tiempo. Y ahí va a aparecer la paciencia. Esa que dice 'esperemos, hablemos, entendámonos'. Porque apurarse es fácil, pero esperar juntos es amor.", theme:themes.blackPink },
      { id:35, title:"Tus Gustos Raros", message:"Me gusta que tengas gustos que no tienen sentido juntos. Que puedas amar lo cute y lo oscuro al mismo tiempo. Que colecciones cosas random. Que te obsesiones con algo nuevo cada mes. Todas esas rarezas tuyas son las que te hacen vos.", theme:themes.horror },
      { id:36, title:"Confiar", message:"Quiero que confiemos el uno en el otro. No solo en fidelidad, que eso es lo obvio. Confiar en que si me prometes algo, lo cumplís. En que si te digo algo, lo respetás. En que nuestras palabras valen. Porque sin confianza, todo lo demás se cae.", theme:themes.gothic },
      { id:37, title:"Nuestra Paz", message:"Con vos encontré algo que no sabía que necesitaba: paz en medio del caos. Alguien con quien puedo ser un desastre y aun así sentirme en casa.", theme:themes.purple },
      { id:38, title:"Vulnerables", message:"Quiero que podamos mostrarnos débiles sin miedo. Que yo pueda decirte 'hoy no puedo' y vos 'necesito que me abraces'. Que ser vulnerable no sea una amenaza sino un regalo. Porque solo cuando nos mostramos reales podemos amarnos de verdad.", theme:themes.blackPink },
      { id:39, title:"Momentos Guardados", message:"Guardo cada foto que sacamos juntos. Las de nuestras salidas, las que te tomo cuando no te das cuenta, las que nos sacamos medio boludos. Porque en cada una hay un momento nuestro que no quiero olvidar. Esos recuerdos son de lo más valioso que tengo.", theme:themes.neon },
      { id:40, title:"Sostener", message:"Habrá días donde vos no puedas y yo sí. Y días donde yo esté roto y vos entera. En esos días, el que puede sostiene al que no. Sin llevar la cuenta, sin cobrar después. Simplemente porque así funciona esto: nos turnamos para ser fuertes.", theme:themes.gothic },
      { id:41, title:"Nuestra Burbuja", message:"Me encanta cuando estamos en nuestra burbuja. Donde nada más importa. Donde el resto del mundo puede esperar. Donde solo existimos vos y yo y este momento.", theme:themes.purple },
      { id:42, title:"Madurar Juntos", message:"No quiero un amor de película. Quiero uno maduro, real, imperfecto. Uno que entienda que no todo es magia, que a veces hay que trabajar. Que discutir no es fracasar. Que amar no es solo sentir mariposas, es elegir quedarse incluso cuando ya no vuelan tanto.", theme:themes.blackPink },
      { id:43, title:"Ritmo Propio", message:"Esto no tiene que parecerse a la relación de nadie más. Puede ser rara, única, totalmente nuestra. A nuestro ritmo, con nuestras reglas. Y si para otros no tiene sentido, perfecto. Mientras tenga sentido para nosotros.", theme:themes.neon },
      { id:44, title:"Siempre Volver", message:"Vamos a alejarnos a veces. Por enojo, por miedo, por cansancio. Y está bien. Lo importante es que siempre volvamos. Que después de la pelea haya un abrazo. Que después del silencio haya una conversación. Que siempre encontremos el camino de regreso al otro.", theme:themes.gothic },
      { id:45, title:"Te Elijo", message:"No te prometo perfección. No te prometo que nunca voy a cagarla. Te prometo que voy a intentar. Todos los días. Intentar entenderte, intentar mejorar, intentar ser el compañero que merecés. Y cuando falle, voy a intentar de nuevo. Porque vos valés cada intento. Te elijo hoy, mañana, y todos los días que vengan.", theme:themes.blackPink }
    ];

    newCards.forEach(card => push(card));
    return cards;
  };

  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    if (imagesLoaded) setCardsData(generateCards());
  }, [kuromiMode, daysTogether, imagesLoaded, adultMode]);

  // ✅ unlockedCards ANTES de openCard para que esté disponible
  const unlockedCards = cardsData.filter(c => isCardUnlocked(c.id));
  const newCardsCount = unlockedCards.filter(c => isCardNew(c.id)).length;

  // ✅ openCard con protección anti-flickering
  const openCard = useCallback((cardId) => {
    if (!isCardUnlocked(cardId)) return;
    const freshUnlocked = cardsData.filter(c => isCardUnlocked(c.id));
    const idx = freshUnlocked.findIndex(c => c.id === cardId);
    if (idx === -1) return;
    isNavigatingRef.current = true; // 🔒 Bloquear onSelect
    setSelectedIndex(idx);
    setViewMode('reading');
  }, [cardsData, isCardUnlocked]);

  // Cuando cambia a lectura, scroll instantáneo y liberar lock
  useEffect(() => {
    if (viewMode === 'reading' && emblaApi) {
      setTimeout(() => {
        emblaApi.scrollTo(selectedIndex, true); // true = sin animación (instantáneo)
        setTimeout(() => {
          isNavigatingRef.current = false; // 🔓 Liberar lock después del scroll
        }, 100);
      }, 50);
    }
  }, [viewMode, emblaApi, selectedIndex]);

  // Música
  const [hasTriggeredClimax, setHasTriggeredClimax] = useState(false);
  useEffect(() => {
    if (!audioRef.current || !isPlaying || cardsData.length === 0) return;
    const ts = cardsData[selectedIndex]?.musicTimestamp;
    if (ts > 0 && !hasTriggeredClimax) {
      audioRef.current.currentTime = ts;
      setHasTriggeredClimax(true);
    }
    if (selectedIndex === 0 && hasTriggeredClimax) setHasTriggeredClimax(false);
  }, [selectedIndex, cardsData, isPlaying, hasTriggeredClimax]);

  const onSelect = useCallback(() => {
    if (!emblaApi || isNavigatingRef.current) return; // 🔒 Respetar lock
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Marcar como leída
  useEffect(() => {
    if (viewMode === 'reading' && unlockedCards[selectedIndex]) {
      markAsRead(unlockedCards[selectedIndex].id);
    }
  }, [selectedIndex, viewMode]);

  const handleStart = () => {
    setShowIntro(false);
    audioRef.current?.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const currentCard = unlockedCards[selectedIndex] || unlockedCards[0];
  const theme = currentCard?.theme || themes.blackPink;

  // Loading
  if (!imagesLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-950 to-black flex flex-col items-center justify-center">
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:200 }} className="text-center">
          <motion.div animate={{ rotate:360 }} transition={{ duration:2, repeat:Infinity, ease:"linear" }} className="text-6xl lg:text-8xl mb-6">💖</motion.div>
          <h2 className="text-2xl lg:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 mb-4" style={{ fontFamily:"'Playfair Display', serif" }}>Preparando tu regalo...</h2>
          <div className="w-64 lg:w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div className="h-full bg-gradient-to-r from-pink-500 to-rose-500" initial={{ width:0 }} animate={{ width:`${loadingProgress}%` }} transition={{ duration:0.3 }} />
          </div>
          <p className="mt-4 text-pink-200 text-lg">{loadingProgress}%</p>
        </motion.div>
      </div>
    );
  }

  if (cardsData.length === 0) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando...</div>;

  return (
    <>
      {/* INTRO */}
      <AnimatePresence>
        {showIntro && (
          <motion.div initial={{ opacity:1 }} exit={{ opacity:0, scale:1.2 }} transition={{ duration:1 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-950 via-rose-950 to-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(30)].map((_,i) => (
                <motion.div key={i} className="absolute text-4xl lg:text-6xl"
                  initial={{ x:Math.random()*(typeof window!=='undefined'?window.innerWidth:1000), y:-100, rotate:Math.random()*360, opacity:0.7 }}
                  animate={{ y:(typeof window!=='undefined'?window.innerHeight:1000)+100, rotate:Math.random()*360+360 }}
                  transition={{ duration:5+Math.random()*5, repeat:Infinity, delay:Math.random()*5, ease:"linear" }}>
                  💖
                </motion.div>
              ))}
            </div>
            <div className="relative z-10 text-center px-4">
              <motion.h1 initial={{ y:-50, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.5, type:"spring" }}
                className="text-5xl lg:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 mb-8"
                style={{ fontFamily:"'Playfair Display', serif" }}>
                Para Mara
              </motion.h1>
              <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:1, type:"spring", stiffness:200 }}>
                <motion.button onClick={handleStart} whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
                  className="group relative px-12 py-6 text-2xl lg:text-3xl font-bold text-white rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x:['-100%','100%'] }} transition={{ duration:2, repeat:Infinity, repeatDelay:1 }} />
                  <span className="relative z-10 flex items-center gap-3">💕 Toque para Empezar 💕</span>
                </motion.button>
              </motion.div>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
                className="mt-8 text-pink-200 text-lg lg:text-xl">
                Active el sonido del dispositivo para una mejor experiencia
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} loop><source src="/music/in-the-pool.mp3" type="audio/mpeg" /></audio>

      {!showIntro && (
        <div className={`min-h-screen min-h-[100dvh] bg-gradient-to-br ${viewMode === 'calendar' ? 'from-black via-pink-950 to-black' : theme.bg} transition-all duration-700`}>

          {/* BARRA SUPERIOR */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button onClick={toggleMusic} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                    isPlaying ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/50' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}>
                  {isPlaying ? '🔊' : '🔇'}
                </motion.button>
                <div className="text-white">
                  <p className="text-xs sm:text-sm text-white/60">Progreso</p>
                  <p className="text-sm sm:text-base font-bold">{unlockedCards.length}/{cardsData.length} cartas</p>
                </div>
              </div>

              <motion.button onClick={() => setViewMode(viewMode === 'calendar' ? 'reading' : 'calendar')}
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                className="px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base font-medium flex items-center gap-2">
                {viewMode === 'calendar' ? '📖 Leer' : '📅 Calendario'}
                {newCardsCount > 0 && viewMode === 'reading' && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{newCardsCount}</span>
                )}
              </motion.button>

              <div className="flex items-center gap-2">
                <motion.button onClick={() => setKuromiMode(!kuromiMode)} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    kuromiMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}>
                  {kuromiMode ? '💜' : '🎀'}
                </motion.button>
                <motion.button onClick={() => setAdultMode(!adultMode)} whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    adultMode ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'}`}>
                  +18
                </motion.button>
              </div>
            </div>
          </div>

          {/* ==================== VISTA CALENDARIO ==================== */}
          {viewMode === 'calendar' && (
            <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto relative overflow-hidden">

              {/* 💖 CORAZONES / KUROMIS DE FONDO EN CALENDARIO */}
              <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {CALENDAR_PARTICLES.map((p) => (
                  <motion.div key={p.id}
                    className={`absolute ${kuromiMode ? 'w-12 h-12 sm:w-16 sm:h-16' : 'text-2xl sm:text-3xl'}`}
                    style={{ left:`${p.startX}%`, opacity: 0.15 }}
                    initial={{ y:'110vh', x:`${p.startX}%` }}
                    animate={{ y:'-10vh', x:`${p.endX}%` }}
                    transition={{ duration:p.duration, repeat:Infinity, delay:p.delay, ease:'linear' }}>
                    {kuromiMode ? (
                      <img src={kuromiImages[p.kuromiIndex]} alt="K"
                        className="w-full h-full object-contain drop-shadow-lg"
                        style={{ transform:`scale(${p.scale})` }} />
                    ) : (
                      <span>{p.symbol}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10">
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-8">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 mb-4"
                      style={{ fontFamily:"'Playfair Display', serif" }}>
                    30 Días de Amor
                  </h2>
                  <p className="text-pink-200 text-lg">Una carta nueva cada día 💕</p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {cardsData.map((card) => {
                    const unlocked = isCardUnlocked(card.id);
                    const isNew = isCardNew(card.id);
                    const unlockDate = getUnlockDate(card.id);
                    // 🎨 Tema activo para esta carta
                    const cardTheme = kuromiMode ? kuromiThemes.kawaii : card.theme;

                    return (
                      <motion.div key={card.id}
                        initial={{ opacity:0, scale:0.8 }}
                        animate={{ opacity:1, scale:1 }}
                        transition={{ delay:card.id * 0.015 }}
                        whileHover={unlocked ? { scale:1.06, y:-4 } : {}}
                        onClick={() => unlocked && openCard(card.id)}
                        className={`relative aspect-[3/4] rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                          unlocked
                            ? `${cardTheme.calendarBorder} shadow-lg ${cardTheme.calendarGlow} hover:shadow-xl cursor-pointer`
                            : 'border-white/10 opacity-40 cursor-not-allowed'
                        }`}>

                        {/* Fondo temático */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${
                          unlocked ? cardTheme.cardBg : 'from-zinc-900/80 to-zinc-950/80'
                        }`} />

                        {/* Overlay de color del tema */}
                        {unlocked && (
                          <div className={`absolute inset-0 ${cardTheme.calendarAccent}`} />
                        )}

                        {/* Número */}
                        <div className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 bg-black/60 rounded-full flex items-center justify-center z-10">
                          <span className="text-white text-xs sm:text-sm font-bold">{card.id}</span>
                        </div>

                        {/* Badge NUEVO */}
                        {isNew && (
                          <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                            className="absolute top-2 right-2 px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full z-10">
                            ✨
                          </motion.div>
                        )}

                        {/* Contenido */}
                        <div className="relative h-full flex flex-col items-center justify-center p-3 z-10">
                          {unlocked ? (
                            <>
                              <motion.div className="text-3xl sm:text-4xl mb-2"
                                animate={{ scale:[1, 1.1, 1] }}
                                transition={{ duration:2.5, repeat:Infinity, delay:card.id * 0.1 }}>
                                {card.isPhotoGallery ? '📸' : card.isPhotoCard ? '🎁' : '💌'}
                              </motion.div>
                              <h3 className={`${cardTheme.textColor} text-center text-xs sm:text-sm font-bold line-clamp-2 drop-shadow`}>
                                {card.title}
                              </h3>
                              {/* Línea decorativa del tema */}
                              <div className={`mt-2 h-px w-8 bg-gradient-to-r ${cardTheme.titleColor} opacity-60`} />
                            </>
                          ) : (
                            <>
                              <div className="text-3xl sm:text-4xl mb-2 opacity-50">🔒</div>
                              {unlockDate && (
                                <p className="text-white/50 text-xs text-center leading-tight">
                                  Se desbloquea<br/>
                                  <span className="font-bold text-white/70">{formatDate(unlockDate)}</span>
                                </p>
                              )}
                            </>
                          )}
                        </div>

                        {/* Shimmer */}
                        {unlocked && (
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-20"
                            animate={{ x:['-100%','100%'] }}
                            transition={{ duration:3.5, repeat:Infinity, repeatDelay:card.id * 0.3 + 1 }} />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================== VISTA LECTURA ==================== */}
          {viewMode === 'reading' && (
            <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-8 overflow-hidden relative pt-20">

              {/* Partículas de fondo */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                {READING_PARTICLES.map((p) => (
                  <motion.div key={p.id}
                    className={`absolute ${kuromiMode ? 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24' : 'text-4xl'}`}
                    style={{ left:`${p.startX}%` }}
                    initial={{ y:'110vh' }}
                    animate={{ y:'-10vh', x:`${(p.endX - p.startX) * 0.3}vw` }}
                    transition={{ duration:p.duration, repeat:Infinity, delay:p.delay, ease:'linear' }}>
                    {kuromiMode ? (
                      <img src={kuromiImages[p.kuromiIndex]} alt="K"
                        className="w-full h-full object-contain drop-shadow-lg"
                        style={{ transform:`scale(${p.scale})`, opacity: 0.7 }} />
                    ) : (
                      <span className={
                        theme.name==="Horror Manga"?'text-red-900':
                        theme.name==="Black & Pink"?'text-pink-500':
                        theme.name==="Purple Dream"?'text-purple-500':
                        theme.name==="Gothic Rose"?'text-rose-800':
                        theme.name==="Neon Night"?'text-cyan-500':'text-pink-400'
                      }>{theme.name==="Horror Manga"?'🩸':'♥'}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="w-full max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">

                  {/* Personajes izquierda desktop */}
                  <div className="hidden lg:flex flex-col gap-4">
                    {currentCard?.characters.slice(0,3).map((char, idx) => (
                      <motion.div key={`left-${selectedIndex}-${idx}`}
                        initial={{ x:-100, opacity:0, scale:0.5 }} animate={{ x:0, opacity:1, scale:1 }}
                        transition={{ delay:char.delay, type:"spring", damping:15 }}
                        className={`w-32 h-32 xl:w-36 xl:h-36 bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-2xl border ${theme.border} ${theme.shadow} shadow-xl overflow-hidden flex items-center justify-center`}>
                        {char.img}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex-1 w-full max-w-2xl">
                    {/* Personajes móvil */}
                    <div className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 px-1">
                      {currentCard?.characters.map((char, idx) => (
                        <motion.div key={`mob-${selectedIndex}-${idx}`}
                          initial={{ y:-50, opacity:0, scale:0.5 }} animate={{ y:0, opacity:1, scale:1 }}
                          transition={{ delay:char.delay, type:"spring", damping:20 }}
                          className={`w-full aspect-square bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-xl border ${theme.border} shadow-lg overflow-hidden flex items-center justify-center`}>
                          {char.img}
                        </motion.div>
                      ))}
                    </div>

                    {/* Carrusel */}
                    <div className="overflow-hidden" ref={emblaRef}>
                      <div className="flex">
                        {unlockedCards.map((card, index) => (
                          <div key={card.id} className="flex-[0_0_100%] min-w-0 px-1 sm:px-2">
                            {selectedIndex === index && (
                              <div className={`bg-gradient-to-br ${card.theme.cardBg} backdrop-blur-xl rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] border ${card.theme.border} ${card.theme.shadow} shadow-2xl overflow-hidden`}>

                                <div className={`bg-gradient-to-r ${card.theme.characterBg} p-4 sm:p-6 lg:p-10 text-center border-b ${card.theme.border}`}>
                                  <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r ${card.theme.titleColor} tracking-wider`}
                                      style={{ fontFamily:"'Playfair Display', serif" }}>
                                    {card.title}
                                  </h2>
                                  <div className={`mt-3 sm:mt-4 h-px w-32 sm:w-40 mx-auto bg-gradient-to-r ${card.theme.titleColor} opacity-60`} />
                                </div>

                                <div className="p-6 sm:p-8 lg:p-16 min-h-[200px] sm:min-h-[260px] lg:min-h-[400px] flex flex-col items-center justify-center gap-6">
                                  {card.isPhotoGallery && card.photos && (
                                    <div className="w-full max-w-lg">
                                      <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                        {card.photos.map((photo, idx) => (
                                          <motion.div key={idx} initial={{ scale:0, rotate:-10 }} animate={{ scale:1, rotate:0 }}
                                            transition={{ delay:0.1*idx, type:"spring", damping:10 }} className="relative aspect-square">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-xl blur opacity-50" />
                                            <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-pink-300/50 shadow-lg">
                                              <img src={photo} alt={`M${idx+1}`} className="w-full h-full object-cover" />
                                            </div>
                                          </motion.div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {card.isPhotoCard && (
                                    <motion.div initial={{ scale:0, rotate:-10 }} animate={{ scale:1, rotate:0 }}
                                      transition={{ delay:0.2, type:"spring", damping:10 }} className="relative">
                                      <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-3xl blur-xl opacity-70" />
                                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-4 border-pink-300/50 shadow-2xl">
                                        <img src={regalo} alt="Para ti" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                      </div>
                                    </motion.div>
                                  )}
                                  <p className={`text-lg sm:text-xl lg:text-3xl ${card.theme.textColor} leading-relaxed text-center font-light ${(card.isPhotoCard||card.isPhotoGallery)?'max-w-lg':''}`}
                                     style={{
                                       fontFamily:(!kuromiMode && card.theme.name==="Horror Manga")?"'Creepster', cursive":"'Cormorant Garamond', serif",
                                       textShadow:(!kuromiMode && card.theme.name==="Horror Manga")?'0 0 20px rgba(0,0,0,0.8)':'0 2px 20px rgba(0,0,0,0.3)'
                                     }}>
                                    {card.message}
                                  </p>
                                </div>

                                <div className={`p-4 sm:p-6 flex justify-center gap-2 sm:gap-3 bg-gradient-to-t ${card.theme.characterBg}`}>
                                  {unlockedCards.map((_, idx) => (
                                    <button key={idx} onClick={() => emblaApi?.scrollTo(idx)}
                                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
                                        idx === selectedIndex
                                          ? `w-10 sm:w-12 shadow-lg bg-gradient-to-r ${card.theme.titleColor}`
                                          : 'w-2 sm:w-2.5 bg-white/20 hover:bg-white/40'
                                      }`} />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
                      <motion.button onClick={scrollPrev} whileHover={{ scale:1.15, x:-3 }} whileTap={{ scale:0.95 }}
                        className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm border ${theme.border} flex items-center justify-center ${theme.textColor} text-xl sm:text-2xl lg:text-3xl shadow-xl`}>
                        ←
                      </motion.button>
                      <motion.button onClick={scrollNext} whileHover={{ scale:1.15, x:3 }} whileTap={{ scale:0.95 }}
                        className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm border ${theme.border} flex items-center justify-center ${theme.textColor} text-xl sm:text-2xl lg:text-3xl shadow-xl`}>
                        →
                      </motion.button>
                    </div>
                  </div>

                  {/* Personajes derecha desktop */}
                  <div className="hidden lg:flex flex-col gap-4">
                    {currentCard?.characters.slice(3,6).map((char, idx) => (
                      <motion.div key={`right-${selectedIndex}-${idx}`}
                        initial={{ x:100, opacity:0, scale:0.5 }} animate={{ x:0, opacity:1, scale:1 }}
                        transition={{ delay:char.delay, type:"spring", damping:15 }}
                        className={`w-32 h-32 xl:w-36 xl:h-36 bg-gradient-to-br ${theme.characterBg} backdrop-blur-sm rounded-2xl border ${theme.border} ${theme.shadow} shadow-xl overflow-hidden flex items-center justify-center`}>
                        {char.img}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@300;400&family=Creepster&display=swap');
          `}</style>
        </div>
      )}

      <Analytics />
    </>
  );
};

export default ValentineCard;