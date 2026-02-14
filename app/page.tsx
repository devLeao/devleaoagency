'use client'
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  Layout, 
  BarChart3, 
  Trophy, 
  ChevronRight,
  Instagram,
  Globe
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 } // Isso faz os cards entrarem um por um
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Home() {
  // --- Lógica do Carrossel de Depoimentos (Embla) ---
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  // --- Lógica do Looping Infinito de Projetos (Hero) ---
  const { col1Images, col2Images } = useMemo(() => {
    const baseImages = [
      "/projeto-lumen.png",
      "/projetogabi.png",
      "/liga13.png",
      "/cadupost.png",
      "/sb.png",
      "/portfóliodev.png"
    ];
    
    // Duplicamos a lista para criar a emenda.
    // IMPORTANTE: Não triplique, apenas duplique.
    const doubled = [...baseImages, ...baseImages];
    
    return {
      col1Images: doubled,
      col2Images: [...doubled].reverse()
    };
  }, []);

  // --- Funções de Navegação do Carrossel ---
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])
  
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo DevLeão" className="h-10 w-auto object-contain" />
            <div className="text-2xl font-black tracking-tighter text-white">
              DEV<span className="text-devpurple">LEÃO</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#servicos" className="hover:text-devpurple transition-colors">Serviços</a>
            <a href="#esportes" className="hover:text-devpurple transition-colors">Esportes</a>
            <a href="#projetos" className="hover:text-devpurple transition-colors">Projetos</a>
            <a href="#contato" className="hover:text-devpurple transition-colors">Contato</a>
          </div>
          
          <a 
            href="https://wa.me/5531987373781?text=Olá Leandro! Gostaria de solicitar um orçamento para um projeto com a DevLeão Agency."
            target="_blank" rel="noopener noreferrer"
            className="bg-devpurple hover:bg-devpurple-dark text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-devpurple/20 active:scale-95"
          >
            Orçamento
          </a>
        </div>
      </nav>

 {/* --- HERO SECTION (LOOPING INFINITO REAL) --- */}
