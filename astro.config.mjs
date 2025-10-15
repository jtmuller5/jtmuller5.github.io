// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightAutoSidebar from "starlight-auto-sidebar";

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
      plugins: [starlightAutoSidebar()],
      sidebar: [
        {
          label: "Blog",
          items: [
            { label: "Intro", slug: "blog/intro" },
            {
              label: "Projects",
              autogenerate: { directory: "blog/projects" },
            },
            {
              label: "Essays",
              autogenerate: { directory: "blog/essays" },
            },
          ],
        },
        {
          label: "Docs",
          autogenerate: { directory: "docs" },
        },
      ],
    }),
  ],
});
