import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { X, Save, Check } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { settings, updateSettings, isSettingsModalOpen, setIsSettingsModalOpen } = useBlog();

  const [blogTitle, setBlogTitle] = useState(settings.blogTitle);
  const [blogDescription, setBlogDescription] = useState(settings.blogDescription);
  const [authorName, setAuthorName] = useState(settings.authorName);
  const [authorRole, setAuthorRole] = useState(settings.authorRole);
  const [authorBio, setAuthorBio] = useState(settings.authorBio);
  const [saved, setSaved] = useState(false);

  if (!isSettingsModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      blogTitle: blogTitle.trim(),
      blogDescription: blogDescription.trim(),
      authorName: authorName.trim(),
      authorRole: authorRole.trim(),
      authorBio: authorBio.trim(),
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsSettingsModalOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-base font-bold text-slate-900">Blog & Author Settings</h3>
            <p className="text-xs text-slate-500">Configure your Blogger clone identity</p>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Blog Title
            </label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Blog Tagline / Description
            </label>
            <textarea
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Author Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Author Biography
            </label>
            <textarea
              value={authorBio}
              onChange={(e) => setAuthorBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722] resize-y"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saved ? 'Saved!' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
