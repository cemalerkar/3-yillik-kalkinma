import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, set, onValue, update, remove, get } from 'firebase/database';

export function useLobby(gameId) {
  const [roomId, setRoomId] = useState(null);
  const [role, setRole] = useState(null); // 'cemal' or 'zeynep'
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    const roomRef = ref(db, `rooms/${roomId}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      setRoomData(snapshot.val());
    });
    return () => unsubscribe();
  }, [roomId]);

  const createRoom = async () => {
    const newRoomId = 'CZ' + Math.random().toString(36).substring(2, 6).toUpperCase();
    await set(ref(db, `rooms/${newRoomId}`), {
      gameId,
      status: 'waiting', // waiting, playing, evaluating
      players: {},
      timerStart: 0,
      cemalText: '',
      zeynepText: ''
    });
    setRoomId(newRoomId);
    return newRoomId;
  };

  const joinRoom = async (id) => {
    const snapshot = await get(ref(db, `rooms/${id}`));
    if (!snapshot.exists()) {
      alert("Lobi bulunamadı!");
      return false;
    }
    const data = snapshot.val();
    if (data.gameId !== gameId) {
      alert("Bu lobi başka bir oyuna ait!");
      return false;
    }

    setRoomId(id);
    return true;
  };

  const pickRole = async (selectedRole) => {
    if (!roomId) return false;
    const snapshot = await get(ref(db, `rooms/${roomId}`));
    const data = snapshot.val();
    
    if (data.players && data.players[selectedRole]) {
      alert("Bu rol çoktan seçilmiş!");
      return false;
    }

    await update(ref(db, `rooms/${roomId}/players`), { [selectedRole]: true });
    setRole(selectedRole);
    return true;
  };

  const startGame = async () => {
    if (!roomId) return;
    await update(ref(db, `rooms/${roomId}`), { 
      status: 'playing',
      timerStart: Date.now(),
      cemalText: '',
      zeynepText: '',
      result: null
    });
  };

  const updateText = async (text) => {
    if (!roomId || !role) return;
    await update(ref(db, `rooms/${roomId}`), {
      [`${role}Text`]: text
    });
  };

  const updateRoomData = async (updates) => {
    if (!roomId) return;
    await update(ref(db, `rooms/${roomId}`), updates);
  };

  const submitGame = async () => {
    if (!roomId) return;
    await update(ref(db, `rooms/${roomId}`), {
      status: 'evaluating'
    });
  };

  return { roomId, role, roomData, createRoom, joinRoom, pickRole, startGame, updateText, updateRoomData, submitGame };
}
