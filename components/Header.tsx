import React from 'react';
import { Camera } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 flex flex-col items-center justify-center space-y-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
              Photographer
            </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-slate-400 font-medium tracking-wide">
        <span className="uppercase tracking-widest hover:text-indigo-400 transition-colors cursor-default">Photographer</span>
        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
        <span className="uppercase tracking-widest hover:text-indigo-400 transition-colors cursor-default">Photographe</span>
        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
        <span className="uppercase tracking-widest hover:text-indigo-400 transition-colors cursor-default">Фотограф</span>
      </div>
    </header>
  );
};

export default Header;
