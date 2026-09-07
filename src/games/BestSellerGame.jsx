import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Send, AlertTriangle, Sparkles, User, GraduationCap, Flame } from 'lucide-react';

const GAME_ITEMS = [
  { item: 'Eski Sevgili Mesaj Engelleyici Eldiven', words: ['Yazmak', 'Pişman', 'Aşk'] },
  { item: 'Hızlı Adım Tetikleyici Zemin', words: ['Yavaş', 'Yürümek', 'Ön'] },
  { item: 'İsim Kurtarıcı Akıllı Küpe', words: ['Hatırlamak', 'Tanıdık', 'Unutmak'] },
  { item: 'Tersine Çalar Saat (Rüya Koruyucu)', words: ['Uyanmak', 'Sabah', 'Alarm'] },
  { item: 'Mükemmel Karpuz Tokmaklayıcı', words: ['Ses', 'Kırmızı', 'Tatlı'] },
  { item: 'Toplantıdan Kurtarma Robotu', words: ['Çıkmak', 'Patron', 'Sıkıcı'] },
  { item: 'Ön Koltuk Rezerve Eden Hologram', words: ['Yer', 'Oturmak', 'Dolu'] },
  { item: 'Hızlı Duş Ayarlayıcı', words: ['Soğuk', 'Ayar', 'Donmak'] },
  { item: 'Akıllı Bahşiş Gözlüğü', words: ['Para', 'Hesap', 'Garson'] },
  { item: 'Sessiz Cips Paketi', words: ['Ses', 'Yemek', 'Gece'] },
  { item: 'Zaman Hızlandırıcı Sakız', words: ['Beklemek', 'Sıkılmak', 'Saat'] },
  { item: 'Eski Şarkı Hatırlatıcı Düdük', words: ['Şarkı', 'Melodi', 'Ad'] },
  { item: 'Bavul Kapatma Sıkıştırıcısı', words: ['Sığmak', 'Tatil', 'Eşya'] },
  { item: 'Akraba Soru Savar', words: ['Soru', 'Evlilik', 'Aile'] },
  { item: 'Kendi Kendini Bulan Anahtarlık', words: ['Kayıp', 'Çanta', 'Aramak'] },
  { item: 'Sosyal Medya Karar Filtresi', words: ['Paylaşmak', 'Rezil', 'İnternet'] },
  { item: 'Sonsuz Şarj Kılıfı', words: ['Pil', 'Kapanmak', 'Elektrik'] },
  { item: 'Yemek Menüsü Sadeleştirici', words: ['Seçmek', 'Kararsız', 'Restoran'] },
  { item: 'Gizli Esneme Maskesi', words: ['Uykulu', 'Ağız', 'Sıkıcı'] },
  { item: 'Otomatik Tartı İltifatçısı', words: ['Kilo', 'Şişman', 'Rakam'] },
  { item: 'Sessiz Kalkan (Akustik Çadır)', words: ['Kulaklık', 'Gürültü', 'Kafa'] },
  { item: 'Sahte Bildirim Bilekliği', words: ['Bahane', 'Kaçmak', 'Arama'] },
  { item: 'Sadece Sağ Tek Çorap Sigortası', words: ['Kayıp', 'Ayak', 'Yıkamak'] },
  { item: 'Sonsuz Çay/Kahve Derecesi Sabitleyici', words: ['Sıcak', 'Soğuk', 'Termos'] },
  { item: 'Görünmezlik Pelerini (Ama Sadece Kuryeler İçin)', words: ['Kıyafet', 'Sipariş', 'Pijama'] },
  { item: 'Düşünce Süzgeci Mikrofonu', words: ['Küfür', 'Sinir', 'Filtre'] },
  { item: 'Dramatik Arka Plan Müziği Ayakkabısı', words: ['Şarkı', 'Yürümek', 'Ritim'] },
  { item: 'Sosyal Batarya Göstergesi Broşu', words: ['Yorgun', 'Enerji', 'Muhabbet'] },
  { item: 'Garantili Şans Kurabiyesi', words: ['Fal', 'Gelecek', 'Çin'] },
  { item: 'Koku Engelleyen Asansör Parfümü', words: ['Kötü', 'Nefes', 'Koku'] },
  { item: 'Mükemmel Avokado Dedektörü', words: ['Olgun', 'Yeşil', 'Meyve'] },
  { item: 'Uyku Hırsızı Engelleyici (Gece Ekran Kilidi)', words: ['Telefon', 'Bağımlılık', 'Gece'] },
  { item: 'Profesyonel Karar Verme Parası', words: ['Seçim', 'Şans', 'Yazı'] },
  { item: 'Hafıza Silici Dizi/Film Hapı', words: ['Unutmak', 'Spoiler', 'İzlemek'] },
  { item: 'Yalan Detektörlü Evcil Hayvan Tasması', words: ['Konuşmak', 'Kedi', 'Köpek'] },
  { item: 'Görünmez Yemek Leke Bandı', words: ['Tişört', 'Salça', 'Temizlemek'] },
  { item: 'Sanal İkiz (Toplantı Dublörü)', words: ['Kamera', 'Zoom', 'Dinlemek'] },
  { item: 'Spoiler Kalkanı Gözlüğü', words: ['Son', 'Öğrenmek', 'Film'] },
  { item: 'Gereksiz Eşya Vicdan Rahatlatıcısı', words: ['İsraf', 'Para', 'Alışveriş'] },
  { item: 'Evrensel Kablo Düğümsüzleştirici', words: ['Kulaklık', 'Karışmak', 'Çanta'] }
];

