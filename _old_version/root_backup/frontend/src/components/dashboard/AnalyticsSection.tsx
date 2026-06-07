import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, CheckCircle, Heart, User } from 'lucide-react';

const AnalyticsSection: React.FC = () => {
  const stats = [
    { label: 'Now reading', value: '3', icon: <BookMarked className="text-blue-500" />, color: 'blue' },
    { label: 'Completed', value: '12', icon: <CheckCircle className="text-green-500" />, color: 'green' },
    { label: 'Sevimli kitoblar', value: '24', icon: <Heart className="text-red-500" />, color: 'red' },
    { label: 'Mening Profilim', value: '92%', icon: <User className="text-purple-500" />, color: 'purple' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-dark p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                {stat.icon}
              </div>
              <div className="relative w-10 h-10">
                 {/* Simplified circular progress arc */}
                 <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="stroke-white/10"
                      strokeDasharray="100, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="3"
                    />
                    <path
                      className={
                        stat.color === 'blue' ? 'stroke-blue-500' :
                        stat.color === 'green' ? 'stroke-green-500' :
                        stat.color === 'red' ? 'stroke-red-500' :
                        'stroke-purple-500'
                      }
                      strokeDasharray="75, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                 </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* 3D Bookshelf Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-dark rounded-3xl p-6 border border-white/5 flex-grow flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Mening kitoblarim</h3>
          <span className="text-xs text-orange-500 font-bold hover:underline cursor-pointer">Hammasi</span>
        </div>

        <div className="relative h-32 w-full mt-auto mb-4 bg-orange-900/20 rounded-xl overflow-hidden border-b-4 border-orange-900/40">
           {/* Bookshelf Simulation */}
           <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10" />
           <div className="flex items-end justify-around h-full px-4 pb-1">
              {[
                { color: 'bg-blue-600', height: 'h-24' },
                { color: 'bg-red-700', height: 'h-28' },
                { color: 'bg-green-600', height: 'h-20' },
                { color: 'bg-yellow-600', height: 'h-26' },
                { color: 'bg-purple-700', height: 'h-24' },
                { color: 'bg-indigo-600', height: 'h-22' },
                { color: 'bg-emerald-600', height: 'h-26' },
                { color: 'bg-rose-600', height: 'h-24' },
              ].map((book, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.6 + (i * 0.05) }}
                  className={`${book.color} ${book.height} w-4 rounded-t-sm shadow-lg transform origin-bottom hover:scale-x-110 hover:-translate-y-1 transition-transform cursor-pointer border-l border-white/10`}
                />
              ))}
           </div>
        </div>
        <div className="text-center text-[10px] text-slate-500 font-bold tracking-widest uppercase">
          Virtual shelf (Beta)
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsSection;
