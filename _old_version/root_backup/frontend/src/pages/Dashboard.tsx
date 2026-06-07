import React from 'react';
import HeroSection from '../components/dashboard/HeroSection';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import BookCatalogSection from '../components/dashboard/BookCatalogSection';
import ReaderPreview from '../components/dashboard/ReaderPreview';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 pt-24 lg:pt-32 font-sans text-slate-200">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* Top Row */}
        <div className="lg:col-span-8 h-[500px]">
          <HeroSection />
        </div>
        
        <div className="lg:col-span-4 h-[500px]">
          <AnalyticsSection />
        </div>

        {/* Bottom Row */}
        <div className="lg:col-span-7 h-[600px]">
          <BookCatalogSection />
        </div>

        <div className="lg:col-span-5 h-[600px]">
          <ReaderPreview />
        </div>

      </div>
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20 overflow-hidden">
         <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-500/5 blur-[150px] rounded-full" />
         <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-500/5 blur-[200px] rounded-full" />
      </div>
    </div>
  );
};

export default Dashboard;
