---
title: "Use as Const Typescript"
date: 2025-02-08T15:10:07-05:00
draft: false
categories: ["microblog"]
tags: []
# hiddenInHomeList: true
---

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