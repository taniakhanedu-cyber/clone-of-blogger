import { BlogPost, BlogSettings } from '../types/blog';
import heroArchImage from '../assets/images/blog_hero_architecture_1791027256848.jpg';
import workspaceImage from '../assets/images/blog_workspace_design_1791027271307.jpg';
import travelImage from '../assets/images/blog_travel_landscape_1791027284059.jpg';
import authorAvatarImage from '../assets/images/author_rehan_avatar_1791027296921.jpg';

export const INITIAL_SETTINGS: BlogSettings = {
  blogTitle: "Rehan's Developer & Design Journal",
  blogDescription: "Reflections on modern web architecture, craft in software engineering, and creating timeless digital experiences.",
  authorName: "Rehan Khan",
  authorRole: "Software Engineer & Creator",
  authorBio: "Full-stack developer passionate about high-fidelity user experiences, clean web standards, and developer tooling. Building with modern AI and craft.",
  authorAvatar: authorAvatarImage,
  brandColor: "#FF5722", // Iconic Blogger orange
};

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Art of Purposeful Architecture: Designing Web Applications That Last',
    slug: 'the-art-of-purposeful-architecture',
    excerpt: 'How treating digital architecture with the same reverence as physical spaces changes how we build software, manage technical debt, and delight users.',
    coverImage: heroArchImage,
    isFeatured: true,
    author: {
      name: 'Rehan Khan',
      avatar: authorAvatarImage,
      role: 'Staff UI Architect',
      bio: 'Writing on intentional systems, component ergonomics, and frontend performance.'
    },
    category: 'Architecture',
    tags: ['Web Engineering', 'Design Systems', 'Craft'],
    publishedAt: '2026-09-28',
    updatedAt: '2026-10-01',
    status: 'published',
    views: 1842,
    likes: 147,
    readingTimeMinutes: 6,
    content: `<h2>The Parallels Between Physical Spaces and Digital Systems</h2>
<p>When you step into a well-crafted building, you immediately sense the intentionality behind every beam, threshold, and window. Sunlight does not hit the floorboards by accident; air currents flow naturally through courtyards; acoustics dampen harsh echoes without feeling suffocating.</p>

<p>In software development, we often speak of "architecture," yet we frequently treat code as merely functional plumbing. But real architecture in digital spaces is about the lived experience of both the user navigating the interface and the engineer maintaining the foundation.</p>

<blockquote>"Architecture is the learned game, correct and magnificent, of forms assembled in the light." — Le Corbusier</blockquote>

<h3>The Three Pillars of Digital Longevity</h3>
<p>Over the last decade of building web applications, I have found that enduring systems adhere to three quiet disciplines:</p>

<ul>
  <li><strong>Subtractive Simplicity:</strong> The ability to remove intermediate abstractions rather than adding wrappers. The cleanest pull requests are often those with negative line counts.</li>
  <li><strong>Spatial Hierarchy:</strong> Layouts where primary content commands genuine focus instead of competing against floating widgets, noisy notification badges, and aggressive popups.</li>
  <li><strong>Resilient Composability:</strong> Designing components that accept primitives rather than forcing rigid domain schemas onto presentation layers.</li>
</ul>

<h3>Moving Beyond Hype Cycles</h3>
<p>Every year brings a flurry of new frameworks, build tools, and rendering paradigms. While exploring the frontier is essential, enduring software is rooted in evergreen standards: semantic HTML, accessible color contrast, predictable state trees, and lightning-fast paint cycles.</p>

<p>When we build with restraint, our applications feel calm, effortless, and timeless. That is the standard we should hold ourselves to.</p>`,
    comments: [
      {
        id: 'c-1',
        authorName: 'Elena Rostova',
        authorAvatar: '',
        content: 'Spot on about subtractive simplicity. The best code review moments are when 500 lines of complex glue logic get replaced by clean native web APIs.',
        createdAt: '2026-09-29',
        likes: 12
      },
      {
        id: 'c-2',
        authorName: 'Marcus Chen',
        authorAvatar: '',
        content: 'Loved the quote from Le Corbusier. Physical architecture has centuries of trial-and-error to learn from, while our industry is still in its infancy.',
        createdAt: '2026-09-30',
        likes: 8
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Building Minimalist Creative Workflows for Focused Deep Work',
    slug: 'building-minimalist-creative-workflows',
    excerpt: 'An inside look at crafting distraction-free development environments, tactile physical desks, and deliberate cognitive routines.',
    coverImage: workspaceImage,
    isFeatured: false,
    author: {
      name: 'Rehan Khan',
      avatar: authorAvatarImage,
      role: 'Staff UI Architect'
    },
    category: 'Productivity',
    tags: ['Workspace', 'Focus', 'Engineering'],
    publishedAt: '2026-09-24',
    updatedAt: '2026-09-25',
    status: 'published',
    views: 1230,
    likes: 98,
    readingTimeMinutes: 4,
    content: `<h2>The Cost of Ambient Distraction</h2>
<p>Modern developers and writers operate in an environment designed for fragmentation. Constant Slack pings, tab overload, and notification bells shatter the fragile state of deep flow required to solve hard algorithmic problems or produce compelling prose.</p>

<p>To reclaim creative autonomy, we must deliberately engineer both our physical and digital surroundings.</p>

<h3>1. Single-Monitor Simplicity</h3>
<p>For three years, I ran a multi-monitor battle station with three screens, side-mounted vertical panels, and constant metrics dashboards. While it felt impressive, it encouraged split attention. Switching to a single calibrated display forced a radical shift: one task at a time, full-screen, with total concentration.</p>

<h3>2. The Tactile Reset</h3>
<p>Before writing a single line of code or drafting an essay, I spend fifteen minutes with a physical fountain pen and dot-grid notebook. Physical ink imposes a speed limit on thought. It prevents premature refactoring and allows structural clarity to emerge before the keyboard takes over.</p>

<blockquote>"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra</blockquote>

<p>Try stripping away one non-essential app from your startup dock this week. Notice how much lighter your creative rhythm feels.</p>`,
    comments: [
      {
        id: 'c-3',
        authorName: 'Sara Lin',
        authorAvatar: '',
        content: 'The notebook tip is gold. Sketching state diagrams by hand saves me hours of code rework later.',
        createdAt: '2026-09-25',
        likes: 5
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Solitude and Perspective: Lessons from the Northern Coastal Ridges',
    slug: 'solitude-and-perspective-northern-ridges',
    excerpt: 'Taking time away from glowing displays to walk high-altitude coastal paths offers unexpected lessons in scale, humility, and patience.',
    coverImage: travelImage,
    isFeatured: false,
    author: {
      name: 'Rehan Khan',
      avatar: authorAvatarImage,
      role: 'Staff UI Architect'
    },
    category: 'Travel & Thoughts',
    tags: ['Nature', 'Reflection', 'Mindset'],
    publishedAt: '2026-09-18',
    updatedAt: '2026-09-18',
    status: 'published',
    views: 945,
    likes: 84,
    readingTimeMinutes: 5,
    content: `<h2>Standing Above the Fog Line</h2>
<p>At 6:00 AM on the coastal ridge trail, the entire valley below is enveloped in thick marine fog. Above the tree line, the air is crisp, biting, and entirely silent save for the occasional gust through old-growth Douglas firs.</p>

<p>In tech, we live in sprints of one or two weeks. We measure latency in milliseconds and quarterly roadmaps in 90-day quarters. But out here, rock formations and ancient root systems operate on millennia.</p>

<h3>Reframing Scale</h3>
<p>When you spend hours hiking with only what fits in your rucksack, what is truly necessary becomes remarkably evident. Food, clean water, warm wool, sturdy boots. Everything else is ballast.</p>

<p>Bringing this mentality back to digital work is liberating. Does this feature genuinely serve the user's primary intent? Or are we adding bells and whistles to satisfy an internal itch?</p>

<p>Sometimes the most productive thing an engineer or writer can do is close the laptop, step out the door, and look up at the sky.</p>`,
    comments: []
  },
  {
    id: 'post-4',
    title: 'Why We Rebuilt Our Blog Engine with Simplicity as the Guiding Metric',
    slug: 'rebuilding-blog-engine-with-simplicity',
    excerpt: 'Exploring why the web is returning to lightweight, fast-loading personal publishing platforms, and what Blogger got right decades ago.',
    coverImage: heroArchImage,
    isFeatured: false,
    author: {
      name: 'Rehan Khan',
      avatar: authorAvatarImage,
      role: 'Staff UI Architect'
    },
    category: 'Web Development',
    tags: ['Blogger', 'Publishing', 'JavaScript', 'React'],
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    status: 'published',
    views: 620,
    likes: 67,
    readingTimeMinutes: 4,
    content: `<h2>The Return to Personal Publishing</h2>
<p>In the early 2000s, Blogger.com popularized the democratized web. For the first time, anyone with an internet connection could click "Create Post", type their thoughts, hit publish, and instantly have a voice heard across the world.</p>

<p>Over the subsequent two decades, publishing became increasingly corporatized: algorithm-driven social feeds, paywalled gardens, popups demanding email subscriptions, and ads eating up 70% of viewport space.</p>

<h3>Rediscovering the Joy of Writing</h3>
<p>Recreating this Blogger platform reminded me why blogging captured our imagination in the first place: clean typography, zero friction to start drafting, and instant publishing. When the tool gets out of the way, writers can focus on ideas.</p>

<p>Here is what we prioritized in this clone:</p>
<ul>
  <li>Instant live preview while you write</li>
  <li>Lightweight, accessible layout with zero clutter</li>
  <li>Fast client-side editing and instantaneous updates</li>
  <li>Direct social share links to broadcast your work</li>
</ul>

<p>Happy writing, and welcome to your new creative home!</p>`,
    comments: [
      {
        id: 'c-4',
        authorName: 'Alex Rivera',
        authorAvatar: '',
        content: 'Blogger was where I wrote my very first HTML tutorial in 2006. So nostalgic to see this modern revival!',
        createdAt: '2026-10-02',
        likes: 15
      }
    ]
  },
  {
    id: 'post-5',
    title: 'Mastering Component Ergonomics in Modern Frontend Frameworks',
    slug: 'mastering-component-ergonomics',
    excerpt: 'Tips for crafting flexible, type-safe, and self-documenting React components that your team will actually love using.',
    coverImage: workspaceImage,
    isFeatured: false,
    author: {
      name: 'Rehan Khan',
      avatar: authorAvatarImage,
      role: 'Staff UI Architect'
    },
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Frontend'],
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-15',
    status: 'draft',
    views: 310,
    likes: 22,
    readingTimeMinutes: 5,
    content: `<h2>Draft Note: Working on Component API design</h2>
<p>Component ergonomics dictate developer happiness. When prop names are inconsistent or hidden behind boolean flags, cognitive overhead skyrockets.</p>
<p>Focus on slot patterns, compound components, and polymorphics.</p>`,
    comments: []
  }
];
