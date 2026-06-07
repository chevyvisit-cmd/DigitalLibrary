import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import BookCard from '../components/BookCard';
import CategoryFilter from '../components/CategoryFilter';
import SkeletonLoader from '../components/SkeletonLoader';
import QuickViewModal from '../components/QuickViewModal';
import BookReader from '../components/BookReader';
import { Book } from '../types';

const API_URL = 'http://127.0.0.1:3000';

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  const categories = ['Programming', 'Personal Development', 'Business', 'Finance', 'Psychology', 'History'];

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/book`, {
          params: { search, category }
        });
        const enhanced = res.data.map((b: Book) => ({
          ...b,
          rating: 4.0 + Math.random(),
          isNew: b.year === 2024 || b.year === 2025
        }));
        setBooks(enhanced);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchBooks, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

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
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Kutubxona katalogi</h1>
          <p className="text-slate-500">O'zingizga yoqqan kitobni qidiring va mutolaa qiling</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Kitob yoki muallif..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-orange-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onClick={() => {
                  setSelectedBook(book);
                  setIsModalOpen(true);
                }} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-slate-500">Hech qanday kitob topilmadi.</p>
            </div>
          )}
        </div>
      )}

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

export default Books;
