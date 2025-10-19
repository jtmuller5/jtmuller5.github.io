---
title: "Copy as Markdown"
description: "Step-by-step guide to add a Copy as Markdown button to your Starlight docs"
lastUpdated: 2025-10-19
---

## Create the React Component

Since Astro components cannot provide interactivity, you need to create a React component called `CopyAsMarkdown.tsx` which will handle copying the page content to the user's clipboard.

This component should accept the page's title and content as props:

```ts title="CopyAsMarkdown.tsx"
import React, { Component, useState } from "react";

export default function CopyAsMarkdown({
  title,
  content,
  children,
}: {
  title: string;
  content?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy content: ", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <h1 id={"_top"}>{title}</h1>
      <button
        onClick={handleCopy}
        disabled={!content}
        style={{
          padding: "6px 12px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: copied ? "#4CAF50" : "#f9f9f9",
          color: copied ? "white" : "#333",
          cursor: content ? "pointer" : "not-allowed",
          opacity: content ? 1 : 0.5,
          transition: "all 0.2s ease",
          alignItems: "center",
          display: "flex",
          gap: "6px",
        }}
      >
        {children && children}
        {copied ? "Copied!" : "Copy as Markdown"}
      </button>
    </div>
  );
}
```


## Create the Astro Component

Create a new component in `src/components` to replace the [default PageTitle component](https://starlight.astro.build/reference/overrides/#pagetitle). 

This component will use the React component from above. In order to make the React component interactive, you need to add the `client:load` directive:

```ts title="PageTitleWithCopyButton.astro"
---
import { Icon } from "@astrojs/starlight/components";
import CopyAsMarkdown from "./CopyAsMarkdown";
---

<CopyAsMarkdown
  client:load
  title={Astro.locals.starlightRoute.entry.data.title}
  content={Astro.locals.starlightRoute.entry.body}
>
  <Icon name="document" />
</CopyAsMarkdown>

<style>
  @layer starlight.core {
    h1 {
      margin-top: 1rem;
      font-size: var(--sl-text-h1);
      line-height: var(--sl-line-height-headings);
      font-weight: 600;
      color: var(--sl-color-white);
    }
  }
</style>
```

## Override the PageTitle Component

In your `astro.config.mjs` file, override the default PageTitle component with the new component you just created:

```diff
// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
+      components: {
+        PageTitle: "./src/components/PageTitleWithCopyButton.astro",
+      },
    }),
    react(),
  ],
});

```

