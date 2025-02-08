---
title: "Open VS Code in Same Window"
date: 2025-02-08T15:11:25-05:00
draft: false
categories: ["microblog"]
tags: []
# hiddenInHomeList: true
---

In the past, I would always open new projects in VS code by navigating to them and running the simple and famous command:

```bash
code .
```

This command opens a new window with your project, leaving everything else untouched except for your system's memory usage. This week, I finally decided to see what else was possible and it turns out you can replace the current window with the new one by appending the `-r` flag to the command:

```bash
code . -r
```

It stands for "reuse window" but for me its easier to remember it as "replace".