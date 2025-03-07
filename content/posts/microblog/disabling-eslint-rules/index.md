---
title: "Quick How-To: Enabling and Disabling ESLint Rules for TypeScript"
date: 2025-03-06T10:00:00-05:00
draft: false
categories: ["microblog", "typescript", "eslint"]
tags: ["typescript", "eslint", "linting"]
---

Configuring ESLint for TypeScript projects involves enabling and disabling specific rules to suit your project's needs. Here's a quick guide on how to manage these rules in your `eslint.config.mjs` file.

### Example Configuration

```javascript
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
```

### Key Points

- **Disabling Rules**: Set the rule to `"off"`. For example, to disable the `@typescript-eslint/no-explicit-any` rule:
  ```javascript
  "@typescript-eslint/no-explicit-any": "off",
  ```

- **Enabling Rules**: Set the rule to `"warn"` or `"error"`. For example, to enable the `@typescript-eslint/no-unused-vars` rule with a warning:
  ```javascript
  "@typescript-eslint/no-unused-vars": "warn",
  ```

> [!IMPORTANT]
> Adjusting ESLint rules helps maintain code quality and consistency. Customize the rules based on your project's requirements.