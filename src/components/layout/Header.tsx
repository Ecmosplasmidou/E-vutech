import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, GraduationCap, Timer, LayoutGrid } from 'lucide-react';
import logo from '../../assets/img/logo_E-VUTECH.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const location = useLocation();

  const formations = [
    {
      id: 'vul',
      name: 'La conduite en VUL',
      path: '/conduite-en-vul',
      duration: '21h — 3 jours',
      active: true
    },
    {
      id: 'eco',
      name: 'Éco-conduite Avancée',
      path: '#',
      duration: 'Bientôt disponible',
      active: false
    }
  ];

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Pédagogie', path: '/pedagogie' },
    { name: 'Références', path: '/references' },
    { name: 'À propos', path: '/a-propos' },
  ];

  useEffect(() => {
    setIsOpen(false);
    setCatalogOpen(false);
  }, [location]);

  return (
    <>
      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-100 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* LOGO - Adapté pour ne pas prendre trop de place sur petit écran */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto" />
            <div className="border-l border-slate-200 pl-2 sm:pl-3">
              <h1 className="text-primary font-black text-xs sm:text-sm md:text-lg uppercase leading-none tracking-tighter sm:tracking-normal">E-VUTECH</h1>
              <p className="hidden xs:block text-[6px] sm:text-[8px] md:text-[9px] text-slate-400 font-bold uppercase mt-1">L’école de la conduite défensive</p>
            </div>
          </Link>

          {/* DESKTOP NAV - Changé de 'md' à 'lg' pour éviter le débordement sur tablette */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`relative text-xs xl:text-sm font-bold uppercase tracking-tight transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-slate-600'}`}
              >
                {link.name}
              </Link>
            ))}

            {/* DROPDOWN CATALOGUE DESKTOP */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setCatalogOpen(true)}
              onMouseLeave={() => setCatalogOpen(false)}
            >
              <Link to="/catalogue-list" className={`flex items-center gap-1 text-xs xl:text-sm font-bold uppercase tracking-tight transition-colors ${catalogOpen ? 'text-primary' : 'text-slate-600'}`}>
                Catalogue <ChevronDown size={14} className={`transition-transform duration-200 ${catalogOpen ? 'rotate-180' : ''}`} />
              </Link>

              <div className={`absolute top-full right-0 w-80 bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 transition-all duration-300 ${catalogOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="mb-3 px-2 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nos Formations</span>
                  <LayoutGrid size={14} className="text-slate-300" />
                </div>
                <div className="space-y-2">
                  {formations.map((f) => (
                    <Link 
                      key={f.id} 
                      to={f.path}
                      className={`block p-3 rounded-xl transition-all ${f.active ? 'hover:bg-slate-50 border border-transparent hover:border-slate-100' : 'opacity-50 cursor-not-allowed'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 p-2 rounded-lg ${f.active ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                          <GraduationCap size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-none mb-1">{f.name}</p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold">
                            <Timer size={10} /> {f.duration}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              to="/contact" 
              className="px-5 xl:px-8 py-2.5 bg-primary text-white rounded-full text-xs font-black hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 uppercase whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>

          {/* BURGER BUTTON - S'affiche maintenant sur mobile ET tablette (jusqu'à 1024px) */}
          <button 
            className="lg:hidden relative z-[150] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* MOBILE/TABLET OVERLAY */}
      <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsOpen(false)} />

      {/* MOBILE/TABLET SIDE MENU */}
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[120] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col pt-24 px-8 space-y-6 h-full overflow-y-auto pb-10 font-sans">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={`text-xl font-black uppercase tracking-widest ${location.pathname === link.path ? 'text-primary' : 'text-slate-800'}`}>
              {link.name}
            </Link>
          ))}

          {/* SECTION CATALOGUE MOBILE */}
          <div className="pt-4 border-t border-slate-100 text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Catalogue</p>
            <div className="space-y-4">
              {formations.map((f) => (
                <Link key={f.id} to={f.path} className={`flex items-center gap-4 ${!f.active && 'opacity-50 pointer-events-none'}`}>
                  <div className="p-2 bg-slate-100 rounded-lg text-primary">
                    <GraduationCap size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800 leading-tight">{f.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold">{f.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <Link to="/contact" className="block w-full text-center py-4 bg-primary text-white rounded-xl font-black uppercase shadow-lg shadow-primary/20">
              Nous contacter
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;