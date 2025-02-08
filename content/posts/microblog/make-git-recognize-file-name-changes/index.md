---
title: "Make Git Recognize File Name Changes"
date: 2025-02-08T15:16:54-05:00
draft: false
categories: ["microblog"]
tags: []
# hiddenInHomeList: true
---

Apparently, changing a character in a file name from uppercase to lowercase is [not detected by git](https://stackoverflow.com/a/71231672/12806961). For example, changing `NoteTaker.ts` to `noteTaker.ts` is not registered as a change.

To fix this (obviously bad default), you can run this in your terminal:

```bash
git config core.ignorecase false
```