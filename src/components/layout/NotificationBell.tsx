'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: string;
  createdAt: string;
}

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
    
    // Close on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-header-text hover:text-header-text-hover transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[var(--background)]"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-80 glass-card border border-glass-border shadow-2xl overflow-hidden z-[60]"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold text-[var(--foreground)]">Bildirishnomalar</h3>
              <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full font-bold uppercase tracking-wider">
                {unreadCount} yangi
              </span>
            </div>

            <div className="max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className="p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-[var(--foreground)]/90">{notif.title}</h4>
                        <p className="text-xs text-[var(--foreground)]/40 mt-1 leading-relaxed">{notif.message}</p>
                      </div>
                      <button 
                        onClick={() => markAsRead(notif.id)}
                        className="p-1.5 bg-white/5 rounded-lg text-[var(--foreground)]/20 hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100"
                        title="O'qilgan deb belgilash"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-[var(--foreground)]/20">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6 text-[var(--foreground)]/20" />
                  </div>
                  <p className="text-sm text-[var(--foreground)]/40 font-medium">Hozircha bildirishnomalar yo'q</p>
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <button className="w-full p-3 text-[11px] font-bold text-[var(--foreground)]/40 hover:text-[var(--foreground)] transition-colors uppercase tracking-widest border-t border-white/5 hover:bg-white/5">
                Barchasini ko'rish
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
