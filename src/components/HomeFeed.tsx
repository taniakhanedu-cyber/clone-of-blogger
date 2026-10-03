import React, { useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { BlogCard } from './BlogCard';
import { Search, Sparkles, Filter, PenSquare, ArrowUpDown, X } from 'lucide-react';

const CATEGORIES = [
  'all',
  'Architecture',
  'Web Development',
  'Productivity',
  'Travel & Thoughts',
  'Design Systems',
];

export const HomeFeed: React.FC = () => {
  const { 
    posts, 
    settings, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    sortBy, 
    setSortBy,
    goToEditor 
  } = useBlog();

  // Published posts only for public reader homepage
  const publishedPosts = useMemo(() => {
    return posts.filter(p => p.status === 'published');
  }, [posts]);

  // Filter & sort
  const filteredPosts = useMemo(() => {
    let result = [...publishedPosts];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.views + b.likes * 5) - (a.views + a.likes * 5));
    }

    return result;
  }, [publishedPosts, selectedCategory, searchQuery, sortBy]);

  // Featured post is the first featured or the latest published post if not searching/filtering
  const isDefaultView = selectedCategory === 'all' && !searchQuery.trim() && sortBy === 'newest';
  const featuredPost = isDefaultView ? (filteredPosts.find(p => p.isFeatured) || filteredPosts[0]) : null;
  const gridPosts = isDefaultView && featuredPost 
    ? filteredPosts.filter(p => p.id !== featuredPost.id) 
    : filteredPosts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Blog Hero Header Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-6">
        <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-slate-900 tracking-tight leading-[1.15]">
          {settings.blogTitle}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {settings.blogDescription}
        </p>

        {/* Clean Editorial Author Lockup */}
        <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500">
          <img
            src={settings.authorAvatar}
            alt={settings.authorName}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
          />
          <span className="font-semibold text-slate-800">{settings.authorName}</span>
          <span aria-hidden="true">·</span>
          <span>{settings.authorRole}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums font-mono-code">{publishedPosts.length} Published Articles</span>
        </div>
      </section>

      {/* Featured Story Hero Card */}
      {featuredPost && (
        <section aria-label="Featured Story">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Featured Editorial
            </span>
          </div>
          <BlogCard post={featuredPost} variant="featured" />
        </section>
      )}

      {/* Interactive Controls & Filters Bar */}
      <section className="pt-4 border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Segmented Category Buttons (frontend-design compliant button elements) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Stories' : cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or tags..."
                className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
                aria-label="Sort articles"
                className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF5722] cursor-pointer"
              >
                <option value="newest">Latest First</option>
                <option value="popular">Most Popular</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section>
        {gridPosts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="text-lg font-bold font-editorial text-slate-800 mb-2">No articles match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Try adjusting your search terms or clearing the selected category filter.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                onClick={() => goToEditor()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Write a Post</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="standard" />
            ))}
          </div>
        )}
      </section>

      {/* Editorial Prompt Banner / Write on Blogger Callout */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-semibold text-[#FF5722] uppercase tracking-wider">
            Democratized Web Publishing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial leading-tight">
            Have a story or insight to share with the developer community?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Create drafts with real-time preview, categorize by topic labels, applaud stories, and publish directly to the live feed.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => goToEditor()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <PenSquare className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(#FF5722_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

    </div>
  );
};
