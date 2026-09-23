import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useStore } from './store/useStore';
import { Home, Store, Coins, BookOpen, Baby, PieChart } from 'lucide-react';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ArchivePage from './pages/ArchivePage';
import BestSellerGame from './games/BestSellerGame';
import OppoPoppositeGame from './games/OppoPoppositeGame';
import SexidentGame from './games/SexidentGame';
import TimeStopGame from './games/TimeStopGame';
import F1ReflexGame from './games/F1ReflexGame';
import LobbyWrapper from './components/LobbyWrapper';

import PetPage from './pages/PetPage';
import FinancePage from './pages/FinancePage';

function App() {
  const balance = useStore((state) => state.balance);
  const isLoaded = useStore((state) => state.isLoaded);
  const initFirebase = useStore((state) => state.initFirebase);
  const processPassives = useStore((state) => state.processPassives);
  const passiveIncomes = useStore((state) => state.passiveIncomes);
  const passiveExpenses = useStore((state) => state.passiveExpenses);

  useEffect(() => {
    initFirebase();
    
    // Check passive incomes every 10 seconds
    const interval = setInterval(() => {
      processPassives();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [initFirebase, processPassives]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-[#F9F9F6] flex items-center justify-center font-bold text-gold-dark text-xl">İmparatorluk Yükleniyor...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gold/30 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gold-dark flex items-center gap-2">
              <span className="text-2xl border-x-2 border-gold px-2 tracking-widest">III</span>
              <span className="hidden sm:inline">Yıllık Kalkınma Projesi</span>
            </Link>
            
            <div className="flex items-center gap-6">
              
              <div className="hidden md:flex flex-col text-right text-xs">
                 <div className="text-green-600 font-bold">+ {passiveIncomes.reduce((acc, curr) => acc + curr.amount, 0)}$ / 5dk</div>
                 <div className="text-red-600 font-bold">- {passiveExpenses.reduce((acc, curr) => acc + curr.amount, 0)}$ / 5dk</div>
                 <div className="text-gray-500 font-medium">Varaklı Bebek Aktif</div>
              </div>

              <div className="flex items-center gap-1.5 bg-gold-light/30 px-3 py-1.5 rounded-full border border-gold/40 text-gold-dark font-semibold">
                <Coins size={18} />
                <span>${balance}</span>
              </div>
              
              <nav className="flex gap-4">
                <Link to="/pet" className="text-gray-600 hover:text-gold-dark transition-colors flex flex-col items-center">
                  <Baby size={20} />
                  <span className="text-xs mt-1">Sanal Bebek</span>
                </Link>
                <Link to="/finance" className="text-gray-600 hover:text-gold-dark transition-colors flex flex-col items-center">
                  <PieChart size={20} />
                  <span className="text-xs mt-1">Gelir/Gider</span>
                </Link>
                <Link to="/shop" className="text-gray-600 hover:text-gold-dark transition-colors flex flex-col items-center">
                  <Store size={20} />
                  <span className="text-xs mt-1">Mağaza</span>
                </Link>
                <Link to="/archive" className="text-gray-600 hover:text-gold-dark transition-colors flex flex-col items-center">
                  <BookOpen size={20} />
                  <span className="text-xs mt-1">Arşiv</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/pet" element={<PetPage />} />
            <Route path="/game/bestseller" element={<LobbyWrapper gameId="bestseller"><BestSellerGame /></LobbyWrapper>} />
            <Route path="/game/oppopopposite" element={<LobbyWrapper gameId="oppopopposite"><OppoPoppositeGame /></LobbyWrapper>} />
            <Route path="/game/sexident" element={<LobbyWrapper gameId="sexident" timerLimit={0}><SexidentGame /></LobbyWrapper>} />
            <Route path="/game/timestop" element={<LobbyWrapper gameId="timestop" timerLimit={0}><TimeStopGame /></LobbyWrapper>} />
            <Route path="/game/f1reflex" element={<LobbyWrapper gameId="f1reflex" timerLimit={0}><F1ReflexGame /></LobbyWrapper>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
