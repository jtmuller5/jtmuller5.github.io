---
title: "VS Code SVG Extension"
date: 2025-02-11T09:50:31-05:00
draft: false
categories: ["microblog"]
tags: ["link"]
# hiddenInHomeList: true
---

I spent 3-4 hours creating a Flutter app to edit and export SVGs only to find a VS Code extension that does both of these things in a few clicks.

The extension is simply called [SVG](https://marketplace.visualstudio.com/items?itemName=jock.svg) and it has almost 2 million downloads. The best part is that it allows you to edit SVGs directly in the editor and export them as PNGs. 

After installing the extension, right-click on one of your PNGs and select "Preview SVG" to start editing. This will open a new tab with the SVG preview and a toolbar at the top. In the toolbar, select the "Code interactive" button and click on any element in the SVG to start editing it. This will open a panel on the left with the SVG code.

![Live SVG editing](image.png)

To export, just click the "Export PNG" icon all the way to the right.

> [!DANGER]
> This experience was a good reminder that the app layer is where the value is. VS Code is not just an IDE; it's a platform that can be extended to do almost anything.