<section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-screen flex flex-col items-center justify-center">
  
  {/* CONTAINER DO LOOPING (FUNDO) */}
  <div className="absolute inset-0 z-0 flex justify-center gap-6 md:gap-12 opacity-15 pointer-events-none" 
       style={{ perspective: '1200px' }}>
    
    {/* Coluna 1 - Sobe (Lumen vem de baixo naturalmente) */}
    <div 
      className="flex flex-col gap-10 animate-slide-up"
      style={{ transform: 'rotateX(15deg) rotateY(-10deg) rotateZ(5deg)' }}
    >
      {col1Images.map((src, i) => (
        <img 
          key={`col1-${i}`}
          src={src} 
          alt="Projeto DevLeão" 
          className="w-[300px] md:w-[450px] rounded-2xl shadow-2xl filter blur-[1px] border border-white/5 shrink-0"
        />
      ))}
    </div>

    {/* Coluna 2 - Direção Inversa */}
    <div 
      className="flex flex-col gap-10 animate-slide-up"
      style={{ 
        transform: 'rotateX(15deg) rotateY(-10deg) rotateZ(5deg)',
        animationDirection: 'reverse' 
      }}
    >
      {col2Images.map((src, i) => (
        <img 
          key={`col2-${i}`}
          src={src} 
          alt="Projeto DevLeão" 
          className="w-[300px] md:w-[450px] rounded-2xl shadow-2xl filter blur-[1px] border border-white/5 shrink-0"
        />
      ))}
    </div>

    {/* Overlays de Máscara - Para esconder o reset nas bordas da tela */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
  </div>

  {/* Brilho Roxo Central */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-devpurple/20 blur-[150px] rounded-full z-10 pointer-events-none" />
  
  {/* CONTEÚDO PRINCIPAL */}
  <div className="max-w-7xl mx-auto text-center relative z-20">
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
        Tecnologia para <br />
        <span className="text-devpurple">impulsionar seu negócio.</span>
      </h1>
      
      <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed uppercase tracking-[0.3em] font-bold">
        Desenvolvimento de Elite • Estratégia Digital
      </p>
      
<div className="mt-12 flex justify-center mb-24">
  <button 
    onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
    className="bg-devpurple hover:bg-devpurple-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-devpurple/30 flex items-center gap-2 active:scale-95 group cursor-pointer"
  >
    Quero impulsionar meu negócio 
    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
  </button>
</div>
    </motion.div>
  </div>
</section>

      {/* --- SERVIÇOS --- */}
      <section id="servicos" className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard icon={<Layout size={32} />} title="Sites de Elite" desc="Desenvolvimento em Next.js focado em máxima velocidade." />
            <ServiceCard icon={<Target size={32} />} title="Marketing Digital" desc="Estratégias avançadas de conversão e escala de vendas." />
            <ServiceCard icon={<Zap size={32} />} title="Alta Performance" desc="Infraestrutura moderna que carrega em milissegundos." />
            <ServiceCard icon={<BarChart3 size={32} />} title="BI & Dados" desc="Análise inteligente de métricas para decisões reais." />
          </div>
        </div>
      </section>

     {/* --- DESTAQUE ESPORTIVO (FOTO SOLTA) --- */}
<section id="esportes" className="py-24 px-6 relative overflow-visible">
  <div className="max-w-7xl mx-auto">
    {/* Removemos o overflow-hidden deste container principal para a imagem poder 'vazar' */}
    <div className="bg-gradient-to-br from-devpurple/15 to-transparent border border-devpurple/20 rounded-[3rem] p-8 md:p-16 overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <div className="flex items-center gap-2 text-devpurple font-bold tracking-widest uppercase text-sm mb-4">
            <Trophy size={18} /> Vertical Esportiva
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">Marketing e Estratégia Esportiva</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Unimos tecnologia Next.js com design de impacto para elevar o nível profissional de atletas e clubes.
          </p>
        </div>

        {/* --- CONTAINER DA IMAGEM SEM BOX --- */}
        <div className="relative group overflow-visible flex justify-center items-center">
          {/* Brilho de fundo (Glow) mais espalhado */}
          <div className="absolute inset-0 bg-devpurple/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* AQUI ESTÁ O SEGREDO: 
              1. Removemos o 'bg-gray-900' e o 'aspect-video'
              2. Removemos o 'overflow-hidden' 
              3. Usamos 'drop-shadow' para a sombra seguir o contorno do celular/notebook 
          */}
          <img 
            src="/projeto-liga13.png" 
            alt="Liga 13" 
            className="relative z-10 w-full h-auto max-w-[500px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105" 
          />
        </div>

      </div>
    </div>
  </div>
</section>

      {/* --- TECNOLOGIAS --- */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5 overflow-hidden relative">
        <div className="flex space-x-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-12 shrink-0 px-6">
              {["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Node.js", "Framer Motion"].map((tech) => (
                <span key={tech} className="text-3xl md:text-5xl font-black text-white/10 hover:text-devpurple transition-colors">{tech}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

{/* --- SEÇÃO DE PROVA SOCIAL ELABORADA COM ANIMAÇÃO EM CASCATA --- */}
<section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
  <motion.div 
    className="max-w-7xl mx-auto px-6 relative z-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 } // O segredo da cascata (efeito dominó)
      }
    }}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: "Projetos Entregues", value: "+15", icon: <Zap size={24} /> },
        { label: "Satisfação Geral", value: "100%", icon: <Trophy size={24} /> },
        { label: "Disponibilidade", value: "24/7", icon: <Globe size={24} /> },
        { label: "Países Atendidos", value: "5+", icon: <Target size={24} /> }
      ].map((stat, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
          whileHover={{ 
            y: -10, 
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            borderColor: "rgba(109, 40, 217, 0.4)" 
          }}
          className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center group transition-all duration-500 relative"
        >
          {/* Efeito de Brilho Interno no Hover */}
          <div className="absolute inset-0 bg-devpurple/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity rounded-[2.5rem]" />

          <div className="mb-6 p-4 bg-devpurple/10 rounded-2xl text-devpurple group-hover:bg-devpurple group-hover:text-white transition-all duration-500 shadow-lg shadow-devpurple/10 relative z-10">
            {stat.icon}
          </div>
          
          <h3 className="text-6xl font-black text-white mb-3 tracking-tighter italic relative z-10">
            {stat.value}
          </h3>
          
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.25em] leading-none relative z-10">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  </motion.div>

  {/* Brilho Roxo de fundo para compor a cena */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-devpurple/5 blur-[140px] rounded-full pointer-events-none" />
</section>

      {/* --- SEÇÃO DE DEPOIMENTOS (AJUSTADA) --- */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-devpurple font-bold tracking-[0.2em] uppercase text-sm mb-4">Depoimentos</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold italic">Quem confia na <span className="text-devpurple">DevLeão</span></h3>
          </div>
          
          {/* Pontinhos de Navegação */}
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  index === selectedIndex ? 'w-8 bg-devpurple' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Viewport do Carrossel Manual */}
        <div className="overflow-hidden px-6 cursor-grab active:cursor-grabbing" ref={emblaRef}>
  <div className="flex gap-6">
    <TestimonialCard 
      name="Federação Mineira" 
      role="Gestão Esportiva" 
      image="/femsoc.png"
      text="A DevLeão transformou nossa presença digital de forma incrível, era oque precisavamos!" 
    />
    <TestimonialCard 
      name="Pedro • Liga 13" 
      role="Plataforma de Torneios" 
      image="/pedro13.jpeg"
      text="Sem palavras, sinceramente. Ficou incrível demais, deixou a liga muito mais profissional👏👏👏" 
    />
    <TestimonialCard 
      name="Cadu • Cadu Barber" 
      role="Business" 
      image="/cadu.jpg"
      text="Atendimento profissional, não preciso me preocupar mais em anotar os horários dos clientes, o site já faz isso por mim." 
    />
    <TestimonialCard 
      name="Gabriela • Gabi Dias" 
      role="Nutricionista" 
      image="/gabifoto.jpeg"
      text="Minha landing page ficou incrível, melhorou muito a minha conversão de clientes, fora o ar mais profissional que minha empresa ganhou." 
    />
    <TestimonialCard 
      name="Leandro • Lumen" 
      role="Plataforma Digital Católica" 
      image="/lumenfoto.png"
      text="Ficou perfeito! Exatamente como imaginávamos😍." 
    />
  </div>
</div>
      </section>

    {/* --- PROJETOS SHOWCASE (COM EFEITO DE SUBIDA) --- */}
<section id="projetos" className="py-24 px-6 bg-[#0a0a0a]">
  <div className="max-w-7xl mx-auto">
    
    {/* Título com animação de entrada lateral */}
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <h2 className="text-4xl font-bold italic">Projetos que entregam valor</h2>
      <div className="w-20 h-1.5 bg-devpurple mt-4 rounded-full" />
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
      {[
        { title: "Liga 13", category: "Plataforma Esportiva", imageSrc: "/liga13.png", link: "https://liga13.vercel.app/" },
        { title: "Lumen", category: "Refúgio Espiritual", imageSrc: "/lumen.png", link: "https://lumen-site-weld.vercel.app/" },
        { title: "Gabi Dias", category: "Portfólio & Marketing", imageSrc: "/gabi.png", link: "https://lpgabidiasnut.netlify.app/" },
        { title: "Cadu Barber", category: "Business & Agendamento", imageSrc: "/cadu.png", link: "https://cadubarber.com.br/" }
      ].map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }} // Começa 50px abaixo e invisível
          whileInView={{ opacity: 1, y: 0 }} // Sobe para a posição original e fica visível
          viewport={{ once: true, margin: "-50px" }} // Ativa um pouco antes de entrar totalmente na tela
          transition={{ 
            duration: 0.8, 
            delay: i % 2 * 0.2, // Cria um leve atraso entre a coluna da esquerda e da direita
            ease: "easeOut" 
          }}
        >
          <ProjectCard 
            title={project.title} 
            category={project.category} 
            imageSrc={project.imageSrc} 
            link={project.link} 
          />
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* --- FAQ --- */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center italic">FAQ</h2>
          <div className="space-y-4">
            <FAQItem question="Qual o prazo médio de entrega?" answer="Sites de alta performance costumam ser entregues entre 15 a 30 dias." />
            <FAQItem question="O site já vem otimizado para o Google?" answer="Sim! Usamos as melhores práticas de SEO técnico no Next.js." />
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE GARANTIA --- */}
<section className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
  <div className="max-w-7xl mx-auto border border-white/5 bg-white/[0.02] rounded-[3rem] p-8 md:p-20 relative">
    
    {/* Efeito de luz sutil ao fundo */}
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-devpurple/5 blur-[120px] rounded-full pointer-events-none" />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* Lado Esquerdo: Conteúdo */}
      <div className="relative z-10">
        <span className="bg-devpurple/20 text-devpurple px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-devpurple/30">
          Compromisso DevLeão
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-8 italic tracking-tight">
          Suporte e <span className="text-devpurple">Garantia</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
          Minha missão é garantir que sua tecnologia nunca pare. Ofereço um suporte dedicado para 
          configurações ou personalizações, garantindo que sua entrega seja exatamente o que você idealizou. 
          Além disso, você conta com nossa garantia total de satisfação.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-devpurple hover:bg-devpurple-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-devpurple/20 uppercase text-sm tracking-widest active:scale-95">
            Garantir meu projeto agora
          </button>
        </div>
      </div>

      {/* Lado Direito: Imagem da Garantia */}
      <div className="flex justify-center lg:justify-end relative group">
        {/* Glow atrás da medalha/imagem */}
        <div className="absolute inset-0 bg-devpurple/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Lembre-se de colocar o arquivo garantia.png na pasta public */}
        <img 
          src="/garantia.png" 
          alt="3 Meses de Garantia" 
          className="w-full max-w-[400px] h-auto drop-shadow-[0_0_30px_rgba(109,40,217,0.3)] relative z-10 animate-float"
        />
      </div>
    </div>
  </div>
