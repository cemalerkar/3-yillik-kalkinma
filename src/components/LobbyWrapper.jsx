import React, { useState, useEffect } from 'react';
import { useLobby } from '../store/useLobby';
import { Users, Clock } from 'lucide-react';

export default function LobbyWrapper({ gameId, children, timerLimit = 65 }) {
  const { roomId, role, roomData, createRoom, joinRoom, pickRole, startGame, updateText, updateRoomData, submitGame } = useLobby(gameId);
  const [joinCode, setJoinCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(timerLimit);

  useEffect(() => {
    if (timerLimit === 0) return; // Disable auto timer for specific games
    if (roomData && roomData.status === 'playing') {
      const interval = setInterval(() => {
         const passed = Math.floor((Date.now() - roomData.timerStart) / 1000);
         const remaining = Math.max(0, timerLimit - passed);
         setTimeLeft(remaining);
         if (remaining === 0) {
            submitGame();
         }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [roomData?.status, roomData?.timerStart, timerLimit]);

  if (!roomId) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl text-center border border-gold/30">
        <Users size={48} className="mx-auto text-gold mb-4" />
        <h2 className="text-2xl font-bold mb-6">Multiplayer Lobi</h2>
        
        <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-bold mb-4">Yeni Oyun Kur</h3>
          <button onClick={createRoom} className="w-full py-3 bg-gold text-white font-bold rounded-xl hover:bg-gold-dark">
            Lobi Oluştur
          </button>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-bold mb-4">Var Olan Lobiye Katıl</h3>
          <input 
            type="text" 
            placeholder="Lobi Kodu (Örn: AB12CD)" 
            value={joinCode}
            onChange={e => setJoinCode(e.target.value.toUpperCase())}
            className="w-full p-3 mb-4 text-center font-bold tracking-widest border border-gray-300 rounded-xl"
          />
          <button onClick={() => joinRoom(joinCode)} className="w-full py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900">
            Lobiye Katıl
          </button>
        </div>
      </div>
    );
  }

  if (!roomData) {
    return <div className="text-center mt-20 text-gray-500 font-bold">Lobiye Bağlanıyor...</div>;
  }

  if (roomData.status === 'waiting') {
    const isCemalTaken = roomData.players && roomData.players.cemal;
    const isZeynepTaken = roomData.players && roomData.players.zeynep;
    const bothTaken = isCemalTaken && isZeynepTaken;

    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl text-center border border-gold/30">
        <Users size={48} className="mx-auto text-gold mb-4" />
        <h2 className="text-3xl font-black mb-2">Lobi: <span className="text-gold-dark tracking-widest">{roomId}</span></h2>
        
        {!role ? (
          <div className="mb-8 mt-6">
            <h3 className="font-bold mb-4 text-gray-700">Tarafını Seç</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => pickRole('cemal')}
                disabled={isCemalTaken}
                className={`flex-1 py-4 font-bold rounded-xl transition-all ${isCemalTaken ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:-translate-y-1'}`}
              >
                {isCemalTaken ? 'Cemal (Dolu)' : 'Cemal Ol'}
              </button>
              <button 
                onClick={() => pickRole('zeynep')}
                disabled={isZeynepTaken}
                className={`flex-1 py-4 font-bold rounded-xl transition-all ${isZeynepTaken ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-pink-600 text-white hover:bg-pink-700 shadow-md hover:-translate-y-1'}`}
              >
                {isZeynepTaken ? 'Zeynep (Dolu)' : 'Zeynep Ol'}
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-8 mt-6">
            <p className="text-xl font-bold text-gray-800 mb-2">Sen {role === 'cemal' ? 'Cemal' : 'Zeynep'} olarak katıldın!</p>
            {!bothTaken && (
               <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-800 font-medium flex items-center justify-center gap-2">
                 <Clock className="animate-pulse" size={20} />
                 Diğer oyuncu bekleniyor...
               </div>
            )}
          </div>
        )}

        {bothTaken && role && (
           <div className="mt-8 pt-6 border-t border-gray-100">
             <button onClick={startGame} className="w-full py-4 bg-green-600 text-white font-black rounded-xl hover:bg-green-700 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
               Oyunu Başlat!
             </button>
           </div>
        )}
      </div>
    );
  }

  // Inject room props into the game component
  return React.cloneElement(children, { roomData, role, roomId, updateText, updateRoomData, submitGame, timeLeft });
}
