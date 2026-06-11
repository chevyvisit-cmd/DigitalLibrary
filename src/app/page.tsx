'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import StatsGrid from '@/components/dashboard/StatsGrid';
import Bookshelf from '@/components/dashboard/Bookshelf';
import AuthGateway from '@/components/auth/AuthGateway';
import InteractiveCanvas from '@/components/layout/InteractiveCanvas';
import { AnimatePresence, motion } from 'framer-motion';

export default function RootPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'catalog'>('dashboard');
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(sessionStorage.getItem('lib_auth') === 'true');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Simulate fetching books
      fetch('/api/books')
        .then(res => res.json())
        .then(data => setFeaturedBooks(data))
        .catch(err => console.error('Error fetching books:', err));
    }
  }, [isAuthenticated]);

  const handleAuthenticated = () => {
    sessionStorage.setItem('lib_auth', 'true');
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <InteractiveCanvas />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <AuthGateway key="auth" onAuthenticated={handleAuthenticated} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="pt-24 px-6 max-w-7xl mx-auto">
              {activeTab === 'dashboard' ? (
                <div className="space-y-12">
                  <Hero />
                  <StatsGrid />
                  <Bookshelf books={featuredBooks || []} />
                </div>
              ) : (
                <div className="text-themed">Catalog view placeholder</div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
