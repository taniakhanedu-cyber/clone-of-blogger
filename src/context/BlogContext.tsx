import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, BlogSettings, Comment } from '../types/blog';
import { INITIAL_POSTS, INITIAL_SETTINGS } from '../data/initialPosts';

export type ViewMode = 'home' | 'post-detail' | 'editor' | 'studio';

interface BlogContextType {
  posts: BlogPost[];
  settings: BlogSettings;
  currentView: ViewMode;
  selectedPostId: string | null;
  editingPostId: string | null;
  selectedCategory: string;
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'popular';
  bookmarkedPostIds: string[];
  isSocialModalOpen: boolean;
  isSettingsModalOpen: boolean;
  
  // Navigation
  goToHome: () => void;
  goToPost: (id: string) => void;
  goToEditor: (id?: string) => void;
  goToStudio: () => void;
  
  // Post Operations
  createPost: (postData: Partial<BlogPost>) => string;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  duplicatePost: (id: string) => void;
  togglePublishStatus: (id: string) => void;
  toggleLikePost: (id: string) => void;
  addComment: (postId: string, authorName: string, content: string) => void;
  toggleBookmark: (postId: string) => void;
  incrementViews: (postId: string) => void;
  
  // Filtering & Search
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'newest' | 'oldest' | 'popular') => void;
  
  // Settings & Modals
  updateSettings: (newSettings: Partial<BlogSettings>) => void;
  setIsSocialModalOpen: (open: boolean) => void;
  setIsSettingsModalOpen: (open: boolean) => void;
  resetAllToDefault: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_POSTS_KEY = 'blogger_clone_posts_v1';
const STORAGE_SETTINGS_KEY = 'blogger_clone_settings_v1';
const STORAGE_BOOKMARKS_KEY = 'blogger_clone_bookmarks_v1';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_POSTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load posts from storage', e);
    }
    return INITIAL_POSTS;
  });

  const [settings, setSettings] = useState<BlogSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load settings from storage', e);
    }
    return INITIAL_SETTINGS;
  });

  const [bookmarkedPostIds, setBookmarkedPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
    return [];
  });

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Sync with local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save posts', e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarkedPostIds));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarkedPostIds]);

  // Navigation functions
  const goToHome = () => {
    setCurrentView('home');
    setSelectedPostId(null);
    setEditingPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPost = (id: string) => {
    setSelectedPostId(id);
    setEditingPostId(null);
    setCurrentView('post-detail');
    incrementViews(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToEditor = (id?: string) => {
    setEditingPostId(id || null);
    setCurrentView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStudio = () => {
    setCurrentView('studio');
    setEditingPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const incrementViews = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, views: (post.views || 0) + 1 } : post
      )
    );
  };

  const createPost = (postData: Partial<BlogPost>): string => {
    const newId = `post-${Date.now()}`;
    const wordCount = (postData.content || '').replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const newPost: BlogPost = {
      id: newId,
      title: postData.title || 'Untitled Post',
      slug: (postData.title || 'untitled-post')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
      content: postData.content || '',
      excerpt: postData.excerpt || postData.content?.substring(0, 150) || '',
      coverImage: postData.coverImage || INITIAL_POSTS[0].coverImage,
      author: {
        name: settings.authorName,
        avatar: settings.authorAvatar,
        role: settings.authorRole,
        bio: settings.authorBio,
      },
      category: postData.category || 'General',
      tags: postData.tags && postData.tags.length > 0 ? postData.tags : ['Blogger'],
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      status: postData.status || 'published',
      views: 1,
      likes: 0,
      readingTimeMinutes: readingTime,
      comments: [],
      isFeatured: false,
    };

    setPosts(prev => [newPost, ...prev]);
    return newId;
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== id) return post;
        
        let readingTime = post.readingTimeMinutes;
        if (updates.content) {
          const wordCount = updates.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
          readingTime = Math.max(1, Math.ceil(wordCount / 200));
        }

        return {
          ...post,
          ...updates,
          readingTimeMinutes: readingTime,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      })
    );
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
    if (selectedPostId === id) {
      goToHome();
    }
  };

  const duplicatePost = (id: string) => {
    const existing = posts.find(p => p.id === id);
    if (!existing) return;

    const dupId = `post-${Date.now()}`;
    const duplicated: BlogPost = {
      ...existing,
      id: dupId,
      title: `${existing.title} (Copy)`,
      slug: `${existing.slug}-copy-${Date.now()}`,
      status: 'draft',
      views: 0,
      likes: 0,
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      comments: [],
    };

    setPosts(prev => [duplicated, ...prev]);
  };

  const togglePublishStatus = (id: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
              ...post,
              status: post.status === 'published' ? 'draft' : 'published',
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : post
      )
    );
  };

  const toggleLikePost = (id: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const addComment = (postId: string, authorName: string, content: string) => {
    if (!authorName.trim() || !content.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      authorName: authorName.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: [newComment, ...post.comments] }
          : post
      )
    );
  };

  const toggleBookmark = (postId: string) => {
    setBookmarkedPostIds(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const updateSettings = (newSettings: Partial<BlogSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetAllToDefault = () => {
    setPosts(INITIAL_POSTS);
    setSettings(INITIAL_SETTINGS);
    setBookmarkedPostIds([]);
    goToHome();
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        settings,
        currentView,
        selectedPostId,
        editingPostId,
        selectedCategory,
        searchQuery,
        sortBy,
        bookmarkedPostIds,
        isSocialModalOpen,
        isSettingsModalOpen,
        goToHome,
        goToPost,
        goToEditor,
        goToStudio,
        createPost,
        updatePost,
        deletePost,
        duplicatePost,
        togglePublishStatus,
        toggleLikePost,
        addComment,
        toggleBookmark,
        incrementViews,
        setSelectedCategory,
        setSearchQuery,
        setSortBy,
        updateSettings,
        setIsSocialModalOpen,
        setIsSettingsModalOpen,
        resetAllToDefault,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
