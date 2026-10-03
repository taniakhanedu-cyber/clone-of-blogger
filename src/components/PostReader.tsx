import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bookmark, 
  Edit3, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Eye, 
  Send,
  Check
} from 'lucide-react';

export const PostReader: React.FC = () => {
  const { 
    posts, 
    selectedPostId, 
    goToHome, 
    goToEditor, 
    toggleLikePost, 
    addComment, 
    toggleBookmark, 
    bookmarkedPostIds,
    setIsSocialModalOpen,
    goToPost 
  } = useBlog();

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageError, setImageError] = useState(false);

  const post = posts.find(p => p.id === selectedPostId);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Post not found</h2>
        <p className="text-slate-500 mb-6">The story you are looking for may have been moved or deleted.</p>
        <button
          onClick={goToHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5722] text-white rounded-lg font-medium hover:bg-[#E64A19] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>
      </div>
    );
  }

  const isBookmarked = bookmarkedPostIds.includes(post.id);
  const relatedPosts = posts.filter(p => p.id !== post.id && p.status === 'published').slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    addComment(post.id, commentName, commentText);
    setCommentText('');
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Top Reading Navigation Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-slate-100 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={goToHome}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Feed</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleLikePost(post.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Like this post"
            >
              <Heart className={`w-3.5 h-3.5 ${post.likes > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              <span className="tabular-nums">{post.likes}</span>
            </button>

            <button
              onClick={() => toggleBookmark(post.id)}
              className={`p-1.5 rounded-lg text-xs border transition-colors ${
                isBookmarked 
                  ? 'bg-orange-50 border-[#FF5722] text-[#FF5722]' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              title="Bookmark post"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={() => setIsSocialModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#FF5722] bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
            >
              <span>Social Post</span>
            </button>

            <button
              onClick={() => goToEditor(post.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#FF5722] hover:bg-[#E64A19] transition-colors"
              title="Edit in Blogger Studio"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        {/* Category & Status */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#E64A19] uppercase tracking-wider mb-4">
          <span>{post.category}</span>
          {post.status === 'draft' && (
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[11px] font-bold">
              Draft Preview
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-slate-900 leading-[1.2] tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt Kicker */}
        {post.excerpt && (
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-sans-ui mb-8 border-l-2 border-[#FF5722] pl-4 italic">
            {post.excerpt}
          </p>
        )}

        {/* Clean Author Lockup & Meta */}
        <div className="flex items-center justify-between py-5 border-y border-slate-100 mb-10">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <p className="font-semibold text-slate-900 text-sm">{post.author.name}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span>{post.author.role}</span>
              </div>
            </div>
          </div>

          <div className="text-right text-xs text-slate-500 flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.publishedAt}</span>
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readingTimeMinutes} min read</span>
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums">{post.views} views</span>
            </span>
          </div>
        </div>

        {/* Cover Photo */}
        {post.coverImage && (
          <div className="relative mb-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            {!imageError ? (
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            ) : null}
          </div>
        )}

        {/* Body Content with Rich HTML Rendering */}
        <div 
          className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-sans-ui text-base sm:text-lg 
            [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:font-editorial [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4
            [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:font-editorial [&>h3]:text-slate-900 [&>h3]:mt-8 [&>h3]:mb-3
            [&>p]:mb-6 [&>p]:leading-[1.75]
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#FF5722] [&>blockquote]:pl-4 [&>blockquote]:py-1 [&>blockquote]:italic [&>blockquote]:text-slate-700 [&>blockquote]:my-8 [&>blockquote]:bg-orange-50/50 [&>blockquote]:rounded-r-lg
            [&>pre]:bg-slate-900 [&>pre]:text-slate-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:my-6 [&>pre]:font-mono-code [&>pre]:text-sm
            [&>code]:bg-slate-100 [&>code]:text-[#E64A19] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono-code [&>code]:text-sm
            [&>img]:rounded-xl [&>img]:my-8 [&>img]:w-full"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-200">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">Topic Labels</span>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 font-medium">
              {post.tags.map((tag, idx) => (
                <React.Fragment key={idx}>
                  <span className="hover:text-[#FF5722] transition-colors cursor-pointer">#{tag}</span>
                  {idx < post.tags.length - 1 && <span className="text-slate-300">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Bottom Bar */}
        <div className="my-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleLikePost(post.id)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-rose-50 border border-slate-200 text-slate-800 rounded-xl font-semibold shadow-sm transition-all"
            >
              <Heart className={`w-5 h-5 ${post.likes > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              <span>Applaud Story</span>
              <span className="tabular-nums font-mono-code text-sm bg-slate-100 px-2 py-0.5 rounded-md ml-1">{post.likes}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 font-semibold shadow-sm transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-500" />}
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>

          <button
            onClick={() => setIsSocialModalOpen(true)}
            className="text-xs font-semibold text-[#FF5722] hover:text-[#E64A19] underline underline-offset-4"
          >
            Create Social Post (LinkedIn, FB, IG, YT) →
          </button>
        </div>

        {/* Author Bio Box */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-14">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-sm shrink-0"
          />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Written by</span>
            <h4 className="text-lg font-bold text-slate-900 mb-1">{post.author.name}</h4>
            <p className="text-xs text-[#E64A19] font-medium mb-3">{post.author.role}</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {post.author.bio || 'Writer, developer, and digital explorer contributing thoughts on modern web development and software architecture.'}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <section className="pt-10 border-t border-slate-200" id="comments">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FF5722]" />
              <span>Discussion ({post.comments.length})</span>
            </h3>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Leave a response</h4>
            <div className="space-y-3">
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your Name (e.g. Alex Rivera)"
                required
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
              />
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts on this story..."
                rows={3}
                required
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent resize-y"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF5722] text-white text-xs font-semibold rounded-lg hover:bg-[#E64A19] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Comment</span>
                </button>
              </div>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {post.comments.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              post.comments.map((comm) => (
                <div key={comm.id} className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {comm.authorName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{comm.authorName}</span>
                    </div>
                    <span className="text-xs text-slate-400">{comm.createdAt}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed pl-9">{comm.content}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Posts Recommendations */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-slate-200">
            <h3 className="text-xl font-bold font-editorial text-slate-900 mb-6">More Stories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => goToPost(rel.id)}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all p-3"
                >
                  <div className="h-32 rounded-lg overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#E64A19] block mb-1">{rel.category}</span>
                  <h4 className="text-sm font-bold font-editorial text-slate-900 group-hover:text-[#FF5722] line-clamp-2 leading-tight">
                    {rel.title}
                  </h4>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
