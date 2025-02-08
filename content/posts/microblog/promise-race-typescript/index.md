---
title: "Promise Race Typescript"
date: 2025-02-08T15:14:51-05:00
draft: false
categories: ["microblog"]
tags: []
# hiddenInHomeList: true
---

There is a static method in JavaScript called [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) which "takes an iterable of promises as input and returns a single Promise that resolves with the first promise that settles". This provides an easy way to set maximum timeouts on your functions:

```typescript
const timeoutPromise = new Promise<boolean>((resolve) => {
    setTimeout(() => {
      console.log("EOU detection timed out after", TIMEOUT_MS, "ms");
      resolve(true);
    }, TIMEOUT_MS);
  });

const detectionPromise = (async () => {
    ...
});
 
return Promise.race([timeoutPromise, detectionPromise]);
```