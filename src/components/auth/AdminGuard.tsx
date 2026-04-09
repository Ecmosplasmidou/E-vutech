import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react'; // Import des icônes

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour la visibilité

  const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_CODE) {
      setIsAuthenticated(true);
    } else {
      alert("Code incorrect");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full space-y-6">
          <div className="text-center">
            <div className="inline-flex p-4 bg-primary/10 rounded-full text-primary mb-4">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold font-serif italic text-slate-900">Accès Restreint</h2>
            <p className="text-slate-500 text-sm mt-2">Veuillez entrer le code administrateur.</p>
          </div>
          <div className="relative group">
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full bg-slate-50 border-none rounded-2xl pl-6 pr-14 py-4 outline-none ring-2 ring-transparent focus:ring-primary/20 transition-all font-medium"
              placeholder="Code secret"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button" // Important pour ne pas soumettre le formulaire au clic
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20">
            Connexion
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;