---
title: "2025 Week 6"
date: 2025-02-03T06:27:01-05:00
draft: false
categories: ["microblog"]
tags: []
---

# Contents

## Links
- https://objectbox.io/on-device-vector-database-for-dart-flutter/: On-device vector database for Flutter

## Quotes

> Nothing is enough for the man to whom enough is too little

- Epicurus

> A good plan violently executed now is better than a perfect plan next week.

- George Patton

## Tips

### pop() is Permanent

After a 15 minute, AI-assisted troubleshooting session, I squashed a bug after realizing I was calling `.pop()` on a TypeScript list a few turns before I was attempting to print out that list. The result? A list that was missing the very last entry. 

The [.pop()](https://www.geeksforgeeks.org/typescript-array-pop-method/) method is mutating or destructive because it directly modifies the array it operates on.

### Pass args to an npm script

Adding scripts to your `package.json` file is an efficiency necessity, but what makes these scripts even more effective is the ability to [pass arguments](https://github.com/npm/npm/pull/5518) to them while still using the abbreviated `npm run {command}` format. To do it, simply append `--` after the npm script and then add your arguments as you would if you were running the script with node:

```bash
npm run start -- --foo=3
```

### Use `as const`

You can tell TypeScript to treat a string value as a literal type using the `as const` phrase.

For example, if you have an interface like this:

```typescript
export interface Message {
  role: "user" | "assistant" | "tool";
  content: string;
}
```

You can add objects to it like this:

```typescript
const updatedMessages: Message[] = [
      ...currentMessages,
      {
        role: "assistant",
        content: baseResponse,
      },
      ...(functionResponse
        ? [{ role: "assistant" as const, content: functionResponse }]
        : []),
    ];
```

### Send a Prompt to GitHub Copilot

I still don't know why you would do this but as of [this week](https://x.com/ashtom/status/1887250944427237816) you can open GitHub copilot chat from a URL:

```
https://github.com/copilot?prompt=Build%20Something%20Cool
```

### Search a Specific Folder in VS Code

I am committed to turning my "blog" project into a personal note taking repository. In doing so, I started researching better ways to use VS Code to search for files. [I found](https://stackoverflow.com/a/43651677/12806961) that you can search a specific folder by right clicking it in the explorer and selecting "Find in Folder". This will auto-populate the `files to include` field with the folder you selected.