import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-pulse">
          <div className="h-64 bg-slate-200 dark:bg-slate-800" />
          <div className="p-6">
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-full mb-4" />
            <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded-lg mb-2" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6" />
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
