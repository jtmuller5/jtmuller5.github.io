---
title: "Hugo Code Highlight"
date: 2025-02-10T16:20:57-05:00
draft: false
categories: ["microblog"]
tags: ["tip"]
# hiddenInHomeList: true
---

After reading about Expressive code highlighting in Astro, I was curious if it was possible to achieve the same in Hugo. This post is proof that it is, but it wasn't as straightforward as I had hoped.

Since I'm using the PaperMod theme, highlighting doesn't work the same as it does in generic Hugo themes (PaperMod is doing some opininated things with the syntax highlighting). Nonetheless, all I had to do was add this CSS to the `themes/papermod/assets/css/post-single.css` file:

```css
.hl {
    background-color: rgba(70, 79, 109, 0.5);
    display: block;
    width: 100%;
}
```

And update the `markup` field in the `config.yaml` file to:

```yaml
markup:
  highlight:
    codeFences: true
    guessSyntax: true
    lineNos: true
    style: monokai
    hl_Lines: ""
```

The full list of configuration options can be found in the [Hugo documentation](https://gohugo.io/getting-started/configuration-markup/#highlight).

## Add Line Numbers

> {linenos=true,false,table}

```javascript {linenos=table}
export default function MyTitle() {
  return <h1>My Title</h1>
}
```

## Highlight Line Numbers

> {hl_lines=["1", "5-6"]}

```javascript {hl_lines=["1", "5-6"]}
export default function MyTitle() {
  return <h1>My Title</h1>
}

function MySubtitle() {
  return <h2>My Subtitle</h2>
}
```

## Start Line Numbers

> { linenos=true, linenostart=5}

```javascript { linenos=true, linenostart=5 }
export default function MyTitle() {
  return <h1>My Title</h1>
}
```

## Anchor Line Numbers

> {  linenos=true, anchorlinenos=true, lineanchors="prefix"}

Perhaps the most useless feature of all those provided via `highlight`, this one lets you add page anchors to your line numbers. The optional prefix adds the specified string to the beginning of each anchor.

```javascript { linenos=true, anchorlinenos=true, lineanchors="prefix"}
export default function MyTitle() {
  return <h1>My Title</h1>
}
```

Click on line 1 in the example and watch the URL update.


> [!CODE]
> More information about code highlighting in Hugo can be found in the [/Hugo documentation](https://gohugo.io/content-management/syntax-highlighting/#example-highlight-shortcode).
```