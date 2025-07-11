---
title: "Getting Started with Astro"
description: "Learn how to build lightning-fast websites with Astro, the modern static site generator"
pubDate: 2024-07-10
tags: ["astro", "javascript", "web-development"]
difficulty: "beginner"
estimatedTime: "30 minutes"
---

# Getting Started with Astro

Astro is a modern static site generator that delivers lightning-fast performance by shipping zero JavaScript by default. In this tutorial, we'll explore how to get started with Astro and build your first website.

## What is Astro?

Astro is a web framework for building content-focused websites like blogs, marketing, and e-commerce sites. Astro is best-known for pioneering a new frontend architecture to reduce JavaScript overhead and complexity compared to other frameworks.

## Key Features

- **Zero JS by default**: Astro renders your entire page to static HTML, removing all JavaScript from your final build by default
- **Component Islands**: When you do need interactivity, Astro loads individual components in isolation
- **Framework Agnostic**: Supports React, Vue, Svelte, and more
- **Built-in optimizations**: Automatic image optimization, CSS bundling, and more

## Installation

To create a new Astro project, run:

```bash
npm create astro@latest
```

This will start the interactive setup wizard to help you configure your new project.

## Project Structure

A typical Astro project looks like this:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## Your First Component

Create a simple component in `src/components/Greeting.astro`:

```astro
---
export interface Props {
  name: string;
}

const { name } = Astro.props;
---

<h1>Hello, {name}!</h1>

<style>
  h1 {
    color: orange;
  }
</style>
```

## Next Steps

Now that you have Astro set up, you can:

1. Add more pages to your site
2. Install integrations for your favorite framework
3. Deploy your site to a hosting provider

Happy building!
