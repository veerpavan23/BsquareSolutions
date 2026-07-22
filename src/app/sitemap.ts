import { MetadataRoute } from 'next';
import { COURSES } from '@/data/courses';
import { BLOG_POSTS } from '@/data/blogs';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bsquare.co.in';

  const staticRoutes = [
    '',
    '/courses',
    '/salesforce-training',
    '/power-bi-training',
    '/tableau-training',
    '/data-analytics-training',
    '/ai-data-science-training',
    '/corporate-training',
    '/learning-paths',
    '/trainers',
    '/success-stories',
    '/resources',
    '/blog',
    '/about',
    '/contact',
    '/login',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const courseRoutes = COURSES.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogRoutes = BLOG_POSTS.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
