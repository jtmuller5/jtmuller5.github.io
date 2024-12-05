---
title: "Converting a JavaScript Package to TypeScript: A Step-by-Step Guide"
date: 2024-12-05T09:18:17-05:00
draft: false
categories: ["tutorial"]
tags: ["typescript", "javascript", "npm"]
---

# Contents

TypeScript has become increasingly popular due to its ability to bring static typing to JavaScript, enhancing code quality and developer productivity. Converting your existing JavaScript package to TypeScript can make it more robust and easier to maintain. In this guide, we’ll walk through the essential steps to transform your JavaScript package into a TypeScript package.

## 1. Install TypeScript and Necessary Dependencies

Begin by adding TypeScript and type definitions for Node.js to your development dependencies.

```bash
npm install --save-dev typescript @types/node
```

	•	typescript: The TypeScript compiler.
	•	@types/node: Type definitions for Node.js modules like fs and path.

## 2. Initialize a tsconfig.json File

Create a tsconfig.json file at the root of your project to configure the TypeScript compiler options.

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "CommonJS",
    "outDir": "dist",
    "strict": true,
    "declaration": true,
    "sourceMap": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

	•	target: Specifies the ECMAScript version.
	•	module: Module system to use.
	•	outDir: Output directory for compiled files.
	•	strict: Enables strict type-checking options.
	•	declaration: Generates .d.ts files alongside JavaScript files.
	•	include: Specifies the paths to include.

## 3. Restructure Your Project

Organize your project files into src and dist directories.

```
your-package/
├── src/
│   └── index.ts
├── dist/
├── package.json
└── tsconfig.json
```

	•	Move source files: Place all your .js files into the src directory and rename them to .ts.
	•	Output files: Compiled .js and .d.ts files will be output to the dist directory.

## 4. Update Your Code to TypeScript

Convert your JavaScript code to TypeScript by adding type annotations and fixing any type errors.

Example Conversion:

```typescript
// src/index.ts
import { writeFileSync } from 'fs';

export class Greeter {
  private greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet(): string {
    return `Hello, ${this.greeting}!`;
  }
}
```

	•	Type Annotations: Add types to variables, function parameters, and return values.
	•	Export Statements: Use ES6 module syntax.

## 5. Adjust Your package.json

Update your package.json to reflect the new structure and scripts.

```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/**/*"
  ],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build",
    "test": "mocha dist/test.js",
    "lint": "eslint src --ext .ts"
  },
  "devDependencies": {
    "typescript": "^4.5.4",
    "@types/node": "^16.11.7",
    // other devDependencies
  }
}
```

	•	main: Points to the compiled JavaScript file.
	•	types: Points to the generated type declaration file.
	•	files: Specifies which files to include when publishing.
	•	scripts: Adds a build script and a prepublish script to compile TypeScript before publishing.

## 6. Update ESLint Configuration (Optional)

If you’re using ESLint, install TypeScript plugins and adjust your ESLint configuration.

```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

.eslintrc.json:

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "plugins": ["@typescript-eslint"],
  "rules": {
    // Your custom rules
  }
}
```

## 7. Compile Your TypeScript Code

Run the build script to compile your TypeScript code into JavaScript.

```bash
npm run build
```

	•	Output: Compiled files are placed in the dist directory.

## 8. Update or Write Tests

Adjust your tests to work with TypeScript or the compiled JavaScript.
	•	Option 1: Write tests in TypeScript and compile them.
	•	Option 2: Use ts-node to run TypeScript tests without compiling.

```bash
npm install --save-dev ts-node
```

Update test script:

```json
"test": "mocha -r ts-node/register src/test.ts"
```

## 9. Ensure Type Declarations are Published

Make sure the generated .d.ts files are included in your package.
	•	Check: Verify that dist/index.d.ts exists after building.
	•	Include in Package: Ensure your package.json includes the dist directory in the files field.

## 10. Test Your Package Locally

Before publishing, test your package in a separate project.
	•	Use npm link:

### In your package directory
npm link

### In your test project directory
npm link your-package-name


	•	Import and Use:

```typescript
import { Greeter } from 'your-package-name';

const greeter = new Greeter('World');
console.log(greeter.greet());
```     

## 11. Publish Your Updated Package

When you’re confident everything works:
	•	Update the Version: Increment the version number in package.json.
	•	Publish:

npm publish

## 12. Communicate Changes to Users

Update your README and documentation to inform users about the TypeScript support and any changes.
	•	Usage Examples: Provide examples in both JavaScript and TypeScript.
	•	Migration Guide: If there are breaking changes, offer guidance on how to adapt.

## Summary

By following these steps, you’ve successfully converted your JavaScript package to TypeScript:
	1.	Installed TypeScript and dependencies
	2.	Initialized TypeScript configuration
	3.	Restructured project files
	4.	Updated code with type annotations
	5.	Adjusted package settings
	6.	Configured ESLint for TypeScript
	7.	Compiled the TypeScript code
	8.	Updated or wrote new tests
	9.	Ensured type declarations are included
	10.	Tested the package locally
	11.	Published the updated package
	12.	Communicated changes to users

Benefits

	•	Type Safety: Catch errors at compile time.
	•	Better IDE Support: Improved autocompletion and navigation.
	•	Easier Maintenance: Clearer contracts and documentation.

Final Tips

	•	Stay Up-to-Date: Keep your dependencies current to benefit from the latest features and fixes.
	•	Use Strict Mode: Embrace TypeScript’s strict mode for better type safety.
	•	Community Resources: Utilize the vast TypeScript community for support and best practices.

By converting your package to TypeScript, you’re not only enhancing its quality but also providing a better experience for developers who use it.