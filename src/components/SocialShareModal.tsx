import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { X, Copy, Check, ExternalLink, Share2 } from 'lucide-react';

export const SocialShareModal: React.FC = () => {
  const { isSocialModalOpen, setIsSocialModalOpen } = useBlog();
  const [githubLink, setGithubLink] = useState('https://github.com/rehan-khan/blogger-clone');
  const [copied, setCopied] = useState(false);

  if (!isSocialModalOpen) return null;

  const currentCloneUrl = typeof window !== 'undefined' ? window.location.origin : 'https://blogger-clone.app';

  const captionText = `Just completed my Blogger.com Clone! Now anyone can create and publish blogs with ease. 🚀\n\n🔗 Clone Link: ${currentCloneUrl}\n💻 GitHub Repository: ${githubLink}\n\n#rehancodingwithai #codingwithai #webdevelopment #react #blogger`;

  const handleCopy = () => {
    navigator.clipboard.writeText(captionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(captionText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentCloneUrl)}&quote=${encodeURIComponent(captionText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(captionText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF5722] text-white flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Share Your Blogger Clone</h3>
              <p className="text-xs text-slate-500">Ready-to-post caption for LinkedIn, FB, IG & YouTube</p>
            </div>
          </div>
          <button
            onClick={() => setIsSocialModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              GitHub Repository URL (Optional)
            </label>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              placeholder="https://github.com/your-username/your-repo"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Generated Social Media Caption
              </label>
              <span className="text-[11px] font-mono-code text-slate-400">
                #rehancodingwithai #codingwithai
              </span>
            </div>
            <div className="relative">
              <textarea
                readOnly
                value={captionText}
                rows={6}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-sans text-slate-800 leading-relaxed focus:outline-none resize-none font-mono"
              />
            </div>
          </div>

          {/* Social One-Click Share Buttons */}
          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-2 uppercase tracking-wider">
              Share Directly or Copy
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={shareToLinkedIn}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </button>

              <button
                onClick={shareToFacebook}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1877F2] hover:bg-[#0C5DC7] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </button>

              <button
                onClick={shareToTwitter}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy All'}</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center pt-2">
            Paste onto Instagram captions, YouTube descriptions, or LinkedIn updates to showcase your project!
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsSocialModalOpen(false)}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
