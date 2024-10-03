---
title: "Python Cheat Sheet"
date: 2024-10-01T08:43:45-04:00
draft: false
categories: ["cheat-sheets"]
tags: ["python","cheat-sheet"]
---

# Python Cheat Sheet

## 1. Basic Syntax

### Comments
```python
# Single-line comment

"""
Multi-line
comment
"""

def function():
    """
    Docstring: used for function/class/module documentation
    """
    pass
```

### Variables and Data Types
```python
# Python uses dynamic typing
name = "Bob"  # str
age = 30  # int
height = 1.75  # float
is_student = True  # bool
numbers = [1, 2, 3]  # list
person = {"name": "Alice", "age": 25}  # dict
unique_numbers = {1, 2, 3}  # set
coordinates = (x, y)  # tuple
```

### Constants
```python
# Python doesn't have built-in constant types
# Convention: use uppercase for constants
PI = 3.14159
MAX_SIZE = 100
```

### Operators
```python
# Arithmetic: +, -, *, /, // (integer division), %, **
# Comparison: ==, !=, <, >, <=, >=
# Logical: and, or, not
# Identity: is, is not
# Membership: in, not in
```

### Type Conversion
```python
x = 10
y = float(x)  # Convert to float
s = str(x)  # Convert to string
```

## 2. Control Structures

### Conditional Statements
```python
if condition:
    # code
elif other_condition:
    # code
else:
    # code

# Ternary operator
x = value_if_true if condition else value_if_false

# Match statement (Python 3.10+)
match value:
    case pattern1:
        # code
    case pattern2:
        # code
    case _:
        # default case
```

### Loops
```python
for item in iterable:
    # code

for i in range(5):
    # code

while condition:
    # code

# List comprehension
squares = [x**2 for x in range(10)]

# Dictionary comprehension
square_dict = {x: x**2 for x in range(5)}
```

## 3. Functions

### Function Declaration and Definition
```python
def greet(name):
    return f"Hello, {name}!"

# Lambda function
multiply = lambda x, y: x * y
```

### Parameters and Return Values
```python
# Default parameters
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Arbitrary arguments
def sum_all(*args):
    return sum(args)

# Keyword arguments
def person_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Type hinting (Python 3.5+)
def add(a: int, b: int) -> int:
    return a + b
```

## 4. Data Structures

### Lists
```python
fruits = ['apple', 'banana', 'cherry']
fruits.append('date')
first_fruit = fruits[0]
sliced_fruits = fruits[1:3]  # ['banana', 'cherry']
```

### Dictionaries
```python
person = {'name': 'Alice', 'age': 30}
person['city'] = 'New York'
age = person.get('age')
```

### Sets
```python
unique_numbers = {1, 2, 3, 4, 5}
unique_numbers.add(6)
```

### Tuples
```python
point = (10, 20)
x, y = point  # Unpacking
```

## 5. Object-Oriented Programming

### Classes and Objects
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name}"

person = Person("Alice", 30)
print(person.greet())
```

### Inheritance
```python
class Student(Person):
    def __init__(self, name, age, school):
        super().__init__(name, age)
        self.school = school
```

### Encapsulation
```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Protected attribute

    @property
    def balance(self):
        return self._balance
```

## 6. Exception Handling
```python
try:
    # code that might raise an exception
except SpecificError as e:
    # handle specific exception
except Exception as e:
    # handle any exception
else:
    # executed if no exception occurs
finally:
    # always executed
```

## 7. File I/O
```python
# Reading
with open('file.txt', 'r') as file:
    content = file.read()

# Writing
with open('file.txt', 'w') as file:
    file.write('Hello, Python!')
```

## 8. Modules and Packages
```python
# Importing
import math
from datetime import datetime
import numpy as np

# Creating a module
# In mymodule.py
def my_function():
    pass

# Using the module
import mymodule
mymodule.my_function()
```

## 9. Standard Library
- `os`: Operating system interface
- `sys`: System-specific parameters and functions
- `datetime`: Date and time handling
- `math`: Mathematical functions
- `random`: Generate random numbers
- `json`: JSON encoder and decoder
- `re`: Regular expressions

## 10. Concurrency
```python
# Threading
import threading

def worker():
    print("Worker thread")

thread = threading.Thread(target=worker)
thread.start()

# Asyncio (Python 3.5+)
import asyncio

async def main():
    print('Hello')
    await asyncio.sleep(1)
    print('World')

asyncio.run(main())
```

## 11. Context Managers
```python
class MyContext:
    def __enter__(self):
        print("Entering context")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting context")

with MyContext() as ctx:
    print("Inside context")
```

## 12. Important Language-Specific Features
- List/Dict/Set comprehensions
- Generators and iterators
- Decorators
- Type hinting (Python 3.5+)
- f-strings (Python 3.6+)
- Walrus operator := (Python 3.8+)

## 13. Best Practices and Style Guide
- Follow PEP 8 style guide
- Use meaningful variable and function names
- Write docstrings for functions, classes, and modules
- Use virtual environments for project isolation
- Prefer `import` over `from ... import *`

## 14. Useful Resources
- Official Documentation: https://docs.python.org/
- Python Package Index (PyPI): https://pypi.org/
- Real Python Tutorials: https://realpython.com/
- PEP 8 Style Guide: https://pep8.org/