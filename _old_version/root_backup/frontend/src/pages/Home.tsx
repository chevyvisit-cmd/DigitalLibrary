import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import SkeletonLoader from '../components/SkeletonLoader';
import QuickViewModal from '../components/QuickViewModal';
import BookReader from '../components/BookReader';
import { Book } from '../types';

const API_URL = 'http://127.0.0.1:3000';

const Home: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_URL}/book`);
        // Add some premium flags for demo
        const enhancedBooks = res.data.map((b: Book, i: number) => ({
          ...b,
          isNew: i < 2,
          isTop: i % 3 === 0,
          rating: 4.5 + Math.random() * 0.5
        }));
        setFeaturedBooks(enhancedBooks.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleRead = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(false);
    setIsReaderOpen(true);
  };

  const handleBorrow = async (bookId: number) => {
    try {
      await axios.post(`${API_URL}/borrow`, { userId: 1, bookId });
      alert('Kitob muvaffaqiyatli olindi!');
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.response?.data || 'Xatolik yuz berdi');
    }
  };

  return (
    <div>
      <Hero />
      
      <section className="container mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Tavsiya etilgan kitoblar</h2>
            <p className="text-slate-500 dark:text-slate-400">Haftaning eng mashhur va yangi kitoblari ro'yxati</p>
          </div>
          <button className="hidden md:block px-6 py-2 text-orange-500 font-bold hover:bg-orange-50 rounded-xl transition-colors">
            Hammasini ko'rish →
          </button>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onClick={() => handleBookClick(book)} 
              />
            ))}
          </div>
        )}
      </section>

      <QuickViewModal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onBorrow={handleBorrow}
        onRead={handleRead}
      />

      <BookReader
        book={selectedBook}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />
    </div>
  );
};

export default Home;
