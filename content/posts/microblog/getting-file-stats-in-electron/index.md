---
title: "Getting File Stats in Electron"
date: 2025-02-23T17:24:10-05:00
draft: false
categories: ["microblog"]
tags: ["tip"]
# hiddenInHomeList: true
---

You can get basic information about a file using the [fs.stat](https://nodejs.org/api/fs.html#fsstatpath-options-callback) method. This asynchronous function accepts a file path and returns an object that looks like this:

```json
{
  "dev": 16777234,
  "mode": 33188,
  "nlink": 1,
  "uid": 501,
  "gid": 20,
  "rdev": 0,
  "blksize": 4096,
  "ino": 806397637,
  "size": 311339,
  "blocks": 616,
  "atimeMs": 1740349370637.4573,
  "mtimeMs": 1740349369783.987,
  "ctimeMs": 1740349369783.987,
  "birthtimeMs": 1740349369783.5325,
  "atime": "2025-02-23T22:22:50.637Z",
  "mtime": "2025-02-23T22:22:49.784Z",
  "ctime": "2025-02-23T22:22:49.784Z",
  "birthtime": "2025-02-23T22:22:49.784Z"
}
```

Here's how you could use it to check if the file is empty:

```typescript
const stats = await fs.stat(filePath);

if(stats.size === 0){
    // Do something
}
```