import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ShoppingBag, Coffee, Pizza, Gift, Car, Home as HomeIcon, Ship, Landmark, Train, Plane, X } from 'lucide-react';

const SHOP_ITEMS = [
  { id: '1', name: 'Altın Varaklı Kahve', price: 15, icon: Coffee, desc: 'Sabahları ayıltır.' },
  { id: '2', name: 'Antik Pizza', price: 30, icon: Pizza, desc: 'Eski Roma tarifli bol peynirli pizza.' },
  { id: '3', name: 'Küçük Araba', price: 10000, icon: Car, desc: '5 dakikada 10$ benzin masrafı.', passiveType: 'expense', passiveName: 'Benzin Gideri', passiveAmount: 10, passiveInterval: 5 },
  { id: '4', name: 'Lüks Araba', price: 20000, icon: Car, desc: '5 dakikada 25$ benzin masrafı.', passiveType: 'expense', passiveName: 'Benzin Gideri', passiveAmount: 25, passiveInterval: 5 },
  { id: '5', name: 'Küçük Ev', price: 10000, icon: HomeIcon, desc: '5 dakikada 30$ market masrafı.', passiveType: 'expense', passiveName: 'Market Giderleri', passiveAmount: 30, passiveInterval: 5 },
  { id: '6', name: 'Lüks Villa', price: 10000, icon: HomeIcon, desc: '5 dakikada 50$ market masrafı.', passiveType: 'expense', passiveName: 'Market Giderleri', passiveAmount: 50, passiveInterval: 5 },
  { id: '7', name: 'Gemi', price: 30000, icon: Ship, desc: '5 dakikada 10$ iskele masrafı.', passiveType: 'expense', passiveName: 'İskele Ücreti', passiveAmount: 10, passiveInterval: 5 },
  { id: '8', name: 'Halktan Sex Vergisi', price: 20000, icon: Landmark, desc: '20 dakikada 700$ gelir getirir.', passiveType: 'income', passiveName: 'SEX Geliri', passiveAmount: 700, passiveInterval: 20 },
  { id: '9', name: 'Taksi Plakası', price: 1000, icon: Car, desc: '10 dakikada 20$ gelir getirir.', passiveType: 'income', passiveName: 'Taksi Geliri', passiveAmount: 20, passiveInterval: 10 },
  { id: '10', name: '76O Akbil', price: 5000, icon: Train, desc: '5 dakikada 20$ gelir getirir.', passiveType: 'income', passiveName: '76O Akbil Geliri', passiveAmount: 20, passiveInterval: 5 },
  { id: '11', name: 'Tatile Çık', price: 20000, icon: Plane, desc: 'Dünyayı dolaşın.', isHoliday: true }
];

export default function ShopPage() {
  const balance = useStore(state => state.balance);
  const buyItem = useStore(state => state.buyItem);
  const inventory = useStore(state => state.inventory);

  const [holidayModal, setHolidayModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleBuy = (item) => {
    if (balance >= item.price) {
      if (item.isHoliday) {
        setHolidayModal(true);
      } else {
        buyItem(item);
      }
    } else {
      alert("Bakiye yetersiz!");
    }
  };

  const startHoliday = (country) => {
    buyItem(SHOP_ITEMS.find(i => i.id === '11'));
    setSelectedCountry(country);
    setActiveSlide(1);
    
    // Auto slideshow
    let slide = 1;
    const interval = setInterval(() => {
      slide++;
      setActiveSlide(slide);
      if (slide > 5) {
        clearInterval(interval);
      }
    }, 2000);
  };

  const countries = ['ABD', 'İtalya', 'İngiltere', 'Almanya', 'Japonya'];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="text-gold-dark" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Mağaza</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {SHOP_ITEMS.map((item) => {
          const Icon = item.icon;
          const canAfford = balance >= item.price;
          
          return (
            <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gold-light/20 rounded-full flex items-center justify-center mb-4 text-gold-dark">
                <Icon size={32} />
              </div>
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4 h-10">{item.desc}</p>
              <button 
                onClick={() => handleBuy(item)}
                disabled={!canAfford}
                className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                  canAfford 
                    ? 'bg-gold hover:bg-gold-dark text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                ${item.price.toLocaleString()} Satın Al
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Envanterin</h2>
        {inventory.length === 0 ? (
          <p className="text-gray-500 italic">Henüz hiçbir şey satın almadın. Paralarını harcama zamanı!</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {inventory.map((item, idx) => {
              const Icon = item.icon || Gift;
              return (
                <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                  <Icon size={16} className="text-gold" />
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Holiday Modal */}
      {holidayModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden relative shadow-2xl">
            {!selectedCountry ? (
               <div className="p-8 text-center">
                  <button onClick={() => setHolidayModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X size={24}/>
                  </button>
                  <h2 className="text-3xl font-black mb-6">Nereye Uçuyoruz?</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {countries.map(c => (
                       <button key={c} onClick={() => startHoliday(c)} className="py-4 border-2 border-gold text-gold-dark font-bold rounded-xl hover:bg-gold hover:text-white transition-all text-xl">
                         {c}
                       </button>
                    ))}
                  </div>
               </div>
            ) : (
               <div className="relative h-96 bg-gray-900 flex items-center justify-center text-white">
                  {activeSlide <= 5 ? (
                     <div className="text-center animate-pulse">
                        <Plane size={64} className="mx-auto mb-4 text-gold" />
                        <h2 className="text-4xl font-bold">{selectedCountry} Tatili - Fotoğraf {activeSlide}/5</h2>
                     </div>
                  ) : (
                     <div className="text-center p-8 bg-gold-dark w-full h-full flex flex-col justify-center items-center">
                        <h1 className="text-5xl font-black mb-4">Sexidentler Ülkeye Geri Döndü!</h1>
                        <p className="text-xl">Tatil bitti, görev başına.</p>
                        <button onClick={() => { setHolidayModal(false); setSelectedCountry(null); }} className="mt-8 px-8 py-3 bg-white text-gold-dark font-bold rounded-xl hover:bg-gray-100">
                          Kapat
                        </button>
                     </div>
                  )}
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
