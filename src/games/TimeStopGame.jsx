import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Timer, CheckCircle2, Trophy, ArrowRight, Play } from 'lucide-react';

export default function TimeStopGame({ roomData, role, updateRoomData, submitGame }) {
  const addMoney = useStore(state => state.addMoney);
  const addToArchive = useStore(state => state.addToArchive);

  const [phase, setPhase] = useState('waiting'); // waiting, countdown, running, evaluating, gameover
  const [countdown, setCountdown] = useState(3);
  const [localStartTime, setLocalStartTime] = useState(0);
  const [liveElapsed, setLiveElapsed] = useState(0);

  const currentRound = roomData?.currentRound || 1;
  const targetTime = roomData?.targetTime || 5.000;
  const cemalTime = roomData?.cemalStopTime;
  const zeynepTime = roomData?.zeynepStopTime;
  const result = roomData?.result; // stores history of rounds

  // Initialize round
  useEffect(() => {
    if (roomData?.status === 'playing' && role === 'cemal' && !roomData.targetTime) {
      // Host sets up the first round
      updateRoomData({
        currentRound: 1,
        targetTime: (Math.random() * 18 + 7).toFixed(3), // 1.000 to 20.000
        cemalStopTime: null,
        zeynepStopTime: null,
        result: [],
        playTrigger: Date.now() // to sync countdown start
      });
    }
  }, [roomData?.status]);

  // Handle phase transitions based on roomData
  useEffect(() => {
    if (roomData?.status === 'playing' && roomData.playTrigger) {
      if (cemalTime && zeynepTime) {
        setPhase('evaluating');
      } else if (!cemalTime && role === 'cemal' || !zeynepTime && role === 'zeynep') {
        // We haven't clicked yet
        const timeSinceTrigger = Date.now() - roomData.playTrigger;
        if (timeSinceTrigger < 3000) {
           setPhase('countdown');
           // Local countdown interval
           const iv = setInterval(() => {
             const left = 3 - Math.floor((Date.now() - roomData.playTrigger) / 1000);
             if (left <= 0) {
               clearInterval(iv);
               setPhase('running');
               setLocalStartTime(roomData.playTrigger + 3000);
             } else {
               setCountdown(left);
             }
           }, 100);
           return () => clearInterval(iv);
        } else {
           setPhase('running');
           setLocalStartTime(roomData.playTrigger + 3000);
        }
      } else {
        setPhase('waitingForOther');
      }
    }
  }, [roomData?.status, roomData?.playTrigger, cemalTime, zeynepTime]);

  // Live stopwatch update
  useEffect(() => {
    if (phase === 'running') {
      const iv = setInterval(() => {
         setLiveElapsed((Date.now() - localStartTime) / 1000);
      }, 47); // weird interval to make numbers roll fast
      return () => clearInterval(iv);
    }
  }, [phase, localStartTime]);

  // Evaluate Round
  useEffect(() => {
    if (phase === 'evaluating' && role === 'cemal' && cemalTime && zeynepTime) {
      // Avoid double evaluation
      if (result && result.length === currentRound) return; 

      const cemalDiff = Math.abs(targetTime - cemalTime);
      const zeynepDiff = Math.abs(targetTime - zeynepTime);
      
      let winner = 'draw';
      if (cemalDiff < zeynepDiff) winner = 'cemal';
      else if (zeynepDiff < cemalDiff) winner = 'zeynep';

      const earned = 50; // Base money per round won
      
      const newHistory = [...(result || []), {
         round: currentRound,
         targetTime,
         cemalTime,
         zeynepTime,
         cemalDiff,
         zeynepDiff,
         winner,
         earned
      }];

      updateRoomData({
        result: newHistory
      });
      
      if (winner === 'cemal') addMoney(earned);

      // Play sound
      const a = new Audio('/success.mp3'); a.volume = 0.2; a.play().catch(e=>console.log(e));
    }
  }, [phase, cemalTime, zeynepTime, role]);

  const handleStop = () => {
    if (phase !== 'running') return;
    const elapsed = (Date.now() - localStartTime) / 1000;
    updateRoomData({ [`${role}StopTime`]: parseFloat(elapsed.toFixed(3)) });
  };

  const nextRound = () => {
    if (currentRound >= 5) {
      // Game over
      submitGame();
      
      // Save to archive
      if (role === 'cemal') {
         addToArchive({
            type: 'timeStop',
            date: new Date().toISOString(),
            rounds: result
         });
      }
      return;
    }

    if (role === 'cemal') {
      updateRoomData({
        currentRound: currentRound + 1,
        targetTime: (Math.random() * 18 + 7).toFixed(3),
        cemalStopTime: null,
        zeynepStopTime: null,
        playTrigger: Date.now()
      });
    }
  };

  // Deriving current round data safely
  const currentResult = result && result.length >= currentRound ? result[currentRound - 1] : null;

  if (roomData?.status === 'evaluating') {
     return (
       <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-3xl shadow-xl border border-gold/30">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-6" />
          <h2 className="text-4xl font-black mb-4">Oyun Bitti!</h2>
          <p className="text-gray-600 mb-8">5 roundluk kıyasıya mücadele sona erdi.</p>
          
          <div className="space-y-4 mb-8 text-left">
            {result?.map((r, i) => (
               <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
                 <div className="font-bold text-gray-500">Round {r.round}</div>
                 <div className="text-sm font-medium">Hedef: {r.targetTime}s</div>
                 <div className={`font-bold ${r.winner === 'cemal' ? 'text-blue-600' : r.winner === 'zeynep' ? 'text-pink-600' : 'text-gray-600'}`}>
                   Kazanan: {r.winner === 'cemal' ? 'Cemal' : r.winner === 'zeynep' ? 'Zeynep' : 'Berabere'}
                 </div>
               </div>
            ))}
          </div>

          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black">
             Yeni Oyun
          </button>
       </div>
     );
  }

  return (
    <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2">Zaman Bükücü</h1>
        <p className="text-gold-dark font-medium italic">"Kim saniyelere daha iyi hükmedecek?"</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="bg-white px-6 py-2 rounded-full font-black text-xl border border-gray-200 shadow-sm text-gray-700">
          Round {currentRound} / 5
        </div>
        <div className="bg-gold-light/20 px-6 py-2 rounded-full font-black text-xl border border-gold/40 text-gold-dark flex items-center gap-2">
          <Timer size={24} /> Hedef: {targetTime}s
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gold/20 p-10 mb-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center">
        
        {phase === 'countdown' && (
          <div className="animate-in zoom-in duration-300">
            <div className="text-[120px] font-black text-gray-800 leading-none">{countdown}</div>
            <p className="text-2xl font-bold text-gray-400 mt-4 animate-pulse">Hazırlan...</p>
          </div>
        )}

        {phase === 'running' && (
          <div className="w-full flex flex-col items-center">
            <div 
              className={`text-[80px] font-black text-blue-600 mb-12 font-mono tracking-tighter transition-opacity duration-1000 ${liveElapsed > 1.5 ? 'opacity-0' : 'opacity-100'}`}
            >
              {liveElapsed.toFixed(3)}
            </div>
            <button 
              onClick={handleStop}
              className="w-64 h-64 rounded-full bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-black text-5xl shadow-[0_15px_0_rgb(153,27,27),0_25px_25px_rgba(0,0,0,0.3)] active:shadow-[0_0px_0_rgb(153,27,27),0_0px_0px_rgba(0,0,0,0)] active:translate-y-[15px] border-t-[4px] border-red-300 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer relative"
            >
              <div className="w-14 h-14 bg-white/90 rounded-md shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)]"></div>
              DURDUR
              {/* Inner highlight for 3d effect */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-white/20 rounded-full blur-md pointer-events-none"></div>
            </button>
          </div>
        )}

        {phase === 'waitingForOther' && (
          <div className="text-center">
             <CheckCircle2 size={80} className="mx-auto text-green-500 mb-6" />
             <h3 className="text-3xl font-black text-gray-800 mb-2">Senin Saniyen: {(role === 'cemal' ? cemalTime : zeynepTime)}s</h3>
             <p className="text-xl text-gray-500 animate-pulse mt-8">Diğer oyuncunun basması bekleniyor...</p>
          </div>
        )}

        {phase === 'evaluating' && currentResult && (
          <div className="w-full text-center animate-in slide-in-from-bottom-8">
            <h3 className="text-2xl font-black text-gray-500 mb-8">Sonuçlar</h3>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className={`p-6 rounded-2xl border-4 ${currentResult.winner === 'cemal' ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                <p className="font-bold text-gray-500 mb-2">Cemal</p>
                <p className="text-4xl font-black text-blue-600 mb-2">{currentResult.cemalTime}s</p>
                <p className="text-sm font-bold text-gray-400">Fark: {currentResult.cemalDiff.toFixed(3)}s</p>
              </div>
              
              <div className={`p-6 rounded-2xl border-4 ${currentResult.winner === 'zeynep' ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                <p className="font-bold text-gray-500 mb-2">Zeynep</p>
                <p className="text-4xl font-black text-pink-600 mb-2">{currentResult.zeynepTime}s</p>
                <p className="text-sm font-bold text-gray-400">Fark: {currentResult.zeynepDiff.toFixed(3)}s</p>
              </div>
            </div>

            <div className="text-2xl font-black text-gray-800 mb-8">
              Kazanan: <span className="text-gold-dark">{currentResult.winner === 'cemal' ? 'Cemal' : currentResult.winner === 'zeynep' ? 'Zeynep' : 'Berabere'}!</span>
            </div>

            {role === 'cemal' && (
              <button 
                onClick={nextRound}
                className="mx-auto px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black flex items-center gap-3 text-lg"
              >
                {currentRound < 5 ? 'Sıradaki Round' : 'Sonucu Gör'} <ArrowRight />
              </button>
            )}
            {role !== 'cemal' && (
               <p className="text-gray-400 font-bold animate-pulse">Cemal'in sıradaki roundu başlatması bekleniyor...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
