/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeFeed } from './components/HomeFeed';
import { PostReader } from './components/PostReader';
import { PostEditor } from './components/PostEditor';
import { BloggerStudio } from './components/BloggerStudio';
import { SocialShareModal } from './components/SocialShareModal';
import { SettingsModal } from './components/SettingsModal';

function MainAppContent() {
  const { currentView } = useBlog();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-800">
      {/* Show header for home, post-detail, and studio. PostEditor has its own dedicated toolbar header */}
      {currentView !== 'editor' && <Header />}

      <main className="flex-1">
        {currentView === 'home' && <HomeFeed />}
        {currentView === 'post-detail' && <PostReader />}
        {currentView === 'editor' && <PostEditor />}
        {currentView === 'studio' && <BloggerStudio />}
      </main>

      {currentView !== 'editor' && <Footer />}

      <SocialShareModal />
      <SettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <BlogProvider>
      <MainAppContent />
    </BlogProvider>
  );
}
