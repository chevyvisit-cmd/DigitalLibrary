'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

interface HeroProps {
  featuredBook?: {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    rating: number;
  };
}

const Hero: React.FC<HeroProps> = ({ featuredBook }) => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const badgeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const headingWords = ["Bilimingizni", "Mukammal", "Va", "Zamonaviy", "Shaklda", "Boyiting."];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-32 md:pt-40 pb-20 px-6 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 space-y-8"
        >
          {/* Top Badge */}
          <motion.div 
            variants={badgeVariants}
            initial="initial"
            animate={["animate", "pulse"]}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${
              theme === 'tun' 
                ? 'bg-primary/10 border-primary/20 text-primary' 
                : 'bg-emerald-50 border-emerald-100 text-emerald-700'
            } text-xs font-bold uppercase tracking-widest`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            ✨ XUSH KELIBSIZ, KITOBXON
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-[#22c55e] flex flex-wrap gap-x-[0.3em]">
              {headingWords.map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  variants={itemVariants}
                  className="inline-block whitespace-nowrap"
                >
                  {word.split('').map((char, charIndex) => (
                    <span 
                      key={charIndex} 
                      className="animate-rgb-text hover:z-10 relative inline-block origin-bottom"
                    >
                      {char}
                    </span>
                  ))}
                </motion.span>
              ))}
            </h1>
            <p className="text-[10px] text-[#22c55e]/30 font-mono">v2.2-stable</p>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--foreground)]/60 leading-relaxed max-w-xl"
            >
              To{"'"}xtagan joyingizdan davom eting yoki raqamli bilimlar xazinamizdan yangi ufqlarni kashf eting.
            </motion.p>
          </div>

          {/* Interactive CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link href="/books" className="group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                Kutubxonani ko{"'"}rish <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full sm:w-auto px-8 py-4 font-bold rounded-2xl border transition-all flex items-center justify-center gap-3 backdrop-blur-md ${
                theme === 'tun'
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-black/5 border-black/10 text-zinc-900 hover:bg-black/10'
              }`}
            >
              <Play className="w-5 h-5 fill-current" /> Qo{"'"}llanmani ko{"'"}rish
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: Featured Book Card */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 w-[380px] mx-auto group">
            {/* Continuous soft-glowing border animation */}
            <div className={`absolute -inset-1 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse ${
              theme === 'tun' ? 'bg-primary' : 'bg-emerald-400'
            }`} />
            
            <div className={`relative overflow-hidden rounded-[2.2rem] border transition-transform duration-500 group-hover:scale-[1.02] ${
              theme === 'tun' ? 'bg-neutral-900 border-white/10' : 'bg-white border-black/5 shadow-2xl'
            }`}>
              <div className="relative aspect-[3/4.2] overflow-hidden">
                <img
                  src={featuredBook?.coverImage || "/public/uploads/odam_bolish_qiyin.jpg"}
                  alt={featuredBook?.title || "Odam bo'lish qiyin"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Book Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                      Kun kitobi
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-white">4.9</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {featuredBook?.title || "Odam bo'lish qiyin"}
                  </h3>
                  <p className="text-white/60 font-medium">
                    {featuredBook?.author || "Tohir Malik"}
                  </p>
                </div>
              </div>
            </div>

            {/* Background elements for depth */}
            <div className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-3xl opacity-20 ${
              theme === 'tun' ? 'bg-primary' : 'bg-emerald-400'
            }`} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
