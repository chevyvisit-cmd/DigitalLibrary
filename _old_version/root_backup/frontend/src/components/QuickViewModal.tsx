import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, Star } from 'lucide-react';
import { Book } from '../types';

import FavoriteButton from './FavoriteButton';

interface QuickViewModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onBorrow: (bookId: number) => void;
  onRead?: (book: Book) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ book, isOpen, onClose, onBorrow, onRead }) => {
  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="md:w-2/5 relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover min-h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
              <div className="absolute top-6 left-6">
                <FavoriteButton bookId={book.id} />
              </div>
            </div>

            <div className="md:w-3/5 p-8 md:p-12">
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                {book.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">Muallif: {book.author}</p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-1">
                  <Star size={20} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold">4.9</span>
                </div>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-2 text-slate-500">
                  <BookOpen size={20} />
                  <span>324 sahifa</span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                {book.description || "Ushbu kitob haqida qisqacha ma'lumot tez kunda taqdim etiladi."}
              </p>

              <div className="flex flex-wrap gap-4 mt-auto">
                <button
                  onClick={() => onRead?.(book)}
                  className="flex-1 px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <BookOpen size={20} /> Hozir o'qish
                </button>
                <button
                  onClick={() => onBorrow(book.id)}
                  className="px-8 py-4 bg-slate-100 dark:bg-slate-800 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Olish
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
