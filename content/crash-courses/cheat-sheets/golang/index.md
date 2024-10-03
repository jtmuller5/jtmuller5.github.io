---
title: "Golang Cheat Sheet"
date: 2024-10-01T08:43:45-04:00
draft: false
categories: ["cheat-sheets"]
tags: ["go","golang","cheat-sheet"]
---

# Golang Cheat Sheet

## 1. Basic Syntax

### Comments
```go
// Single-line comment

/*
   Multi-line
   comment
*/
```

### Variables and Data Types
```go
var x int = 5
y := 10 // Type inference

// Basic types
var (
    a bool = true
    b int = 10
    c float64 = 3.14
    d string = "Hello"
)
```

### Constants
```go
const Pi = 3.14
const (
    StatusOK = 200
    StatusNotFound = 404
)
```

### Operators
```go
// Arithmetic: +, -, *, /, %, ++, --
// Comparison: ==, !=, <, >, <=, >=
// Logical: &&, ||, !
// Bitwise: &, |, ^, <<, >>
```

### Type Casting
```go
i := 42
f := float64(i)
s := string(i)
```

## 2. Control Structures

### Conditional Statements
```go
if x > 0 {
    // code
} else if x < 0 {
    // code
} else {
    // code
}

switch day {
case "monday":
    // code
case "tuesday", "wednesday":
    // code
default:
    // code
}
```

### Loops
```go
for i := 0; i < 10; i++ {
    // code
}

for condition {
    // while loop equivalent
}

for {
    // infinite loop
}

for index, value := range collection {
    // range loop
}
```

### Break and Continue Statements
```go
for {
    if condition {
        break
    }
    if otherCondition {
        continue
    }
}
```

## 3. Functions

### Function Declaration and Definition
```go
func greet(name string) string {
    return "Hello, " + name
}
```

### Parameters and Return Values
```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}
```

### Anonymous Functions / Lambdas
```go
func() {
    fmt.Println("Anonymous function")
}()

add := func(a, b int) int {
    return a + b
}
```

### Scope and Closures
```go
func adder() func(int) int {
    sum := 0
    return func(x int) int {
        sum += x
        return sum
    }
}
```

## 4. Data Structures

### Arrays/Slices
```go
var arr [5]int
slice := []int{1, 2, 3, 4, 5}
slice = append(slice, 6)
```

### Maps
```go
m := make(map[string]int)
m["key"] = 42
value, exists := m["key"]
```

### Sets
```go
// Go doesn't have a built-in set type
// Use a map[Type]bool instead
set := make(map[string]bool)
set["item"] = true
```

## 5. Object-Oriented Programming

### Structs and Methods
```go
type Rectangle struct {
    width, height float64
}

func (r Rectangle) Area() float64 {
    return r.width * r.height
}
```

### Interfaces
```go
type Shape interface {
    Area() float64
}
```

## 6. Error Handling
```go
if err != nil {
    log.Fatal(err)
}

// Custom errors
type MyError struct {
    message string
}

func (e *MyError) Error() string {
    return e.message
}
```

## 7. File I/O
```go
// Reading
data, err := ioutil.ReadFile("file.txt")

// Writing
err := ioutil.WriteFile("file.txt", data, 0644)

// Working with directories
files, err := ioutil.ReadDir(".")
```

## 8. Modules and Packages
```go
import (
    "fmt"
    "math"
)

// Creating modules
// In go.mod file:
// module example.com/mymodule
```

## 9. Standard Library
- fmt: Formatted I/O
- os: Operating system functionality
- io: Basic I/O interfaces
- net/http: HTTP client and server implementations
- encoding/json: JSON encoding and decoding
- time: Time and duration functions

## 10. Concurrency
```go
// Goroutines
go function()

// Channels
ch := make(chan int)
ch <- 42    // Send
value := <-ch // Receive

// Select
select {
case msg1 := <-ch1:
    // Use msg1
case msg2 := <-ch2:
    // Use msg2
default:
    // Run if no channel is ready
}
```

## 11. Memory Management
- Go uses automatic garbage collection
- `defer` keyword for cleanup operations

## 12. Important Language-Specific Features
- Goroutines and Channels
- Defer statements
- Panic and Recover
- go generate

## 13. Best Practices and Style Guide
- Use gofmt for standard formatting
- Follow naming conventions (camelCase for unexported, PascalCase for exported)
- Prefer composition over inheritance
- Handle errors explicitly

## 14. Useful Resources
- Official Documentation: https://golang.org/doc/
- Go by Example: https://gobyexample.com/
- Go Playground: https://play.golang.org/
- Popular packages: gin-gonic/gin, spf13/cobra, gorm.io/gorm