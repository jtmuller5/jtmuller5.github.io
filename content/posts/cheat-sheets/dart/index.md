---
title: "Dart Cheat Sheet"
date: 2024-10-01T08:44:33-04:00
draft: false
categories: ["cheat-sheets"]
tags: ["dart","cheat-sheet"]
---

# Dart Cheat Sheet

## 1. Basic Syntax

### Comments
```dart
// Single-line comment

/*
   Multi-line
   comment
*/

/// Documentation comment
```

### Variables and Data Types
```dart
// Type inference
var name = 'Bob';
Object obj = 'Bob';
dynamic dyn = 'Bob';

// Explicit typing
String name = 'Bob';
int age = 30;
double height = 1.75;
bool isStudent = true;
List<int> numbers = [1, 2, 3];
Map<String, int> scores = {'Bob': 90, 'Alice': 95};
```

### Constants
```dart
const pi = 3.14;
final currentTime = DateTime.now();
```

### Operators
```dart
// Arithmetic: +, -, *, /, ~/ (integer division), %
// Increment/decrement: ++, --
// Equality and relational: ==, !=, >, <, >=, <=
// Logical: &&, ||, !
// Cascade: ..
// Null-aware: ??, ?.
```

### Type Casting
```dart
int x = 1;
double y = x.toDouble();
String s = x.toString();
```

## 2. Control Structures

### Conditional Statements
```dart
if (condition) {
  // code
} else if (otherCondition) {
  // code
} else {
  // code
}

switch (variable) {
  case value1:
    // code
    break;
  case value2:
  case value3:
    // code
    break;
  default:
    // code
}
```

### Loops
```dart
for (var i = 0; i < 5; i++) {
  // code
}

while (condition) {
  // code
}

do {
  // code
} while (condition);

for (var item in iterable) {
  // code
}

iterable.forEach((item) {
  // code
});
```

## 3. Functions

### Function Declaration and Definition
```dart
int add(int a, int b) {
  return a + b;
}

// Arrow function
int multiply(int a, int b) => a * b;
```

### Parameters and Return Values
```dart
// Optional positional parameters
String greet(String name, [String? greeting]) {
  greeting ??= 'Hello';
  return '$greeting, $name!';
}

// Named parameters
void printPerson({required String name, int? age}) {
  print('Name: $name, Age: ${age ?? "Unknown"}');
}
```

### Anonymous Functions / Lambdas
```dart
var list = ['apple', 'banana', 'cherry'];
list.forEach((item) => print(item));
```

## 4. Data Structures

### Lists
```dart
var fruits = ['apple', 'banana', 'cherry'];
fruits.add('date');
var firstFruit = fruits[0];
```

### Maps
```dart
var scores = {'Alice': 90, 'Bob': 85};
scores['Charlie'] = 95;
var aliceScore = scores['Alice'];
```

### Sets
```dart
var uniqueNumbers = {1, 2, 3, 4, 5};
uniqueNumbers.add(6);
```

## 5. Object-Oriented Programming

### Classes and Objects
```dart
class Person {
  String name;
  int age;

  Person(this.name, this.age);

  void sayHello() {
    print('Hello, I am $name');
  }
}

var person = Person('Alice', 30);
person.sayHello();
```

### Inheritance
```dart
class Student extends Person {
  String school;

  Student(String name, int age, this.school) : super(name, age);
}
```

### Interfaces and Abstract Classes
```dart
abstract class Shape {
  double getArea();
}

class Circle implements Shape {
  double radius;
  Circle(this.radius);

  @override
  double getArea() => 3.14 * radius * radius;
}
```

## 6. Exception Handling
```dart
try {
  // code that might throw an exception
} on SpecificException catch (e) {
  // handle specific exception
} catch (e) {
  // handle any exception
} finally {
  // always executed
}
```

## 7. File I/O
```dart
import 'dart:io';

// Reading
File file = File('example.txt');
String contents = await file.readAsString();

// Writing
await file.writeAsString('Hello, Dart!');

// Working with directories
Directory dir = Directory('path/to/directory');
await for (var entity in dir.list()) {
  print(entity.path);
}
```

## 8. Modules and Packages
```dart
// Importing
import 'dart:math';
import 'package:http/http.dart' as http;

// Exporting
export 'src/my_module.dart';
```

## 9. Standard Library
- `dart:core`: Built-in types, collections, and other core functionality
- `dart:async`: Asynchronous programming
- `dart:math`: Mathematical constants and functions
- `dart:io`: I/O for non-web applications
- `dart:convert`: Encoders and decoders for JSON and UTF-8

## 10. Asynchronous Programming
```dart
Future<String> fetchData() async {
  // Simulating network request
  await Future.delayed(Duration(seconds: 2));
  return 'Data';
}

void main() async {
  var data = await fetchData();
  print(data);
}
```

## 11. Memory Management
- Dart uses automatic garbage collection

## 12. Important Language-Specific Features
- Null safety
- Futures and Streams for asynchronous programming
- Mixins for reusing code in multiple class hierarchies

## 13. Best Practices and Style Guide
- Use lowerCamelCase for variables and functions
- Use UpperCamelCase for classes and types
- Use underscores for libraries and file names
- Prefer using `const` for compile-time constants

## 14. Useful Resources
- Official Documentation: https://dart.dev/guides
- DartPad (Online Editor): https://dartpad.dev/
- Pub.dev (Package repository): https://pub.dev/
- Flutter (UI framework using Dart): https://flutter.dev/