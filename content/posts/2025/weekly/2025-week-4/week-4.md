---
title: "2025 Week 4"
date: 2025-01-20T07:01:54-05:00
draft: false
tags: ['llamaindex', 'pareto-principle']
categories: ["microblog"]
---

# Contents

## Links
- https://jamesclear.com/the-1-percent-rule: Pareto Principle, Winner-takes-all, Matthew Effect, the 1 Percent Rule
- https://pub.dev/packages/is_even_ai: For when you want to use AI but don't know how.
- https://ts.llamaindex.ai/: TypeScript support for LlamaIndex

## Quotes

> The fool doth think he is wise, but the wise man knows himself to be a fool.

William Shakespeare

## Thoughts

### Selling Knowledge
It's obvious to anyone in an economy that people do not want to spend money if they don't have to. People expect many things to be free, whether because of tradition or personal opinions or ignorance, and as some of those things are put up for sale, the response is bitter. Not only does the seller of the object expect money for something that was free in the buyer's mind, but there is now a rift between the two parties based on their misunderstanding.

Air is free. A midday walk is free. Bananas from the Amazon banana cart are free. Knowledge is free - or at least it should be.

People are selling knowledge and attempting to convince everyone around them that it's worth the dime. In reality, knowledge should be open, unlimited, and free of charge. Rather than selling knowledge as the product, use knowledge as a marketing tool. Organize knowledge. Clarify knowledge. Make it so knowledge can be easily ingested. And then give it away everywhere you can.

If you stand opposed to this, you may be a grifter.

### Pareto Principle

The Pareto Principle states that for many situations, 80% of the effects come from 20% of the causes. In the longevity space, sleeping consistently and eating healthy are usually enough to radically improve your life.

## Tips

### Fast Swap VS Code Themes

In VS Code, you can use the `Browse Color Themes in Marketplace` command to quickly peruse through hundreds of popular VS Code themes. Just use the up and down arrow keys to preview each theme in the list. Hit enter to download and apply it:

![VS Code Themes selector](image.png)

### Promise.race()

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

### Dots Per Inch

My [Corsair Scimitar](https://www.corsair.com/us/en/p/gaming-mouse/ch-9304211-na/scimitar-rgb-elite-optical-moba-mmo-gaming-mouse-ch-9304211-na) mouse started acting up this week so I had to completely deconstruct it to clean out two small cats worth of fur from around the scroll wheel. During my internet travels related to this procedure, I came across the acronym DPI, or [dots per inch](https://www.ign.com/articles/mouse-dpi-meaning-guide), that many mouses use to quantify their sensitivity. A low dots per inch value (ex. 800) results in slower, more precise cursor movements when the mouse moves in the physical world. A higher value obviously means the opposite - your cursor zings across the screen when the mouse is nudged one way or another. You can typically adjust this value using your mouse's software provider and/or by using the mouse settings on your computer.
