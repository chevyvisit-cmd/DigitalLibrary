'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/layout/Header';
import StatsGrid from '@/components/dashboard/StatsGrid';
import Bookshelf from '@/components/dashboard/Bookshelf';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);
  const [recentReads, setRecentReads] = useState<any[]>([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksRes = await axios.get('/api/books');
        setFeaturedBooks(booksRes.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching books:', error);
      }

      try {
        const progressRes = await axios.get('/api/progress');
        setRecentReads(progressRes.data.slice(0, 4));
      } catch (error) {
        // 401 xatosi foydalanuvchi tizimga kirmaganligini anglatadi, bu normal holat
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
          console.error('Error fetching progress:', error);
        }
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (featuredBooks.length > 0) {
      const interval = setInterval(() => {
        setCurrentBookIndex((prev) => (prev + 1) % featuredBooks.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [featuredBooks]);

  const displayBook = featuredBooks[currentBookIndex];

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <Header />
      
      <main className="max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 p-12 lg:p-20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
          
          <div className="relative z-10 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Sparkles className="w-4 h-4" />
              Xush kelibsiz, Kitobxon
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter cursor-default flex flex-wrap gap-x-[0.3em]"
            >
              {["Bilimingizni", "Mukammal", "Va", "Zamonaviy", "Shaklda", "Boyiting."].map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split('').map((char, charIndex) => (
                    <span 
                      key={charIndex} 
                      className="animate-rgb-text hover:z-10 relative inline-block origin-bottom"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-white/40 leading-relaxed"
            >
              To{"'"}xtagan joyingizdan davom eting yoki raqamli bilimlar xazinamizdan yangi ufqlarni kashf eting.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/books">
                <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_25px_rgba(255,107,0,0.4)]">
                  Kutubxonani ko{"'"}rish <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3">
                <Play className="w-5 h-5 fill-white" /> Qo{"'"}llanmani ko{"'"}rish
              </button>
            </motion.div>
          </div>

          <div className="absolute hidden lg:block right-20 top-1/2 -translate-y-1/2 w-[400px] h-[550px]">
            <AnimatePresence mode="wait">
              {displayBook && (
                <motion.div 
                  key={displayBook.id}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.1, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <Link href={`/reader/${displayBook.id}`}>
                    <div className="relative w-full h-full group cursor-pointer">
                      <img 
                        src={displayBook.coverImage} 
                        alt={displayBook.title} 
                        className="w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-white/10 transition-transform group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl"></div>
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest">Featured Book</span>
                          <span className="text-xs font-bold text-white">★ {displayBook.rating}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white line-clamp-1">{displayBook.title}</h3>
                        <p className="text-sm text-white/60 mt-1">{displayBook.author}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Recently Read Section */}
        {recentReads.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-accent rounded-full"></span>
                Recent Reads
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentReads.map((recent: any) => (
                <Link key={recent.id} href={`/reader/${recent.book.id}`}>
                  <div className="glass-card p-4 group cursor-pointer hover:border-primary/30 transition-all">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
                      <img 
                        src={recent.book.coverImage} 
                        alt={recent.book.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-2">
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${recent.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">{recent.book.title}</h3>
                    <p className="text-xs text-white/40 mt-1">{recent.book.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Stats Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Your Performance
            </h2>
            <button className="text-sm font-bold text-white/40 hover:text-primary transition-colors">VIEW DETAILED ANALYTICS</button>
          </div>
          <StatsGrid />
        </section>

        {/* Featured Shelf */}
        <section className="space-y-8 pb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-secondary rounded-full"></span>
              Recommended for You
            </h2>
            <Link href="/books" className="text-sm font-bold text-white/40 hover:text-secondary transition-colors">
              SEE ALL BOOKS
            </Link>
          </div>
          <Bookshelf books={featuredBooks} />
        </section>
      </main>
    </div>
  );
}
