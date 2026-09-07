import { create } from 'zustand'
import { db } from '../firebase'
import { ref, onValue, set, update, push, runTransaction } from 'firebase/database'

export const useStore = create((setZustand, getZustand) => ({
  balance: 0,
  inventory: [],
  archive: [],
  passiveIncomes: [],
  passiveExpenses: [],
  pet: null,
  isLoaded: false,

  initFirebase: () => {
    const stateRef = ref(db, 'globalState');
    onValue(stateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setZustand({
          balance: data.balance || 0,
          inventory: data.inventory || [],
          archive: data.archive ? Object.values(data.archive).sort((a,b) => new Date(b.date) - new Date(a.date)) : [],
          passiveIncomes: data.passiveIncomes || [],
          passiveExpenses: data.passiveExpenses || [],
          pet: data.pet || { level: 1, xp: 0, hunger: 100, happiness: 100, lastTriggered: Date.now() },
          isLoaded: true
        });
      } else {
        const defaultData = {
          balance: 150,
          inventory: [],
          passiveIncomes: [
             { id: 'base-income', name: 'Sex İmparatorluğu Pasif Geliri - Cemal & Zeynep', amount: 500, intervalMs: 300000, lastTriggered: Date.now() }
          ],
          passiveExpenses: [
             { id: 'base-expense', name: 'Varaklı Bebek Masrafı', amount: 100, intervalMs: 300000, lastTriggered: Date.now() }
          ],
          pet: { level: 1, xp: 0, hunger: 100, happiness: 100, lastTriggered: Date.now() }
        };
        set(stateRef, defaultData);
      }
    });
  },

  addMoney: (amount) => {
    runTransaction(ref(db, 'globalState/balance'), (current) => (current || 0) + amount);
  },
  
  spendMoney: (amount) => {
    runTransaction(ref(db, 'globalState/balance'), (current) => Math.max(0, (current || 0) - amount));
  },

  buyItem: (item) => {
    const state = getZustand();
    if (state.balance >= item.price) {
      const newInventory = [...state.inventory, item];
      const updates = {
        'globalState/balance': state.balance - item.price,
        'globalState/inventory': newInventory
      };
      
      if (item.passiveType === 'income') {
        const newIncome = {
          id: Date.now().toString(),
          name: item.passiveName,
          amount: item.passiveAmount,
          intervalMs: item.passiveInterval * 60000,
          lastTriggered: Date.now()
        };
        updates['globalState/passiveIncomes'] = [...state.passiveIncomes, newIncome];
      } else if (item.passiveType === 'expense') {
         const newExpense = {
          id: Date.now().toString(),
          name: item.passiveName,
          amount: item.passiveAmount,
          intervalMs: item.passiveInterval * 60000,
          lastTriggered: Date.now()
        };
        updates['globalState/passiveExpenses'] = [...state.passiveExpenses, newExpense];
      }

      update(ref(db), updates);
    }
  },

  addToArchive: (gameData) => {
    const archiveListRef = ref(db, 'globalState/archive');
    const newEntryRef = push(archiveListRef);
    set(newEntryRef, gameData);
  },

  updatePet: (newPetData) => {
    update(ref(db), { 'globalState/pet': newPetData });
  },

  processPassives: () => {
    if (!getZustand().isLoaded) return;
    // This will be called by a timer. We use transaction to avoid double processing if both are online.
    runTransaction(ref(db, 'globalState'), (currentData) => {
      if (!currentData) return currentData;
      
      let changed = false;
      let totalEarned = 0;
      let totalSpent = 0;
      const now = Date.now();

      if (currentData.passiveIncomes) {
        currentData.passiveIncomes.forEach(income => {
          if (now - income.lastTriggered >= income.intervalMs) {
             const triggers = Math.floor((now - income.lastTriggered) / income.intervalMs);
             totalEarned += income.amount * triggers;
             income.lastTriggered += triggers * income.intervalMs;
             changed = true;
          }
        });
      }

      if (currentData.passiveExpenses) {
        currentData.passiveExpenses.forEach(expense => {
          if (now - expense.lastTriggered >= expense.intervalMs) {
             const triggers = Math.floor((now - expense.lastTriggered) / expense.intervalMs);
             totalSpent += expense.amount * triggers;
             expense.lastTriggered += triggers * expense.intervalMs;
             changed = true;
          }
        });
      }
      
      // Pet passive income logic (level 4=Lise gives 50, level 5=Üniversite gives 150, 6=Yüksek Lisans 300, 7=Doktora 600)
      if (currentData.pet) {
        const petInterval = 300000; // 5 mins
        const petIncomeMap = { 1: 0, 2: 0, 3: 0, 4: 50, 5: 150, 6: 300, 7: 600 };
        const petIncome = petIncomeMap[currentData.pet.level] || 0;
        
        if (petIncome > 0 && (now - currentData.pet.lastTriggered >= petInterval)) {
           const triggers = Math.floor((now - currentData.pet.lastTriggered) / petInterval);
           totalEarned += petIncome * triggers;
           currentData.pet.lastTriggered += triggers * petInterval;
           changed = true;
        } else if (petIncome === 0) {
           currentData.pet.lastTriggered = now;
        }
      }

      if (changed) {
        currentData.balance = Math.max(0, (currentData.balance || 0) + totalEarned - totalSpent);
        return currentData;
      }

      return; // return undefined to abort transaction if no changes
    });
  }
}))
