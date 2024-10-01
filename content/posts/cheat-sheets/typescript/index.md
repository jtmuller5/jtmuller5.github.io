---
title: "TypeScript Cheat Sheet"
date: 2024-10-01T08:43:45-04:00
draft: false
categories: ["cheat-sheets"]
tags: ["typescript","cheat-sheet"]
---

# TypeScript Cheat Sheet

## 1. Basic Syntax

### Comments
```typescript
// Single-line comment

/*
   Multi-line
   comment
*/

/**
 * Documentation comment
 */
```

### Variables and Data Types
```typescript
// Type inference
let name = 'Bob';
let age = 30;

// Explicit typing
let name: string = 'Bob';
let age: number = 30;
let isStudent: boolean = true;
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 10];
let anyType: any = 'anything';
```

### Constants
```typescript
const PI: number = 3.14;
```

### Operators
```typescript
// Arithmetic: +, -, *, /, %, **
// Increment/decrement: ++, --
// Equality and relational: ==, ===, !=, !==, >, <, >=, <=
// Logical: &&, ||, !
// Nullish coalescing: ??
// Optional chaining: ?.
```

### Type Casting
```typescript
let x: any = 'hello';
let len: number = (x as string).length;
```

## 2. Control Structures

### Conditional Statements
```typescript
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
```typescript
for (let i = 0; i < 5; i++) {
  // code
}

while (condition) {
  // code
}

do {
  // code
} while (condition);

for (let item of iterable) {
  // code
}

iterable.forEach((item) => {
  // code
});
```

## 3. Functions

### Function Declaration and Definition
```typescript
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;
```

### Parameters and Return Values
```typescript
// Optional parameters
function greet(name: string, greeting?: string): string {
  greeting = greeting || 'Hello';
  return `${greeting}, ${name}!`;
}

// Default parameters
function createPoint(x: number = 0, y: number = 0): [number, number] {
  return [x, y];
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
```

### Function Overloading
```typescript
function padding(all: number): number;
function padding(topBottom: number, leftRight: number): number;
function padding(top: number, right: number, bottom: number, left: number): number;
function padding(...args: number[]): number {
  // Implementation
}
```

## 4. Data Structures

### Arrays
```typescript
let fruits: string[] = ['apple', 'banana', 'cherry'];
fruits.push('date');
let firstFruit: string = fruits[0];
```

### Objects
```typescript
let person: { name: string; age: number } = { name: 'Alice', age: 30 };
person.age = 31;
```

### Maps
```typescript
let scores = new Map<string, number>();
scores.set('Alice', 90);
scores.set('Bob', 85);
let aliceScore = scores.get('Alice');
```

### Sets
```typescript
let uniqueNumbers = new Set<number>([1, 2, 3, 4, 5]);
uniqueNumbers.add(6);
```

## 5. Object-Oriented Programming

### Classes and Objects
```typescript
class Person {
  constructor(public name: string, public age: number) {}

  sayHello(): void {
    console.log(`Hello, I am ${this.name}`);
  }
}

const person = new Person('Alice', 30);
person.sayHello();
```

### Inheritance
```typescript
class Student extends Person {
  constructor(name: string, age: number, public school: string) {
    super(name, age);
  }
}
```

### Interfaces and Abstract Classes
```typescript
interface Shape {
  getArea(): number;
}

abstract class AbstractShape implements Shape {
  abstract getArea(): number;
}

class Circle extends AbstractShape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

## 6. Exception Handling
```typescript
try {
  // code that might throw an error
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
} finally {
  // always executed
}
```

## 7. Modules
```typescript
// Exporting
export function sayHello(name: string): string {
  return `Hello, ${name}!`;
}

// Importing
import { sayHello } from './greetings';
```

## 8. Generics
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
```

## 9. Type Manipulation
```typescript
// Union types
type StringOrNumber = string | number;

// Intersection types
type Employee = Person & { employeeId: number };

// Type aliases
type Point = { x: number; y: number };

// Utility types
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };
```

## 10. Asynchronous Programming
```typescript
async function fetchData(): Promise<string> {
  // Simulating network request
  await new Promise(resolve => setTimeout(resolve, 2000));
  return 'Data';
}

async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## 11. Decorators
```typescript
function logged(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Example {
  @logged
  method(arg: string) {
    return `Hello, ${arg}`;
  }
}
```

## 12. Important Language-Specific Features
- Strong static typing
- Type inference
- Interfaces
- Enums
- Tuple types
- Null and undefined handling (strict null checks)

## 13. Best Practices and Style Guide
- Use `const` for values that won't be reassigned
- Use `let` for variables that will be reassigned
- Use PascalCase for type names and enum values
- Use camelCase for variable and function names
- Use meaningful and descriptive names

## 14. Useful Resources
- Official Documentation: https://www.typescriptlang.org/docs/
- TypeScript Playground: https://www.typescriptlang.org/play
- DefinitelyTyped (Type definitions): https://github.com/DefinitelyTyped/DefinitelyTyped
- TSConfig Reference: https://www.typescriptlang.org/tsconfig