'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import MovingBackground from '@/components/layout/MovingBackground';
import StatsGrid from '@/components/dashboard/StatsGrid';
import Bookshelf from '@/components/dashboard/Bookshelf';
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
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredBooks]);

  const displayBook = featuredBooks[currentBookIndex];

  return (
    <div className="min-h-screen pb-12">
      <MovingBackground />
      <Header />
      
      <main className="space-y-12 md:space-y-20">
        <Hero featuredBook={displayBook} />
        
        <div className="max-w-7xl mx-auto px-6 space-y-12 md:space-y-20">
          {/* Recently Read Section */}
          {recentReads.length > 0 && (
            <section className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
                  <span className="w-1.5 md:w-2 h-6 md:h-8 bg-accent rounded-full"></span>
                  Recent Reads
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {recentReads.map((recent: any) => (
                  <Link key={recent.id} href={`/reader/${recent.book.id}`}>
                    <div className="glass-card p-3 md:p-4 group cursor-pointer hover:border-primary/30 transition-all">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg md:rounded-xl mb-3 md:mb-4">
                        <img 
                          src={recent.book.coverImage} 
                          alt={recent.book.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-1.5 md:p-2">
                          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${recent.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-sm md:text-base text-[var(--foreground)] line-clamp-1 group-hover:text-primary transition-colors">{recent.book.title}</h3>
                      <p className="text-[10px] md:text-xs text-[var(--foreground)]/40 mt-1">{recent.book.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Stats Grid */}
          <section className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
                <span className="w-1.5 md:w-2 h-6 md:h-8 bg-primary rounded-full"></span>
                Your Performance
              </h2>
              <button className="text-[10px] md:text-xs font-bold text-[var(--foreground)]/40 hover:text-primary transition-colors text-left uppercase tracking-widest">VIEW DETAILED ANALYTICS</button>
            </div>
            <StatsGrid />
          </section>

          {/* Featured Shelf */}
          <section className="space-y-6 md:space-y-8 pb-8 md:pb-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
                <span className="w-1.5 md:w-2 h-6 md:h-8 bg-secondary rounded-full"></span>
                Recommended for You
              </h2>
              <Link href="/books" className="text-[10px] md:text-xs font-bold text-[var(--foreground)]/40 hover:text-secondary transition-colors uppercase tracking-widest">
                SEE ALL
              </Link>
            </div>
            <Bookshelf books={featuredBooks} />
          </section>
        </div>
      </main>
    </div>
  );
}
