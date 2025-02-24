---
title: "Creating an Electron App With Vite React and Typescript"
date: 2025-02-16T07:12:28-05:00
draft: true
categories: ["tutorial"]
tags: []
# hiddenInHomeList: true
---

Despite the fact that CRA was just deprecated and TypeScript is objectively superior to JavaScript, there is surprisingly no easy way to "just get started" with Vite, React, and TypeScript in Electron. The closest thing to a beginner-friendly template that exists is the [Vite + TypeScript Electron Forge template](https://www.electronforge.io/templates/vite-+-typescript), but even that is experimental and riddled with incomplete code.

This article will show you how to get started using an Electron stack that should be more popular.

## Electron Overview

An Electron app consists of 2 types of processes. The main process runs in a Node.js environment and orchestrates communication between the app's windows. The [renderer processes](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process) run in a web environment and display the contents of your app.

## Create the Project

The easiest way to get started is to use the [Vite + TypeScript Electron Forge template](https://www.electronforge.io/templates/vite-+-typescript):

```bash
npx create-electron-app@latest my-new-app --template=vite-typescript
```

In addition to scaffolding the bulk of the Electron app, this command will also create 3 `vite.config` files at the root of your project:

- vite.main.config.ts
- vite.renderer.config.ts
- vite.preload.config.ts

## Setup Electron Forge

Electron Forge is an all-in-one tool for packaging and distributing Electron applications.


https://www.electronforge.io/config/configuration

## Setup TypeScript

Since the full Electron app will consist of a "client" React app and a "main" Node process, we'll need to create 2 different `tsconfig.json` files to accommodate the differences. The command to create your Vite app with React and TypeScript will create this file for you in the `client` subdirectory.

In the `main` subdirectory, you can use the basic `tsconfig.json` file that gets generated when you run `tsc --init`:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "../../dist",
    "strict": true,
    "sourceMap": true
  },
  "include": ["./"]
}
```

At the root of your project, create a third `tsconfig.json` file that references the two nested ones:

```json
{
  "files": [],
  "references": [{ "path": "src/main" }, { "path": "src/client" }]
}
```

## Create the Client

```bash
npm create vite@latest client -- --template react-ts
```

## Create the Main File


## Setup Scripts

In the `package.json` file at the root of the project, update the start script to run both the React app and the electron app. You will need to install the [wait-on](https://www.npmjs.com/package/wait-on) package which gives you tools for waiting for files, ports, and sockets.

## Package The App

Install the Vite plugin:

```bash
npm install --save-dev @electron-forge/plugin-vite
```

## Questions

### What working directory does Vite use?

By default, Vite uses the current directory as the root. This is also where it expects there to be an `index.html` file.

The `vite.config.ts` file can specify a different [root](https://v2.vitejs.dev/config/#root) directory. Read more about the [project root here](https://v2.vitejs.dev/guide/#index-html-and-project-root). 

In this example, where the entire Vite React app is in `src/client`, you need to update the `vite.config.ts` file to specify the root:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  root: "src/client", // Set this
  build: {
    outDir: "../../dist/client",
    emptyOutDir: true,
  },
});
```