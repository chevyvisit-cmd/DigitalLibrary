'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/layout/Header';
import BookCard from '@/components/catalog/BookCard';
import CategoryFilter from '@/components/catalog/CategoryFilter';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import MovingBackground from '@/components/layout/MovingBackground';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All Books';

  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      let url = '/api/books?';
      if (selectedCategory === 'Favorites') {
        url = '/api/favorites';
      } else {
        if (selectedCategory !== 'All Books') {
          url += `category=${encodeURIComponent(selectedCategory)}&`;
        }
        if (searchQuery) {
          url += `search=${encodeURIComponent(searchQuery)}`;
        }
      }
      const response = await axios.get(url);
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white pt-28 pb-12 px-6 transition-colors duration-500">
      <MovingBackground />
      <Header />
      
      <main className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter">
              The <span className="text-primary">Catalog</span>
            </h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-md">
              Dive into our extensive library of premium digital content. Filter by category to find your next great read.
            </p>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:placeholder-neutral-500 rounded-xl py-2.5 md:py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 w-full md:w-64 transition-all"
              />
            </div>
            <button className="p-2.5 md:p-3 bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 border border-transparent dark:border-neutral-800 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[450px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12"
          >
            {books.map((book: any) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard 
                  book={{
                    ...book,
                    pages: book.totalPages
                  }} 
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && books.length === 0 && (
          <div className="text-center py-24">
            <p className="text-xl text-neutral-400 dark:text-white/20 font-bold">No books found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Catalog() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-900 dark:text-white">Loading Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
