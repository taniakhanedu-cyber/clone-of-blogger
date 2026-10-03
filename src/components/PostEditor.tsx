import React, { useState, useEffect, useRef } from 'react';
import { useBlog } from '../context/BlogContext';
import { BlogPost } from '../types/blog';
import heroArchImage from '../assets/images/blog_hero_architecture_1791027256848.jpg';
import workspaceImage from '../assets/images/blog_workspace_design_1791027271307.jpg';
import travelImage from '../assets/images/blog_travel_landscape_1791027284059.jpg';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Edit3, 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Quote, 
  List, 
  ListOrdered, 
  Code, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Check, 
  Sparkles,
  Columns,
  Trash2
} from 'lucide-react';

const PRESET_COVERS = [
  { name: 'Travertine Architecture', url: heroArchImage },
  { name: 'Creator Workspace', url: workspaceImage },
  { name: 'Coastal Pines Landscape', url: travelImage },
];

const PRESET_CATEGORIES = [
  'Architecture',
  'Web Development',
  'Productivity',
  'Travel & Thoughts',
  'Design Systems',
  'General',
];

export const PostEditor: React.FC = () => {
  const { posts, editingPostId, createPost, updatePost, deletePost, goToHome, goToPost, goToStudio } = useBlog();

  const existingPost = posts.find(p => p.id === editingPostId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState(heroArchImage);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  
  // Editor view states
  const [editorTab, setEditorTab] = useState<'edit' | 'split' | 'preview'>('edit');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load existing post if in edit mode
  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setExcerpt(existingPost.excerpt);
      setCategory(existingPost.category);
      setTags(existingPost.tags || []);
      setCoverImage(existingPost.coverImage);
      setStatus(existingPost.status);
    } else {
      // Default template for a brand new post
      setTitle('');
      setContent(`<h2>Introduction to My Story</h2>
<p>Start writing your thoughts, tutorials, or reflections here. Blogger makes it effortless to express your ideas to the world.</p>

<h3>Key Insights</h3>
<ul>
  <li>First major takeaway or discovery</li>
  <li>Practical tips for developers and readers</li>
</ul>

<blockquote>"Great software is like great literature: clear, intentional, and human."</blockquote>

<p>Wrap up your article with a concluding thought or question for your readers!</p>`);
      setExcerpt('');
      setCategory('Web Development');
      setTags(['Tech', 'Blogger']);
      setCoverImage(heroArchImage);
      setStatus('published');
    }
  }, [editingPostId, existingPost]);

  // Insert HTML formatting helper
  const insertFormatting = (prefix: string, suffix: string = '', defaultText: string = 'text') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultText;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    // Reset selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 10);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^#/, '');
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a post title before publishing.');
      return;
    }

    const postPayload: Partial<BlogPost> = {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || content.replace(/<[^>]*>/g, '').substring(0, 140) + '...',
      category,
      tags: tags.length > 0 ? tags : ['General'],
      coverImage: customImageUrl.trim() || coverImage,
      status,
    };

    let targetId: string;
    if (editingPostId && existingPost) {
      updatePost(editingPostId, postPayload);
      targetId = editingPostId;
    } else {
      targetId = createPost(postPayload);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      if (status === 'published') {
        goToPost(targetId);
      } else {
        goToStudio();
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => goToStudio()}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Return to Blogger Studio"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs text-[#FF5722] font-semibold uppercase tracking-wider">
                {editingPostId ? 'Editing Story' : 'New Story Draft'}
              </span>
              <p className="text-sm font-semibold text-slate-900 truncate max-w-xs">
                {title || 'Untitled Post'}
              </p>
            </div>
          </div>

          {/* Center Tabs: Editor / Split / Preview */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setEditorTab('edit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                editorTab === 'edit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setEditorTab('split')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                editorTab === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split Live</span>
            </button>
            <button
              onClick={() => setEditorTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                editorTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reader Preview</span>
            </button>
          </div>

          {/* Right Action: Publish / Save */}
          <div className="flex items-center gap-2.5">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
              aria-label="Post Publication Status"
              className="text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="published">Publish Now</option>
              <option value="draft">Save as Draft</option>
            </select>

            {editingPostId && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this post?')) {
                    deletePost(editingPostId);
                    goToStudio();
                  }
                }}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Delete Post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer ${
                savedSuccess
                  ? 'bg-emerald-600'
                  : 'bg-[#FF5722] hover:bg-[#E64A19] shadow-sm'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{status === 'published' ? 'Publish Story' : 'Save Draft'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Editor & Writing Canvas (8 cols on desktop or 12 in preview) */}
        <div className={`space-y-4 ${editorTab === 'split' ? 'lg:col-span-6' : editorTab === 'preview' ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
          
          {editorTab !== 'preview' ? (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col min-h-[620px]">
              
              {/* Rich Text Toolbar */}
              <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-2.5 flex flex-wrap items-center gap-1 text-slate-700">
                <button
                  type="button"
                  onClick={() => insertFormatting('<strong>', '</strong>', 'Bold text')}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Bold (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('<em>', '</em>', 'Italic text')}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Italic (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                
                <span className="w-px h-4 bg-slate-300 mx-1" />

                <button
                  type="button"
                  onClick={() => insertFormatting('<h2>', '</h2>', 'Section Heading')}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Heading 2"
                >
                  <Heading1 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('<h3>', '</h3>', 'Sub-heading')}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Heading 3"
                >
                  <Heading2 className="w-4 h-4" />
                </button>

                <span className="w-px h-4 bg-slate-300 mx-1" />

                <button
                  type="button"
                  onClick={() => insertFormatting('<blockquote>', '</blockquote>', 'Insightful quote or statement')}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('<ul>\n  <li>', '</li>\n  <li>Second point</li>\n</ul>', 'First point')}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('<ol>\n  <li>', '</li>\n  <li>Step two</li>\n</ol>', 'Step one')}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>

                <span className="w-px h-4 bg-slate-300 mx-1" />

                <button
                  type="button"
                  onClick={() => insertFormatting('<pre><code>', '</code></pre>', '// Code block here\nconst value = true;')}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Code Block"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt('Enter link URL (e.g. https://blogger.com):');
                    if (url) insertFormatting(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, '</a>', 'link text');
                  }}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Insert Hyperlink"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) insertFormatting(`<img src="${url}" alt="Illustration" />`, '', '');
                  }}
                  className="p-1.5 hover:bg-white hover:text-slate-900 rounded-md transition-colors"
                  title="Insert Inline Image"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>

                <div className="ml-auto text-xs text-slate-400 font-mono-code tabular-nums">
                  {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length} words
                </div>
              </div>

              {/* Title & Body Inputs */}
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title..."
                  className="w-full text-2xl sm:text-3xl font-bold font-editorial text-slate-900 placeholder:text-slate-300 focus:outline-none border-b border-transparent focus:border-slate-200 pb-2 transition-colors"
                />

                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your story using HTML or rich text formatting..."
                  className="w-full flex-1 min-h-[420px] text-slate-800 font-sans-ui text-base leading-relaxed placeholder:text-slate-300 focus:outline-none resize-y"
                />
              </div>
            </div>
          ) : null}

          {/* Live Preview (either in Split or Preview mode) */}
          {(editorTab === 'split' || editorTab === 'preview') && (
            <div className={`bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs ${editorTab === 'preview' ? 'max-w-3xl mx-auto' : ''}`}>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E64A19] uppercase tracking-wider mb-3">
                <span>{category}</span>
                <span aria-hidden="true">·</span>
                <span>{status === 'draft' ? 'Draft' : 'Published Preview'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-slate-900 leading-tight mb-4">
                {title || 'Untitled Post'}
              </h1>
              {excerpt && (
                <p className="text-base text-slate-600 italic border-l-2 border-[#FF5722] pl-3 mb-6">
                  {excerpt}
                </p>
              )}
              {coverImage && (
                <div className="mb-6 rounded-xl overflow-hidden max-h-72">
                  <img
                    src={customImageUrl || coverImage}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-sans-ui text-sm sm:text-base
                  [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:font-editorial [&>h2]:text-slate-900 [&>h2]:mt-6 [&>h2]:mb-3
                  [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-bold [&>h3]:font-editorial [&>h3]:text-slate-900 [&>h3]:mt-4 [&>h3]:mb-2
                  [&>p]:mb-4 [&>p]:leading-relaxed
                  [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4
                  [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4
                  [&>blockquote]:border-l-4 [&>blockquote]:border-[#FF5722] [&>blockquote]:pl-3 [&>blockquote]:italic [&>blockquote]:my-4 [&>blockquote]:text-slate-700
                  [&>pre]:bg-slate-900 [&>pre]:text-slate-100 [&>pre]:p-3 [&>pre]:rounded-lg [&>pre]:text-xs [&>pre]:font-mono-code"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}

        </div>

        {/* Right Sidebar: Post Settings & Metadata (4 cols, hidden in full preview mode) */}
        {editorTab !== 'preview' && (
          <aside className={`${editorTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-4'} space-y-5`}>
            
            {/* Category Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Post Category
              </h3>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              >
                {PRESET_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Labels / Tags Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Topic Labels (Tags)
              </h3>
              <p className="text-xs text-slate-500 mb-3">Press Enter or comma to add tags</p>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-slate-400 hover:text-slate-700 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag and press Enter..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              />
            </div>

            {/* Cover Image Selector */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Featured Cover Image
              </h3>

              <div className="space-y-2 mb-4">
                <span className="text-xs text-slate-600 font-medium block">Choose Curated Studio Photograph:</span>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_COVERS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setCoverImage(preset.url);
                        setCustomImageUrl('');
                      }}
                      className={`relative rounded-lg overflow-hidden h-16 border-2 transition-all cursor-pointer ${
                        coverImage === preset.url && !customImageUrl
                          ? 'border-[#FF5722] ring-2 ring-orange-200'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                      title={preset.name}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 font-medium block mb-1.5">
                  Or Custom Image URL:
                </label>
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="https://images.example.com/photo.jpg"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>
            </div>

            {/* Excerpt / Search Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Search Description & Excerpt
              </h3>
              <p className="text-xs text-slate-500 mb-2">A concise summary for feed cards and search results</p>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Brief summary of this article..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722] resize-y"
              />
            </div>

          </aside>
        )}

      </main>
    </div>
  );
};
