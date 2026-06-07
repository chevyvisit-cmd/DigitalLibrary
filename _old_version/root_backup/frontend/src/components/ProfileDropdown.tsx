import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useStore();

  const menuItems = [
    { label: 'Mening profilim', icon: <User size={18} />, path: '/profile' },
    { label: 'Sozlamalar', icon: <Settings size={18} />, path: '/profile' },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <div className="w-8 h-8 rounded-xl overflow-hidden bg-orange-500 text-white flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User size={16} />
          )}
        </div>
        <span className="hidden lg:block text-sm font-bold pr-2">{user?.fullname.split(' ')[0]}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-3 w-64 glass shadow-2xl rounded-3xl overflow-hidden z-50 p-2 border border-white/20"
            >
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                <p className="text-sm font-bold truncate">{user?.fullname}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>

              <div className="space-y-1">
                {menuItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-orange-500 hover:text-white rounded-2xl transition-all group"
                    >
                      <span className="text-slate-400 group-hover:text-white transition-colors">{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-sm font-medium text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl transition-all group">
                <LogOut size={18} /> Chiqish
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
