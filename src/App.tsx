import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Instagram, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Scale,
  Shield,
  Gavel,
  FileText,
  Users,
  Clock,
  MessageSquare,
  Send,
  Award,
  Heart,
  CheckCircle2,
  TrendingUp,
  Newspaper,
  Crown,
  Bird,
  PawPrint,
  Search
} from 'lucide-react';

// --- Types ---
interface Service {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  features?: string[];
  icon: React.ReactNode;
  image?: string;
  video?: string;
}

interface CaseResult {
  id: number;
  title: string;
  stat: string;
  description: string;
  comments: { sender: string; text: string; time: string }[];
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
}

// --- Data ---
const HERO_SLIDES = [
  {
    image: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/leao01.png",
    segments: [
      { text: "A advocacia ", bold: false },
      { text: "não", bold: true },
      { text: "\n", bold: false },
      { text: "é profissão", bold: true },
      { text: " de covardes.", bold: false }
    ],
    author: "Heráclito Fontoura Sobral Pinto",
    align: "left"
  },
  {
    image: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/agua01.png",
    segments: [
      { text: "A justiça atrasada\n", bold: false },
      { text: "não é justiça, senão", bold: true },
      { text: "\ninjustiça qualificada e manifesta.", bold: false }
    ],
    author: "Rui Barbosa",
    align: "left"
  },
  {
    image: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/urso.png",
    segments: [
      { text: "A força do direito\n", bold: false },
      { text: "deve superar o direito", bold: true },
      { text: " da força.", bold: false }
    ],
    author: "Rui Barbosa",
    align: "right"
  }
];

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Defesa Criminal Estratégica",
    description: "Atuação em todas as fases do processo penal, com foco em resultados e preservação da liberdade.",
    fullDescription: "Nossa atuação estratégica abrange desde a análise minuciosa dos autos até a implementação de teses defensivas inovadoras. Focamos na preservação dos direitos fundamentais e na busca incessante pela melhor solução jurídica para cada caso, seja através da absolvição, desclassificação ou aplicação de penas alternativas.",
    features: [
      "Análise técnica de provas e evidências",
      "Acompanhamento em depoimentos e interrogatórios",
      "Elaboração de teses defensivas personalizadas",
      "Atuação em crimes complexos e de alta repercussão"
    ],
    icon: <Shield className="w-6 h-6" />,
    video: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/espada01.mp4"
  },
  {
    id: 3,
    title: "Habeas Corpus",
    description: "Medidas urgentes para cessar constrangimentos ilegais e garantir o direito de ir e vir.",
    fullDescription: "O Habeas Corpus é o remédio constitucional mais importante para a proteção da liberdade. Atuamos com extrema urgência na impetração de medidas para cessar prisões ilegais, abusos de autoridade e qualquer forma de constrangimento que fira o direito fundamental de locomoção do cidadão.",
    features: [
      "Impetração em regime de plantão 24h",
      "Combate a prisões preventivas desnecessárias",
      "Sustentação oral em Tribunais Superiores",
      "Garantia do devido processo legal"
    ],
    icon: <Scale className="w-6 h-6" />,
    video: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/haeasvideo.mp4"
  },
  {
    id: 2,
    title: "Tribunal do Júri",
    description: "Defesa técnica e humanizada perante o Conselho de Sentença, com vasta experiência em casos complexos.",
    fullDescription: "O Tribunal do Júri é o ápice da advocacia criminal. Nossa equipe possui vasta experiência na oratória e persuasão perante o Conselho de Sentença. Atuamos em crimes dolosos contra a vida, garantindo que a voz do acusado seja ouvida com clareza, técnica e humanidade, buscando sempre a justiça através da verdade dos fatos.",
    features: [
      "Plenários de alta complexidade",
      "Seleção criteriosa de jurados",
      "Uso de recursos visuais e perícias técnicas",
      "Defesa apaixonada e tecnicamente impecável"
    ],
    icon: <Gavel className="w-6 h-6" />,
    video: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/penaoa.mp4"
  },
  {
    id: 4,
    title: "Recursos nos Tribunais",
    description: "Elaboração de teses defensivas para Tribunais Estaduais e Superiores (STJ e STF).",
    fullDescription: "A justiça não termina na primeira instância. Especializamo-nos na elaboração de recursos técnicos para Tribunais de Justiça, Tribunais Regionais Federais, STJ e STF. Analisamos nulidades processuais e erros de julgamento para reverter decisões desfavoráveis e garantir a correta aplicação da lei.",
    features: [
      "Apelações e Recursos Especiais/Extraordinários",
      "Memorial de defesa para Desembargadores e Ministros",
      "Sustentações orais estratégicas",
      "Análise de jurisprudência atualizada"
    ],
    icon: <FileText className="w-6 h-6" />,
    video: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/portaaberta.mp4"
  },
  {
    id: 5,
    title: "Audiência de Custódia",
    description: "Presença imediata para garantir os direitos do detido e buscar a liberdade provisória.",
    fullDescription: "As primeiras horas após uma prisão são cruciais. Nossa equipe atua de forma imediata em audiências de custódia para verificar a legalidade da prisão, prevenir maus-tratos e pleitear a liberdade provisória ou medidas cautelares diversas da prisão, garantindo que o cliente responda ao processo em liberdade.",
    features: [
      "Atendimento imediato pós-flagrante",
      "Verificação de integridade física e direitos",
      "Pedido de liberdade provisória fundamentado",
      "Acompanhamento integral na central de custódia"
    ],
    icon: <Clock className="w-6 h-6" />,
    video: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/bronze.mp4"
  },
  {
    id: 6,
    title: "Inquérito Policial",
    description: "Defesa preventiva desde a fase investigativa para evitar abusos e indiciamentos indevidos.",
    fullDescription: "A defesa criminal deve começar antes mesmo do processo judicial. Atuamos de forma incisiva em Inquéritos Policiais, acompanhando depoimentos, requerendo diligências e garantindo que a investigação seja conduzida de forma justa, evitando indiciamentos precipitados e protegendo a reputação do investigado.",
    features: [
      "Acompanhamento em delegacias",
      "Produção antecipada de provas",
      "Pedido de trancamento de inquérito",
      "Gestão de crise e imagem"
    ],
    icon: <Users className="w-6 h-6" />,
    video: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/ouro.mp4"
  }
];

