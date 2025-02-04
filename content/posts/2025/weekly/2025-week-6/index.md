---
title: "2025 Week 6"
date: 2025-02-03T06:27:01-05:00
draft: true
---

# Contents

## Links
- https://objectbox.io/on-device-vector-database-for-dart-flutter/: On-device vector database for Flutter

## Tips

### pop() is Permanent

After a 15 minute, AI-assisted troubleshooting session, I squashed a bug after realizing I was calling `.pop()` on a TypeScript list a few turns before I was attempting to print out that list. The result? A list that was missing the very last entry. 

The [.pop()](https://www.geeksforgeeks.org/typescript-array-pop-method/) method is mutating or destructive because it directly modifies the array it operates on.