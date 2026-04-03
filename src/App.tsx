import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from '../src/pages/Home';
import Pedagogie from '../src/pages/Pedagogie';
import Catalogue from '../src/pages/Catalogue';
import CatalogueList from '../src/pages/CatalogueList';
import References from '../src/pages/References';
import Apropos from '../src/pages/Apropos';
import Contact from '../src/pages/Contact';
import Reservation from '../src/pages/Reservation';
import AdminReservations from './pages/admin/AdminReservations'; 
import AdminContacts from './pages/admin/AdminContacts';


import FAQ from './other_pages/Faq';
import ReglementInterieur from './other_pages/ReglementInterieur';
import CGV from './other_pages/CGV';
import MentionsLegales from './other_pages/MentionsLegales';
import RGPD from './other_pages/RGPD';

import AdminGuard from './components/auth/AdminGuard';

const SECRET_RESERVATION_PATH = import.meta.env.VITE_SECRET_RESERVATION_PATH;
const SECRET_ADMIN_PATH = import.meta.env.VITE_SECRET_ADMIN_PATH;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            {/* --- ROUTES PUBLIQUES VISIBLES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/pedagogie" element={<Pedagogie />} />
            <Route path="/references" element={<References />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Catalogue */}
            <Route path="/conduite-en-vul" element={<Catalogue />} />
            <Route path="/catalogue-list" element={<CatalogueList />} />

            {/* Pages Légales & FAQ */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/reglement-interieur" element={<ReglementInterieur />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/rgpd" element={<RGPD />} />

            {/* --- ROUTES SÉCURISÉES (ACCÈS COMPLEXE) --- */}
            <Route path={SECRET_RESERVATION_PATH} element={<Reservation />} />

            <Route 
              path={SECRET_ADMIN_PATH} 
              element={
                <AdminGuard>
                  <AdminContacts />
                  <AdminReservations />
                </AdminGuard>
              } 
            />

            {/* --- PROTECTION & REDIRECTIONS --- */}
            <Route path="/reservation" element={<Navigate to="/" replace />} />
            <Route path="/admin" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;