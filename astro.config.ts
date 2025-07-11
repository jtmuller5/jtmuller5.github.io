import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

// https://astro.build/config
export default defineConfig({
  site: "https://joemuller.com",
  integrations: [
    partytown({
      config: {
        forward: [
          "amplitude",
        ],
      },
    }),
    // ExpressiveCode should come before MDX
    expressiveCode({
      themes: ["github-dark", "github-light"],
      themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
      useDarkModeMediaQuery: true,
      styleOverrides: {
        // Make code blocks smaller
        codeFontSize: "0.8rem",
        uiFontSize: "0.8rem",
      },
      defaultProps: {
        // Enable word wrap
        wrap: true,
        // Show line numbers for longer code blocks
        showLineNumbers: false,
      },
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
    }),
    mdx(),
    sitemap(),
  ],
  // Remove the old markdown config since expressive-code handles syntax highlighting
});
