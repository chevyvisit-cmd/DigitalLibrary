'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../layout/ThemeProvider';

interface AuthGatewayProps {
  onAuthenticated: () => void;
}

const AuthGateway: React.FC<AuthGatewayProps> = ({ onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated authentication logic
    onAuthenticated();
  };

  // Raw SVG for Google Logo
  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-3.3 3.28-8.17 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  // Raw SVG for GitHub Logo
  const GithubIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );

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
        <div className="absolute top-0 left-0 right-0 py-1 bg-primary text-white text-[8px] font-bold text-center tracking-[0.2em] uppercase">
          System Update v2.3-Ultra Live
        </div>
        
        {/* Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <h2 className={`text-3xl font-black tracking-tighter ${theme === 'tun' ? 'text-white' : 'text-zinc-950'}`}>
              {isLogin ? "Xush Kelibsiz!" : "Ro'yxatdan O'tish"}
            </h2>
            <p className={`text-sm ${theme === 'tun' ? 'text-white/40' : 'text-zinc-500'}`}>
              Raqamli bilimlar xazinasi sizni kutmoqda.
            </p>
          </div>

          {/* Tab Switcher */}
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

          {/* Main Auth Form */}
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

          {/* Social Auth Separator */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`h-[1px] flex-1 ${theme === 'tun' ? 'bg-white/10' : 'bg-black/10'}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'tun' ? 'text-white/20' : 'text-zinc-400'}`}>
                Yoki davom eting
              </span>
              <div className={`h-[1px] flex-1 ${theme === 'tun' ? 'bg-white/10' : 'bg-black/10'}`} />
            </div>

            {/* Social Buttons with Raw Inline SVGs */}
            <div className="flex gap-4">
              <button className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                theme === 'tun' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-zinc-900'
              }`}>
                <GithubIcon /> <span className="text-xs font-bold">GitHub</span>
              </button>
              <button className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                theme === 'tun' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-zinc-900'
              }`}>
                <GoogleIcon /> <span className="text-xs font-bold">Google</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthGateway;
