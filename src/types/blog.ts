export interface Comment {
  id: string;
  authorName: string;
  authorEmail?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  status: 'published' | 'draft';
  views: number;
  likes: number;
  readingTimeMinutes: number;
  comments: Comment[];
  isFeatured?: boolean;
}

export interface BlogSettings {
  blogTitle: string;
  blogDescription: string;
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorAvatar: string;
  brandColor: string;
}
