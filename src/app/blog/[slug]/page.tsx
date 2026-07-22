import React from 'react';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogs';
import { BlogPostClient } from '@/components/blog/BlogPostClient';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
