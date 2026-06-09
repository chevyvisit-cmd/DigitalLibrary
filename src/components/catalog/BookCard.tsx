import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Star, Clock, Heart } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: {
    id: string;
    name: string;
  };
  rating: number;
  pages: number;
}

const BookCard = ({ book }: { book: Book }) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Disable rotation on touch devices for better UX
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isTouch ? ["0deg", "0deg"] : ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isTouch ? ["0deg", "0deg"] : ["-17.5deg", "17.5deg"]);

  const checkFavorite = async () => {
    try {
      const response = await axios.get('/api/favorites');
      const favorites = response.data;
      setIsFavorite(favorites.some((f: { id: string }) => f.id === book.id));
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  useEffect(() => {
    if (session) {
      checkFavorite();
    }
  }, [session, book.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) return;

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await axios.delete(`/api/favorites?bookId=${book.id}`);
        setIsFavorite(false);
      } else {
        await axios.post('/api/favorites', { bookId: book.id });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoadingFavorite(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[450px] w-full rounded-2xl bg-white/5 border border-white/10 group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(34, 197, 94, 0.2)]"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 flex flex-col"
      >
        <div className="relative h-2/3 w-full overflow-hidden rounded-xl shadow-2xl">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Link href={`/reader/${book.id}`}>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-primary p-4 rounded-full shadow-[0_0_20px_rgba(34, 197, 94, 0.5)]"
              >
                <Play className="w-6 h-6 text-white fill-white" />
              </motion.button>
            </Link>
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            <button 
              onClick={toggleFavorite}
              disabled={loadingFavorite}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                isFavorite ? 'bg-primary/80 text-white' : 'bg-black/40 text-white/60 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-[10px] font-bold text-white">{book.rating}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{book.category.name}</span>
          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-white/40">{book.author}</p>
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/40">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">{book.pages} pages</span>
            </div>
            <Link href={`/reader/${book.id}`} className="text-xs font-bold text-white group-hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30">
              READ NOW
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
    </motion.div>
  );
};

export default BookCard;
