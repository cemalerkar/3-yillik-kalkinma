import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowUpCircle, ArrowDownCircle, Banknote, Clock, Baby } from 'lucide-react';

export default function FinancePage() {
  const { passiveIncomes, passiveExpenses, pet } = useStore();

  const totalIncome = passiveIncomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = passiveExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  // Pet passive income logic (level 4=Lise gives 50, level 5=Üniversite gives 150, 6=Yüksek Lisans 300, 7=Doktora 600)
  const petIncomeMap = { 1: 0, 2: 0, 3: 0, 4: 50, 5: 150, 6: 300, 7: 600 };
  const petIncomeAmount = pet ? (petIncomeMap[pet.level] || 0) : 0;
  
  const finalTotalIncome = totalIncome + petIncomeAmount;
  const netIncome = finalTotalIncome - totalExpense;

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2">Finans Özeti</h1>
        <p className="text-gold-dark font-medium italic">Tüm pasif gelir ve giderlerinin detaylı raporu</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-green-50 rounded-2xl p-6 border border-green-200 text-center shadow-sm">
          <ArrowUpCircle size={32} className="mx-auto text-green-500 mb-3" />
          <p className="text-sm text-green-700 font-bold uppercase tracking-wide">Toplam Gelir</p>
          <p className="text-3xl font-black text-green-600 mt-1">+{finalTotalIncome}$</p>
          <p className="text-xs text-green-600 mt-2 font-medium">Her 5 Dakikada</p>
        </div>
        
        <div className="bg-red-50 rounded-2xl p-6 border border-red-200 text-center shadow-sm">
          <ArrowDownCircle size={32} className="mx-auto text-red-500 mb-3" />
          <p className="text-sm text-red-700 font-bold uppercase tracking-wide">Toplam Gider</p>
          <p className="text-3xl font-black text-red-600 mt-1">-{totalExpense}$</p>
          <p className="text-xs text-red-600 mt-2 font-medium">Her 5 Dakikada</p>
        </div>

        <div className={`rounded-2xl p-6 border text-center shadow-sm ${netIncome >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
          <Banknote size={32} className={`mx-auto mb-3 ${netIncome >= 0 ? 'text-blue-500' : 'text-orange-500'}`} />
          <p className={`text-sm font-bold uppercase tracking-wide ${netIncome >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>Net Nakit Akışı</p>
          <p className={`text-3xl font-black mt-1 ${netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {netIncome >= 0 ? '+' : ''}{netIncome}$
          </p>
          <p className={`text-xs mt-2 font-medium ${netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>Her 5 Dakikada</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ArrowUpCircle className="text-green-500" /> Pasif Gelir Kaynakları
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
            <ul className="divide-y divide-gray-100">
              {passiveIncomes.map(income => (
                <li key={income.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{income.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
                      <Clock size={12} /> {income.intervalMs / 60000} dakikada bir
                    </div>
                  </div>
                  <div className="text-xl font-black text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                    +{income.amount}$
                  </div>
                </li>
              ))}
              
              {/* Pet Income injected visually */}
              {petIncomeAmount > 0 && (
                 <li className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors bg-gold-light/10 border-l-4 border-gold">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 flex items-center gap-2">
                      <Baby size={16} className="text-gold-dark" /> Altın Varaklı Bebek (Sv. {pet.level})
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
                      <Clock size={12} /> 5 dakikada bir
                    </div>
                  </div>
                  <div className="text-xl font-black text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                    +{petIncomeAmount}$
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ArrowDownCircle className="text-red-500" /> Pasif Gider Kaynakları
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
            {passiveExpenses.length === 0 ? (
              <div className="p-8 text-center text-gray-400 font-medium">
                Aktif hiçbir gider yok. Harika!
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {passiveExpenses.map(expense => (
                  <li key={expense.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{expense.name}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
                        <Clock size={12} /> {expense.intervalMs / 60000} dakikada bir
                      </div>
                    </div>
                    <div className="text-xl font-black text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                      -{expense.amount}$
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
