import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-12">
      <button
        onClick={() => onCategoryChange('')}
        className={cn(
          "relative px-6 py-2.5 text-sm font-bold rounded-full transition-colors",
          activeCategory === '' ? "text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
        )}
      >
        {activeCategory === '' && (
          <motion.div
            layoutId="active-cat"
            className="absolute inset-0 bg-orange-500 rounded-full z-0"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">Barchasi</span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={cn(
            "relative px-6 py-2.5 text-sm font-bold rounded-full transition-colors",
            activeCategory === cat ? "text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          )}
        >
          {activeCategory === cat && (
            <motion.div
              layoutId="active-cat"
              className="absolute inset-0 bg-orange-500 rounded-full z-0"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
