'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Settings, ChevronLeft, ChevronRight, Bookmark, Share2, Type } from 'lucide-react';
import { useReadingStore } from '@/hooks/useReadingStore';
import axios from 'axios';

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface ReaderInterfaceProps {
  book: {
    id: string;
    title: string;
    author: string;
    chapters: Chapter[];
  };
}

const ReaderInterface = ({ book }: ReaderInterfaceProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'contents' | 'bookmarks'>('contents');
  const [fontSize, setFontSize] = useState(18);
  const [searchQuery, setSearchQuery] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const { currentChapterId, progress: readingProgress, updateProgress, syncProgress } = useReadingStore();
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`/api/bookmarks?bookId=${book.id}`);
      setBookmarks(response.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [book.id]);

  const handleDeleteBookmark = async (id: string) => {
    try {
      await axios.delete(`/api/bookmarks?id=${id}`);
      fetchBookmarks();
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const handleAddBookmark = async () => {
    if (!currentChapterId) return;
    
    try {
      await axios.post('/api/bookmarks', {
        bookId: book.id,
        chapterId: currentChapterId,
        percentage: readingProgress,
      });
      fetchBookmarks();
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  const handleChapterClick = (chapterId: string) => {
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToNextChapter = () => {
    const currentIndex = book.chapters.findIndex(c => c.id === currentChapterId);
    if (currentIndex < book.chapters.length - 1) {
      handleChapterClick(book.chapters[currentIndex + 1].id);
    }
  };

  const goToPrevChapter = () => {
    const currentIndex = book.chapters.findIndex(c => c.id === currentChapterId);
    if (currentIndex > 0) {
      handleChapterClick(book.chapters[currentIndex - 1].id);
    }
  };

  const handleScroll = () => {
    if (!contentRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const progress = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
    
    // Find current chapter in view
    const chapters = book.chapters;
    let activeChapter = chapters[0]?.id;
    
    for (const chapter of chapters) {
      const element = document.getElementById(chapter.id);
      if (element && element.offsetTop <= scrollTop + 100) {
        activeChapter = chapter.id;
      }
    }

    updateProgress(book.id, progress, activeChapter);
    
    // Sync to DB if scroll hits 100% or every 10%
    if (progress === 100 || progress % 10 === 0) {
      syncProgress(book.id, progress, activeChapter);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden relative">
      {/* Sidebar - Mobile Overlay & Desktop Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed lg:relative inset-y-0 left-0 w-full max-w-[300px] border-r border-white/10 bg-[#0a0a0a] flex flex-col z-50 lg:z-40"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Reader</h2>
                  <button onClick={() => setSidebarOpen(false)} className="text-white/40 hover:text-white p-2 bg-white/5 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex p-1 bg-white/5 rounded-lg mb-6">
                  <button 
                    onClick={() => setActiveTab('contents')}
                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-md transition-all ${activeTab === 'contents' ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    CONTENTS
                  </button>
                  <button 
                    onClick={() => setActiveTab('bookmarks')}
                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-md transition-all ${activeTab === 'bookmarks' ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    BOOKMARKS
                  </button>
                </div>

                {activeTab === 'contents' && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search in book..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 text-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === 'contents' ? (
                  book.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        handleChapterClick(chapter.id);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                        currentChapterId === chapter.id
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-white/60 hover:bg-white/5'
                      }`}
                    >
                      {chapter.title}
                    </button>
                  ))
                ) : (
                  <div className="space-y-4">
                    {bookmarks.length === 0 ? (
                      <p className="text-sm text-white/20 text-center py-8 italic">No bookmarks yet.</p>
                    ) : (
                      bookmarks.map((bm) => (
                        <div key={bm.id} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2 group">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-primary uppercase">{bm.chapter.title}</span>
                            <button 
                              onClick={() => handleDeleteBookmark(bm.id)}
                              className="text-white/20 hover:text-red-400 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-xs text-white/60 line-clamp-2 italic">&quot;{bm.textSnippet || 'No snippet'}&quot;</p>
                          <button 
                            onClick={() => {
                              handleChapterClick(bm.chapterId);
                              if (window.innerWidth < 1024) setSidebarOpen(false);
                            }}
                            className="text-[10px] font-bold text-white/40 hover:text-white transition-colors underline"
                          >
                            GO TO PAGE
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  <span>Progress</span>
                  <span>{readingProgress}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary shadow-[0_0_10px_rgba(255,107,0,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${readingProgress}%` }}
                  />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Reader Area */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Reader Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-8 bg-[#050505]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className={`p-2 text-white/60 hover:text-white bg-white/5 rounded-lg border border-white/10 transition-colors ${sidebarOpen ? 'hidden lg:block' : 'block'}`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-xs md:text-sm font-bold text-white truncate">{book.title}</h1>
              <p className="text-[8px] md:text-[10px] text-white/40 uppercase font-bold tracking-tighter truncate">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6 shrink-0">
            <div className="hidden sm:flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
              <button onClick={() => setFontSize(Math.max(12, fontSize - 1))} className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                <Type className="w-4 h-4 scale-75" />
              </button>
              <span className="text-xs font-bold text-white w-6 text-center">{fontSize}</span>
              <button onClick={() => setFontSize(Math.min(32, fontSize + 1))} className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                <Type className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-1 md:gap-4">
              <button 
                onClick={handleAddBookmark}
                className="p-2 text-white/60 hover:text-white transition-colors"
                title="Bookmark"
              >
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/60 hover:text-white transition-colors hidden md:block"><Share2 className="w-5 h-5" /></button>
              <button className="p-2 text-white/60 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto paper-texture p-6 md:p-12 lg:p-24 scroll-smooth"
        >
          <div className="max-w-2xl mx-auto space-y-12 md:space-y-16">
            {book.chapters.map((chapter) => (
              <section key={chapter.id} id={chapter.id} className="prose prose-lg max-w-none">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 md:mb-8 text-[#1a120b] border-b-2 border-primary/20 pb-4">
                  {chapter.title}
                </h2>
                <div 
                  style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
                  className="font-serif text-[#2c1e12] space-y-6 text-justify"
                  dangerouslySetInnerHTML={{ __html: chapter.content }}
                />
              </section>
            ))}
          </div>
        </div>

        {/* Floating Nav */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 glass-card px-4 md:px-6 py-2.5 md:py-3 border-white/10 shadow-2xl z-30">
          <button 
            onClick={goToPrevChapter}
            className="flex items-center gap-2 text-xs md:text-sm font-bold text-white/60 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Previous</span>
          </button>
          <div className="w-[1px] h-4 bg-white/10"></div>
          <button 
            onClick={goToNextChapter}
            className="flex items-center gap-2 text-xs md:text-sm font-bold text-white/60 hover:text-primary transition-colors"
          >
            <span className="hidden sm:inline">Next</span> <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReaderInterface;