const RESULTS: CaseResult[] = [
  {
    id: 2,
    title: "Habeas Corpus",
    stat: "Ordens Concedidas",
    description: "Atuação técnica para revogação de prisões ilegais.",
    comments: [
      { sender: "Juliana S.", text: "Meu irmão está em casa! O HC foi aceito em tempo recorde.", time: "11:30" },
      { sender: "Marcos T.", text: "Liberdade restabelecida. Obrigado pela agilidade Dr.", time: "16:20" },
      { sender: "Patrícia R.", text: "Excelente atuação técnica no pedido de liberdade.", time: "08:15" }
    ]
  },
  {
    id: 4,
    title: "Repercussão Nacional",
    stat: "",
    description: "Processos acompanhados com foco em garantias e direitos fundamentais.",
    comments: [
      { sender: "Sérgio V.", text: "Caso complexo resolvido com maestria. Recomendo!", time: "17:30" },
      { sender: "Ana Paula", text: "Dedicação total ao processo. Transparência nota 10.", time: "12:25" },
      { sender: "Luís F.", text: "Atuação brilhante em caso de grande repercussão.", time: "14:50" }
    ]
  },
  {
    id: 5,
    title: "Sustentações Orais",
    stat: "Atuação em Tribunais",
    description: "Atuação técnica perante Tribunais de Justiça e Superiores em todo o país.",
    comments: [
      { sender: "Tribunal", text: "Sustentação oral de altíssimo nível técnico.", time: "11:15" },
      { sender: "Fernando K.", text: "Emocionante ver a defesa no tribunal. Vitória merecida.", time: "16:40" },
      { sender: "Beatriz M.", text: "Domínio total da tribuna. Convenceu os desembargadores.", time: "09:20" }
    ]
  },
  {
    id: 6,
    title: "Clientes Satisfeitos",
    stat: "300 satisfeitos",
    description: "Pessoas que tiveram seus direitos preservados com excelência.",
    comments: [
      { sender: "João P.", text: "Atendimento humano e muito profissional. Nota mil.", time: "10:55" },
      { sender: "Carla G.", text: "Sempre disponível para tirar dúvidas. Me senti segura.", time: "15:35" },
      { sender: "Renato S.", text: "O melhor investimento que fiz para minha defesa.", time: "13:10" }
    ]
  }
];

const ABOUT_IMAGES = [
  "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/pp.jpeg",
  "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/ppp.jpeg",
  "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/pppp.jpeg",
  "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/ppppppppppp.jpeg"
];