</section>

      {/* --- CONTATO --- */}
      <section id="contato" className="py-24 px-6 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-devpurple/10 blur-[150px] rounded-full -z-0 pointer-events-none" />
        <div className="max-w-4xl mx-auto bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-sm relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 italic">Vamos iniciar seu projeto?</h2>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as any;
              const texto = `Olá Leandro! Me chamo ${target[0].value} (${target[1].value}). %0A%0A*Assunto:* ${target[2].value}`;
              window.open(`https://wa.me/5531987373781?text=${texto}`, '_blank');
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-left"
          >
            <input required type="text" placeholder="Nome" className="bg-white/5 border border-white/10 p-4 rounded-xl focus:border-devpurple outline-none" />
            <input required type="email" placeholder="Email" className="bg-white/5 border border-white/10 p-4 rounded-xl focus:border-devpurple outline-none" />
            <div className="md:col-span-2">
              <textarea required placeholder="Mensagem" rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-devpurple outline-none"></textarea>
            </div>
            <button type="submit" className="md:col-span-2 bg-devpurple hover:bg-devpurple-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-devpurple/20 active:scale-95">
              Enviar Mensagem via WhatsApp
            </button>
          </form>
        </div>
      </section>

   {/* --- FOOTER --- */}
      <footer className="py-24 border-t border-white/5 px-6 bg-[#0a0a0a] relative overflow-hidden">
        {/* Brilho de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-devpurple/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            
            {/* Lado Esquerdo: Suporte e Bio */}
            <div className="max-w-xs text-center md:text-left order-2 md:order-1">
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Suporte Direto</h4>
              <a 
                href="mailto:leandrofls16@gmail.com" 
                className="text-gray-400 hover:text-devpurple transition-all flex items-center justify-center md:justify-start gap-3 mb-6"
              >
                <Zap size={18} className="text-devpurple" />
                <span className="font-medium">leandrofls16@gmail.com</span>
              </a>
              <p className="text-gray-600 text-sm leading-relaxed">
                Especialistas em transformar visão em alta performance digital. 
                Sua tecnologia em boas mãos.
              </p>
            </div>

            {/* Centro: LOGO CENTRALIZADA E MENOR */}
            <div className="order-1 md:order-2 flex justify-center items-center py-4 transition-transform duration-500 hover:scale-105">
              <img 
                src="/logotext.png" 
                alt="DevLeão Agency" 
                className="h-20 md:h-24 w-auto object-contain" 
              />
            </div>

            {/* Direita: Links Separados */}
            <div className="grid grid-cols-2 gap-12 md:gap-16 order-3 text-center md:text-left">
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navegação</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                  <li><a href="#servicos" className="hover:text-devpurple transition-colors">Serviços</a></li>
                  <li><a href="#esportes" className="hover:text-devpurple transition-colors">Esportes</a></li>
                  <li><a href="#projetos" className="hover:text-devpurple transition-colors">Projetos</a></li>
                  <li><a href="#contato" className="hover:text-devpurple transition-colors">Contato</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Social</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                  <li className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer">
                    <Instagram size={18} className="group-hover:text-devpurple transition-colors" />
                    <span className="group-hover:text-white transition-colors">Instagram</span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer">
                    <Globe size={18} className="group-hover:text-devpurple transition-colors" />
                    <span className="group-hover:text-white transition-colors">Website</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* LINHA FINAL (COPYRIGHT) */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[10px] uppercase tracking-[0.3em]">
            <p>© 2026 <span className="text-white">DevLeão Tech</span> — Todos os direitos reservados.</p>
            <p>Desenvolvido por <span className="text-devpurple font-bold italic">Leandro F.</span></p>
          </div>
        </div>
      </footer>
    </main>
  );
}

