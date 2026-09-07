import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Send, Scale, Sparkles, User, Gavel, Trophy, ArrowRight, RefreshCw } from 'lucide-react';

const BONUS_WORDS = ['sex', 'porn', 'tahrevalli', 'varak', 'imparator', 'mex'];

const TOPICS = [
  { title: "Yalan vs. Gerçek", desc: "Karşındakini tamamen paramparça edecek acı bir gerçek mi, yoksa ömür boyu mutlu yaşatacak kusursuz bir yalan mı?", sideA: "Acı ama Gerçek", sideB: "Kusursuz bir Yalan" },
  { title: "Hafıza vs. Gelecek", desc: "Geçmişindeki tüm kötü anıları tamamen silmek mi, yoksa gelecekte başına gelecek tek bir büyük hatayı önceden bilmek mi?", sideA: "Kötü anıları silmek", sideB: "Büyük hatayı önceden bilmek" },
  { title: "Yetenek vs. Emek", desc: "Doğuştan gelen saf deha mı insanı zirveye taşır, yoksa vasat bir zekanın göstereceği insanüstü disiplin mi?", sideA: "Saf Deha", sideB: "İnsanüstü Disiplin" },
  { title: "Özgürlük vs. Güvenlik", desc: "Suçun ve tehlikenin sıfır olduğu mutlak bir denetim toplumu mu, yoksa her an risk altında ama tamamen hür bir hayat mı?", sideA: "Mutlak Denetim / Güvenlik", sideB: "Riskli ama Özgür Hayat" },
  { title: "İlk Adım", desc: "Başarıya ulaşmak için doğru zamanı sabırla beklemek mi gerekir, yoksa şartlar ne kadar kötü olursa olsun hemen harekete geçmek mi?", sideA: "Doğru zamanı beklemek", sideB: "Hemen harekete geçmek" },
  { title: "İyilik Tanımı", desc: "Bir eylemin ahlaki değerini başlatan niyet midir, yoksa her ne olursa olsun ortaya çıkan nihai sonuç mu?", sideA: "Başlangıçtaki Niyet", sideB: "Ortaya Çıkan Sonuç" },
  { title: "Aşk vs. Mantık", desc: "Hayat arkadaşı seçerken mantığın onaylamadığı büyük bir tutku mu, yoksa tutkunun olmadığı kusursuz bir uyum ve huzur mu?", sideA: "Büyük Tutku", sideB: "Kusursuz Uyum ve Huzur" },
  { title: "Para vs. Zaman", desc: "Gençken deli gibi çalışıp yaşlanınca zengin olmak mı, yoksa gençliği dibine kadar yaşayıp yaşlılıkta parasız kalma riskini almak mı?", sideA: "Gençken çalışıp yaşlanınca zengin olmak", sideB: "Gençliği yaşayıp yaşlılıkta parasız kalmak" },
  { title: "Merhamet vs. Adalet", desc: "Kanunların ve kuralların harfiyen uygulanması mı bir toplumu ayakta tutar, yoksa gerektiğinde kuralları büken şefkat mi?", sideA: "Kanunlar ve Kurallar", sideB: "Kuralları büken Şefkat" },
  { title: "Yalnızlık vs. Kalabalık", desc: "İnsanın kendi potansiyelini bulması için tamamen tek başına kalması mı gerekir, yoksa insan sadece başkalarıyla çatışarak mı gelişir?", sideA: "Tamamen tek başına kalmak", sideB: "Başkalarıyla çatışarak gelişmek" },
  { title: "Şans vs. Strateji", desc: "Hayattaki en büyük kırılma anlarını belirleyen şey doğru zamanda doğru yerde olmak mıdır, yoksa kusursuz bir plan mı?", sideA: "Doğru zamanda doğru yerde olmak", sideB: "Kusursuz bir plan" },
  { title: "Yaratıcılık vs. Tecrübe", desc: "Dünyayı ileri götüren şey hiçbir kural tanımayan taze bir cehalet mi, yoksa yılların biriktirdiği köklü bilgelik mi?", sideA: "Taze Cehalet / Yaratıcılık", sideB: "Köklü Bilgelik / Tecrübe" },
  { title: "Zeka vs. İletişim", desc: "Dünyanın en zeki insanı olup kimseye derdini anlatamamak mı, yoksa vasat bir zekayla herkesi her şeye ikna edebilmek mi?", sideA: "Zeki ama anlaşılamayan olmak", sideB: "Vasat zekayla herkesi ikna edebilmek" },
  { title: "İç Huzur vs. Hırs", desc: "Hayatın gerçek gayesi elindekiyle yetinip dinginliğe ulaşmak mıdır, yoksa sürekli daha fazlasını arzulayıp dünyayı değiştirmek mi?", sideA: "Elindekiyle yetinip dinginliğe ulaşmak", sideB: "Daha fazlasını arzulayıp dünyayı değiştirmek" },
  { title: "Güzellik vs. İşlev", desc: "Bir eşyayı, mimariyi veya sanatı değerli kılan şey göze hitap eden zarafeti midir, yoksa işe yararlığı mı?", sideA: "Zarafet / Güzellik", sideB: "İşlevsellik / İşe yararlık" },
  { title: "Korku vs. Umut", desc: "Kitleleri ve toplumları harekete geçiren, onları hizaya sokan asıl güç tehlike korkusu mudur, yoksa daha iyi bir gelecek umudu mu?", sideA: "Tehlike Korkusu", sideB: "Gelecek Umudu" },
  { title: "Kader vs. İrade", desc: "Hayatımız önceden çizilmiş ana hatların kaçınılmaz bir sonucu mudur, yoksa her saniye aldığımız mikro kararların toplamı mı?", sideA: "Önceden çizilmiş kader", sideB: "Mikro kararların toplamı" },
  { title: "Genetik vs. Çevre", desc: "Bir insanı 'o insan' yapan şey doğuştan getirdiği kodlar mıdır, yoksa içine doğduğu ailenin ve sokağın şartları mı?", sideA: "Doğuştan gelen genetik kodlar", sideB: "Aile ve çevre şartları" },
  { title: "Acı vs. Keyif", desc: "İnsanı asıl olgunlaştıran, dönüştüren ve derinleştiren şey çektiği ızdıraplar mıdır, yoksa yaşadığı hazlar ve başarılar mı?", sideA: "Çekilen Izdıraplar", sideB: "Yaşanan Hazlar ve Başarılar" },
  { title: "Tarih", desc: "Tarihin akışını karizmatik liderlerin bireysel kararları mı yazar, yoksa halkların ekonomik ve sosyal çaresizlikleri mi?", sideA: "Karizmatik liderlerin kararları", sideB: "Halkların ekonomik ve sosyal durumu" },
  { title: "Theseus’un Gemisi", desc: "Bir geminin parçaları zamanla yenilenirse ve orijinal tek parça kalmazsa bu aynı gemi midir? Eski parçalardan yapılan mı, yenilenen mi orijinaldir?", sideA: "Zamanla yenilenen gemi asıl gemidir", sideB: "Eski parçalardan toplanan gemi asıldır" },
  { title: "Simülasyon ve Bilgi", desc: "Kusursuz ve acısız sahte bir rüyada sonsuza dek yaşamak mı, yoksa gerçek ama acılarla dolu bu hayatı yaşamak mı?", sideA: "Kusursuz sahte rüya (Simülasyon)", sideB: "Acılarla dolu gerçek hayat" },
  { title: "Önceden Bilinen Suç", desc: "Yarın kesin cinayet işleyeceği bilinen biri, suçu işlemeden önce hapse atılmalı mıdır?", sideA: "Suçu işlemeden hapse atılmalıdır", sideB: "Eylemi yapmadan cezalandırılamaz" },
  { title: "Mutlak Çoğunluğun Mutluluğu", desc: "Milyarlarca insanın refahı için tek bir masum çocuğun işkence görmesi ahlaken meşru mudur?", sideA: "Milyarlar için bir masum feda edilebilir", sideB: "Milyarların refahı yıkılsa bile feda edilemez" },
  { title: "Saf İyilik İmkânsız mıdır?", desc: "İçimizde hissettiğimiz vicdan rahatlaması iyiliği bencilce bir çıkar mı yapar, yoksa saf iyilik mümkün müdür?", sideA: "Her iyiliğin altında gizli bir bencillik yatar", sideB: "Tamamen saf ve karşılıksız iyilik mümkündür" }
];