const QUALIFICATIONS = [
  "Bacharel em Direito pela Pontifícia Universidade Católica de Minas Gerais – Campus Praça da Liberdade",
  "Licenciatura em Ciências Sociais pela Faculdade IBRA – Centro Universitário ETEP",
  "Pós-Graduação em Advocacia Criminal – Escola Superior de Advocacia OAB/MG – Universidade FUMEC",
  "Pós-Graduação em Direito Constitucional Aplicado – Faculdade Legale",
  "Pós-Graduação em Educação, Tecnologia e Docência Jurídica – Faculdade CEDIN"
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Direitos na Audiência de Custódia",
    excerpt: "Entenda por que as primeiras 24 horas são cruciais para a sua defesa.",
    content: "A audiência de custódia não é apenas uma formalidade; é o momento onde a sua liberdade é decidida. É o filtro contra prisões arbitrárias e o primeiro contato com o juiz. Estar acompanhado de uma defesa técnica especializada faz toda a diferença entre voltar para casa ou enfrentar um processo encarcerado. Não deixe sua liberdade ao acaso, conheça seus direitos e exija o respeito às garantias constitucionais.",
    date: "20 Mar 2026",
    category: "Direito Criminal",
    image: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/paulo.png"
  },
  {
    id: 2,
    title: "Defesa Técnica no Inquérito",
    excerpt: "Como uma atuação preventiva pode evitar o indiciamento indevido.",
    content: "O inquérito policial é a fase mais perigosa de um processo. É aqui que as provas são colhidas, muitas vezes sem o devido contraditório. Uma defesa ativa desde o primeiro minuto pode mudar o rumo das investigações, apresentando provas de inocência e evitando um indiciamento precipitado. A estratégia certa começa antes mesmo da denúncia ser oferecida. Antecipe-se ao problema.",
    date: "15 Mar 2026",
    category: "Estratégia",
    image: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/estrategica.png"
  },
  {
    id: 3,
    title: "Humanização do Processo",
    excerpt: "Por que o foco no ser humano é a melhor estratégia de excelência.",
    content: "Por trás de cada número de processo, existe uma história, uma família e um ser humano. A advocacia criminal de excelência não olha apenas para os autos, mas para a pessoa. Humanizar o processo é garantir que o juiz veja além do crime imputado, compreendendo o contexto e a dignidade do acusado. Nossa missão é dar voz a quem o sistema tenta silenciar, com empatia e vigor técnico.",
    date: "10 Mar 2026",
    category: "Bem-estar Jurídico",
    image: "https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/tribuna.png"
  }
];

// --- Components ---

