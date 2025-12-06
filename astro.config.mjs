// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://joemuller.com",
  integrations: [
    starlight({
      title: "Joe Muller",
      favicon: "/public/favicon.ico",
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
      plugins: [
        starlightBlog({
          prevNextLinksOrder: "reverse-chronological",
        }),
      ],
    }),
    react(),
  ],
});
