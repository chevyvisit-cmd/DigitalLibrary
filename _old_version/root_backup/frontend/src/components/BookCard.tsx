import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, ArrowUpRight } from 'lucide-react';
import { Book } from '../types';
import { cn } from '../lib/utils';

import FavoriteButton from './FavoriteButton';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-800"
      onClick={onClick}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {book.isNew && (
          <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
            Yangi
          </span>
        )}
        {book.isTop && (
          <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
            Top
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <div className="absolute top-4 right-4 z-20">
        <FavoriteButton bookId={book.id} />
      </div>

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <button className="w-full py-3 bg-white text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Batafsil o'qish <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
            {book.category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{book.rating || '4.8'}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
          {book.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
          {book.author}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Clock size={14} />
            <span>12 soat o'qish</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-slate-400 uppercase font-bold">Mavjud</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{book.stock} ta</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
