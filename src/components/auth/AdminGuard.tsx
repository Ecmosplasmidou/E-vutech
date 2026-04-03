import React, { useState } from 'react';

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_CODE = "E-VUETCH-ADMIN-SECRET"; 

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
            <h2 className="text-2xl font-bold font-serif italic">Accès Restreint</h2>
            <p className="text-slate-500 text-sm mt-2">Veuillez entrer le code administrateur.</p>
          </div>
          <input 
            type="password" 
            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none ring-2 ring-transparent focus:ring-primary/20"
            placeholder="Code secret"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-primary transition-all">
            Connexion
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;