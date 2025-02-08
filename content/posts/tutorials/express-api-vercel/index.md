---
title: "Express API Vercel"
date: 2024-09-29T15:41:15-04:00
draft: false
categories: ["tutorials"]
tags: ["express","vercel", "api", "typescript"]
---

Welcome to this tutorial where we will create a simple API using TypeScript and deploy it using Vercel. This guide is suitable for beginners and assumes basic familiarity with Node.js. Let's dive in!

## Setting Up Your Project

1. **Create a New Directory:** Start by creating a new directory for your project. Open your terminal and run:
   ```bash
   mkdir chitter-vercel
   ```
   This creates a directory named `chitter-vercel`.

2. **Initialize Your Node.js Project:** Navigate into your new directory and initialize a Node.js project:
   ```bash
   cd chitter-vercel
   npm init
   ```
   Follow the prompts to create your `package.json` file.

3. **Initialize TypeScript:** To use TypeScript, initialize it by running:
   ```bash
   tsc --init
   ```
   This creates a `tsconfig.json` file with default TypeScript configurations.

4. **Create API Directory:** Create a directory where your API functions will reside:
   ```bash
   mkdir api
   ```

5. **Install Vercel Node:** Install the `@vercel/node` package as a dev dependency:
   ```bash
   npm install @vercel/node --save-dev
   ```

## Writing API Functions

1. **Create API Functions:** In the `api` directory, create two TypeScript files:
   - `createMessage.ts`
   - `getMessages.ts`
   
   These files will contain the logic for your API endpoints. For example:

```
import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

// Fetch works from OpenALEX
export default async function (req: VercelRequest, res: VercelResponse) {

  const fetchedResults = await axios.get("https://api.openalex.org/works?sample=20");
  console.log('openalex: ' + fetchedResults.data);
  
  // Send the fetched results
  res.status(201).send(fetchedResults.data);
}
```

## Deploying with Vercel

1. **Deploy Your Project:** Deploy your project to Vercel by simply running:
   ```bash
   vercel
   ```
   Follow the prompts to complete the deployment.

# Testing Your API

1. **Test Endpoints with Postman:** Use Postman to test your deployed API endpoints:
   - `GET https://chitter-vercel.vercel.app/api/getMessages`
   - `POST https://chitter-vercel.vercel.app/api/createMessage`

2. **Test Endpoints Locally:** To test your API locally, start the Vercel dev server:
   ```bash
   vercel dev
   ```
   Then, you can access your API at:
   - `http://localhost:3001/api/createMessage`
   - `http://localhost:3001/api/getMessages`

3. **Test Deployment:** Before finalizing, test your build with:
   ```bash
   vercel build -d
   ```

## Finalizing Your Project

1. **Promote to Production:**
   - Once you're satisfied with your project, go to 'Deployments' in your Vercel Dashboard and promote your deployment to production.

And there you have it! You've successfully set up, written, and deployed a simple API using TypeScript and Vercel. This tutorial provides a basic framework that you can expand upon for more complex applications. Happy coding!


## Resources
- https://vercel.com/docs/functions/serverless-functions/runtimes/node-js
- https://vercel.com/guides/using-express-with-vercel
- https://platform.openai.com/docs/actions
- https://platform.openai.com/docs/plugins/getting-started