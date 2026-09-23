import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

export default function ChatBox({ roomData, role, sendChatMessage }) {
  const [msg, setMsg] = useState('');
  const scrollRef = useRef(null);

  const messages = roomData?.chat ? Object.values(roomData.chat).sort((a, b) => a.timestamp - b.timestamp) : [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    sendChatMessage(msg);
    setMsg('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col h-64 mt-8">
      <div className="p-3 bg-gray-50 border-b border-gray-200 font-bold text-gray-700 text-sm flex justify-between">
        <span>Oyun Sohbeti</span>
        <span className="text-xs text-gray-400">{role === 'cemal' ? 'Sen (Cemal)' : 'Sen (Zeynep)'}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
        {messages.length === 0 ? (
           <div className="text-center text-gray-400 text-sm mt-8">Henüz mesaj yok...</div>
        ) : (
          messages.map((m, i) => {
            const isMe = m.sender === role;
            return (
              <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  isMe 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {!isMe && <div className="font-bold text-xs mb-1 opacity-50 capitalize">{m.sender}</div>}
                  {m.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          placeholder="Mesaj yaz..." 
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