export default function OppoPoppositeGame({ roomData, role, roomId, updateText, submitGame, updateRoomData, timeLeft }) {
  const addMoney = useStore(state => state.addMoney);
  const addToArchive = useStore(state => state.addToArchive);
  
  const [round, setRound] = useState(1);
  const [cemalWins, setCemalWins] = useState(0);
  const [zeynepWins, setZeynepWins] = useState(0);
  
  const [currentTopic, setCurrentTopic] = useState(null);
  const [assignment, setAssignment] = useState({ cemal: '', zeynep: '' });
  
  const [localText, setLocalText] = useState('');
  const [roundResult, setRoundResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (roomData?.status === 'evaluating' && !roundResult && currentTopic) {
      if (roomData.result) {
         setRoundResult(roomData.result);

         const maxScore = Math.max(roomData.result.cemalScore, roomData.result.zeynepScore);
         if (maxScore >= 60) {
           const a = new Audio('/success.mp3'); a.volume = 0.2; a.play().catch(e => console.log('Audio error:', e));
         } else {
           const a = new Audio('/fail.mp3'); a.volume = 0.2; a.play().catch(e => console.log('Audio error:', e));
         }

         if (roomData.result.winner === 'cemal') setCemalWins(prev => prev + 1);
         if (roomData.result.winner === 'zeynep') setZeynepWins(prev => prev + 1);

         if (role === 'cemal') {
           addMoney(roomData.result.totalMoney);
           addToArchive({
             type: 'oppoPopposite',
             topic: currentTopic.title,
             cemalSide: assignment.cemal,
             zeynepSide: assignment.zeynep,
             cemalText: roomData.cemalText || '',
             zeynepText: roomData.zeynepText || '',
             cemalScore: roomData.result.cemalScore,
             zeynepScore: roomData.result.zeynepScore,
             totalMoney: roomData.result.totalMoney,
             winner: roomData.result.winner,
             date: new Date().toISOString()
           });
         }
      } else if (role === 'cemal') {
         handleEvaluation();
      }
    }
  }, [roomData?.status, roomData?.result, currentTopic]);

  const handleTextChange = (e) => {
    setLocalText(e.target.value);
    updateText(e.target.value);
  };

  const startNewRound = () => {
    let index = 0;
    if (roomId) {
      let hash = 0;
      for (let i = 0; i < roomId.length; i++) hash = roomId.charCodeAt(i) + ((hash << 5) - hash);
      index = Math.abs(hash + round) % TOPICS.length;
    } else {
      index = Math.floor(Math.random() * TOPICS.length);
    }
    
    const randomTopic = TOPICS[index];
    const isCemalSideA = index % 2 === 0;
    
    setCurrentTopic(randomTopic);
    setAssignment({
      cemal: isCemalSideA ? randomTopic.sideA : randomTopic.sideB,
      zeynep: isCemalSideA ? randomTopic.sideB : randomTopic.sideA
    });
    
    setLocalText('');
    setRoundResult(null);
  };

  const evaluatePitch = (text) => {
    // Base score between 30 and 70 based on length and randomness
    let score = Math.floor(Math.random() * 40) + 30; 
    if (text.length > 50) score += 10;
    
    let usedBonus = [];
    const lowerText = text.toLowerCase();

    BONUS_WORDS.forEach(w => {
      if (lowerText.includes(w)) {
        usedBonus.push(w);
        score += 20; // Extra points for inside jokes
      }
    });

    return { score: Math.min(100, score), usedBonus };
  };

  const handleEvaluation = async () => {
    const cemalTxt = roomData?.cemalText || '';
    const zeynepTxt = roomData?.zeynepText || '';

    const cemalEval = evaluatePitch(cemalTxt);
    const zeynepEval = evaluatePitch(zeynepTxt);

    // Calculate money
    const cemalMoney = Math.ceil(cemalEval.score / 2);
    const zeynepMoney = Math.ceil(zeynepEval.score / 2);
    const totalMoney = cemalMoney + zeynepMoney;

    // Determine winner
    let winner = 'draw';
    if (cemalEval.score > zeynepEval.score) {
      winner = 'cemal';
    } else if (zeynepEval.score > cemalEval.score) {
      winner = 'zeynep';
    }

    // Generate judge comment
    let comment = "İki taraf da fena değildi. ";
    if (cemalEval.usedBonus.length > 0 || zeynepEval.usedBonus.length > 0) {
      comment = "Oha, o kelimeler neydi öyle! Jüri kalbinden vuruldu. ";
    }
    
    if (winner === 'cemal') comment += "Cemal'in argümanları daha sağlam basıyordu.";
    else if (winner === 'zeynep') comment += "Zeynep resmen lafı gediğine oturttu, mükemmel.";
    else comment += "Karar veremedim, ikiniz de çok iyiydiniz!";

    await updateRoomData({
      result: {
        cemalScore: cemalEval.score,
        zeynepScore: zeynepEval.score,
        totalMoney,
        winner,
        comment
      }
    });
  };

  const handleNext = async () => {
    if (round < 3) {
      setRound(prev => prev + 1);
      startNewRound();
      if (role === 'cemal') {
         await updateRoomData({
           status: 'playing',
           timerStart: Date.now(),
           cemalText: '',
           zeynepText: '',
           result: null
         });
      }
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setRound(1);
    setCemalWins(0);
    setZeynepWins(0);
    setGameOver(false);
    startNewRound();
  };

  if (!currentTopic) return <div>Yükleniyor...</div>;

  if (gameOver) {
    const finalWinner = cemalWins > zeynepWins ? "Cemal" : zeynepWins > cemalWins ? "Zeynep" : "Berabere";
    return (
      <div className="max-w-3xl mx-auto text-center py-12 bg-white rounded-2xl shadow-sm border border-gold/30">
        <Trophy size={64} className="mx-auto text-gold mb-6" />
        <h1 className="text-4xl font-black text-gray-800 mb-4">Oyun Bitti!</h1>
        <h2 className="text-2xl text-gray-600 mb-8">
          Kazanan: <span className="font-bold text-gold-dark text-3xl">{finalWinner}</span>
        </h2>
        
        <div className="flex justify-center gap-12 mb-10">
          <div className="text-center">
            <p className="text-lg font-bold text-blue-800 mb-2">Cemal'in Kazandığı Tur</p>
            <p className="text-4xl font-black">{cemalWins}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-pink-800 mb-2">Zeynep'in Kazandığı Tur</p>
            <p className="text-4xl font-black">{zeynepWins}</p>
          </div>
        </div>

        <button 
          onClick={restartGame}
          className="px-8 py-3 bg-gold hover:bg-gold-dark text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw size={20} /> Yeniden Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2 flex items-center justify-center gap-3">
          <Scale className="text-gold" size={36} />
          oppositeTahrik
        </h1>
        <p className="text-gold-dark font-medium italic">"Tahtrevalli için kendi tezini savun"</p>
        <div className="mt-4 inline-block bg-white px-6 py-2 rounded-full border border-gray-200 font-bold text-gray-600">
          Round {round} / 3
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8 relative">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{currentTopic.title}</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto italic">
          "{currentTopic.desc}"
        </p>
      </div>

      {!roundResult ? (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center mb-4">
             <div className="text-xl font-bold bg-gold-light/20 px-4 py-2 rounded-xl text-gold-dark border border-gold/40">
                Kalan Süre: {timeLeft}s
             </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cemal Input */}
            <div className={`bg-blue-50/50 rounded-xl p-6 border ${role === 'cemal' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-blue-100'} relative`}>
              {role !== 'cemal' && <div className="absolute inset-0 bg-white/40 z-10"></div>}
              <div className="absolute -top-3 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                Cemal'in Savunacağı
              </div>
              <h3 className="font-bold text-xl text-blue-900 mt-4 mb-4 text-center">
                {assignment.cemal}
              </h3>
              <textarea 
                value={role === 'cemal' ? localText : (roomData?.cemalText || '')}
                onChange={handleTextChange}
                disabled={role !== 'cemal'}
                placeholder={role === 'cemal' ? "Bu fikri neden savunmalısın? Jüriyi ikna et!" : "Cemal yazıyor..."}
                className="w-full h-40 p-4 rounded-lg border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none outline-none"
              ></textarea>
            </div>

            {/* Zeynep Input */}
            <div className={`bg-pink-50/50 rounded-xl p-6 border ${role === 'zeynep' ? 'border-pink-500 ring-2 ring-pink-200' : 'border-pink-100'} relative`}>
              {role !== 'zeynep' && <div className="absolute inset-0 bg-white/40 z-10"></div>}
              <div className="absolute -top-3 left-6 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                Zeynep'in Savunacağı
              </div>
              <h3 className="font-bold text-xl text-pink-900 mt-4 mb-4 text-center">
                {assignment.zeynep}
              </h3>
              <textarea 
                value={role === 'zeynep' ? localText : (roomData?.zeynepText || '')}
                onChange={handleTextChange}
                disabled={role !== 'zeynep'}
                placeholder={role === 'zeynep' ? "Bu fikri neden savunmalısın? Jüriyi ikna et!" : "Zeynep yazıyor..."}
                className="w-full h-40 p-4 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none outline-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button 
              onClick={submitGame}
              className="px-12 py-4 bg-gold hover:bg-gold-dark text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
            >
              <Gavel size={24} />
              Erken Gönder
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center animate-in zoom-in-95 duration-300">
          <h2 className="text-3xl font-black text-gray-800 mb-2">Jüri Kararı</h2>
          <p className="text-gray-600 italic mb-8">"{roundResult.comment}"</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className={`p-6 rounded-xl border-2 ${roundResult.winner === 'cemal' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}>
              <h3 className="font-bold text-blue-800 mb-2">Cemal'in Puanı</h3>
              <p className="text-5xl font-black text-blue-600">{roundResult.cemalScore}</p>
              {roundResult.winner === 'cemal' && <span className="inline-block mt-2 px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-bold">Kazandı!</span>}
            </div>
            
            <div className={`p-6 rounded-xl border-2 ${roundResult.winner === 'zeynep' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 bg-gray-50'}`}>
              <h3 className="font-bold text-pink-800 mb-2">Zeynep'in Puanı</h3>
              <p className="text-5xl font-black text-pink-600">{roundResult.zeynepScore}</p>
              {roundResult.winner === 'zeynep' && <span className="inline-block mt-2 px-3 py-1 bg-pink-200 text-pink-800 rounded-full text-sm font-bold">Kazandı!</span>}
            </div>
          </div>

          <div className="inline-block bg-yellow-50 px-8 py-4 rounded-2xl border border-yellow-200 mb-8">
            <p className="text-yellow-800 font-medium mb-1">Bankaya Eklenen Altın (Yarı yarıya kuralı)</p>
            <div className="text-4xl font-black text-yellow-600 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-500" />
              +${roundResult.totalMoney}
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleNext}
              className="px-8 py-4 bg-gold hover:bg-gold-dark text-white rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              {round < 3 ? 'Sıradaki Tura Geç' : 'Sonuçları Gör'} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
