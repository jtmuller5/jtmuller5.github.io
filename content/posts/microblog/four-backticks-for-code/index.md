---
title: "Four Backticks for Code"
date: 2025-02-10T06:04:29-05:00
draft: false
categories: ["microblog"]
tags: ["tip"]
# hiddenInHomeList: true
---

I recently realized there is no upper limit on the number of backticks you can put in front of your markdown code blocks.

````
This uses 4 backticks.
````

`````
This uses 5 backticks.
`````

``````
This uses 6 backticks.
``````

And so on. The use cases for this are rare but they exist. For example, I recently [posted](../expressive-code-in-astro-starlight/) about using expressive code features in Astro. Since Hugo (what this blog is built on doesn't support expressive code), expressive code features either break the build or don't render correctly. But by using 4 backticks, I was able to show the code block as it would appear in Astro.

````
```js title="my-title.js"
export default function MyTitle() {
  return <h1>My Title</h1>
}
```
````