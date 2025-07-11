---
title: "Expressive Code Features Showcase"
description: "A demonstration of all the enhanced code block features with smaller fonts and better styling"
pubDate: 2024-07-15
tags: ["astro", "expressive-code", "syntax-highlighting"]
---

This post demonstrates the enhanced code block features with smaller fonts and improved styling.

## Basic Syntax Highlighting

Simple TypeScript code with automatic syntax highlighting:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: Math.random(),
    ...userData,
  };
};
```

## Code with Title and Line Numbers

```typescript title="user-service.ts" showLineNumbers
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0).max(120),
});

export type User = z.infer<typeof UserSchema>;

export class UserService {
  private users: User[] = [];

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const user = {
      id: Date.now(),
      ...userData,
    };
    
    // Validate the user data
    const validUser = UserSchema.parse(user);
    this.users.push(validUser);
    
    return validUser;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
}
```

## Highlighting Specific Lines

```astro title="BlogPost.astro" {5-8,15} showLineNumbers
---
interface Props {
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
}

const { title, content, author } = Astro.props;
---

<article>
  <header>
    <h1>{title}</h1>
    <div class="author">
      <img src={author.avatar} alt={author.name} />
      <span>{author.name}</span>
    </div>
  </header>
  <div class="content" set:html={content} />
</article>
```

## Adding and Removing Lines

```json title="package.json" ins={3,8-10} del={4}
{
  "name": "my-astro-blog",
  "version": "2.0.0",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "astro": "^5.11.0",
    "astro-expressive-code": "^0.38.3",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

## Word Wrapping

```bash title="terminal" wrap
npm install astro-expressive-code @types/node typescript @astrojs/mdx @astrojs/sitemap sharp fuse.js && npm run dev -- --host 0.0.0.0 --port 3000
```

## Multiple Languages

JavaScript example:

```javascript title="utils.js"
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
```

CSS with custom properties:

```css title="styles.css" mark={1-5}
:root {
  --primary-color: #2337ff;
  --secondary-color: #000d8a;
  --text-color: #34293d;
  --background-color: #ffffff;
}

.button {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.button:hover {
  background: var(--secondary-color);
}
```

## Shell Commands

```bash title="Setup commands"
# Clone the repository
git clone https://github.com/yourusername/astro-blog.git

# Install dependencies
cd astro-blog
npm install

# Start development server
npm run dev
```

## Complex Example with All Features

```typescript title="advanced-blog-utils.ts" showLineNumbers {15-25} ins={20-22} mark={30}
import { getCollection, type CollectionEntry } from 'astro:content';
import { z } from 'zod';

// Schema for blog post frontmatter validation
const BlogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  pubDate: z.date(),
  updatedDate: z.date().optional(),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
});

// Type-safe blog post utilities
export class BlogUtils {
  static async getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getCollection('blog', ({ data }) => {
      return data.draft !== true;
    });
    
    // Sort by publication date (newest first)
    return posts.sort((a, b) => 
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );
  }

  static async getPostsByTag(tag: string): Promise<CollectionEntry<'blog'>[]> {
    const allPosts = await this.getAllPosts();
    return allPosts.filter(post => 
      post.data.tags.includes(tag)
    );
  }

  static async getFeaturedPosts(limit = 3): Promise<CollectionEntry<'blog'>[]> {
    const allPosts = await this.getAllPosts();
    return allPosts.slice(0, limit);
  }

  static validatePostData(data: unknown): BlogPostData {
    return BlogPostSchema.parse(data);
  }

  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

export type BlogPostData = z.infer<typeof BlogPostSchema>;
```

The enhanced expressive-code integration provides:

- **Smaller font sizes** for better readability
- **Automatic theme switching** based on user preference
- **Rich syntax highlighting** with multiple themes
- **Advanced annotations** like line highlighting, insertions, deletions
- **Better mobile responsiveness** with smaller code on mobile devices
- **Improved accessibility** with proper contrast and semantic markup

All code blocks now have a consistent, professional appearance that matches your blog's design system!
