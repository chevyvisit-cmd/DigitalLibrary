import React from 'react';
import { motion } from 'framer-motion';
import { List, Bookmark, Search, Maximize2, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const ReaderPreview: React.FC = () => {
  return (
    <div className="flex h-full glass-dark rounded-3xl overflow-hidden border border-white/5 relative group">
      {/* Reader Sidebar */}
      <div className="w-20 lg:w-64 border-r border-white/5 flex flex-col bg-black/20">
        <div className="p-6 border-b border-white/5 flex items-center justify-center lg:justify-start gap-3">
           <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0">
              <Search size={16} />
           </div>
           <input 
             type="text" 
             placeholder="Search..." 
             className="hidden lg:block bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-600 w-full"
           />
        </div>
        
        <div className="flex-grow py-6 px-4 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
           <div className="flex flex-col gap-4">
              <div className="hidden lg:block text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Table of Contents</div>
              {[
                { title: 'Introduction', active: false },
                { title: 'The Fundamentals', active: true },
                { title: '1st Law: Make it Obvious', active: false },
                { title: '2nd Law: Make it Attractive', active: false },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    item.active ? 'bg-orange-500/10 text-orange-500' : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                   <List size={14} className="shrink-0" />
                   <span className="hidden lg:block text-xs font-bold truncate">{item.title}</span>
                </div>
              ))}
           </div>

           <div className="flex flex-col gap-4">
              <div className="hidden lg:block text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Bookmarks</div>
              {[
                { title: 'Page 42 - Habits', active: false },
                { title: 'Page 124 - Identity', active: false },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:bg-white/5 transition-colors cursor-pointer"
                >
                   <Bookmark size={14} className="shrink-0" />
                   <span className="hidden lg:block text-xs font-bold truncate">{item.title}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="p-4 border-t border-white/5 flex lg:flex-row flex-col items-center justify-between gap-4">
           <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Settings size={18} /></button>
           <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Maximize2 size={18} /></button>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-grow bg-[#FDFBF7] p-8 lg:p-12 overflow-y-auto custom-scrollbar relative">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-12">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chapter 1</div>
             <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-black transition-colors"><ChevronLeft size={20} /></button>
                <div className="text-[10px] font-bold text-slate-800">Page 12 of 320</div>
                <button className="text-slate-400 hover:text-black transition-colors"><ChevronRight size={20} /></button>
             </div>
          </div>

          <h1 className="text-3xl font-serif font-black text-slate-900 mb-8 leading-tight">The Surprising Power of Atomic Habits</h1>
          
          <div className="space-y-6 text-slate-800 font-serif leading-relaxed text-lg">
             <p>
               On July 1, 2001, my life changed forever. I was sitting in a classroom, listening to a lecture on biology, when I suddenly realized that my entire perspective on success was wrong.
             </p>
             <p>
               I had always believed that success required massive action. I thought that if you wanted to change your life, you needed to make a big move. You needed to quit your job, move to a new city, or start a new company.
             </p>
             <p>
               But that afternoon, I learned about the power of small improvements. I learned that if you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done.
             </p>
             <div className="p-8 my-10 bg-orange-50 border-l-4 border-orange-500 italic text-slate-700">
                "Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them."
             </div>
             <p>
               They seem to make little difference on any given day and yet the impact they deliver over the months and years can be enormous. It is only when looking back two, five, or perhaps ten years later that the value of good habits and the cost of bad ones becomes strikingly apparent.
             </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button for mobile toggle */}
      <div className="absolute top-4 right-4 lg:hidden">
         <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg neon-orange">
            <List size={20} />
         </button>
      </div>
    </div>
  );
};

export default ReaderPreview;
