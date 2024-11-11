---
title: "Create a Chrome Extension With Vuejs"
date: 2024-11-10T12:44:58-05:00
draft: true
categories: ["tutorials"]
tags: ["chrome-extensions", "vuejs"]
---

## Setup

To start, create a new folder for your project:

```bash
mkdir vue-chrome-extension
```

Next, create the Vue app:

```bash
npm create vue@latest .

Vue.js - The Progressive JavaScript Framework

✔ Package name: … vue-chrome-extension
✔ Add TypeScript? …Yes
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? …Yes
✔ Add Pinia for state management? … No
✔ Add Vitest for Unit Testing? … No
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? › Yes
✔ Add Prettier for code formatting? … Yes
```

In the `public` folder, create a `manifest.json` file with your extension's information

```json
{
  "manifest_version": 3,
  "name": "Your Extension Name",
  "version": "1.0",
  "description": "A brief description of your extension",
  "permissions": [
    "activeTab"
  ],
  "background": {
    "service_worker": "dist/background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "48": "images/icon48.png",
      "128": "images/icon128.png"
    }
  },
  "icons": {
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  }
}
```

To quickly add icons to the project, generate one [here](https://perchance.org/ai-icon-generator) and then visit [icon128](https://icon128.com/) to generate the different sizes. Create a folder called `images` in the root of the project and place the icons there.

Next, install the Chrome extension types:

```bash
npm install --save-dev @types/chrome
```

Finally, create a `background.ts` file in the `src` folder:

```typescript


