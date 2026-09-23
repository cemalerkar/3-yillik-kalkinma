import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Trophy, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import ChatBox from '../components/ChatBox';

export default function F1ReflexGame({ roomData, role, updateRoomData, submitGame, sendChatMessage }) {
  const addMoney = useStore(state => state.addMoney);
  const addToArchive = useStore(state => state.addToArchive);

  const [phase, setPhase] = useState('waiting'); 
  const [litCount, setLitCount] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [falseStart, setFalseStart] = useState(false);

  const currentRound = roomData?.currentRound || 1;
  const delays = roomData?.delays || [];
  const playTrigger = roomData?.playTrigger || 0;
  
  const cemalReaction = roomData?.cemalReaction;
  const zeynepReaction = roomData?.zeynepReaction;
  const result = roomData?.result;

  useEffect(() => {
    if (roomData?.status === 'playing' && role === 'cemal' && !roomData.delays) {
      updateRoomData({
        currentRound: 1,
        delays: [
          Math.floor(Math.random() * 1500) + 500,
          Math.floor(Math.random() * 1500) + 500,
          Math.floor(Math.random() * 1500) + 500,
          Math.floor(Math.random() * 1500) + 500,
          Math.floor(Math.random() * 2000) + 1000,
        ],
        cemalReaction: null,
        zeynepReaction: null,
        result: [],
        playTrigger: Date.now() + 1000 // 1s buffer before first light
      });
    }
  }, [roomData?.status]);

  useEffect(() => {
    if (roomData?.status === 'playing' && playTrigger && delays.length === 5) {
      if (cemalReaction !== undefined && cemalReaction !== null && zeynepReaction !== undefined && zeynepReaction !== null) {
        setPhase('evaluating');
        return;
      }

      if (cemalReaction !== undefined && cemalReaction !== null && role === 'cemal') {
         setPhase('waitingForOther');
         return;
      }
      if (zeynepReaction !== undefined && zeynepReaction !== null && role === 'zeynep') {
         setPhase('waitingForOther');
         return;
      }

      setPhase('running');
      setFalseStart(false);
      setReactionTime(null);

      const goTime = playTrigger + delays.reduce((a,b)=>a+b, 0);

      const iv = setInterval(() => {
        const t = Date.now();
        if (t < playTrigger) {
          setLitCount(0);
        } else if (t < playTrigger + delays[0]) {
          setLitCount(1);
        } else if (t < playTrigger + delays[0] + delays[1]) {
          setLitCount(2);
        } else if (t < playTrigger + delays[0] + delays[1] + delays[2]) {
          setLitCount(3);
        } else if (t < goTime) {
          setLitCount(4);
        } else {
          setLitCount(0); // LIGHTS OUT!
        }
      }, 50);

      return () => clearInterval(iv);
    }
  }, [roomData?.status, playTrigger, delays, cemalReaction, zeynepReaction, role]);

  useEffect(() => {
    if (phase === 'evaluating' && role === 'cemal' && cemalReaction !== null && zeynepReaction !== null) {
      if (result && result.length === currentRound) return; 

      let winner = 'draw';
      if (cemalReaction < zeynepReaction) winner = 'cemal';
      else if (zeynepReaction < cemalReaction) winner = 'zeynep';

      const earned = 50; 
      
      const newHistory = [...(result || []), {
         round: currentRound,
         cemalReaction,
         zeynepReaction,
         winner,
         earned
      }];

      updateRoomData({
        result: newHistory
      });
      
      if (winner === 'cemal') addMoney(earned);

      if (cemalReaction === 99999 || zeynepReaction === 99999) {
          const a = new Audio('/fail.mp3'); a.volume = 0.2; a.play().catch(e=>console.log(e));
      } else {
          const a = new Audio('/success.mp3'); a.volume = 0.2; a.play().catch(e=>console.log(e));
      }
    }
  }, [phase, cemalReaction, zeynepReaction, role]);

  const handleStop = () => {
    if (phase !== 'running') return;
    const t = Date.now();
    const goTime = playTrigger + delays.reduce((a,b)=>a+b, 0);
    
    let reactMs = 0;
    if (t < goTime) {
      // False start
      reactMs = 99999;
      setFalseStart(true);
    } else {
      reactMs = t - goTime;
    }

    setReactionTime(reactMs);
    updateRoomData({ [`${role}Reaction`]: reactMs });
  };

  const nextRound = () => {
    if (currentRound >= 5) {
      submitGame();
      if (role === 'cemal') {
         addToArchive({
            type: 'f1Reflex',
            date: new Date().toISOString(),
            rounds: result
         });
      }
      return;
    }

    if (role === 'cemal') {
      updateRoomData({
        currentRound: currentRound + 1,
        delays: [
          Math.floor(Math.random() * 1500) + 500,
          Math.floor(Math.random() * 1500) + 500,
          Math.floor(Math.random() * 1500) + 500,
          Math.floor(Math.random() * 1500) + 500,
          Math.floor(Math.random() * 2000) + 1000,
        ],
        cemalReaction: null,
        zeynepReaction: null,
        playTrigger: Date.now() + 1000
      });
    }
  };

  const currentResult = result && result.length >= currentRound ? result[currentRound - 1] : null;

  if (roomData?.status === 'evaluating') {
     const cemalWins = result?.filter(r => r.winner === 'cemal').length || 0;
     const zeynepWins = result?.filter(r => r.winner === 'zeynep').length || 0;
     
     let finalMessage = "İki araç da aynı hızda kalktı! (Berabere)";
     let finalColor = "text-gray-600";
     if (cemalWins > zeynepWins) {
         finalMessage = "Cemal'inki daha hızlı kalktı!";
         finalColor = "text-blue-600";
     } else if (zeynepWins > cemalWins) {
         finalMessage = "Zeynep'inki daha hızlı kalktı!";
         finalColor = "text-pink-600";
     }

     return (
       <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-3xl shadow-xl border border-red-500/30">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-6" />
          <h2 className="text-4xl font-black mb-2">Yarış Bitti!</h2>
          <h3 className={`text-3xl font-black mb-8 ${finalColor}`}>{finalMessage}</h3>
          
          <div className="space-y-4 mb-8 text-left">
            {result?.map((r, i) => (
               <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
                 <div className="font-bold text-gray-500">Round {r.round}</div>
                 <div className="text-sm font-medium">
                   C: {r.cemalReaction === 99999 ? 'Hatalı Çıkış' : r.cemalReaction + 'ms'} | Z: {r.zeynepReaction === 99999 ? 'Hatalı Çıkış' : r.zeynepReaction + 'ms'}
                 </div>
                 <div className={`font-bold ${r.winner === 'cemal' ? 'text-blue-600' : r.winner === 'zeynep' ? 'text-pink-600' : 'text-gray-600'}`}>
                   {r.winner === 'draw' 
                     ? 'Aynı anda kalktılar!' 
                     : `${r.winner === 'cemal' ? 'Cemal' : 'Zeynep'} önce kalktı`}
                 </div>
               </div>
            ))}
          </div>

          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">
             Yeni Yarış
          </button>
       </div>
     );
  }

  return (
    <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2">F1 Refleks</h1>
        <p className="text-red-600 font-medium italic">"Işıklar söndüğünde kim daha hızlı kalkacak?"</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="bg-white px-6 py-2 rounded-full font-black text-xl border border-gray-200 shadow-sm text-gray-700">
          Round {currentRound} / 5
        </div>
        <div className="bg-red-50 px-6 py-2 rounded-full font-black text-xl border border-red-200 text-red-600 flex items-center gap-2">
          <Zap size={24} /> En Hızlı Parmak
        </div>
      </div>

      <div className="bg-gray-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-gray-800 p-10 mb-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center">
        
        {/* The 4 F1 Lights */}
        {phase === 'running' && (
           <div className="flex gap-6 mb-16 bg-black p-6 rounded-2xl border-2 border-gray-800 shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)]">
             {[1, 2, 3, 4].map(num => (
               <div key={num} className="relative">
                 <div className={`w-20 h-20 rounded-full transition-all duration-75 ${
                   litCount >= num 
                     ? 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,1)]' 
                     : 'bg-red-950 shadow-[inset_0_5px_15px_rgba(0,0,0,1)]'
                 }`}></div>
                 {/* Bulb glare */}
                 <div className="absolute top-2 left-4 w-6 h-6 bg-white/20 rounded-full blur-[2px]"></div>
               </div>
             ))}
           </div>
        )}

        {phase === 'running' && (
          <button 
            onMouseDown={handleStop}
            onTouchStart={handleStop}
            className="w-full max-w-sm py-6 rounded-2xl bg-gradient-to-b from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-black text-3xl shadow-[0_10px_0_rgb(31,41,55),0_15px_20px_rgba(0,0,0,0.5)] active:shadow-[0_0px_0_rgb(31,41,55),0_0px_0px_rgba(0,0,0,0)] active:translate-y-[10px] border-t-2 border-gray-500 transition-all cursor-pointer relative"
          >
            GAZLA!
          </button>
        )}

        {phase === 'waitingForOther' && (
          <div className="text-center">
             <CheckCircle2 size={80} className="mx-auto text-green-500 mb-6" />
             <h3 className="text-3xl font-black text-white mb-2">
               {falseStart ? <span className="text-red-500">HATALI ÇIKIŞ!</span> : `${reactionTime}ms`}
             </h3>
             <p className="text-xl text-gray-400 animate-pulse mt-8">Rakibinin kalkışı bekleniyor...</p>
          </div>
        )}

        {phase === 'evaluating' && currentResult && (
          <div className="w-full text-center animate-in slide-in-from-bottom-8">
            <h3 className="text-2xl font-black text-gray-400 mb-8">Sonuçlar</h3>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className={`p-6 rounded-2xl border-4 ${currentResult.winner === 'cemal' ? 'border-green-400 bg-green-500/10' : 'border-gray-700 bg-gray-800'}`}>
                <p className="font-bold text-gray-400 mb-2">Cemal</p>
                <p className={`text-4xl font-black mb-2 ${currentResult.cemalReaction === 99999 ? 'text-red-500 text-2xl' : 'text-white'}`}>
                  {currentResult.cemalReaction === 99999 ? 'Hatalı Çıkış' : currentResult.cemalReaction + 'ms'}
                </p>
              </div>
              
              <div className={`p-6 rounded-2xl border-4 ${currentResult.winner === 'zeynep' ? 'border-green-400 bg-green-500/10' : 'border-gray-700 bg-gray-800'}`}>
                <p className="font-bold text-gray-400 mb-2">Zeynep</p>
                <p className={`text-4xl font-black mb-2 ${currentResult.zeynepReaction === 99999 ? 'text-red-500 text-2xl' : 'text-white'}`}>
                  {currentResult.zeynepReaction === 99999 ? 'Hatalı Çıkış' : currentResult.zeynepReaction + 'ms'}
                </p>
              </div>
            </div>

            <div className="text-2xl font-black text-white mb-8">
              {currentResult.winner === 'draw' 
                ? <span className="text-gray-400">Herkes arabasını aynı anda kaldırdı!</span>
                : <><span className="text-red-500">{currentResult.winner === 'cemal' ? 'Cemal' : 'Zeynep'}</span> arabasını daha önce kaldırdı!</>
              }
            </div>

            {role === 'cemal' && (
              <button 
                onClick={nextRound}
                className="mx-auto px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 flex items-center gap-3 text-lg"
              >
                {currentRound < 5 ? 'Sıradaki Kalkış' : 'Sonucu Gör'} <ArrowRight />
              </button>
            )}
            {role !== 'cemal' && (
               <p className="text-gray-400 font-bold animate-pulse">Cemal'in yeşil ışığı yakması bekleniyor...</p>
            )}
          </div>
        )}
      </div>

      <ChatBox roomData={roomData} role={role} sendChatMessage={sendChatMessage} />
    </div>
  );
}
