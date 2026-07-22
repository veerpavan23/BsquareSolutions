'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/data/blogs';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

interface BlogPostClientProps {
  post: BlogPost;
}

export const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#0086F8] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </Link>

        {/* Article Card */}
        <article className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishDate}</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-snug">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
            <User className="w-5 h-5 text-[#0086F8]" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">{post.author}</div>
              <div className="text-slate-500">{post.authorRole}</div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            {post.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={idx} className="text-lg font-heading font-bold text-slate-900 dark:text-white pt-2">
                    {paragraph.replace('###', '')}
                  </h3>
                );
              }
              if (paragraph.trim() === '') return null;
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => alert('Article link copied to clipboard!')}
              className="p-2 rounded-xl text-slate-400 hover:text-[#0086F8]"
              title="Share Article"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </article>

      </div>
    </div>
  );
};
