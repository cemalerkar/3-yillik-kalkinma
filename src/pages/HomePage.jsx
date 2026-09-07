import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-sm">
          Zeynep & Cemal'in Oyun Alanı
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          3. Yıllık Kalkınma Projesi'ne hoş geldiniz. İstediğiniz oyunu seçin, rekabet edin ve altınları toplayın!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* bestSeller Game Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/20 hover:border-gold/50 transition-all hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] flex flex-col group">
          <div className="h-48 bg-gradient-to-br from-gold-light/40 to-white flex items-center justify-center border-b border-gold/10 relative overflow-hidden">
            {/* Decorative pillars */}
            <div className="absolute left-4 top-0 bottom-0 w-8 flex justify-center opacity-30">
              <div className="w-1 h-full bg-gold-dark mx-0.5"></div>
              <div className="w-1 h-full bg-gold-dark mx-0.5"></div>
            </div>
            <div className="absolute right-4 top-0 bottom-0 w-8 flex justify-center opacity-30">
              <div className="w-1 h-full bg-gold-dark mx-0.5"></div>
              <div className="w-1 h-full bg-gold-dark mx-0.5"></div>
            </div>
            
            <h2 className="text-4xl font-black text-gray-800 tracking-tight z-10 group-hover:scale-105 transition-transform">
              bestSeller
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-gold-dark font-medium mb-2 italic">"Sıradışı satışlar için varakları ortaya çıkar"</p>
            <p className="text-gray-600 mb-6 flex-1">
              Jürilere sana verilen tuhaf eşyayı satmaya çalış. Ama dikkat et, bazı kelimeleri kullanman kesinlikle yasak!
            </p>
            <Link 
              to="/game/bestseller" 
              className="w-full py-3 px-4 bg-gold hover:bg-gold-dark text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Play size={20} />
              Oyuna Başla
            </Link>
          </div>
        </div>

        {/* oppoPopposite Game Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/20 hover:border-gold/50 transition-all hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] flex flex-col group">
          <div className="h-48 bg-gradient-to-br from-gold-light/40 to-white flex items-center justify-center border-b border-gold/10 relative overflow-hidden">
            {/* Decorative pillars */}
            <div className="absolute left-4 top-0 bottom-0 w-8 flex justify-center opacity-30">
              <div className="w-1 h-full bg-gold-dark mx-0.5"></div>
              <div className="w-1 h-full bg-gold-dark mx-0.5"></div>
            </div>
            <div className="absolute right-4 top-0 bottom-0 w-8 flex justify-center opacity-30">
              <div className="w-1 h-full bg-gold-dark mx-0.5"></div>
              <div className="w-1 h-full bg-gold-dark mx-0.5"></div>
            </div>
            
            <h2 className="text-4xl font-black text-gray-800 tracking-tight z-10 group-hover:scale-105 transition-transform flex items-center gap-2">
              oppoPopposite
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-gold-dark font-medium mb-2 italic">"Tahtrevalli için kendi tezini savun"</p>
            <p className="text-gray-600 mb-6 flex-1">
              Rastgele atanan ikilemlerde (Yalan vs Gerçek vb.) tarafını seç, en iyi savunmayı yap ve Jüri'yi etkile. Bankaya kazandırdığın para skorunun yarısı kadar olacak!
            </p>
            <Link 
              to="/game/oppopopposite" 
              className="w-full py-3 px-4 bg-gold hover:bg-gold-dark text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Play size={20} />
              Oyuna Başla
            </Link>
          </div>
        </div>

        {/* Sexident Game Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/20 hover:border-gold/50 transition-all hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] flex flex-col group md:col-span-2">
          <div className="h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border-b border-gold/10 relative overflow-hidden">
            {/* Decorative pillars */}
            <div className="absolute left-10 top-0 bottom-0 w-8 flex justify-center opacity-40">
              <div className="w-1 h-full bg-gold mx-1"></div>
              <div className="w-1 h-full bg-gold mx-1"></div>
            </div>
            <div className="absolute right-10 top-0 bottom-0 w-8 flex justify-center opacity-40">
              <div className="w-1 h-full bg-gold mx-1"></div>
              <div className="w-1 h-full bg-gold mx-1"></div>
            </div>
            
            <h2 className="text-4xl font-black text-gold tracking-tight z-10 group-hover:scale-105 transition-transform flex items-center gap-2">
              Sexident Manifestosu
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-gold-dark font-medium mb-2 italic">"Evrenin Sıkıcı Gezegenlerine Yetişkin Modu Getir!"</p>
            <p className="text-gray-600 mb-6 flex-1">
              Farklı gezegenlerin varoluşsal ve fantastik krizlerini çözmek için bir araya gelin, ortak manifestonuzu yazın ve "Sexident" imzalarınızı atarak galaksiyi kurtarın!
            </p>
            <Link 
              to="/game/sexident" 
              className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Play size={20} />
              Konseye Bağlan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