const SectionDivider = ({ className = "" }: { className?: string }) => (
  <div className={`container-custom py-16 flex items-center justify-center gap-8 md:gap-16 opacity-30 ${className}`}>
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex items-center gap-4"
    >
      <Shield className="w-6 h-6 text-brand-gold" />
      <div className="h-[1px] w-12 bg-brand-gold/30 hidden md:block" />
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex items-center gap-4"
    >
      <Gavel className="w-6 h-6 text-black" />
      <div className="h-[1px] w-12 bg-brand-gold/30 hidden md:block" />
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex items-center gap-4"
    >
      <Scale className="w-6 h-6 text-brand-gold" />
    </motion.div>
  </div>
);

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-brand-bg flex items-center justify-center overflow-hidden"
        >
          {/* Horizontal building line */}
          <motion.div
            initial={{ width: 0, height: "1px", top: "50%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="bg-brand-gold/40 absolute left-0"
          />
          
          {/* Vertical building line */}
          <motion.div
            initial={{ height: 0, width: "1px", left: "50%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            className="bg-brand-gold/40 absolute top-0"
          />

          {/* Filling effect from center */}
          <motion.div
            initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
            animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-brand-gold/10"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            <h1 className="font-serif text-4xl md:text-7xl tracking-widest uppercase text-brand-text mb-4">
              Doutor Paulo Cunha
            </h1>
            <div className="w-24 h-[1px] bg-brand-gold mb-4" />
            <p className="text-brand-accent text-[10px] md:text-xs tracking-[0.6em] uppercase font-bold">
              Excelência em Advocacia Criminal
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[70] parallax-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-custom flex items-center justify-between">
        <div className="flex flex-col">
          <span className={`font-serif text-2xl tracking-widest uppercase transition-colors duration-500 ${scrolled ? 'text-brand-text' : 'text-white'}`}>
            Doutor Paulo Cunha
          </span>
          <span className={`text-[10px] tracking-[0.4em] uppercase font-bold transition-colors duration-500 ${scrolled ? 'text-brand-accent' : 'text-white/70'}`}>
            Advogado
          </span>
        </div>

        <div className="hidden md:flex items-center gap-12">
          {['Início', 'Sobre', 'Especialidades', 'Resultados', 'Blog', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`menu-link ${scrolled ? 'text-brand-text' : 'text-white'}`}
            >
              {item}
            </a>
          ))}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-brand-text hover:bg-brand-gold/10' : 'text-white hover:bg-white/10'}`}
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl py-8 flex flex-col items-center gap-6 md:hidden overflow-hidden"
          >
            {['Início', 'Sobre', 'Especialidades', 'Resultados', 'Blog', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="menu-link text-brand-text"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const STAGGER = 0.03;
  const totalChars = HERO_SLIDES[current].segments.reduce((acc, seg) => acc + seg.text.length, 0);
  const typingDuration = totalChars * STAGGER;
  const colorRevealDelay = typingDuration + 2;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 14000); // Increased time for typing + 2s delay + buffer
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="início" className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ y: y1 }}
        >
          {/* Base Dark/Grayscale Image */}
          <div className="absolute inset-0 z-10">
            <motion.img 
              src={HERO_SLIDES[current].image} 
              alt="Background Dark" 
              className="w-full h-full object-cover grayscale brightness-[0.2]"
              referrerPolicy="no-referrer"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </div>

          {/* Colored Reveal - Starts 2s after typing finishes */}
          <motion.div 
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: colorRevealDelay,
              duration: 2, 
              ease: "easeInOut" 
            }}
          >
            <motion.img 
              src={HERO_SLIDES[current].image} 
              alt="Background Color" 
              className="w-full h-full object-cover brightness-[1.1] saturate-[1.2]"
              referrerPolicy="no-referrer"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-black/10 z-30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-40 h-full container-custom flex items-center">
        <motion.div 
          className={`w-full flex ${HERO_SLIDES[current].align === 'right' ? 'justify-end' : 'justify-start'}`}
          style={{ y: y2 }}
        >
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-6xl"
          >
            <div className="min-h-[220px] md:min-h-[300px] flex flex-col justify-center">
              <motion.p 
                className={`text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans leading-[1.2] font-light tracking-tight ${HERO_SLIDES[current].align === 'right' ? 'text-right' : 'text-left'}`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: STAGGER,
                    },
                  },
                }}
              >
                {HERO_SLIDES[current].segments.map((segment, segIndex) => (
                  segment.text.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${current}-${segIndex}-${charIndex}`}
                      className={segment.bold ? "font-bold" : "font-light"}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    >
                      {char === "\n" ? <br /> : char}
                    </motion.span>
                  ))
                ))}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: typingDuration + 0.5, duration: 1 }}
                className={`text-brand-gold/80 text-sm md:text-base mt-4 font-sans tracking-widest uppercase ${HERO_SLIDES[current].align === 'right' ? 'text-right' : 'text-left'}`}
              >
                — {HERO_SLIDES[current].author}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 z-50 flex gap-4">
        <button 
          onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

const About = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sobre" className="section-spacing overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] group">
            <div className="absolute inset-0 border-2 border-brand-gold translate-x-6 translate-y-6 z-0" />
            <div className="relative z-10 w-full h-full overflow-hidden bg-brand-ice/20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={ABOUT_IMAGES[currentImg]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/40 to-transparent" />
            </div>
            
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-brand-gold p-4 md:p-8 z-20">
              <div className="text-white text-center">
                <p className="text-2xl md:text-4xl font-serif font-bold">8</p>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold">Anos de Atuação</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <span className="text-brand-accent text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">
                O Advogado
              </span>
              <h2 className="text-4xl md:text-6xl mb-6">Quem é <span className="font-bold">Paulo</span> Cunha?</h2>
              <p className="text-brand-text/70 leading-relaxed text-lg mb-8">
                Com uma trajetória pautada pela excelência técnica e pelo compromisso inabalável com a justiça, o Dr. Paulo Cunha destaca-se na advocacia criminal pela sua visão estratégica e humanizada.
              </p>
            </div>

            <div className="space-y-6">
              {QUALIFICATIONS.map((qual, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-6 h-6 rounded-full border border-brand-gold flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-brand-gold transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-brand-gold group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-brand-text/80 text-sm md:text-base font-medium leading-tight">
                    {qual}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-brand-ice flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-brand-gold" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-text">Defesa Criminal</span>
              </div>
              <div className="flex items-center gap-3">
                <Gavel className="w-5 h-5 text-brand-gold" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-text">Tribunal do Júri</span>
              </div>
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5 text-brand-gold" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-text">Direito Constitucional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Specialties = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="especialidades" className="section-spacing overflow-hidden relative">
      <div className="container-custom mb-16 relative z-10">
        <span className="text-brand-accent text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">
          Galeria de Especialidades
        </span>
        <h2 className="text-4xl md:text-6xl">Defesa <span className="font-bold">Técnica</span> & Estratégica</h2>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <motion.div 
              key={service.id}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer h-full"
              onClick={() => setSelectedService(service)}
            >
              <div className="glass-light h-full flex flex-col overflow-hidden gold-glow-hover transition-all duration-300">
                <div className="relative aspect-[4/5] md:aspect-auto md:h-80 overflow-hidden">
                  {service.video ? (
                    <video 
                      src={service.video} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-gold shadow-lg overflow-hidden group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                </div>
                
                <div className="p-6 flex flex-col gap-2 flex-grow">
                  <h3 className="text-xl font-serif group-hover:text-brand-gold transition-colors duration-300 relative inline-block">
                    {service.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full"></span>
                  </h3>
                  <p className="text-brand-text/60 text-xs leading-tight line-clamp-3">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-5xl bg-brand-bg border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[80vh]"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-[60%] aspect-video md:aspect-auto md:h-full relative">
                {selectedService.video ? (
                  <video 
                    src={selectedService.video} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-bg via-transparent to-transparent opacity-60" />
              </div>

              <div className="w-full md:w-[40%] p-6 md:p-10 flex flex-col h-[60%] md:h-full overflow-y-auto">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    {selectedService.icon}
                  </div>
                  <span className="text-brand-accent text-[10px] uppercase tracking-[0.4em] font-bold">
                    Especialidade
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif mb-4">{selectedService.title}</h3>
                
                <div className="w-12 h-1 bg-brand-gold mb-6" />
                
                <div className="flex flex-col gap-6">
                  <p className="text-brand-text/90 text-[13px] md:text-sm leading-relaxed text-justify">
                    {selectedService.fullDescription}
                  </p>

                  {selectedService.features && (
                    <div className="flex flex-col gap-3">
                      <h4 className="text-brand-gold text-[9px] uppercase tracking-[0.2em] font-bold">Destaques da Atuação</h4>
                      <ul className="flex flex-col gap-2">
                        {selectedService.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-brand-text/70 leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-8">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      const contactSection = document.getElementById('contato');
                      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary w-full py-4 text-xs tracking-[0.2em]"
                  >
                    Consultar Especialista
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const WinnersGallery = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const QUOTES = [
    { 
      text: "A liberdade é o bem mais precioso do ser humano. Nossa missão é protegê-la com rigor técnico e ética inabalável.", 
      icon: <Crown className="w-10 h-10" /> 
    },
    { 
      text: "A advocacia criminal é a última barreira entre a liberdade e o arbítrio.", 
      icon: <Shield className="w-10 h-10" /> 
    },
    { 
      text: "Não há justiça sem o devido processo legal e uma defesa técnica apaixonada.", 
      icon: <Bird className="w-10 h-10" /> 
    },
    { 
      text: "Cada caso é uma vida, e cada vida merece a melhor estratégia jurídica possível.", 
      icon: <Award className="w-10 h-10" /> 
    },
    { 
      text: "A coragem é a primeira qualidade do advogado criminalista.", 
      icon: <PawPrint className="w-10 h-10" /> 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="resultados" className="section-spacing overflow-visible relative z-20">
      <div className="container-custom overflow-visible">
        <div className="text-center mb-20">
          <span className="text-brand-accent text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">
            Galeria dos Vencedores
          </span>
          <h2 className="text-4xl md:text-6xl">Resultados & <span className="font-bold">Confiança</span></h2>
        </div>
        
        <div 
          className="relative overflow-visible mb-24 z-30"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex gap-8 pb-12 w-max overflow-visible"
            animate={{
              x: isPaused ? undefined : ["-50%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 80,
                ease: "linear",
              },
            }}
          >
            {/* Triple the items for seamless loop from left to right */}
            {[...RESULTS, ...RESULTS, ...RESULTS].map((result, idx) => (
              <motion.div 
                key={`${result.id}-${idx}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveId(activeId === result.id ? null : result.id)}
                whileHover={{ y: -10 }}
                animate={{
                  scale: activeId === result.id ? 1.05 : 1,
                  boxShadow: activeId === result.id ? "0 20px 40px rgba(197,160,89,0.2)" : "0 0 0 rgba(0,0,0,0)",
                  zIndex: hoveredIdx === idx ? 50 : 1
                }}
                className={`min-w-[300px] md:min-w-[400px] bg-white/40 backdrop-blur-sm p-8 text-center shadow-sm border-b-2 border-brand-gold cursor-pointer transition-all duration-500 relative group/card ${activeId === result.id ? 'border-brand-gold bg-white/60' : ''}`}
              >
                {/* Light Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-gold/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <div className={`text-3xl md:text-4xl font-serif font-bold text-brand-gold mb-4 transition-transform duration-500 leading-tight ${activeId === result.id ? 'scale-110' : ''}`}>
                  {result.title}
                </div>
                {result.stat && (
                  <h3 className="text-[12px] text-brand-text font-bold mb-4 uppercase tracking-[0.2em]">{result.stat}</h3>
                )}
                <p className="text-brand-text/50 text-xs leading-relaxed max-w-[200px] mx-auto">
                  {result.description}
                </p>

                {/* WhatsApp Balloon on Hover */}
                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      className="absolute bottom-[110%] left-1/2 -translate-x-1/2 z-[999] w-[calc(100vw-60px)] max-w-[320px] md:max-w-80 pointer-events-none"
                    >
                      <div className="bg-[#E5DDD5] p-3 rounded-xl shadow-2xl border border-gray-300 relative">
                        {/* WhatsApp Header Style */}
                        <div className="bg-[#075E54] text-white p-2 rounded-t-lg -m-3 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0" />
                          <span className="text-[10px] font-bold">Depoimentos Reais</span>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          {result.comments.map((comment, cIdx) => (
                            <div 
                              key={cIdx} 
                              className={`p-2 rounded-lg text-left text-[11px] shadow-sm relative max-w-[90%] ${
                                cIdx % 2 === 0 ? 'bg-white self-start rounded-tl-none' : 'bg-[#DCF8C6] self-end rounded-tr-none'
                              }`}
                            >
                              <span className={`font-bold block mb-1 text-[9px] ${cIdx % 2 === 0 ? 'text-brand-gold' : 'text-green-700'}`}>
                                {comment.sender}
                              </span>
                              <p className="text-brand-text leading-tight">{comment.text}</p>
                              <span className="text-[8px] text-gray-400 block text-right mt-1">{comment.time}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Tail */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E5DDD5] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-20 flex flex-col md:flex-row items-center gap-12 bg-white/40 backdrop-blur-sm p-12 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuote}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className="w-24 h-24 rounded-full border border-brand-gold flex items-center justify-center flex-shrink-0 text-brand-gold"
            >
              {QUOTES[currentQuote].icon}
            </motion.div>
          </AnimatePresence>
          
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="min-h-[120px]"
              >
                <motion.h3 
                  className="text-2xl md:text-3xl mb-4 italic font-serif"
                >
                  {QUOTES[currentQuote].text.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                      transition={{ duration: 0.01, delay: i * 0.02 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px]"
                >
                  — Doutor Paulo Cunha
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const StrategicBlog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showBalloons, setShowBalloons] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleLike = (id: number) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="blog" className="section-spacing relative">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-brand-accent text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">
              Blog Estratégico
            </span>
            <h2 className="text-4xl md:text-6xl">Direitos e <span className="font-bold">Justiça</span></h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/50 group-focus-within:text-brand-gold transition-colors" />
              <input 
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/40 backdrop-blur-sm border border-brand-gold/20 rounded-full py-3 pl-12 pr-6 text-xs text-brand-text focus:outline-none focus:border-brand-gold/50 transition-all placeholder:text-brand-text/30"
              />
            </div>
            
            <button 
              onClick={() => setShowBalloons(true)}
              className="hidden md:flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-[10px] hover:text-brand-text transition-colors whitespace-nowrap"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="group cursor-pointer h-full flex flex-col"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative aspect-[16/9] mb-8 overflow-hidden bg-brand-ice/20">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1 bg-white/90 backdrop-blur-sm text-brand-text text-[9px] font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-brand-accent text-[10px] mb-4 font-bold uppercase tracking-widest">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-brand-gold rounded-full" />
                  <span>5 min leitura</span>
                </div>
                <h3 className="text-2xl text-brand-text font-serif group-hover:text-brand-gold transition-colors mb-4">
                  {post.title}
                </h3>
                <p className="text-brand-text/60 text-sm leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 text-brand-gold text-[10px] font-bold uppercase tracking-widest">
                  Ler Artigo <ArrowRight className="w-3 h-3" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/20 backdrop-blur-sm rounded-3xl border border-dashed border-brand-gold/30">
            <p className="text-brand-text/50 font-serif text-xl italic">Nenhum artigo encontrado para "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-brand-gold text-[10px] font-bold uppercase tracking-widest hover:underline"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>

      {/* Info Balloons Overlay */}
      <AnimatePresence>
        {showBalloons && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto"
              onClick={() => setShowBalloons(false)}
            />
            <div className="relative w-full h-full max-w-7xl mx-auto p-4 flex items-end justify-end pointer-events-none">
              <div className="flex flex-col gap-4 items-end mb-24 mr-8">
                {[
                  "Novos artigos semanalmente",
                  "Análise técnica aprofundada",
                  "Dicas de direitos fundamentais",
                  "Estratégias de defesa criminal"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 50 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    className="glass-light px-6 py-3 rounded-2xl shadow-xl border-brand-gold/30 text-[10px] font-bold uppercase tracking-widest text-brand-text pointer-events-auto"
                  >
                    {text}
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowBalloons(false)}
                  className="mt-4 px-6 py-2 bg-brand-gold text-white rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg pointer-events-auto hover:scale-105 transition-transform"
                >
                  Fechar
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Article Reader Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-5xl bg-white shadow-2xl relative rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden bg-brand-ice">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-brand-gold text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em]">
                    <span>{selectedPost.category}</span>
                    <span className="w-1 h-1 bg-brand-gold rounded-full" />
                    <span>{selectedPost.date}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="text-brand-text/40 hover:text-brand-gold transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight text-brand-text">
                  {selectedPost.title}
                </h2>
                
                <div className="prose prose-sm md:prose-base text-brand-text/70 leading-relaxed mb-8">
                  <p className="text-base md:text-lg text-brand-text mb-4 italic font-serif border-l-2 border-brand-gold pl-4">
                    {selectedPost.excerpt}
                  </p>
                  <p className="whitespace-pre-line">
                    {selectedPost.content}
                  </p>
                </div>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-ice">
                  <button 
                    onClick={() => toggleLike(selectedPost.id)}
                    className={`flex items-center gap-3 px-5 py-2.5 rounded-full transition-all font-bold uppercase tracking-widest text-[9px] md:text-[10px] ${
                      likedPosts.includes(selectedPost.id) 
                        ? 'bg-brand-gold text-white' 
                        : 'border border-brand-gold text-brand-gold hover:bg-brand-gold/10'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedPosts.includes(selectedPost.id) ? 'fill-current' : ''}`} />
                    {likedPosts.includes(selectedPost.id) ? 'Gostei' : 'Gostei'}
                  </button>
                  
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="text-brand-accent hover:text-brand-text transition-colors font-bold uppercase tracking-widest text-[10px]"
                  >
                    FECHAR ARTIGO
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contato" className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-brand-accent text-[10px] uppercase tracking-[0.4em] mb-6 block font-bold">
            Contato
          </span>
          <h2 className="text-4xl md:text-6xl">Fale <span className="font-bold">Conosco</span></h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <a 
            href="https://wa.me/5531985074032" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-6 group transition-all p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-brand-ice hover:border-brand-gold/30 text-center h-full"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
              <Phone className="w-7 h-7" />
            </div>
            <div className="transition-transform">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-2">WhatsApp</h4>
              <p className="text-xl md:text-2xl font-serif group-hover:text-brand-gold transition-colors">31 985074032</p>
            </div>
          </a>

          <a 
            href="mailto:paulohbcunhaadvogado@gmail.com"
            className="flex flex-col items-center gap-6 group transition-all p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-brand-ice hover:border-brand-gold/30 text-center h-full"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
              <Mail className="w-7 h-7" />
            </div>
            <div className="transition-transform w-full overflow-hidden">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-2">E-mail</h4>
              <p className="text-sm md:text-base lg:text-lg font-serif group-hover:text-brand-gold transition-colors break-all px-2">
                paulohbcunhaadvogado@gmail.com
              </p>
            </div>
          </a>

          <a 
            href="https://www.instagram.com/paulocunhaadvogado?igsh=bnpxY2J1M2trbGp0&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-6 group transition-all p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-brand-ice hover:border-brand-gold/30 text-center h-full"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
              <Instagram className="w-7 h-7" />
            </div>
            <div className="transition-transform">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-2">Instagram</h4>
              <p className="text-xl md:text-2xl font-serif group-hover:text-brand-gold transition-colors">@paulocunhaadvogado</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-20 border-t border-brand-ice relative">
      {/* Black Bar */}
      <div className="bg-black py-12">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-2xl tracking-widest uppercase text-white">
              Doutor Paulo Cunha
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-brand-gold">
              Advogado
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8 opacity-60">
              <Shield className="w-6 h-6 text-brand-gold" />
              <Gavel className="w-6 h-6 text-white" />
              <Scale className="w-6 h-6 text-brand-gold" />
            </div>

            <button 
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all group"
              title="Voltar ao topo"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronLeft className="w-5 h-5 rotate-90" />
              </motion.div>
            </button>
          </div>

          <p className="text-white/60 text-[10px] uppercase tracking-widest text-center md:text-right">
            © 2026 Paulo Cunha. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/5531985074032?text=${encodedMsg}`, '_blank');
    setMessage("");
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-72 md:w-80 bg-white/90 backdrop-blur-3xl rounded-2xl overflow-hidden shadow-2xl mb-4 border border-brand-gold/20"
            >
              <div className="relative h-64 bg-black flex items-center justify-center overflow-hidden">
                <video 
                  src="https://japevuckvzjehuajbudw.supabase.co/storage/v1/object/public/meu%20Site/paulovideo.mp4" 
                  className="w-full h-full object-cover object-top opacity-100"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute bottom-3 left-4 z-20">
                  <h4 className="text-white font-serif text-sm tracking-wide">Dr. Paulo Cunha</h4>
                  <p className="text-brand-gold text-[7px] font-bold uppercase tracking-[0.2em]">Atendimento Prioritário</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 z-20 text-white/70 hover:text-brand-gold transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4 flex flex-col gap-3">
                <p className="text-brand-text/70 text-[9px] font-medium leading-tight px-1 text-center">
                  Olá! Como posso auxiliar na sua defesa hoje? Envie sua dúvida abaixo.
                </p>
                
                <div className="relative">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Sua mensagem..." 
                    className="w-full bg-brand-ice border border-brand-gold/20 rounded-full py-2.5 px-5 text-[10px] focus:outline-none focus:border-brand-gold transition-colors text-brand-text placeholder:text-brand-text/30"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 bg-white shadow-2xl rounded-full flex items-center justify-center hover:scale-110 transition-transform z-[70] border border-brand-gold/20"
          >
            <MessageSquare className="w-8 h-8 text-brand-gold" />
          </button>
        </div>
      </div>
      
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-8 left-8 z-[60] group">
        <div className="absolute bottom-full left-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="glass-light px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest text-brand-gold border-brand-gold/30 whitespace-nowrap">
            WhatsApp Direto
          </div>
        </div>
        <a 
          href="https://wa.me/5531985074032" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-brand-ice"
        >
          <svg className="w-8 h-8 text-brand-gold fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </>
  );
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, radius: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      velocity: { x: number; y: number };

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = Math.random() > 0.5 ? '#C5A059' : '#FFFFFF';
        this.velocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        };
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Move particles slowly
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Mouse interaction
        let dx = mouse.current.x - this.x;
        let dy = mouse.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.current.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.current.radius) {
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    const init = () => {
      particles = [];
      const density = window.innerWidth < 768 ? 25000 : 15000;
      const numberOfParticles = (canvas.width * canvas.height) / density;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5] opacity-40"
    />
  );
};

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen selection:bg-brand-gold/20 relative bg-brand-bg">
      <ParticleBackground />
      <LoadingScreen />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div ref={scrollRef} className="pt-16">
          <SectionDivider />
          <About />
          <SectionDivider />
          <Specialties />
          <SectionDivider />
          <WinnersGallery />
          <SectionDivider />
          <StrategicBlog />
          <SectionDivider />
          <Contact />
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
