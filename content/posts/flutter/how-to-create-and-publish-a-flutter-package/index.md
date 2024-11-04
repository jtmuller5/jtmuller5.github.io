---
title: "How to Create and Publish a Flutter Package"
date: 2024-11-03T15:33:39-05:00
draft: false
categories: ["tutorials"]
tags: [flutter","jts"]
---

## Just The Steps
1. In the terminal, run the following command
```bash
flutter create --template=package my_package
```
2. Make your changes in the `lib` directory
3. Update the `pubspec.yaml` file with your package information. Here's an example:
```yaml
name: my_package
description: A new Flutter package
version: 0.0.1
homepage: https://example.com
repository:
    type: git
    url: https://github.com/me/example
```
4. Create an `example` directory with a sample Flutter app that demonstrates how to use your package
```bash
flutter create example --empty
```
Inside the `pubspec.yaml` file in the `example` directory, add the following:

```yaml
dependencies:
  my_package:
    path: ../
```

5. Run the following command to perform a dry run of publishing your package
```bash
flutter pub publish --dry-run
```
6. Run the following command to publish your package
```bash
flutter pub publish
```

## Reusable Tasks
In VS Code, you can create a new `tasks.json` file in the `.vscode` folder with the following content:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Dry Run",
      "type": "shell",
      "command": "flutter pub publish --dry-run",
      "problemMatcher": []
    },
    {
      "label": "Publish",
      "type": "shell",
      "command": "flutter pub publish",
      "problemMatcher": []
    }
  ]
}
```
With this setup, you should be able to run the tasks from the command palette by typing `Tasks: Run Task` and selecting the task you want to run.

## Resources
- https://docs.flutter.dev/packages-and-plugins/developing-packages