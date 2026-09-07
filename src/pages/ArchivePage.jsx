import React from 'react';
import { useStore } from '../store/useStore';
import { BookOpen, Calendar } from 'lucide-react';

export default function ArchivePage() {
  const archive = useStore(state => state.archive);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-gold-dark" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Arşiv</h1>
      </div>

      {archive.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-lg">Henüz hiç oyun oynanmadı. bestSeller oynadıkça geçmişin burada birikecek.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {archive.map((game, idx) => {
            const isBestSeller = game.type === 'bestSeller' || (!game.type && game.item);
            
            if (isBestSeller) {
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 relative">
                  <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-bold uppercase tracking-wide">
                    bestSeller
                  </div>
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100 mt-2">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800">Satılan Eşya: {game.item}</h3>
                      <div className="flex gap-2 mt-2">
                        {game.forbiddenWords && game.forbiddenWords.map(w => (
                          <span key={w} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md line-through">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-lg">
                      <Calendar size={14} />
                      <span>{new Date(game.date).toLocaleString('tr-TR')}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-2">Cemal'in Sunumu</h4>
                      <p className="text-gray-700 italic">"{game.cemalText}"</p>
                    </div>
                    <div className="bg-pink-50/50 p-4 rounded-lg border border-pink-100">
                      <h4 className="font-semibold text-pink-800 mb-2">Zeynep'in Sunumu</h4>
                      <p className="text-gray-700 italic">"{game.zeynepText}"</p>
                    </div>
                  </div>

                  <div className="bg-gold-light/10 p-4 rounded-lg border border-gold/20 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gold-dark mb-1">Jüri Değerlendirmesi</h4>
                      <p className="text-gray-600 text-sm">Kazanılan toplam ödül.</p>
                    </div>
                    <div className="text-2xl font-black text-green-600">
                      +${game.earned}
                    </div>
                  </div>
                </div>
              );
            }

            // oppoPopposite
            return (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 relative">
                <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-bold uppercase tracking-wide">
                  oppoPopposite
                </div>
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100 mt-2">
                  <div className="pr-12">
                    <h3 className="font-bold text-xl text-gray-800">İkilem: {game.topic}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-lg flex-shrink-0">
                    <Calendar size={14} />
                    <span>{new Date(game.date).toLocaleString('tr-TR')}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className={`p-4 rounded-lg border ${game.winner === 'cemal' ? 'bg-blue-100/50 border-blue-300' : 'bg-blue-50/50 border-blue-100'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-blue-800">Cemal ({game.cemalSide})</h4>
                      <span className="font-black text-blue-600">{game.cemalScore} Puan</span>
                    </div>
                    <p className="text-gray-700 italic">"{game.cemalText}"</p>
                  </div>
                  <div className={`p-4 rounded-lg border ${game.winner === 'zeynep' ? 'bg-pink-100/50 border-pink-300' : 'bg-pink-50/50 border-pink-100'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-pink-800">Zeynep ({game.zeynepSide})</h4>
                      <span className="font-black text-pink-600">{game.zeynepScore} Puan</span>
                    </div>
                    <p className="text-gray-700 italic">"{game.zeynepText}"</p>
                  </div>
                </div>

                <div className="bg-yellow-50/50 p-4 rounded-lg border border-yellow-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Kazanılan Altın (Ortak Kasa)</h4>
                    <p className="text-gray-600 text-sm">Puanların yarısı kuralı.</p>
                  </div>
                  <div className="text-2xl font-black text-yellow-600">
                    +${game.totalMoney}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
