import React from 'react';
import { useBlog } from '../context/BlogContext';
import { Share2, PenSquare, LayoutDashboard } from 'lucide-react';

export const Footer: React.FC = () => {
  const { goToHome, goToEditor, goToStudio, setIsSocialModalOpen, setSelectedCategory } = useBlog();

  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#FF5722] text-white flex items-center justify-center font-black text-xs">
                B
              </span>
              <span className="font-bold text-base text-slate-900">Blogger Clone</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              A modern, high-fidelity blogging platform inspired by Blogger.com. Empowering developers, writers, and thinkers to craft and share ideas without friction.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span>#rehancodingwithai</span>
              <span className="mx-2">·</span>
              <span>#codingwithai</span>
            </div>
          </div>

          {/* Editorial Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Categories</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Architecture');
                    goToHome();
                  }}
                  className="hover:text-[#FF5722] transition-colors cursor-pointer"
                >
                  Architecture & Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Web Development');
                    goToHome();
                  }}
                  className="hover:text-[#FF5722] transition-colors cursor-pointer"
                >
                  Web Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Productivity');
                    goToHome();
                  }}
                  className="hover:text-[#FF5722] transition-colors cursor-pointer"
                >
                  Productivity & Focus
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Travel & Thoughts');
                    goToHome();
                  }}
                  className="hover:text-[#FF5722] transition-colors cursor-pointer"
                >
                  Travel & Thoughts
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Studio & Tools</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => goToStudio()}
                  className="hover:text-[#FF5722] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Blogger Studio Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToEditor()}
                  className="hover:text-[#FF5722] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>Write New Story</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSocialModalOpen(true)}
                  className="hover:text-[#FF5722] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Social Caption</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Blogger Clone Platform. Inspired by Blogger.com.</p>
          <p className="flex items-center gap-2">
            <span>Built with React & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
