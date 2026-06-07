import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User as UserIcon, Book as BookIcon, RotateCcw, Check, Heart, Settings } from 'lucide-react';
import ProfileSettings from '../components/ProfileSettings';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { Book } from '../types';

const API_URL = 'http://127.0.0.1:3000';

const Profile: React.FC = () => {
  const { user } = useStore();
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'books' | 'settings'>('books');

  const userId = 1;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const booksRes = await axios.get(`${API_URL}/users/${userId}/books`);
        setBorrowedBooks(booksRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleReturn = async (bookId: number) => {
    try {
      const borrowsRes = await axios.get(`${API_URL}/borrow`);
      const borrowRecord = borrowsRes.data.find((b: any) => b.userId == userId && b.bookId == bookId);
      
      if (borrowRecord) {
        await axios.delete(`${API_URL}/borrow/${borrowRecord.id}`);
        setBorrowedBooks(borrowedBooks.filter(b => b.id !== bookId));
        alert('Kitob muvaffaqiyatli qaytarildi!');
      }
    } catch (err) {
      console.error(err);
      alert('Xatolik yuz berdi');
    }
  };

  if (loading) return <div className="container mx-auto px-6 py-20 text-center text-xl">Yuklanmoqda...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Profile Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
            <BookIcon size={32} />
          </div>
          <div>
            <span className="block text-3xl font-bold">{borrowedBooks.length}</span>
            <span className="text-sm text-slate-500 font-medium">Hozir o'qilmoqda</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
            <Check size={32} />
          </div>
          <div>
            <span className="block text-3xl font-bold">24</span>
            <span className="text-sm text-slate-500 font-medium">Tugatilgan</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white">
            <Heart size={32} />
          </div>
          <div>
            <span className="block text-3xl font-bold">15</span>
            <span className="text-sm text-slate-500 font-medium">Sevimli kitoblar</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-4">
          <button 
            onClick={() => setActiveTab('books')}
            className={cn(
              "w-full px-6 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all",
              activeTab === 'books' ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <BookIcon size={20} /> Mening kitoblarim
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full px-6 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all",
              activeTab === 'settings' ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <Settings size={20} /> Sozlamalar
          </button>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'books' ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <BookIcon className="text-orange-500" /> Mening kitoblarim
              </h3>

              <div className="space-y-4">
                {borrowedBooks.length > 0 ? (
                  borrowedBooks.map((book) => (
                    <div 
                      key={book.id} 
                      className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-6">
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-16 h-20 object-cover rounded-xl shadow-md"
                        />
                        <div>
                          <h4 className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors">
                            {book.title}
                          </h4>
                          <p className="text-sm text-slate-500">{book.author}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleReturn(book.id)}
                        className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-orange-500 hover:text-white rounded-2xl transition-all"
                        title="Qaytarish"
                      >
                        <RotateCcw size={20} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800/30 rounded-[2rem] p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-slate-500 mb-6">Sizda hozircha olingan kitoblar yo'q.</p>
                    <button className="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20">
                      Kitob qidirish
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <ProfileSettings />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
