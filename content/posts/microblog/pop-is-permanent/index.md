---
title: "Pop() Is Permanent"
date: 2025-02-08T15:07:42-05:00
draft: false
categories: ["microblog"]
tags: []
# hiddenInHomeList: true
---

After a 15 minute, AI-assisted troubleshooting session, I squashed a bug after realizing I was calling `.pop()` on a TypeScript list a few turns before I was attempting to print out that list. The result? A list that was missing the very last entry. 

The [.pop()](https://www.geeksforgeeks.org/typescript-array-pop-method/) method is mutating or destructive because it directly modifies the array it operates on.