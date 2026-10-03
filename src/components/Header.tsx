import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { PenSquare, LayoutDashboard, Share2, Menu, X, Settings as SettingsIcon } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentView, goToHome, goToEditor, goToStudio, setIsSocialModalOpen, setIsSettingsModalOpen, setSelectedCategory } = useBlog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (cat?: string) => {
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('all');
    }
    goToHome();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Text Element Wordmark */}
        <button
          onClick={() => handleNav()}
          className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-7 h-7 rounded-lg bg-[#FF5722] text-white flex items-center justify-center font-black text-sm">
            B
          </span>
          <span className="font-sans-ui">Blogger</span>
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNav()}
            className={`transition-colors hover:text-slate-900 ${
              currentView === 'home' ? 'text-[#FF5722] font-semibold' : ''
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => handleNav('Architecture')}
            className="hover:text-slate-900 transition-colors"
          >
            Architecture
          </button>
          <button
            onClick={() => handleNav('Web Development')}
            className="hover:text-slate-900 transition-colors"
          >
            Engineering
          </button>
          <button
            onClick={() => handleNav('Productivity')}
            className="hover:text-slate-900 transition-colors"
          >
            Workflow
          </button>
          <button
            onClick={() => goToStudio()}
            className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 ${
              currentView === 'studio' ? 'text-[#FF5722] font-semibold' : ''
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Studio</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSocialModalOpen(true)}
            title="Share Blogger Clone Caption"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Share Clone</span>
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            title="Blog Settings & Profile"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => goToEditor()}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#FF5722] hover:bg-[#E64A19] rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            <PenSquare className="w-4 h-4" />
            <span>New Post</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 text-sm shadow-lg">
          <button
            onClick={() => handleNav()}
            className="block w-full text-left py-2 px-3 rounded-md hover:bg-slate-100 text-slate-800 font-medium"
          >
            All Stories
          </button>
          <button
            onClick={() => handleNav('Architecture')}
            className="block w-full text-left py-2 px-3 rounded-md hover:bg-slate-100 text-slate-700"
          >
            Architecture
          </button>
          <button
            onClick={() => handleNav('Web Development')}
            className="block w-full text-left py-2 px-3 rounded-md hover:bg-slate-100 text-slate-700"
          >
            Web Engineering
          </button>
          <button
            onClick={() => handleNav('Productivity')}
            className="block w-full text-left py-2 px-3 rounded-md hover:bg-slate-100 text-slate-700"
          >
            Workflow & Focus
          </button>
          <button
            onClick={() => {
              goToStudio();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 px-3 rounded-md hover:bg-slate-100 text-slate-800 font-medium"
          >
            <LayoutDashboard className="w-4 h-4 text-[#FF5722]" />
            <span>Blogger Studio Dashboard</span>
          </button>
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setIsSocialModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Caption</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
