---
title: "Flutter Shaders vs Code Setup"
date: 2024-10-28T10:18:40-04:00
draft: true
categories: ["tutorials"]
tags: ["flutter","shaders"]
---
This blog post will cover how to set up your VS Code environment for Flutter development with shaders.

To start, install the glslc command line compiler from this link: https://github.com/google/shaderc?tab=readme-ov-file#downloads

Save the glslangValidator executable to a location on your computer and note the path.

Next, install the following two VS Code extensions:

- [Shader languages support for VS Code](https://marketplace.visualstudio.com/items?itemName=slevesque.shader)
- [Shaderc GLSL Linter](https://marketplace.visualstudio.com/items?itemName=majicDave.vscode-shaderc)
- [ASI for GLSL](https://marketplace.visualstudio.com/items?itemName=DrDesten.asi-glsl)

In the GLSL Lint extension settings, set the path to the glslangValidator executable. My extension settings look like this:

```json
{
    "glsllint.glslangValidatorPath": "/Users/josephmuller/Dev/glslang-main-osx-Release/bin/glslangValidator",
  "glsllint.additionalStageAssociations": {
    ".fs": "frag",
    ".vs": "vert"
  }
}
```
