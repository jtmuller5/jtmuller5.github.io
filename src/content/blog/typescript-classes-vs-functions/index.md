---
title: "TypeScript Classes vs Functions"
description: ""
date: 2026-05-04
draft: true
---
When deciding between a function and a class, ask yourself two questions:
- Will this function hold state between calls?
- Do I want multiple implementations of this function with variations?
If the answer is "No" to both of these, you should create a function.
