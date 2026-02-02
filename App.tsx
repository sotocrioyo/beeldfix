
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  CheckCircle2, 
  Image as ImageIcon, 
  Zap, 
  ShieldCheck, 
  Store, 
  Mail, 
  ArrowRight,
  UtensilsCrossed,
  Scissors,
  Hammer,
  Users,
  ShoppingBag,
  TrendingUp,
  Clock,
  Menu,
  X,
  Camera
} from 'lucide-react';

/**
 * Utility to scroll to a specific element by ID with an offset for the sticky header
 */
const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * ImageSlider Component
 * Uses the specific Before and After photos provided by the user.
 */
const ImageSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reliable high-quality snack/food image (Doner/Fries/Kapsalon style)
  const imageUrl = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200";

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] cursor-ew-resize select-none group border-[6px] md:border-[8px] border-white bg-gray-200"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
    >
      {/* After Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-orange-500 text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-xl z-30">
          Na BeeldFix
        </div>
      </div>

      {/* Before Image (Simulated with filters to match original request) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          filter: 'blur(10px) contrast(80%) brightness(75%) saturate(70%)'
        }}
      >
        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-gray-900/90 text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-xl z-30">
          Voor
        </div>
      </div>

      {/* Slider Bar */}
      <div 
        className="absolute inset-y-0 w-1.5 md:w-2 bg-white shadow-[0_0_30px_rgba(0,0,0,0.5)] z-40 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-[4px] md:border-[5px] border-orange-500 transition-transform group-hover:scale-110">
          <div className="flex gap-1 items-center">
            <div className="w-1 h-5 md:w-1.5 md:h-8 bg-orange-500 rounded-full"></div>
            <div className="w-1 h-5 md:w-1.5 md:h-8 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hover Instruction */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 border border-white/20 shadow-2xl">
        Sleep voor het verschil
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-xl py-3' : 'bg-transparent py-5 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 group cursor-pointer" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <ImageIcon className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-900">
            Beeld<span className="text-orange-500">Fix</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 font-black text-gray-600">
          <a href="#wat-we-doen" onClick={(e) => handleNavClick(e, 'wat-we-doen')} className="hover:text-blue-600 transition-colors text-sm uppercase tracking-widest">Diensten</a>
          <a href="#voor-wie" onClick={(e) => handleNavClick(e, 'voor-wie')} className="hover:text-blue-600 transition-colors text-sm uppercase tracking-widest">Voor wie</a>
          <a href="#waarom" onClick={(e) => handleNavClick(e, 'waarom')} className="hover:text-blue-600 transition-colors text-sm uppercase tracking-widest">Waarom</a>
          <a 
            href="mailto:hello@beeldfix.nl" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl transition-all shadow-xl hover:shadow-blue-200 active:scale-95 text-sm uppercase tracking-widest font-black"
          >
            Neem contact op
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gray-900 outline-none hover:bg-gray-100 rounded-lg transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 top-[64px] bg-white z-40 p-6 flex flex-col gap-6 font-black transition-all duration-500 transform ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <a href="#wat-we-doen" onClick={(e) => handleNavClick(e, 'wat-we-doen')} className="text-2xl py-4 border-b border-gray-100">Diensten</a>
        <a href="#voor-wie" onClick={(e) => handleNavClick(e, 'voor-wie')} className="text-2xl py-4 border-b border-gray-100">Voor wie</a>
        <a href="#waarom" onClick={(e) => handleNavClick(e, 'waarom')} className="text-2xl py-4 border-b border-gray-100">Waarom</a>
        <a href="mailto:hello@beeldfix.nl" className="bg-blue-600 text-white text-center py-5 rounded-2xl text-xl shadow-2xl mt-4">Neem contact op</a>
      </div>
    </nav>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative pt-24 pb-16 md:pt-56 md:pb-48">
        <div className="absolute top-0 right-0 -z-10 w-[60%] h-[90%] bg-blue-50/40 rounded-bl-[8rem] md:rounded-bl-[12rem]"></div>
        <div className="absolute top-1/3 -left-20 -z-10 w-60 h-60 md:w-80 md:h-80 bg-orange-50 rounded-full blur-[80px] md:blur-[100px] opacity-70"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-800 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] border border-cyan-200">
              <Camera size={14} className="text-cyan-700" /> Professionele Beeldkwaliteit
            </div>
            <h1 className="text-5xl md:text-9xl font-black text-gray-900 leading-[0.95] tracking-tighter">
              Slechte foto's kosten je <span className="text-blue-600 italic">klanten.</span>
            </h1>
            <p className="text-lg md:text-3xl text-gray-600 leading-snug max-w-xl font-medium tracking-tight">
              Wij maken je bestaande beelden <span className="relative inline-block text-gray-900 font-black">vlijmscherp<span className="absolute left-0 bottom-1 md:bottom-2 w-full h-1.5 md:h-3 bg-orange-500/80 -z-10"></span></span> en professioneel, zonder nieuwe fotoshoot.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-4 md:pt-6">
              <a 
                href="mailto:hello@beeldfix.nl" 
                className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white text-xl md:text-2xl font-black px-8 md:px-12 py-5 md:py-6 rounded-2xl shadow-[0_15px_30px_rgba(249,115,22,0.3)] transition-all hover:-translate-y-1.5 active:scale-95 group"
              >
                Start met Fixen <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-3 md:-space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/100?u=${i+25}`} alt="Klant" loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] md:text-sm font-black text-gray-400 leading-tight uppercase tracking-widest">
                  <span className="text-gray-900 block text-base md:text-lg">200+ Klanten</span> Nederland
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 mt-8 md:mt-0">
            <div className="absolute -inset-10 md:-inset-16 bg-gradient-to-tr from-cyan-500/20 to-orange-500/20 blur-[80px] md:blur-[120px] rounded-[4rem] md:rounded-[6rem]"></div>
            <ImageSlider />
            <div className="absolute -bottom-6 -left-4 md:-bottom-12 md:-left-16 bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-3xl flex items-center gap-4 md:gap-6 border border-gray-100 animate-bounce-subtle z-50">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-green-500 rounded-xl md:rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-green-200">
                <ShieldCheck className="text-white w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <p className="text-[9px] md:text-xs uppercase tracking-[0.3em] font-black text-gray-400 mb-0.5 md:mb-1">Klaar binnen</p>
                <p className="text-xl md:text-3xl font-black text-gray-900 leading-none">48 Uur</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WHAT WE DO */}
      <section id="wat-we-doen" className="py-24 md:py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-20 md:mb-32 max-w-4xl mx-auto space-y-6 md:space-y-10">
            <h2 className="text-4xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none">Wat we voor je fixen</h2>
            <p className="text-xl md:text-3xl text-gray-500 font-medium leading-relaxed italic">
              "Je hebt de beelden al. Wij maken ze <span className="text-blue-600 font-black not-italic underline decoration-blue-200 underline-offset-8">verleidelijk</span> voor je klanten."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "Wazig wordt scherp", icon: <ImageIcon className="text-blue-500" />, desc: "Details worden kristalhelder door geavanceerde AI-reconstructie." },
              { title: "Licht & Kleur fix", icon: <Zap className="text-orange-500" />, desc: "Geen grauwe foto's meer. We herstellen de sfeer en de trek-factor." },
              { title: "Upscaling 4K", icon: <TrendingUp className="text-cyan-500" />, desc: "Kleine foto's worden groot genoeg voor posters en grote banners." },
              { title: "Contrast Master", icon: <ShieldCheck className="text-blue-500" />, desc: "We laten je producten 'poppen' voor maximale conversie." },
              { title: "Website Sneller", icon: <ShoppingBag className="text-orange-500" />, desc: "Geoptimaliseerde bestanden die razendsnel laden zonder kwaliteitsverlies." },
              { title: "Bespaar €€€", icon: <Clock className="text-cyan-500" />, desc: "Nieuwe fotoshoots zijn verleden tijd. Recycle wat je hebt." }
            ].map((feature, i) => (
              <div key={i} className="group p-8 md:p-14 rounded-[3rem] md:rounded-[4rem] bg-gray-50 border-4 border-transparent hover:border-blue-600/10 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-8 md:mb-12 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 40 })}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 md:mb-5 tracking-tight">{feature.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section id="voor-wie" className="py-24 md:py-40 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-48 -right-48 w-[40rem] h-[40rem] bg-blue-600 rounded-full blur-[150px]"></div>
          <div className="absolute -bottom-48 -left-48 w-[40rem] h-[40rem] bg-orange-600 rounded-full blur-[150px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="mb-16 md:mb-24 space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter">Onze focus</h2>
            <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl leading-snug">
              Wij werken voor ondernemers die trots zijn op hun zaak, maar geen tijd hebben voor ingewikkelde fotoshoots.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: "Restaurants & Cafés", icon: <UtensilsCrossed />, color: "bg-blue-600" },
              { label: "Haarsalons & Beauty", icon: <Scissors />, color: "bg-orange-500" },
              { label: "Vakmannen & Bouw", icon: <Hammer />, color: "bg-cyan-500" },
              { label: "Coaches & Zzp'ers", icon: <Users />, color: "bg-blue-600" },
              { label: "Webshops & E-com", icon: <ShoppingBag />, color: "bg-orange-500" },
              { label: "Lokale Winkels", icon: <Store />, color: "bg-cyan-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 md:gap-8 p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
                <div className={`w-14 h-14 md:w-20 md:h-20 ${item.color} text-white rounded-xl md:rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform shrink-0`}>
                  {React.cloneElement(item.icon, { size: 32 })}
                </div>
                <span className="text-xl md:text-3xl font-black text-white tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section id="waarom" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="space-y-12 md:space-y-16">
              <h2 className="text-4xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[1] md:leading-[0.9]">
                Beeld is je <span className="text-blue-600 italic">nieuwe</span> verkoper.
              </h2>
              <div className="space-y-10 md:space-y-14">
                {[
                  { title: "De 2-seconden regel", text: "Je hebt minder dan 2 seconden om een bezoeker te overtuigen dat je een serieuze ondernemer bent." },
                  { title: "Vertrouwen = Verkoop", text: "Scherpe foto's suggereren een kwaliteitsproduct. Wazige foto's doen het tegenovergestelde." },
                  { title: "Stop de Concurrent", text: "De meeste NL-ondernemers gebruiken nog steeds matige foto's. Val vandaag direct op." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 md:gap-10 group">
                    <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-blue-50 text-blue-600 flex items-center justify-center font-black text-2xl md:text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 md:mb-4 tracking-tight">{item.title}</h3>
                      <p className="text-lg text-gray-500 font-medium leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-12 md:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                <div className="space-y-6 md:space-y-10">
                  <div className="p-8 md:p-14 bg-blue-600 rounded-[2.5rem] md:rounded-[5rem] text-white shadow-4xl flex flex-col justify-center h-56 md:h-96 transform -rotate-1 md:-rotate-3 overflow-hidden">
                    <span className="text-5xl md:text-8xl font-black mb-1 md:mb-4">90%</span>
                    <span className="text-lg md:text-2xl font-bold opacity-80 leading-tight">Visuele Beslissing</span>
                  </div>
                  <div className="p-8 md:p-14 bg-gray-900 rounded-[2.5rem] md:rounded-[5rem] text-white h-56 md:h-96 flex flex-col justify-center transform rotate-1 md:rotate-2 shadow-2xl overflow-hidden">
                     <TrendingUp size={40} className="text-orange-500 mb-6 md:mb-10 md:w-20 md:h-20" />
                     <p className="text-xl md:text-4xl font-black leading-tight tracking-tighter">Hogere Conversie</p>
                  </div>
                </div>
                <div className="space-y-6 md:space-y-10 sm:pt-12 md:pt-24">
                  <div className="p-8 md:p-14 bg-orange-500 rounded-[2.5rem] md:rounded-[5rem] text-white shadow-4xl h-56 md:h-96 flex flex-col justify-center transform rotate-1 md:rotate-3 overflow-hidden">
                     <p className="text-xl md:text-4xl font-black leading-[1.1] tracking-tight">"BeeldFix verhoogt direct je autoriteit."</p>
                  </div>
                  <div className="p-8 md:p-14 bg-cyan-500 rounded-[2.5rem] md:rounded-[5rem] text-white shadow-4xl h-56 md:h-96 flex flex-col justify-center transform -rotate-1 md:-rotate-2 overflow-hidden">
                     <ShieldCheck size={40} className="mb-6 md:mb-10 md:w-20 md:h-20" />
                     <p className="text-xl md:text-4xl font-black leading-tight">Garantie op Resultaat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="relative rounded-[3rem] md:rounded-[5rem] bg-gray-900 p-12 md:p-32 text-center text-white shadow-4xl overflow-hidden">
            <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[30rem] h-[30rem] bg-blue-600/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-[30rem] h-[30rem] bg-orange-500/15 rounded-full blur-[120px]"></div>
            <div className="relative z-10 space-y-10 md:space-y-16">
              <h2 className="text-4xl md:text-9xl font-black tracking-tighter leading-none">
                Fix je foto's.<br/>
                <span className="text-blue-500">Krijg meer klanten.</span>
              </h2>
              <p className="text-xl md:text-4xl font-medium opacity-90 max-w-4xl mx-auto leading-relaxed">
                Stuur nu je beelden naar <span className="text-orange-500 font-black underline decoration-4 underline-offset-8">hello@beeldfix.nl</span> voor een gratis analyse.
              </p>
              <div className="flex flex-col items-center gap-10 md:gap-12">
                <a href="mailto:hello@beeldfix.nl" className="inline-flex items-center gap-4 md:gap-6 bg-white text-gray-900 hover:bg-blue-600 hover:text-white text-xl md:text-4xl font-black px-10 md:px-20 py-6 md:py-10 rounded-2xl md:rounded-[3rem] transition-all shadow-5xl active:scale-95 group">
                  <Mail size={32} className="md:w-12 md:h-12" /> hello@beeldfix.nl
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 md:py-32 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16 md:gap-24">
            <div className="space-y-8 md:space-y-10">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-xl md:rounded-[1.25rem] flex items-center justify-center shadow-xl">
                  <ImageIcon className="text-white w-6 h-6 md:w-9 md:h-9" />
                </div>
                <span className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900">
                  Beeld<span className="text-orange-500">Fix</span>
                </span>
              </div>
              <p className="text-lg md:text-2xl text-gray-500 font-bold max-w-md leading-relaxed">
                BeeldFix.nl – Beelden die de trotse Nederlandse ondernemer ondersteunen bij groei.
              </p>
            </div>
            <div className="flex flex-col gap-8 md:gap-10">
              <a href="mailto:hello@beeldfix.nl" className="text-2xl md:text-5xl font-black text-gray-900 hover:text-blue-600 transition-all border-b-4 md:border-b-[10px] border-orange-500 pb-2 md:pb-3">
                hello@beeldfix.nl
              </a>
              <div className="text-center md:text-right text-xs font-black text-gray-300 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} BeeldFix &middot; NL 🇳🇱
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
