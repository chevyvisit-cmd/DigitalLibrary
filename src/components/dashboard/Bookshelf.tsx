'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  coverImage: string;
  color?: string;
}

interface BookshelfProps {
  books?: Book[];
}

const Bookshelf = ({ books = [] }: BookshelfProps) => {
  return (
    <div className="relative pt-12 pb-20 px-8 rounded-3xl overflow-hidden min-h-[400px]">
      {/* Wooden Shelf Background */}
      <div className="absolute inset-0 bg-[#1a120b] border-t-8 border-[#2c1e12] shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
      </div>

      <div className="relative flex flex-wrap gap-8 justify-center items-end min-h-[300px]">
        {books && books.length > 0 ? (
          books.map((book, index) => (
            <Link key={book.id} href={`/reader/${book.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 50, rotateY: 45 }}
                animate={{ opacity: 1, y: 0, rotateY: 15 }}
                whileHover={{ 
                  rotateY: 0, 
                  z: 50, 
                  scale: 1.1,
                  translateY: -20,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative w-40 h-60 cursor-pointer preserve-3d group"
                style={{ perspective: "1000px" }}
              >
                {/* Book Spine */}
                <div className="absolute left-0 top-0 w-8 h-full bg-[#2c1e12] origin-left -rotate-y-90 z-10 shadow-xl border-r border-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap -rotate-90">
                    {book.title}
                  </span>
                </div>
                
                {/* Book Cover */}
                <div className="absolute inset-0 z-20 shadow-2xl overflow-hidden rounded-r-md">
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Shadow on shelf */}
                <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/60 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-emerald-500 font-bold text-center bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
              Kitoblar yuklanmoqda yoki raqamli xazinada hozircha kitob mavjud emas...
            </p>
          </div>
        )}
      </div>

      {/* Shelf Base */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-[#2c1e12] to-[#1a120b] border-t-4 border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"></div>
    </div>
  );
};

export default Bookshelf;
