import Fuse from 'fuse.js';
import type { CollectionEntry } from 'astro:content';

export type SearchableContent = {
  collection: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  pubDate: Date;
};

export function createSearchIndex(
  blogs: CollectionEntry<'blog'>[],
  tutorials: CollectionEntry<'tutorials'>[],
  essays: CollectionEntry<'essays'>[]
): SearchableContent[] {
  const searchableContent: SearchableContent[] = [];

  // Add blog posts
  blogs.forEach((post) => {
    searchableContent.push({
      collection: 'blog',
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      content: post.body || '',
      tags: post.data.tags || [],
      pubDate: post.data.pubDate,
    });
  });

  // Add tutorials
  tutorials.forEach((tutorial) => {
    searchableContent.push({
      collection: 'tutorials',
      slug: tutorial.id,
      title: tutorial.data.title,
      description: tutorial.data.description,
      content: tutorial.body || '',
      tags: tutorial.data.tags || [],
      pubDate: tutorial.data.pubDate,
    });
  });

  // Add essays
  essays.forEach((essay) => {
    searchableContent.push({
      collection: 'essays',
      slug: essay.id,
      title: essay.data.title,
      description: essay.data.description,
      content: essay.body || '',
      tags: essay.data.tags || [],
      pubDate: essay.data.pubDate,
    });
  });

  return searchableContent;
}

export function createFuseInstance(searchableContent: SearchableContent[]) {
  return new Fuse(searchableContent, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'content', weight: 0.2 },
      { name: 'tags', weight: 0.1 },
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
  });
}

export function getPostUrl(collection: string, slug: string): string {
  if (collection === 'blog') {
    return `/blog/${slug}/`;
  }
  return `/${collection}/${slug}/`;
}
