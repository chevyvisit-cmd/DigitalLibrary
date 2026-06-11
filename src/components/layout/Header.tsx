'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, LayoutDashboard, BookOpen, Search, Menu, X, User, Sun, Moon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import NotificationBell from './NotificationBell';
import { useTheme } from './ThemeProvider';

const Header = ({ activeTab, setActiveTab }: { activeTab: 'dashboard' | 'catalog', setActiveTab: (tab: 'dashboard' | 'catalog') => void }) => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Dashboard', id: 'dashboard' as const, icon: LayoutDashboard },
    { name: 'Catalog', id: 'catalog' as const, icon: BookOpen },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto glass-card px-4 md:px-8 py-3 flex items-center justify-between border-white/10 shadow-2xl relative">
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setActiveTab('dashboard')} className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.5)]">
              <Library className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[var(--foreground)] to-[var(--header-text)] bg-clip-text text-transparent tracking-tighter">
              DIGITAL<span className="text-orange-500">LIBRARY</span>
            </span>
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-header-text hover:text-header-text-hover'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[22px] left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-header-text" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-glass border border-glass-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all w-48 xl:w-64 text-[var(--foreground)]"
            />
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <NotificationBell />
            <button
              onClick={toggleTheme}
              className="p-2 text-header-text hover:text-header-text-hover bg-glass rounded-lg border border-glass-border transition-colors"
            >
              {theme === 'kun' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <div className="hidden sm:block">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {session?.user?.name?.substring(0, 2).toUpperCase() || 'U'}
              </div>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white bg-white/5 rounded-lg border border-white/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
