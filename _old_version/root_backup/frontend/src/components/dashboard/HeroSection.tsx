import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-3xl glass-dark h-full min-h-[400px] group"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] -z-10 group-hover:bg-orange-500/20 transition-colors" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10" />
      
      {/* Scroll Graphic Placeholder */}
      <div className="absolute -right-20 -top-20 w-80 h-80 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="animate-float">
          <path fill="#F97316" d="M44.7,-76.4C58.3,-69.2,70.1,-58.5,78.2,-45.4C86.3,-32.3,90.7,-16.2,88.9,-0.9C87.2,14.3,79.2,28.6,69.5,40.1C59.7,51.6,48.2,60.2,35.6,67.3C23,74.4,9.3,79.8,-4.2,87.1C-17.7,94.4,-31,103.6,-43.3,101.3C-55.6,99,-66.8,85.1,-75.4,70.9C-84,56.7,-89.9,42.2,-92.4,27.3C-94.9,12.4,-94,2.9,-90.1,-11.4C-86.2,-25.7,-79.3,-44.7,-67.2,-55.8C-55.1,-66.9,-37.8,-70.1,-22.4,-76.1C-7.1,-82.1,6.4,-90.9,22.4,-90.3C38.4,-89.7,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="p-10 flex flex-col justify-center h-full relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
            <Sparkles size={14} className="animate-pulse" />
            Digital Library
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl lg:text-6xl font-black mb-6 leading-[1.1] text-white"
        >
          Bilimlar xazinasi <br />
          <span className="text-orange-500 text-glow">sari yo'l</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-lg mb-10 max-w-xl leading-relaxed"
        >
          Minglab sara kitoblar, dunyo durdonalari va zamonaviy qo'llanmalar — barcha bitta platformada. O'qing, o'rganing va cho'qqilarni zabt eting.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 neon-orange">
            Hoziroq boshlash <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 glass hover:bg-white/10 text-white font-bold rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 border border-white/10">
            Katalog ko'rish <BookOpen size={20} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
