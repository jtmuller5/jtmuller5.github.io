---
title: "Fuzzy Search vs Code"
date: 2025-02-08T18:21:16-05:00
draft: false
categories: ["microblog"]
tags: ["tip"]
# hiddenInHomeList: true
---

There is a [new experimental setting](https://code.visualstudio.com/docs/copilot/copilot-settings#_general-settings) for VS Code's copilot that lets you enable semantic search in the search window.

```
github.copilot.chat.search.semanticTextResults
```

![Enable semantic search in VS Code](image.png)

Once you enable the semantic search setting, you'll see a new dropdown under the search results in the search panel. Expanding the dropdown will show you the semantic search results (after a few seconds of processing).

![Semantic search in search panel](image-1.png)

> [!CAUTION]
> I've noticed that this works better in non-blog projects. In my Hugo blog (this website), the search results miss things that seem obvious.

> [!CAUTION]
> These semantic search results don't seem to respect your `ignore` search settings.