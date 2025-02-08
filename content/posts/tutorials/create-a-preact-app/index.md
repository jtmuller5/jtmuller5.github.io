---
title: "Create a Preact App"
date: 2025-01-09T09:02:21-05:00
draft: true
categories: ["tutorials"]
tags: ["preact", "tailwind", "vite"]
---

# Contents

## Get Started

This article provides just the steps for creating a Preact app with Vite and TailwindCSS. To start, [create a new Preact app](https://preactjs.com/guide/v10/getting-started/#create-a-vite-powered-preact-app) using the following command:

```bash
npm init preact
```

## Install Tailwind

Since this is a Vite app, you can follow the instructions for [installing TailwindCSS with Vite](https://tailwindcss.com/docs/guides/vite).

```bash
npm install -D tailwindcss postcss autoprefixer
```

```bash
npx tailwindcss init -p
```

Update the content field of your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

And finally add the Tailwind directives to the `style.css` file in the `src` directory:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Install Tailwind Typography

You can make things look a bit nicer with the [Tailwind Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography):

```bash
npm install -D @tailwindcss/typography
```

After installing, add the plugin to your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```