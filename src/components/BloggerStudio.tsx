import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  Heart, 
  MessageSquare, 
  Edit3, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export const BloggerStudio: React.FC = () => {
  const { 
    posts, 
    goToEditor, 
    goToPost, 
    goToHome, 
    deletePost, 
    duplicatePost, 
    togglePublishStatus,
    resetAllToDefault 
  } = useBlog();

  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');
  const [studioSearch, setStudioSearch] = useState('');

  // Calculations for stats
  const totalPosts = posts.length;
  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalLikes = posts.reduce((acc, p) => acc + (p.likes || 0), 0);
  const totalComments = posts.reduce((acc, p) => acc + (p.comments?.length || 0), 0);

  // Filtered posts
  const filteredPosts = posts.filter(p => {
    if (activeTab === 'published' && p.status !== 'published') return false;
    if (activeTab === 'draft' && p.status !== 'draft') return false;
    if (studioSearch.trim()) {
      const q = studioSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* Studio Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={goToHome}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Back to Public Blog"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>Blogger Management Studio</span>
              </h1>
              <p className="text-xs text-slate-500">Create, manage, inspect, and analyze all your articles</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Reset all posts to default demo articles?')) {
                  resetAllToDefault();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Reset sample posts"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Content</span>
            </button>

            <button
              onClick={() => goToEditor()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#FF5722] hover:bg-[#E64A19] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Cards Grid (Tabular-nums) */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Total Stories</span>
            <div className="text-2xl font-bold font-editorial text-slate-900 tabular-nums">{totalPosts}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Published</span>
            <div className="text-2xl font-bold font-editorial text-emerald-600 tabular-nums">{publishedCount}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Drafts</span>
            <div className="text-2xl font-bold font-editorial text-amber-600 tabular-nums">{draftCount}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Total Reads</span>
            <div className="text-2xl font-bold font-editorial text-slate-900 tabular-nums">{totalViews}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Applauds</span>
            <div className="text-2xl font-bold font-editorial text-rose-600 tabular-nums">{totalLikes}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Comments</span>
            <div className="text-2xl font-bold font-editorial text-indigo-600 tabular-nums">{totalComments}</div>
          </div>
        </section>

        {/* Posts Management Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          
          {/* Controls Bar: Tabs & Search */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Posts ({totalPosts})
              </button>
              <button
                onClick={() => setActiveTab('published')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'published' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Published ({publishedCount})
              </button>
              <button
                onClick={() => setActiveTab('draft')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'draft' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Drafts ({draftCount})
              </button>
            </div>

            {/* Studio Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={studioSearch}
                onChange={(e) => setStudioSearch(e.target.value)}
                placeholder="Search stories by title or topic..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Table List */}
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800 mb-1">No articles found</h3>
              <p className="text-xs text-slate-500 mb-4">No stories match your current filter or query.</p>
              <button
                onClick={() => goToEditor()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FF5722] text-white text-xs font-semibold rounded-lg hover:bg-[#E64A19] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Post</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4 sm:px-6">Article</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-center">Stats</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                      
                      {/* Post Title & Thumbnail */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={post.coverImage}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-12 h-10 rounded-md object-cover bg-slate-100 shrink-0"
                          />
                          <div className="min-w-0 max-w-sm sm:max-w-md">
                            <p 
                              onClick={() => goToPost(post.id)}
                              className="font-bold text-slate-900 group-hover:text-[#FF5722] truncate cursor-pointer transition-colors"
                            >
                              {post.title}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              /{post.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          onClick={() => togglePublishStatus(post.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer"
                          title="Click to toggle publication status"
                        >
                          {post.status === 'published' ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Published</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span className="text-amber-700">Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                        {post.category}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500 font-mono-code">
                        {post.publishedAt}
                      </td>

                      {/* Stats */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1" title="Views">
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span className="tabular-nums font-mono-code">{post.views}</span>
                          </span>
                          <span className="flex items-center gap-1" title="Likes">
                            <Heart className="w-3.5 h-3.5 text-slate-400" />
                            <span className="tabular-nums font-mono-code">{post.likes}</span>
                          </span>
                          <span className="flex items-center gap-1" title="Comments">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                            <span className="tabular-nums font-mono-code">{post.comments?.length || 0}</span>
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => goToEditor(post.id)}
                            className="p-1.5 text-slate-600 hover:text-[#FF5722] hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit Post"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => goToPost(post.id)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="View Story in Reader Mode"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => duplicatePost(post.id)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Duplicate Story"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                                deletePost(post.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
