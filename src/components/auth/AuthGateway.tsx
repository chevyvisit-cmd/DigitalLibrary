'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Sun, Moon } from 'lucide-react';
import { useTheme } from '../layout/ThemeProvider';

interface AuthGatewayProps {
  onAuthenticated: () => void;
}

const AuthGateway: React.FC<AuthGatewayProps> = ({ onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated authentication
    onAuthenticated();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Theme Switcher in Auth Wall */}
      <div className="absolute top-8 right-8 z-[110]">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-2xl border backdrop-blur-xl transition-all ${
            theme === 'tun'
              ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              : 'bg-black/5 border-black/10 text-zinc-900 hover:bg-black/10'
          }`}
        >
          {theme === 'tun' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative w-full max-w-md p-8 rounded-[2.5rem] backdrop-blur-3xl border shadow-2xl overflow-hidden ${
          theme === 'tun'
            ? 'bg-white/5 border-white/10'
            : 'bg-black/5 border-black/10'
        }`}
      >
        {/* Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <h2 className={`text-3xl font-black tracking-tighter ${theme === 'tun' ? 'text-white' : 'text-zinc-950'}`}>
              {isLogin ? "Xush Kelibsiz!" : "Ro'yxatdan O'tish"}
            </h2>
            <p className={`text-sm ${theme === 'tun' ? 'text-white/40' : 'text-zinc-500'}`}>
              Raqamli bilimlar xazinasi sizni kutmoqda.
            </p>
          </div>

          {/* Tabs */}
          <div className={`flex p-1 rounded-2xl ${theme === 'tun' ? 'bg-white/5' : 'bg-black/5'}`}>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                isLogin 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : theme === 'tun' ? 'text-white/40' : 'text-zinc-500'
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                !isLogin 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : theme === 'tun' ? 'text-white/40' : 'text-zinc-500'
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  theme === 'tun' ? 'text-white/20 group-focus-within:text-primary' : 'text-zinc-400 group-focus-within:text-primary'
                }`} />
                <input
                  type="text"
                  placeholder="Ismingiz"
                  className={`w-full py-4 pl-12 pr-4 rounded-2xl border bg-transparent outline-none transition-all text-sm ${
                    theme === 'tun' 
                      ? 'border-white/10 focus:border-primary/50 text-white focus:bg-white/5' 
                      : 'border-black/10 focus:border-primary/50 text-zinc-900 focus:bg-black/5'
                  }`}
                  required
                />
              </div>
            )}
            
            <div className="relative group">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                theme === 'tun' ? 'text-white/20 group-focus-within:text-primary' : 'text-zinc-400 group-focus-within:text-primary'
              }`} />
              <input
                type="email"
                placeholder="Email manzilingiz"
                className={`w-full py-4 pl-12 pr-4 rounded-2xl border bg-transparent outline-none transition-all text-sm ${
                  theme === 'tun' 
                    ? 'border-white/10 focus:border-primary/50 text-white focus:bg-white/5' 
                    : 'border-black/10 focus:border-primary/50 text-zinc-900 focus:bg-black/5'
                }`}
                required
              />
            </div>

            <div className="relative group">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                theme === 'tun' ? 'text-white/20 group-focus-within:text-primary' : 'text-zinc-400 group-focus-within:text-primary'
              }`} />
              <input
                type="password"
                placeholder="Parol"
                className={`w-full py-4 pl-12 pr-4 rounded-2xl border bg-transparent outline-none transition-all text-sm ${
                  theme === 'tun' 
                    ? 'border-white/10 focus:border-primary/50 text-white focus:bg-white/5' 
                    : 'border-black/10 focus:border-primary/50 text-zinc-900 focus:bg-black/5'
                }`}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20"
            >
              {isLogin ? "Kirish" : "Ro'yxatdan o'tish"} <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Social Auth */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'tun' ? 'text-white/20' : 'text-zinc-400'}`}>
                Yoki davom eting
              </span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="flex gap-4">
              <button className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                theme === 'tun' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-zinc-900'
              }`}>
                <Github className="w-5 h-5" /> <span className="text-xs font-bold">GitHub</span>
              </button>
              <button className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                theme === 'tun' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-zinc-900'
              }`}>
                <Chrome className="w-5 h-5" /> <span className="text-xs font-bold">Google</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthGateway;
