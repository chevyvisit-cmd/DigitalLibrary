'use client';

import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  'All Books',
  'Favorites',
  'Klassika',
  'Badiiy Adabiyot',
  'Shaxsiy Rivojlanish',
  'Manga'
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 py-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category 
              ? 'text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
        >
          {selectedCategory === category && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