{/* --- COMPONENTES AUXILIARES --- */}

function ServiceCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-devpurple/40 transition-all group">
      <div className="bg-devpurple/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-devpurple group-hover:bg-devpurple group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, role, text, image }: { name: string, role: string, text: string, image: string }) {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[450px] p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex flex-col justify-between relative overflow-hidden group">
      
      {/* Aspas Gigantes */}
      <span className="absolute -top-4 -right-2 text-devpurple/10 text-[12rem] font-serif leading-none pointer-events-none select-none group-hover:text-devpurple/20 transition-colors duration-500">
        ”
      </span>

      <div className="relative z-10">
        {/* Estrelas */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-devpurple shadow-devpurple/50">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        {/* Depoimento */}
        <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-10 italic font-medium">
          "{text}"
        </p>
      </div>

      {/* Autor com Foto Redonda */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-14 h-14 rounded-full border-2 border-devpurple/30 overflow-hidden shadow-lg shadow-devpurple/20">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
        <div>
          <h4 className="font-bold text-white text-lg tracking-tight">{name}</h4>
          <span className="text-devpurple text-xs font-bold uppercase tracking-[0.15em]">{role}</span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, category, imageSrc, link }: { title: string, category: string, imageSrc: string, link: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
      <div className="relative overflow-visible mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <div className="absolute inset-0 bg-devpurple/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img src={imageSrc} alt={title} className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="bg-devpurple text-white px-8 py-3 rounded-full font-bold shadow-2xl border border-white/10 translate-y-4 group-hover:translate-y-0 transition-all">
             Visitar Site
           </span>
        </div>
      </div>
      <div className="text-center md:text-left">
        <h4 className="text-2xl font-bold italic tracking-tight">{title}</h4>
        <p className="text-devpurple font-medium uppercase text-xs tracking-[0.2em] mt-2">{category}</p>
      </div>
    </a>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  return (
    <details className="group bg-white/5 rounded-2xl border border-white/5 p-6 cursor-pointer">
      <summary className="font-bold text-lg list-none flex justify-between items-center group-open:text-devpurple transition-all">
        {question}
        <span className="group-open:rotate-180 transition-transform">↓</span>
      </summary>
      <p className="mt-4 text-gray-400 leading-relaxed">{answer}</p>
    </details>
  );
}