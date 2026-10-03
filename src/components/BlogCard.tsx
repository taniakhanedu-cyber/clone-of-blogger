import React, { useState } from 'react';
import { BlogPost } from '../types/blog';
import { useBlog } from '../context/BlogContext';
import { Eye, Heart, MessageSquare, Bookmark, Edit3 } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'featured' | 'standard' | 'compact';
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'standard' }) => {
  const { goToPost, goToEditor, toggleBookmark, bookmarkedPostIds, toggleLikePost } = useBlog();
  const [imageError, setImageError] = useState(false);
  const isBookmarked = bookmarkedPostIds.includes(post.id);

  if (variant === 'featured') {
    return (
      <article className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Visual Hero Container */}
          <div
            onClick={() => goToPost(post.id)}
            className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[300px] overflow-hidden bg-slate-100 cursor-pointer"
          >
            {!imageError ? (
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-300 p-8 text-center">
                <span className="text-sm font-semibold tracking-wider uppercase text-[#FF5722] mb-2">{post.category}</span>
                <h4 className="text-xl font-editorial font-bold text-white max-w-md">{post.title}</h4>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 lg:opacity-30 group-hover:opacity-40 transition-opacity" />
          </div>

          {/* Editorial Content Side */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Clean Zero-Pill Metadata */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                <span className="text-[#E64A19] font-semibold">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>

              {/* Title */}
              <h2
                onClick={() => goToPost(post.id)}
                className="text-2xl sm:text-3xl font-bold font-editorial text-slate-900 leading-snug tracking-tight hover:text-[#FF5722] transition-colors cursor-pointer mb-3"
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>
            </div>

            {/* Author Footer & Card Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900 leading-tight">{post.author.name}</p>
                  <p className="text-xs text-slate-500">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLikePost(post.id);
                  }}
                  className="flex items-center gap-1 hover:text-[#FF5722] transition-colors cursor-pointer"
                  title="Like post"
                >
                  <Heart className={`w-4 h-4 ${post.likes > 0 ? 'fill-rose-50 text-rose-500' : ''}`} />
                  <span className="tabular-nums">{post.likes}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPost(post.id);
                  }}
                  className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Comments"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="tabular-nums">{post.comments.length}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(post.id);
                  }}
                  className={`p-1 hover:text-slate-900 transition-colors cursor-pointer ${
                    isBookmarked ? 'text-[#FF5722]' : ''
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToEditor(post.id);
                  }}
                  className="p-1 hover:text-[#FF5722] transition-colors cursor-pointer"
                  title="Edit post in Blogger Studio"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </article>
    );
  }

  // Standard Card
  return (
    <article className="group bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:border-slate-300 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md">
      <div>
        {/* Cover Image */}
        <div
          onClick={() => goToPost(post.id)}
          className="relative h-48 w-full overflow-hidden bg-slate-100 cursor-pointer"
        >
          {!imageError ? (
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-300 p-4 text-center">
              <span className="text-xs uppercase text-[#FF5722]">{post.category}</span>
              <p className="text-sm font-bold text-white mt-1 line-clamp-2">{post.title}</p>
            </div>
          )}
          {post.status === 'draft' && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
              Draft
            </span>
          )}
        </div>

        {/* Text Container */}
        <div className="p-5">
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <span className="font-medium text-[#E64A19]">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes}m read</span>
          </div>

          <h3
            onClick={() => goToPost(post.id)}
            className="text-lg font-bold font-editorial text-slate-900 group-hover:text-[#FF5722] transition-colors leading-snug cursor-pointer line-clamp-2 mb-2"
          >
            {post.title}
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Bottom / Author & Stats */}
      <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            referrerPolicy="no-referrer"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="font-medium text-slate-700 truncate max-w-[100px]">{post.author.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleLikePost(post.id)}
            className="flex items-center gap-1 hover:text-[#FF5722] transition-colors cursor-pointer"
            title="Like"
          >
            <Heart className={`w-3.5 h-3.5 ${post.likes > 0 ? 'text-rose-500 fill-rose-50' : ''}`} />
            <span className="tabular-nums">{post.likes}</span>
          </button>

          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span className="tabular-nums">{post.views}</span>
          </span>

          <button
            onClick={() => goToEditor(post.id)}
            className="hover:text-[#FF5722] transition-colors p-1"
            title="Edit in Blogger Studio"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
