# joemuller.com

My blog. Astro, deployed to GitHub Pages on every push to `main`.

## Write a post

```
npm run new "My post title"
```

That makes `src/content/blog/my-post-title/index.md` with `draft: true`. Write it, put any
images in the same folder (`![](./image.png)`), set `draft: false` and push. Drafts show in
`npm run dev` but are never published.

Frontmatter: `title`, `date`, and optionally `description` and `tags`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at localhost:4321, drafts included |
| `npm run build` | Build to `dist/` |
| `npm run new "Title"` | Start a new post |
