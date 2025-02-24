---
title: "Naming Things Better"
date: 2025-02-16T14:31:57-05:00
draft: false
categories: ["microblog"]
tags: ["link"]
# hiddenInHomeList: true
---

There's a section in the [Electron docs on naming things](https://www.electronjs.org/docs/latest/development/coding-style#naming-things) that I thought  was worth saving. 

- If a module is a class or can be instantiated as one, name it using `PascalCase`
- If a module is a set of APIs or utils, name it using `camelCase`

AirBnB also has a section on [naming conventions](https://github.com/airbnb/javascript?tab=readme-ov-file#naming-conventions) which generally offers the same guidance. They go one step further and note that file names should exactly match the main export of that file:

```ts
// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;
```

Import this like so:

```ts
import CheckBox from './CheckBox'; // PascalCase export/import/filename
```