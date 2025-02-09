---
title: "Expressive Code in Astro Starlight"
date: 2025-02-08T20:38:06-05:00
draft: false
categories: ["microblog"]
tags: ["link"]
# hiddenInHomeList: true
---
There are a lot of cool things you can do to code blocks using [Expressive Code in Astro's Starlight](https://starlight.astro.build/guides/authoring-content/#expressive-code-features).

## Add Titles to Code Blocks

```js
// my-title.js
export default function MyTitle() {
  return <h1>My Title</h1>
}
```

## Add Line Numbers to Code Blocks

```js {1}
export default function MyTitle() {
  return <h1>My Title</h1>
}
```

## Combine diffing with Syntax Highlighting

```diff lang="js"
  function thisIsJavaScript() {
    // This entire block gets highlighted as JavaScript,
    // and we can still add diff markers to it!
-   console.log('Old code to be removed')
+   console.log('New and shiny code!')
}
```