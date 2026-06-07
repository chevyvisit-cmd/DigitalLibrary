'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Phone, 
  Camera, 
  Save, 
  ArrowLeft, 
  Loader2, 
  Mail, 
  Flame, 
  Clock, 
  BookOpen, 
  Heart,
  Calendar,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';

interface UserProfile {
  name: string;
  email: string;
  image: string;
  phoneNumber: string;
  streakCount: number;
  totalHours: number;
  createdAt: string;
  _count: {
    favorites: number;
    bookmarks: number;
    progress: number;
  }
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (user) setUser({ ...user, image: response.data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await axios.put('/api/user/profile', {
        name: user.name,
        image: user.image,
        phoneNumber: user.phoneNumber,
      });
      // Optionally show a success toast here
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary selection:text-white pb-20">
      <Header />
      
      {/* Hero Section with Cover */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Animated Background Element */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"
        ></motion.div>
      </div>

      <main className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Overview */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 border-white/5 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-40 h-40 rounded-[2.5rem] p-1 bg-gradient-to-br from-primary to-accent overflow-hidden shadow-2xl">
                  <div className="w-full h-full rounded-[2.3rem] bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
                    {uploading ? (
                      <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    ) : user.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-white/10" />
                    )}
                  </div>
                </div>
                <label className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-xl border-4 border-[#0a0a0a]">
                  <Camera className="w-5 h-5" />
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              <h2 className="text-2xl font-black tracking-tight">{user.name || 'Foydalanuvchi'}</h2>
              <p className="text-white/40 text-sm mt-1">{user.email}</p>
              
              <div className="mt-8 w-full space-y-3">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-bold text-sm">Profil Sozlamalari</span>
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'security' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-sm">Xavfsizlik</span>
                </button>
                <div className="h-[1px] bg-white/5 my-2"></div>
                <button 
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-bold text-sm">Chiqish</span>
                </button>
              </div>
            </motion.div>

            {/* Stats Summary Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4 sm:p-6 border-white/5 grid grid-cols-2 gap-3 sm:gap-4"
            >
              <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/5 min-w-0 flex flex-col overflow-hidden">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mb-2 shrink-0" />
                <div className="text-lg sm:text-2xl font-black truncate">{user.streakCount}</div>
                <div className="text-[9px] sm:text-[10px] font-bold text-white/20 uppercase tracking-widest truncate">Kunlik Streak</div>
              </div>
              <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/5 min-w-0 flex flex-col overflow-hidden">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mb-2 shrink-0" />
                <div className="text-lg sm:text-2xl font-black truncate">{user.totalHours.toFixed(1)}</div>
                <div className="text-[9px] sm:text-[10px] font-bold text-white/20 uppercase tracking-widest truncate">O'qilgan Soat</div>
              </div>
              <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/5 min-w-0 flex flex-col overflow-hidden">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mb-2 shrink-0" />
                <div className="text-lg sm:text-2xl font-black truncate">{user._count.progress}</div>
                <div className="text-[9px] sm:text-[10px] font-bold text-white/20 uppercase tracking-widest truncate">Kitoblar</div>
              </div>
              <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/5 min-w-0 flex flex-col overflow-hidden">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mb-2 shrink-0" />
                <div className="text-lg sm:text-2xl font-black truncate">{user._count.favorites}</div>
                <div className="text-[9px] sm:text-[10px] font-bold text-white/20 uppercase tracking-widest truncate">Sevimlilar</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' ? (
                <motion.div
                  key="profile-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Personal Information Form */}
                  <div className="glass-card p-8 sm:p-10 border-white/5 shadow-2xl">
                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                      <div className="p-3 bg-primary/10 rounded-2xl">
                        <Settings className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black">Shaxsiy Ma'lumotlar</h3>
                        <p className="text-sm text-white/40">Profilingizni tahrirlang va yangilang</p>
                      </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="space-y-3">
                          <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-1">To'liq Ism</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                            <input
                              type="text"
                              value={user.name || ''}
                              onChange={(e) => setUser({...user, name: e.target.value})}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                              placeholder="Ismingizni kiriting"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-3">
                          <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-1">Telefon Raqam</label>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                            <input
                              type="text"
                              value={user.phoneNumber || ''}
                              onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                              placeholder="+998 90 123 45 67"
                            />
                          </div>
                        </div>

                        {/* Email (Read Only) */}
                        <div className="space-y-3 md:col-span-2 opacity-60">
                          <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-1">Email Manzil (O'zgartirib bo'lmaydi)</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
                            <input
                              type="email"
                              value={user.email}
                              disabled
                              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white/40 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-4">
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-10 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_20px_40px_rgba(255,107,0,0.3)] disabled:opacity-50"
                        >
                          {saving ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              Saqlash
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Joined Date Card */}
                  <div className="glass-card p-6 border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl text-white/40">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/20 uppercase tracking-widest">A'zolik sanasi</p>
                        <p className="text-sm font-bold">{new Date(user.createdAt).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <Link href="/" className="text-xs font-bold text-primary hover:underline underline-offset-4">
                      DASHBOARDGA QAYTISH
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="security-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-card p-10 border-white/5 flex flex-col items-center justify-center text-center min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Xavfsizlik Sozlamalari</h3>
                  <p className="text-white/40 max-w-sm">Parolni o'zgartirish va boshqa xavfsizlik sozlamalari tez orada qo'shiladi.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
