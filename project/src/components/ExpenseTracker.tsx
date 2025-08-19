import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Plus, Trash2, Edit3, Eye, EyeOff, TrendingUp, TrendingDown, Target, Shield } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

const categories = [
  { name: 'Food', color: '#ef4444', icon: '🍽️' },
  { name: 'Travel', color: '#f59e0b', icon: '✈️' },
  { name: 'Shopping', color: '#8b5cf6', icon: '🛒' },
  { name: 'Bills', color: '#10b981', icon: '📄' },
  { name: 'Entertainment', color: '#06b6d4', icon: '🎬' },
  { name: 'Other', color: '#6b7280', icon: '📦' }
];

const heistMembers = [
  { name: 'Tokyo', city: 'Mumbai', specialty: 'Food Expenses' },
  { name: 'Berlin', city: 'Delhi', specialty: 'Travel Tracking' },
  { name: 'Nairobi', city: 'Bangalore', specialty: 'Shopping Analytics' },
  { name: 'Rio', city: 'Chennai', specialty: 'Bill Management' },
  { name: 'Denver', city: 'Kolkata', specialty: 'Entertainment Budget' },
  { name: 'Professor', city: 'Pune', specialty: 'Master Planner' }
];

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: 'Food',
    description: '',
    type: 'expense' as 'expense' | 'income'
  });
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load sample data
  useEffect(() => {
    const sampleData: Transaction[] = [
      {
        id: '1',
        amount: 850,
        category: 'Food',
        description: 'Dinner at Mumbai Restaurant',
        date: '2025-01-15',
        type: 'expense'
      },
      {
        id: '2',
        amount: 2500,
        category: 'Travel',
        description: 'Delhi Metro Card Recharge',
        date: '2025-01-14',
        type: 'expense'
      },
      {
        id: '3',
        amount: 1200,
        category: 'Shopping',
        description: 'Bangalore Mall Purchase',
        date: '2025-01-13',
        type: 'expense'
      },
      {
        id: '4',
        amount: 75000,
        category: 'Other',
        description: 'Salary Credit',
        date: '2025-01-12',
        type: 'income'
      }
    ];
    setTransactions(sampleData);
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const expensesByCategory = categories.map(category => {
    const amount = transactions
      .filter(t => t.type === 'expense' && t.category === category.name)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      name: category.name,
      value: amount,
      color: category.color,
      icon: category.icon
    };
  }).filter(item => item.value > 0);

  const todayExpenses = transactions
    .filter(t => t.type === 'expense' && t.date === new Date().toISOString().split('T')[0])
    .reduce((sum, t) => sum + t.amount, 0);

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) return;
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      description: newTransaction.description,
      date: new Date().toISOString().split('T')[0],
      type: newTransaction.type
    };

    setTransactions([transaction, ...transactions]);
    setNewTransaction({ amount: '', category: 'Food', description: '', type: 'expense' });
    setShowAddForm(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23991b1b%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-gold-400 bg-clip-text text-transparent">
              La Casa de Papel
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Elite Expense Tracking Operation</p>
          <div className="flex justify-center space-x-4 mt-4">
            {heistMembers.slice(0, 3).map((member, index) => (
              <div key={index} className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-red-900/30">
                <span className="text-red-400 font-semibold">{member.name}</span> · {member.city}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-red-900/30 rounded-xl p-6 hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Total Balance</h3>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-2xl font-bold text-white">
              {balanceVisible ? formatCurrency(balance) : '₹ ••••••'}
            </p>
            <div className="flex items-center mt-2">
              {balance >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              )}
              <span className={`text-sm ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {balance >= 0 ? 'Secured' : 'Alert'}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-800/20 to-red-900/30 backdrop-blur-sm border border-red-700/30 rounded-xl p-6">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
            <p className="text-xs text-gray-400 mt-2">Code: Tokyo Operations</p>
          </div>

          <div className="bg-gradient-to-r from-green-800/20 to-green-900/30 backdrop-blur-sm border border-green-700/30 rounded-xl p-6">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Total Income</h3>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(totalIncome)}</p>
            <p className="text-xs text-gray-400 mt-2">Code: Professor's Plan</p>
          </div>

          <div className="bg-gradient-to-r from-yellow-800/20 to-yellow-900/30 backdrop-blur-sm border border-yellow-700/30 rounded-xl p-6">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Today's Spending</h3>
            <p className="text-2xl font-bold text-yellow-400">{formatCurrency(todayExpenses)}</p>
            <p className="text-xs text-gray-400 mt-2">Code: Berlin Protocol</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Expense Chart */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-red-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Expense Breakdown</h2>
              <div className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                <Target className="h-3 w-3 inline mr-1" />
                Nairobi's Analysis
              </div>
            </div>
            
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#1f2937"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [formatCurrency(value), 'Amount']}
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {expensesByCategory.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-800/40 rounded-lg p-3 border border-gray-700/30">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {item.icon} {item.name}
                    </p>
                    <p className="text-xs text-gray-400">{formatCurrency(item.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-red-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Operations</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/25"
              >
                <Plus className="h-4 w-4" />
                <span>New Operation</span>
              </button>
            </div>

            {showAddForm && (
              <div className="bg-gray-800/60 rounded-lg p-4 mb-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Add New Transaction</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                    <select
                      value={newTransaction.type}
                      onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'expense' | 'income'})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <input
                      type="text"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter description"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={handleAddTransaction}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Add Transaction
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {transactions.slice(0, 10).map((transaction) => {
                const category = categories.find(c => c.name === transaction.category);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between bg-gray-800/40 rounded-lg p-3 border border-gray-700/30 hover:bg-gray-700/40 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="text-xl">{category?.icon || '📦'}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          {transaction.category} • {new Date(transaction.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            {heistMembers.slice(3).map((member, index) => (
              <div key={index} className="text-xs text-gray-400 bg-gray-800/30 px-3 py-1 rounded-full border border-red-900/20">
                <span className="text-red-400 font-semibold">{member.name}</span> · {member.specialty}
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            "The resistance never ends" • Secure Financial Planning System
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ef4444;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
}