import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { PenTool, CheckCircle, Sparkles, Send } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    title: "Xylar-9: Kronik Can Sıkıntısı",
    desc: "Xylar-9, teknolojide evrenin zirvesine ulaşmış, hastalıktan, savaştan ve yaşlanmadan tamamen kurtulmuş devasa bir kristal gezegendir. Ancak kusursuzluktan dolayı inanılmaz bir 'varoluşsal sıkıntı' içindeler. Hayat o kadar tahmin edilebilir ki, halk kelimenin tam anlamıyla hayattan bezmiş. Bu yüzden Dünya'dan onlara liderlik edecek ve gezegene yeniden 'canlılık' katacak İnsan Başkanlar (Sizleri) seçtiler.",
    q1: "Sıkıntıya Çözüm: Bu kusursuz ama aşırı sıkıcı topluma heyecan, kaos veya yaşama sevinci katmak için ilk icraatınız ne olacak?",
    q2: "Kriz Yönetimi: Gezegende her pazar günü yerçekimi 10 dakikalığına tersine dönüyor. Havadayken uzaylı halkının paniklememesi için onlara nasıl bir çözüm sunacaksınız?"
  },
  {
    id: 2,
    title: "Zeta-Prime: Duygu Karaborsası",
    desc: "Zeta-Prime gezegeninde duygular yasa dışı. Herkes gri giyiniyor, gri haplar yutuyor. Ancak siz iki dünyalı, gezegenin başına geçip gizli bir 'Duygu Karaborsası' kurmak üzere seçildiniz.",
    q1: "Sıkıntıya Çözüm: Halka ilk hangi 'Dünyalı' duyguyu veya absürt hissi (Örn: pazartesi sendromu, sevgiliyle tartışma) yasal yapacaksınız ve neden?",
    q2: "Kriz Yönetimi: Duygu haplarını fazla kaçıran uzaylılar aniden arabesk dinleyip ağlamaya başlarsa bu kaosu nasıl yöneteceksiniz?"
  },
  {
    id: 3,
    title: "Meka-Dünya: Paslanan Aşklar",
    desc: "Tüm nüfusu robotlardan oluşan bu gezegende romantizm algoritmaları bozuldu. Robotlar flört etmeyi 'Bana RAM'ini göster' demek sanıyor.",
    q1: "Sıkıntıya Çözüm: Robotlara gerçek romantizmi ve flörtleşmeyi (veya taktik yapmayı) öğretmek için nasıl bir uygulama/yasa getireceksiniz?",
    q2: "Kriz Yönetimi: Reddedilen bir robot aşırı ısınıp ana sunucuyu çökertmeye kalkarsa ona nasıl bir 'Dünyalı tesellisi' vereceksiniz?"
  }
];

