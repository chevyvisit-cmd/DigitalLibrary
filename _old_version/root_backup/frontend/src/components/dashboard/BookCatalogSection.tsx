import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, ChevronRight } from 'lucide-react';

const categories = ["Shaxsiy Rivojlanish", "Dasturlash", "Badiiy Adabiyot"];

const books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', rating: 4.9, category: 'Shaxsiy Rivojlanish', color: 'from-orange-500 to-red-600' },
  { id: 2, title: 'Sapiens', author: 'Yuval Noah Harari', rating: 4.8, category: 'Badiiy Adabiyot', color: 'from-blue-500 to-indigo-600' },
  { id: 3, title: '1984', author: 'George Orwell', rating: 4.7, category: 'Badiiy Adabiyot', color: 'from-slate-700 to-slate-900' },
  { id: 4, title: 'Clean Code', author: 'Robert C. Martin', rating: 4.9, category: 'Dasturlash', color: 'from-green-500 to-emerald-600' },
  { id: 5, title: 'Deep Work', author: 'Cal Newport', rating: 4.6, category: 'Shaxsiy Rivojlanish', color: 'from-purple-500 to-indigo-600' },
  { id: 6, title: 'Refactoring', author: 'Martin Fowler', rating: 4.8, category: 'Dasturlash', color: 'from-cyan-500 to-blue-600' },
];

const BookCatalogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredBooks = books.filter(book => book.category === activeTab);

  return (
    <div className="flex flex-col h-full glass-dark rounded-3xl p-8 border border-white/5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-white">Kitoblar Katalogi</h2>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === cat 
                  ? 'bg-orange-500 text-white neon-orange' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode='popLayout'>
          {filteredBooks.map((book, i) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="aspect-[2/3] rounded-2xl overflow-hidden relative mb-4 shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${book.color}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-black text-lg leading-tight mb-1">{book.title}</div>
                  <div className="text-white/60 text-xs font-medium">{book.author}</div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                      <Play fill="black" size={20} />
                   </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                   <Star size={12} className="text-orange-500" fill="#F97316" />
                   <span className="text-xs font-bold text-white">{book.rating}</span>
                </div>
                <button className="text-[10px] font-bold text-orange-500 flex items-center gap-1 hover:underline">
                  Hozir o'qish <ChevronRight size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookCatalogSection;
