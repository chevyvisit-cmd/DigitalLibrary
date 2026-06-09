'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, LayoutDashboard, BookOpen, Search, Menu, X, User, Sun, Moon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import NotificationBell from './NotificationBell';
import { useTheme } from './ThemeProvider';

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.location.href = `/books?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Catalog', href: '/books', icon: BookOpen },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto glass-card px-4 md:px-8 py-3 flex items-center justify-between border-white/10 shadow-2xl relative">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.5)]">
              <Library className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[var(--foreground)] to-[var(--header-text)] bg-clip-text text-transparent tracking-tighter">
              DIGITAL<span className="text-orange-500">LIBRARY</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Desktop Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-header-text" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-glass border border-glass-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all w-48 xl:w-64 text-[var(--foreground)]"
            />
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <NotificationBell />
            <button
              onClick={toggleTheme}
              className="p-2 text-header-text hover:text-header-text-hover bg-glass rounded-lg border border-glass-border transition-colors"
              title={theme === 'kun' ? 'Tun rejimi' : 'Kun rejimi'}
            >
              {theme === 'kun' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <div className="hidden sm:block h-8 w-[1px] bg-glass-border mx-1"></div>
            
            <Link href="/profile" className="hidden sm:block">
              <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="User" className="w-8 h-8 rounded-full object-cover shadow-lg border border-white/10" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {session?.user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </div>
                )}
                <span className="text-sm font-medium text-white/80 hidden lg:inline">
                  {session?.user?.name || 'User'}
                </span>
              </button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white bg-white/5 rounded-lg border border-white/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 lg:hidden z-50"
            >
              <div className="glass-card border-white/10 shadow-2xl overflow-hidden flex flex-col p-2">
                {/* Mobile Search */}
                <div className="relative mb-4 p-2 sm:hidden">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 text-white"
                  />
                </div>

                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        isActive ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-bold">{item.name}</span>
                    </Link>
                  );
                })}
                
                <div className="h-[1px] bg-white/10 my-2 mx-4"></div>
                
                <Link 
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    pathname === '/profile' ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-bold">My Profile</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
