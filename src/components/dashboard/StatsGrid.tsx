'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, Flame } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, progress }: { 
  label: string, 
  value: string, 
  icon: any, 
  color: string,
  progress?: number 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 sm:p-6 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer overflow-hidden"
    >
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div className={`p-3 sm:p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors shrink-0`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white/40 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider truncate">{label}</p>
          <h3 className="text-lg sm:text-2xl font-bold text-white mt-0.5 sm:mt-1 truncate">{value}</h3>
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="relative w-14 h-14">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={150.7}
              initial={{ strokeDashoffset: 150.7 }}
              animate={{ strokeDashoffset: 150.7 - (150.7 * progress) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={color}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80">
            {progress}%
          </div>
        </div>
      )}
    </motion.div>
  );
};

const StatsGrid = () => {
  const [data, setData] = useState({
    completedBooks: 0,
    readingHours: 0,
    streak: 0,
    activeBooks: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Books Finished', value: data.completedBooks.toString(), icon: BookOpen, color: 'text-primary', progress: 100 },
    { label: 'Reading Hours', value: `${data.readingHours}h`, icon: Clock, color: 'text-secondary', progress: 100 },
    { label: 'Current Streak', value: `${data.streak} Days`, icon: Flame, color: 'text-orange-400', progress: 100 },
    { label: 'Active Books', value: data.activeBooks.toString(), icon: Award, color: 'text-accent', progress: 100 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
