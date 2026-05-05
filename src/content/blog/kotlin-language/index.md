---
title: "Kotlin Language"
description: "Kotlin is a modern language that's concise, multiplatform, and interoperable with Java and other languages."
date: 2026-05-03
draft: true
tags:
  - kotlin
  - kv
---

Kotlin is a multi-paradigm language that combines object-oriented programming and functional programming features. In this way it is similar to Dart.

## Types

Kotlin has type inference but variables can be assigned a type at instantiation:
```
val d: Int
val name: String ="hello"
```

Type declaration happens after the variable name like in [[TypeScript]]

To create a read-only [list](https://kotlinlang.org/docs/kotlin-tour-collections.html#list), use `listOf()`. To create a mutable list, use `mutableListOf()`. During declaration you can indicate what type of items can be included in a list using `<>`.

## Control Flow

Kotlin's `when` is like many other languages' `switch` statement:
```kotlin
val obj = "Hello"

when (obj) {
  "1" -> println("One")
  "Hello" -> println("Greeting")
  else -> println("Unknown")
}
```

Interestingly, `when` can be used to assign a value to a variable.

To create a range, use the `..` operator. `1..4` is equivalent to `1,2,3,4`. To declare a range in reverse order, use `downTo` like `4 downto 1`.
## Running a File

To run a Kotlin file, use the [Kotlin command-line compiler](https://kotlinlang.org/docs/command-line.html). Install it using [[Homebrew]]:

```bash
brew update
brew install kotlin
```

After installing the CLI, write your program and then run it using the following command:
````
kotlinc hello.kt -include-runtime -d hello.jar
````

This generates a `.jar` file which can then be run directly:
```
java -jar hello.jar
```

To be honest, this is not ideal.

## Android Studio Setup

Important keyboard shortcuts:
- Find Action (Cmd + t)
- Format code
- Context actions (inline suggested actions, yellow squiggles)

To open files with a single click, open the settings menu in the sidebar and check "Open Files with Single Click":

![[Pasted image 20260503162906.png]]

To clean up the sidebar and prevent `nested.directories`:

![[Pasted image 20260503155406.png]]