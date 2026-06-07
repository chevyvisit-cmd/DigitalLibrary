import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Type, Moon, Sun, Settings } from 'lucide-react';
import { Book } from '../types';

interface BookReaderProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ book, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fontSize, setFontSize] = useState(18);
  const [isReaderDark, setIsReaderDark] = useState(false);
  const totalPages = 20;

  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-slate-950 flex flex-col"
        >
          <header className="h-16 px-6 flex items-center justify-between bg-slate-900 border-b border-white/5 text-white">
            <div className="flex items-center gap-4">
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
              <h2 className="font-bold truncate max-w-[200px] md:max-w-md">{book.title}</h2>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setIsReaderDark(!isReaderDark)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                {isReaderDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
                <button onClick={() => setFontSize(f => Math.max(12, f-2))} className="p-1 hover:text-orange-500 transition-colors"><Type size={14} /></button>
                <span className="text-xs font-bold w-6 text-center">{fontSize}</span>
                <button onClick={() => setFontSize(f => Math.min(32, f+2))} className="p-1 hover:text-orange-500 transition-colors"><Type size={18} /></button>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-xl transition-colors hidden md:block">
                <Settings size={20} />
              </button>
            </div>
          </header>

          <main className={`flex-grow overflow-hidden flex items-center justify-center p-4 md:p-12 transition-colors duration-500 ${isReaderDark ? 'bg-slate-900 text-slate-300' : 'bg-orange-50/30 text-slate-800'}`}>
            <div className="relative w-full max-w-3xl h-full flex flex-col">
              <div className="flex-grow overflow-y-auto pr-4 scroll-smooth">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 50, rotateY: -10 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -50, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    style={{ fontSize: `${fontSize}px` }}
                    className="leading-relaxed font-serif py-10"
                  >
                    <h3 className="text-3xl font-bold mb-8 font-sans">Bo'lim {currentPage}</h3>
                    <p className="mb-6">
                      Siz hozirda <strong>"{book.title}"</strong> kitobining {currentPage}-bo'limini mutolaa qilyapsiz. 
                      Ushbu kitobning mazmuni foydalanuvchi uchun mutolaa qilishga juda qulay qilib sozlangan. 
                      Zamonaviy interfeys va oson boshqaruv tizimi orqali siz sevimli kitoblaringizni istalgan vaqtda 
                      va istalgan joyda o'qishingiz mumkin.
                    </p>
                    <p className="mb-6">
                      Kutubxonamizning maqsadi — bilimni hamma uchun ochiq va qulay qilish. Framer Motion animatsiyalari 
                      esa o'qish jarayonini yanada qiziqarli va "tirik" qiladi. Xuddi haqiqiy kitob varoqlayotgandek 
                      hissiyotni tuydiradi.
                    </p>
                    <p>
                      Siz bu yerda o'zingizga mos ranglar rejimini (Dark/Light) tanlashingiz va shrift o'lchamini 
                      o'zingizga qulay qilib sozlashingiz mumkin. Mutolaangiz xayrli bo'lsin!
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </main>

          <footer className="h-16 px-6 flex items-center justify-between bg-slate-900 text-white">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={20} /> <span className="hidden md:inline">Oldingi</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentPage / totalPages) * 100}%` }}
                  className="h-full bg-orange-500"
                />
              </div>
              <span className="text-sm font-bold text-slate-400">{currentPage} / {totalPages}</span>
            </div>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-30"
            >
              <span className="hidden md:inline">Keyingi</span> <ChevronRight size={20} />
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookReader;
