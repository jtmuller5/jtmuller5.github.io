---
title: "Pass Args to Npm Script"
date: 2025-02-08T15:09:32-05:00
draft: false
categories: ["microblog"]
tags: []
# hiddenInHomeList: true
---

Adding scripts to your `package.json` file is an efficiency necessity, but what makes these scripts even more effective is the ability to [pass arguments](https://github.com/npm/npm/pull/5518) to them while still using the abbreviated `npm run {command}` format. To do it, simply append `--` after the npm script and then add your arguments as you would if you were running the script with node:

```bash
npm run start -- --foo=3
```