const BONUS_WORDS = ['sex', 'porn', 'tahrevalli', 'varak', 'imparator', 'mex'];

const JUDGES = [
  { id: 'z', name: 'Slay Z Kuşağı', icon: Flame, color: 'text-pink-500' },
  { id: 'halk', name: 'Sıradan İnsan', icon: User, color: 'text-blue-500' },
  { id: 'prof', name: 'Prof. Satış Uzmanı', icon: GraduationCap, color: 'text-purple-600' }
];

export default function BestSellerGame({ roomData, role, roomId, updateText, submitGame, timeLeft, updateRoomData }) {
  const addMoney = useStore(state => state.addMoney);
  const addToArchive = useStore(state => state.addToArchive);

  const [currentItem, setCurrentItem] = useState(null);
  const [localText, setLocalText] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (roomId) {
      let hash = 0;
      for (let i = 0; i < roomId.length; i++) hash = roomId.charCodeAt(i) + ((hash << 5) - hash);
      const index = Math.abs(hash) % GAME_ITEMS.length;
      setCurrentItem(GAME_ITEMS[index]);
    }
    setResult(null);
    setLocalText('');
  }, [roomId, roomData?.status]);

  useEffect(() => {
    if (roomData?.status === 'evaluating' && !result && currentItem) {
      if (roomData.result) {
        setResult(roomData.result);
        
        const totalScore = roomData.result.totalScore;
        if (totalScore >= 50) {
          const a = new Audio('/success.mp3'); a.volume = 0.2; a.play().catch(e => console.log('Audio error:', e));
        } else {
          const a = new Audio('/fail.mp3'); a.volume = 0.2; a.play().catch(e => console.log('Audio error:', e));
        }

        if (role === 'cemal') {
          addMoney(roomData.result.earned);
          addToArchive({
            type: 'bestSeller',
            item: currentItem.item,
            forbiddenWords: currentItem.words,
            cemalText: roomData.cemalText || '',
            zeynepText: roomData.zeynepText || '',
            earned: roomData.result.earned,
            date: new Date().toISOString()
          });
        }
      } else if (role === 'cemal') {
        handleEvaluation();
      }
    }
  }, [roomData?.status, roomData?.result, currentItem]);

  const handleTextChange = (e) => {
    setLocalText(e.target.value);
    updateText(e.target.value);
  };

  const evaluatePitch = (text) => {
    let score = Math.floor(Math.random() * 30) + 35; // base 35 to 64
    if (text.length > 50) score += 15;
    
    let usedForbidden = [];
    let usedBonus = [];

    const lowerText = text.toLowerCase();

    currentItem.words.forEach(w => {
      if (lowerText.includes(w.toLowerCase())) {
        usedForbidden.push(w);
        score -= 40; // huge penalty
      }
    });

    BONUS_WORDS.forEach(w => {
      if (lowerText.includes(w)) {
        usedBonus.push(w);
        score += 25; // big bonus
      }
    });

    score = Math.max(0, Math.min(100, score)); // clamp 0-100

    return { score, usedForbidden, usedBonus };
  };

  const generateJudgeComment = (judgeId, score, usedForbidden, usedBonus) => {
    if (usedForbidden.length > 0) return "Kuralları yıktın! Bunu kabul edemem.";
    
    if (judgeId === 'z') {
      if (usedBonus.length > 0) return "Omg bu tam bir vibe! Aşırı hype, slayyy!";
      if (score > 60) return "Cidden iyi app falan çıkar bundan, beğendim.";
      return "Biraz boomer işi olmuş, cringe.";
    }
    if (judgeId === 'halk') {
      if (usedBonus.length > 0) return "Değişik bir yaklaşım... İlgimi çekti açıkçası.";
      if (score > 60) return "Güzelmiş, pazarda olsa alırım.";
      return "Bana pek yaramaz gibi, sağ ol.";
    }
    if (judgeId === 'prof') {
      if (usedBonus.length > 0) return "Paradigmaları yıkan muazzam bir pazarlama stratejisi!";
      if (score > 60) return "Müşteri psikolojisini iyi analiz etmişsiniz.";
      return "Sektör dinamiklerinden oldukça uzaksınız.";
    }
  };

  const handleEvaluation = async () => {
    const cemalText = roomData?.cemalText || '';
    const zeynepText = roomData?.zeynepText || '';

    const cemalEval = evaluatePitch(cemalText);
    const zeynepEval = evaluatePitch(zeynepText);

    const totalScore = (cemalEval.score + zeynepEval.score) / 2;
    const earned = Math.floor(totalScore);

    const judgeComments = JUDGES.map(j => ({
      id: j.id,
      name: j.name,
      color: j.color,
      comment: generateJudgeComment(j.id, totalScore, [...cemalEval.usedForbidden, ...zeynepEval.usedForbidden], [...cemalEval.usedBonus, ...zeynepEval.usedBonus])
    }));

    await updateRoomData({
      result: {
        earned,
        totalScore,
        cemalEval,
        zeynepEval,
        judgeComments
      }
    });
  };

  if (!currentItem) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2">bestSeller</h1>
        <p className="text-gold-dark font-medium italic">"Sıradışı satışlar için varakları ortaya çıkar"</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gold/30 p-8 mb-8 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-light/20 rounded-full blur-xl"></div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Satılacak Eşya</p>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{currentItem.item}</h2>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-red-500 font-semibold mb-3">
              <AlertTriangle size={18} />
              <span>Bu Kelimeleri Kullanmak YASAK:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {currentItem.words.map(w => (
                <span key={w} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-100 font-bold shadow-sm">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!result ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
             <div className="text-xl font-bold bg-gold-light/20 px-4 py-2 rounded-xl text-gold-dark border border-gold/40">
                Kalan Süre: {timeLeft}s
             </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cemal Input */}
            <div className={`bg-blue-50/30 rounded-xl p-6 border ${role === 'cemal' ? 'border-blue-400 ring-2 ring-blue-100' : 'border-blue-100'} shadow-sm relative`}>
              {role !== 'cemal' && <div className="absolute inset-0 bg-white/40 z-10"></div>}
              <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                <User size={18} /> Cemal'in Sunumu
              </h3>
              <textarea 
                value={role === 'cemal' ? localText : (roomData?.cemalText || '')}
                onChange={handleTextChange}
                disabled={role !== 'cemal'}
                placeholder={role === 'cemal' ? "Bu eşyayı jüriye nasıl satarsın?" : "Cemal yazıyor..."}
                className="w-full h-40 p-4 rounded-lg border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none outline-none"
              ></textarea>
            </div>

            {/* Zeynep Input */}
            <div className={`bg-pink-50/30 rounded-xl p-6 border ${role === 'zeynep' ? 'border-pink-400 ring-2 ring-pink-100' : 'border-pink-100'} shadow-sm relative`}>
              {role !== 'zeynep' && <div className="absolute inset-0 bg-white/40 z-10"></div>}
              <h3 className="font-bold text-pink-800 mb-4 flex items-center gap-2">
                <User size={18} /> Zeynep'in Sunumu
              </h3>
              <textarea 
                value={role === 'zeynep' ? localText : (roomData?.zeynepText || '')}
                onChange={handleTextChange}
                disabled={role !== 'zeynep'}
                placeholder={role === 'zeynep' ? "Bu eşyayı jüriye nasıl satarsın?" : "Zeynep yazıyor..."}
                className="w-full h-40 p-4 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none outline-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button 
              onClick={submitGame}
              className="px-12 py-4 bg-gold hover:bg-gold-dark text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
            >
              <Send size={24} />
              Erken Gönder
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gold/40 p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-black text-gray-800 mb-8">Jüri Kararı</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {result.judgeComments.map((j, i) => {
              const Icon = JUDGES.find(x => x.id === j.id)?.icon || User;
              return (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 relative">
                  <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm ${j.color}`}>
                    <Icon size={20} />
                  </div>
                  <h4 className={`font-bold mt-4 mb-2 ${j.color}`}>{j.name}</h4>
                  <p className="text-gray-600 italic">"{j.comment}"</p>
                </div>
              );
            })}
          </div>

          <div className="inline-block bg-green-50 px-8 py-4 rounded-2xl border border-green-200 mb-8">
            <p className="text-green-800 font-medium mb-1">Kazanılan Toplam Ödül</p>
            <div className="text-5xl font-black text-green-600 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-400" />
              ${result.earned}
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-bold transition-colors"
            >
              Yeni Oyun (Yenile)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
