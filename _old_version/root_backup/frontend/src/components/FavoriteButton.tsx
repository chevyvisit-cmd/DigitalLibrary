import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToastStore } from '../store/useToastStore';
import { cn } from '../lib/utils';

interface FavoriteButtonProps {
  bookId: number;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ bookId, className }) => {
  const { favorites, toggleFavorite } = useStore();
  const { addToast } = useToastStore();
  const [isExploding, setIsExploding] = useState(false);
  
  const isFavorite = favorites.includes(bookId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(bookId);
    if (!isFavorite) {
      setIsExploding(true);
      addToast("Sevimlilar ro'yxatiga qo'shildi!", 'success');
      setTimeout(() => setIsExploding(false), 1000);
    } else {
      addToast("Sevimlilardan olib tashlandi.", 'info');
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={cn("relative p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:scale-110 transition-transform", className)}
    >
      <motion.div
        animate={isFavorite ? { scale: [1, 1.5, 1], color: '#f43f5e' } : { scale: 1 }}
        className={cn(isFavorite ? "text-rose-500 fill-rose-500" : "text-white")}
      >
        <Heart size={20} />
      </motion.div>

      <AnimatePresence>
        {isExploding && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  x: Math.cos((i * 60) * Math.PI / 180) * 40,
                  y: Math.sin((i * 60) * Math.PI / 180) * 40 
                }}
                className="absolute w-2 h-2 bg-rose-500 rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default FavoriteButton;
