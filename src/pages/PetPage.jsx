import React from 'react';
import { useStore } from '../store/useStore';
import { Baby, Book, GraduationCap, Utensils, Gamepad2, Brain, Sparkles, Heart } from 'lucide-react';

const LEVEL_MAP = {
  1: { name: 'Bebek', xpReq: 100, income: 0, icon: Baby },
  2: { name: 'İlkokul', xpReq: 250, income: 0, icon: Book },
  3: { name: 'Ortaokul', xpReq: 500, income: 0, icon: Book },
  4: { name: 'Lise', xpReq: 1000, income: 50, icon: Book },
  5: { name: 'Üniversite', xpReq: 2000, income: 150, icon: GraduationCap },
  6: { name: 'Yüksek Lisans', xpReq: 4000, income: 300, icon: Brain },
  7: { name: 'Doktora', xpReq: 999999, income: 600, icon: Sparkles }
};

export default function PetPage() {
  const { pet, balance, spendMoney, updatePet } = useStore();

  if (!pet) return <div className="text-center mt-20">Bebek verisi yükleniyor...</div>;

  const currentLevelData = LEVEL_MAP[pet.level];
  const Icon = currentLevelData.icon;

  const handleAction = (action) => {
    let newPet = { ...pet };
    let cost = 0;

    if (action === 'feed') {
      cost = 10;
      if (balance < cost) return alert('Yeterli altın yok!');
      newPet.hunger = Math.min(100, newPet.hunger + 20);
      newPet.happiness = Math.min(100, newPet.happiness + 5);
    } else if (action === 'play') {
      cost = 5;
      if (balance < cost) return alert('Yeterli altın yok!');
      newPet.happiness = Math.min(100, newPet.happiness + 20);
      newPet.hunger = Math.max(0, newPet.hunger - 10);
    } else if (action === 'study') {
      cost = 20;
      if (balance < cost) return alert('Yeterli altın yok!');
      if (newPet.hunger < 20 || newPet.happiness < 20) {
        return alert("Bebek çok aç veya mutsuz! Önce besle veya oynat.");
      }
      newPet.xp += 30;
      newPet.hunger = Math.max(0, newPet.hunger - 15);
      newPet.happiness = Math.max(0, newPet.happiness - 20);
    }

    // Level up check
    if (newPet.level < 7 && newPet.xp >= LEVEL_MAP[newPet.level].xpReq) {
      newPet.xp -= LEVEL_MAP[newPet.level].xpReq;
      newPet.level += 1;
      alert(`🎉 TEBRİKLER! Bebek seviye atladı ve ${LEVEL_MAP[newPet.level].name} oldu!`);
    }

    spendMoney(cost);
    updatePet(newPet);
  };

  const progressPercent = Math.min(100, (pet.xp / currentLevelData.xpReq) * 100);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-gray-800 tracking-tight mb-2">Altın Varaklı Bebek</h1>
        <p className="text-gold-dark font-medium italic text-lg">Bebeği büyüt, pasif gelirleri katla!</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gold/40 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-light/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>

        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-1 text-center">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gold-light to-white rounded-full border-4 border-gold shadow-lg flex items-center justify-center mb-6 relative">
               <Icon size={80} className="text-gold-dark" />
               <div className="absolute -bottom-4 bg-gray-900 text-white px-6 py-2 rounded-full font-bold text-lg shadow-md whitespace-nowrap">
                 Seviye {pet.level}: {currentLevelData.name}
               </div>
            </div>
          </div>
          
          <div className="flex-1 w-full space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div>
              <div className="flex justify-between font-bold text-gray-700 mb-2">
                <span>Eğitim XP ({pet.xp}/{currentLevelData.xpReq})</span>
                <span className="text-gold-dark">{Math.floor(progressPercent)}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gold transition-all duration-500" style={{width: `${progressPercent}%`}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-gray-700 mb-2">
                <span className="flex items-center gap-2"><Utensils size={18}/> Tokluk</span>
                <span className="text-green-600">{pet.hunger}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-green-500 transition-all duration-500" style={{width: `${pet.hunger}%`}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-gray-700 mb-2">
                <span className="flex items-center gap-2"><Heart size={18}/> Mutluluk</span>
                <span className="text-pink-500">{pet.happiness}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-pink-500 transition-all duration-500" style={{width: `${pet.happiness}%`}}></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500 font-medium">Şu Anki Bebek Maaşı (Her 5 Dk)</p>
              <p className="text-2xl font-black text-green-600">
                +${currentLevelData.income}
              </p>
              {currentLevelData.income === 0 && (
                <p className="text-xs text-gray-400 mt-1">Liseye geçince gelir başlar.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <button 
          onClick={() => handleAction('feed')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-green-200 hover:border-green-400 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Utensils size={24} />
          </div>
          <h3 className="font-bold text-xl mb-1 text-gray-800">Mama Yedir</h3>
          <p className="text-gray-500 text-sm mb-4">Tokluk +20, Mutluluk +5</p>
          <div className="font-bold text-red-500 bg-red-50 px-3 py-1 rounded-lg inline-block">-$10</div>
        </button>

        <button 
          onClick={() => handleAction('play')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Gamepad2 size={24} />
          </div>
          <h3 className="font-bold text-xl mb-1 text-gray-800">Oyun Oyna</h3>
          <p className="text-gray-500 text-sm mb-4">Mutluluk +20, Tokluk -10</p>
          <div className="font-bold text-red-500 bg-red-50 px-3 py-1 rounded-lg inline-block">-$5</div>
        </button>

        <button 
          onClick={() => handleAction('study')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Book size={24} />
          </div>
          <h3 className="font-bold text-xl mb-1 text-gray-800">Ders Çalıştır</h3>
          <p className="text-gray-500 text-sm mb-4">XP +30, Tokluk -15, Mutluluk -20</p>
          <div className="font-bold text-red-500 bg-red-50 px-3 py-1 rounded-lg inline-block">-$20</div>
        </button>
      </div>
    </div>
  );
}
