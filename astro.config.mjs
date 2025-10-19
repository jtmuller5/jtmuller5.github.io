// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightAutoSidebar from "starlight-auto-sidebar";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://joemuller.com",
  integrations: [
    starlight({
      title: "Joe Muller",
      logo: {
        src: "./src/assets/logo.png",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/jtmuller5",
        },
      ],
      components: {
        PageTitle: "./src/components/PageTitleWithCopyButton.astro",
      },
      plugins: [starlightAutoSidebar()],
      sidebar: [
        {
          label: "Blog",
          items: [
            { label: "Intro", slug: "blog/intro" },
            {
              label: "Essays",
              collapsed: true,
              autogenerate: { directory: "blog/essays" },
            },
            {
              label: "Claude Config",
              collapsed: true,
              autogenerate: { directory: "blog/claude-config" },
            },
            {
              label: "Talkdown",
              collapsed: true,
              autogenerate: { directory: "blog/talkdown" },
            },
          ],
        },
        {
          label: "Docs",
          autogenerate: { directory: "docs" },
        },
      ],
    }),
    react(),
  ],
});
