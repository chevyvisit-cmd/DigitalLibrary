import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Mail, MessageCircle, Share2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
              <BookOpen size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-orange-500">Digital</span>Library
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed">
            Bizning maqsadimiz — bilimga intiluvchi har bir inson uchun eng sara va zamonaviy kitoblarni taqdim etishdir.
          </p>
          <div className="flex gap-4">
            {[Globe, Mail, MessageCircle, Share2].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, color: '#f97316' }}
                className="p-2 bg-slate-900 rounded-lg text-slate-400 transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Foydali havolalar</h4>
          <ul className="space-y-4">
            {['Bosh sahifa', 'Kitoblar katalogi', 'Yangiliklar', 'Tadbir va anjumanlar', 'Biz haqimizda'].map((item) => (
              <li key={item}>
                <Link to="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Yordam</h4>
          <ul className="space-y-4">
            {['Foydalanish shartlari', 'Maxfiylik siyosati', 'Bog\'lanish', 'Savol va javoblar'].map((item) => (
              <li key={item}>
                <Link to="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Obuna bo'ling</h4>
          <p className="text-slate-400 mb-6">Yangi kitoblar va tadbirlardan birinchilardan bo'lib xabardor bo'ling.</p>
          <form className="relative">
            <input
              type="email"
              placeholder="Emailingiz..."
              className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:outline-none focus:border-orange-500 transition-colors pr-14"
            />
            <button className="absolute right-2 top-2 bottom-2 px-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-10 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Digital Library. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
};

export default Footer;
