#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: node scripts/new-blog-post.js <title>');
  process.exit(1);
}

const slug = slugify(title);
const date = new Date().toISOString().split('T')[0];

const content = `---
title: "${title}"
date: ${date}
draft: true
---

`;

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const postDir = path.join(blogDir, slug);
const filePath = path.join(postDir, 'index.md');

if (fs.existsSync(postDir)) {
  console.error(`Error: Directory already exists at ${postDir}`);
  process.exit(1);
}

fs.mkdirSync(postDir, { recursive: true });
fs.writeFileSync(filePath, content, 'utf8');

console.log(`VSCODE_OPEN:${filePath}`);