export default function SexidentGame({ roomData, role, roomId, updateRoomData, timeLeft }) {
  const [scenario, setScenario] = useState(null);
  const [newPoint, setNewPoint] = useState('');
  
  const manifestoPoints = roomData?.points || [];
  const cemalSlogan = roomData?.cemalSlogan || '';
  const zeynepSlogan = roomData?.zeynepSlogan || '';
  const cemalSigned = roomData?.cemalSigned || false;
  const zeynepSigned = roomData?.zeynepSigned || false;

  const [result, setResult] = useState(false);

  useEffect(() => {
    let index = 0;
    if (roomId) {
      let hash = 0;
      for (let i = 0; i < roomId.length; i++) hash = roomId.charCodeAt(i) + ((hash << 5) - hash);
      index = Math.abs(hash) % SCENARIOS.length;
    } else {
      index = Math.floor(Math.random() * SCENARIOS.length);
    }
    setScenario(SCENARIOS[index]);
  }, [roomId]);

  const addPoint = async () => {
    if (!newPoint.trim()) return;
    const newPoints = [...manifestoPoints, newPoint];
    await updateRoomData({ points: newPoints });
    setNewPoint('');
  };

  const checkSignatures = () => {
    if (cemalSigned && zeynepSigned) {
       const a = new Audio('/success.mp3'); a.volume = 0.2; a.play().catch(()=>console.log("Audio not played"));
       setResult(true);
    }
  };

  useEffect(() => {
    checkSignatures();
  }, [cemalSigned, zeynepSigned]);

  if (!scenario) return null;

  if (result) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gold/40 p-10 text-center animate-in zoom-in-95">
        <h1 className="text-4xl font-black text-gray-800 mb-6">Konsey Kararı Açıklandı!</h1>
        <div className="text-left bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 text-gray-700 leading-relaxed mb-8">
          <p>
            <strong>Sayın Cemal ve Zeynep, ya da {scenario.title}'ın müstakbel "Sexident"leri ve "Doğunun ve Batının Sex Hakimleri"!</strong>
          </p>
          <p>
            Öncelikle Galaktik Konseyin bu manifestoyu okuduktan sonra kısa süreli bir sistem çöküşü yaşadığını belirtmeliyim. Biz "canlılık ve kaos" istemiştik, siz gezegenin ayarlarını tamamen "Yetişkin Modu"na aldınız! İkinizin birbirinize rakip olmak yerine dünyadaki rekabeti bir kenara bırakıp böylesine yaratıcı ve tutkulu bir koalisyon kurması, evren tarihindeki en büyük ters köşelerden biri oldu.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Biyolojik Uyumsuzluk Şoku:</strong> Biz şeffaf kristal / robotik varlıklarız. Sizin anladığınız anlamda dünyevi organlarımız yok! Dolayısıyla fiziksel temasla ilgili detaylı vaatleriniz halkta büyük bir anatomik merak yarattı.</li>
            <li><strong>Tahterevalli ve Dopamin:</strong> Fiziksel donanımımız farklı olsa da, o özel "titreşimli tahterevalli" sayesinde kristal bedenlerimizde oluşacak rezonansın bizi o beklenen enerji dalgalanmasına ulaştırabileceği tespit edildi. Proje onaylandı!</li>
            <li><strong>Kriz Çözümü:</strong> Yerçekimsiz anları veya sistem çöküşlerini devasa bir karnavala çevirme vizyonunuz tek kelimeyle dahiyane.</li>
          </ul>
          <p className="font-bold text-gray-900 mt-4">
            👑 Nihai Karar
          </p>
          <p>
            Sloganlarınız şu an gezegenin tüm yörünge panolarında yanıp sönüyor. Biyolojik farklılıklarımıza rağmen, getirmeyi vadettiğiniz o inanılmaz kaos ve pratik zekâ asırlardır süren varoluşsal can sıkıntımıza kesin bir çözüm olacak.
          </p>
          <p className="text-lg text-gold-dark font-black text-center mt-6">
            Galaktik Konsey, Doğunun ve Batının Sex Hakimleri'ni gezegenin yeni eşbaşkanları (Sexident) olarak oy birliğiyle kabul etmiştir!
          </p>
        </div>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-gold text-white font-bold rounded-xl hover:bg-gold-dark">
          Yeni Galaksiye Git
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-gray-800 tracking-tight mb-2">Sexident Manifestosu</h1>
        <p className="text-gold-dark font-medium italic text-lg">Evrenin Sıkıcı Gezegenlerine Yetişkin Modu Getir!</p>
      </div>

      <div className="bg-gray-900 text-white rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden">
        <Sparkles className="absolute top-4 right-4 text-gold opacity-50" size={64} />
        <h2 className="text-3xl font-bold mb-4 text-gold-light">{scenario.title}</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">{scenario.desc}</p>
        <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-gray-700">
          <p className="font-medium"><span className="text-gold">Görev 1:</span> {scenario.q1}</p>
          <p className="font-medium"><span className="text-gold">Görev 2:</span> {scenario.q2}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/20 mb-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><PenTool className="text-gold"/> Ortak Manifesto Maddeleri</h3>
        
        <div className="space-y-3 mb-6">
          {manifestoPoints.length === 0 ? <p className="text-gray-400 italic">Henüz madde eklenmedi.</p> : null}
          {manifestoPoints.map((point, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 font-medium">
              {idx + 1}. {point}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPoint()}
            placeholder="Gezegeni kurtaracak o muazzam maddeyi yaz..."
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:border-gold outline-none"
          />
          <button onClick={addPoint} className="px-6 bg-gray-800 text-white rounded-xl font-bold hover:bg-black flex items-center gap-2">
            <Send size={18}/> Ekle
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className={`bg-blue-50 p-6 rounded-xl border ${role === 'cemal' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-blue-200'} relative`}>
          {role !== 'cemal' && <div className="absolute inset-0 bg-white/40 z-10"></div>}
          <h4 className="font-bold text-blue-900 mb-2">Cemal'in Sloganı</h4>
          <input 
            type="text"
            value={cemalSlogan}
            onChange={e => updateRoomData({ cemalSlogan: e.target.value })}
            disabled={role !== 'cemal' || cemalSigned}
            className="w-full p-3 rounded-lg border border-blue-300 mb-4 outline-none"
            placeholder={role === 'cemal' ? "Sloganını yaz..." : "Cemal yazıyor..."}
          />
          <button 
            onClick={() => updateRoomData({ cemalSigned: !cemalSigned })}
            disabled={role !== 'cemal'}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${cemalSigned ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'}`}
          >
            {cemalSigned ? <CheckCircle size={20}/> : <PenTool size={20}/>}
            {cemalSigned ? 'Cemal İmzaladı' : 'Sexident İmzasını At (Cemal)'}
          </button>
        </div>

        <div className={`bg-pink-50 p-6 rounded-xl border ${role === 'zeynep' ? 'border-pink-500 ring-2 ring-pink-200' : 'border-pink-200'} relative`}>
          {role !== 'zeynep' && <div className="absolute inset-0 bg-white/40 z-10"></div>}
          <h4 className="font-bold text-pink-900 mb-2">Zeynep'in Sloganı</h4>
          <input 
            type="text"
            value={zeynepSlogan}
            onChange={e => updateRoomData({ zeynepSlogan: e.target.value })}
            disabled={role !== 'zeynep' || zeynepSigned}
            className="w-full p-3 rounded-lg border border-pink-300 mb-4 outline-none"
            placeholder={role === 'zeynep' ? "Sloganını yaz..." : "Zeynep yazıyor..."}
          />
          <button 
            onClick={() => updateRoomData({ zeynepSigned: !zeynepSigned })}
            disabled={role !== 'zeynep'}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${zeynepSigned ? 'bg-pink-600 text-white' : 'bg-pink-200 text-pink-800'}`}
          >
            {zeynepSigned ? <CheckCircle size={20}/> : <PenTool size={20}/>}
            {zeynepSigned ? 'Zeynep İmzaladı' : 'Sexident İmzasını At (Zeynep)'}
          </button>
        </div>
      </div>
      
      {((cemalSigned && !zeynepSigned) || (!cemalSigned && zeynepSigned)) && (
         <div className="text-center text-gray-500 animate-pulse font-medium">
           Diğer başkanın imzası bekleniyor...
         </div>
      )}
    </div>
  );
}
