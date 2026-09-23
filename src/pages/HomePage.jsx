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
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/20 hover:border-gold/50 transition-all hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] flex flex-col group">
          <div className="h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border-b border-gold/10 relative overflow-hidden">
            {/* Decorative pillars */}
            <div className="absolute left-4 top-0 bottom-0 w-8 flex justify-center opacity-40">
              <div className="w-1 h-full bg-gold mx-0.5"></div>
              <div className="w-1 h-full bg-gold mx-0.5"></div>
            </div>
            <div className="absolute right-4 top-0 bottom-0 w-8 flex justify-center opacity-40">
              <div className="w-1 h-full bg-gold mx-0.5"></div>
              <div className="w-1 h-full bg-gold mx-0.5"></div>
            </div>
            
            <h2 className="text-3xl font-black text-gold tracking-tight z-10 group-hover:scale-105 transition-transform flex items-center gap-2">
              Sexident Manifestosu
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-gold-dark font-medium mb-2 italic">"Evrene Yetişkin Modu Getir!"</p>
            <p className="text-gray-600 mb-6 flex-1">
              Farklı gezegenlerin fantastik krizlerini çözmek için bir araya gelin, manifestonuzu yazın ve "Sexident" imzalarınızı atın!
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

        {/* TimeStop Game Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gold/20 hover:border-gold/50 transition-all hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] flex flex-col group">
          <div className="h-48 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center border-b border-gold/10 relative overflow-hidden">
            {/* Decorative pillars */}
            <div className="absolute left-4 top-0 bottom-0 w-8 flex justify-center opacity-40">
              <div className="w-1 h-full bg-blue-400 mx-0.5"></div>
              <div className="w-1 h-full bg-blue-400 mx-0.5"></div>
            </div>
            <div className="absolute right-4 top-0 bottom-0 w-8 flex justify-center opacity-40">
              <div className="w-1 h-full bg-blue-400 mx-0.5"></div>
              <div className="w-1 h-full bg-blue-400 mx-0.5"></div>
            </div>
            
            <h2 className="text-4xl font-black text-blue-100 tracking-tight z-10 group-hover:scale-105 transition-transform flex items-center gap-2">
              Zaman Bükücü
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-blue-600 font-medium mb-2 italic">"Kim saniyelere daha iyi hükmedecek?"</p>
            <p className="text-gray-600 mb-6 flex-1">
              Rastgele belirlenen milisaniyelik hedef süreye en yakın zamanda dur butonuna bas! 5 roundluk bu gergin kapışmada reflekslerini konuştur.
            </p>
            <Link 
              to="/game/timestop" 
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Play size={20} />
              Oyuna Başla
            </Link>
          </div>
        </div>
      </div>

      {/* 5th Game Spanning 2 Columns Below */}
      <div className="w-full max-w-4xl mt-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-red-500/20 hover:border-red-500/50 transition-all hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] flex flex-col group">
          <div className="h-48 bg-gradient-to-br from-red-900 to-black flex items-center justify-center border-b border-red-500/10 relative overflow-hidden">
            {/* Decorative pillars */}
            <div className="absolute left-10 top-0 bottom-0 w-8 flex justify-center opacity-40">
              <div className="w-1 h-full bg-red-500 mx-1"></div>
              <div className="w-1 h-full bg-red-500 mx-1"></div>
            </div>
            <div className="absolute right-10 top-0 bottom-0 w-8 flex justify-center opacity-40">
              <div className="w-1 h-full bg-red-500 mx-1"></div>
              <div className="w-1 h-full bg-red-500 mx-1"></div>
            </div>
            
            <h2 className="text-4xl font-black text-red-500 tracking-tight z-10 group-hover:scale-105 transition-transform flex items-center gap-2">
              F1 Refleks
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-red-700 font-medium mb-2 italic">"Işıklar söndüğünde kim daha hızlı kalkacak?"</p>
            <p className="text-gray-600 mb-6 flex-1">
              F1 pilotlarının kalkış testi! 4 kırmızı ışık rastgele aralıklarla yanacak. Hepsi yandıktan sonra bir anda sönecekler. Işıkların söndüğü an'a en hızlı tepki veren butona basar ve roundu kazanır. Hatalı çıkış yapmamaya dikkat et!
            </p>
            <Link 
              to="/game/f1reflex" 
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Play size={20} />
              Yarışa Başla
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
