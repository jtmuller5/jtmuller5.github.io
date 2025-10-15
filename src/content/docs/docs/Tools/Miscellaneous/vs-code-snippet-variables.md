---
title: "VS Code Snippet Variables"
description: "Crash course on using VS Code snippets to write code faster"
lastUpdated: 2025-07-15
---



You should use VS Code snippets more than you do and that's not just an opinion.

The [Snippet Syntax section](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_snippet-syntax) of the VS Code snippet docs is a minefield of knowledge bombs.

## Common Transformations

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/}",
			"${TM_FILENAME_BASE/(.*)/${1:/camelcase}/}",
			"${TM_FILENAME_BASE/(.*)/${1:/upcase}/}",
			"${TM_FILENAME_BASE/(.*)/${1:/downcase}/}",
			"${TM_FILENAME_BASE/(.*)/${1:/capitalize}/}",
		],
		"description": "Snippet Test"
}
```

For the file `test_test.dart`, this outputs:

```
TestTest
testTest
TEST_TEST
test_test
Test_test
```

## Step by Step

### Placeholders

A [placeholder](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_placeholders) in VS Code is a "tabstop" that appears in the rendered snippet. A tabstop is simply a cursor position within a snippet body.

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"$1"
		],
		"description": "Snippet Test"
	}
```

The output of this snippet is basically nothing. The `$1` placeholder is the only thing that gets rendered. In other words, use this snippet if you want to go slow.

### Placeholder with Default Value

You can define a default value for a placeholder using the `${1:default}` syntax.

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${1:Hello}"
		],
		"description": "Snippet Test"
	}
```    

This snippet outputs the word "Hello" but because it's a placeholder, the entire word is selected so you can easily replace it.

### Multiple Placeholders

Additional placeholders can be added to the snippet using the same syntax but different numbers.

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${1:Hello} ${2:World}"
		],
		"description": "Snippet Test"
	}
```

When rendered, the initial output will be "Hello World" but you'll be able to tab to and change both words separately.

Note that the placeholder numbers do not have to start at 1, nor do they have to be sequential. This snippet works the same as the one above:

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${3:Hello} ${40:World}"
		],
		"description": "Snippet Test"
	}
```    

### Variables

While "placeholders" are numbers, [variables](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables) in VS Code snippets have specific names and correspond to specific values. For example, this snippet:

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND"
		],
		"description": "Snippet Test"
	}
```    

Will output something like this:
```
2025-01-11 13:27:27
```

Each of the variables (e.g. CURRENT_YEAR, CURRENT_MONTH, etc) was replaced with a real value.

### Custom Variables

This part is admittedly a bit confusing. You can technically use custom variable names but they will be treated as placeholders that you can tab to and change as described above. 

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${MODEL}"
		],
		"description": "Snippet Test"
	}
```

This snippet would simply output "MODEL" as a placeholder that you can change.

This [GitHub issue](https://github.com/microsoft/vscode/issues/10561) from 8 years ago outlines a system that would allow you to actually customize the value of your custom variables but...it's been 8 years.

### Transformations

Snippets are most useful once you've mastered [transformations](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variable-transforms). Transformations are a mechanism built into the snippet framework that let you modify variables before rendering.

The syntax of a variable with a transformation is {Variable Name}/{regular expression}/{format string}/{regular expression options}. An example showing all of these is shown here:

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${TM_FILENAME_BASE/(test)/${1:/upcase}/i}"
		],
		"description": "Snippet Test"
	}
```

If the file's name was `testtest.dart`, the output would be `TESTtest`. Why?

1. The variable name `TM_FILENAME_BASE` resolves to `testtest`.
2. The regular expression `(test)`, combined with the case-insensitive `i` option at the end, matches on the first "test".
3. `${1:/upcase}` turns the first "capture group" into all uppercase characters.

You could capitalize the entire file name using a snippet like this:

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${TM_FILENAME_BASE/(.*)/${1:/upcase}/}"
		],
		"description": "Snippet Test"
	}
```

Snippets are clearly more dangerous in the hands of someone that knows their way around regular expressions but you should be able to create some cool snippets with even a cursory regex understanding.

### Built-In Transformations

There are several built-in formatting options that you can use in the third section of a transformation statement:

- /upcase: Converts the capture group to all uppercase
- /downcase: Converts the capture group to all lowercase
- /capitalize: Capitalizes the first character of the capture group
- /camelcase: Converts the capture group camel case (camelCase)
- /pascalcase: Converts the capture group pascale case (PascalCase)

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/}"
		],
		"description": "Snippet Test"
	}
```

For a file named `test_test.dart`, this snippet would output "TestTest".

### Replace Transformation

If you simply want to replace a part of your variable with something else, you can replace the `${1:/format}` section of the transformation with the replacement value. 

```json
"Snippet Test": {
		"scope": "dart",
		"prefix": "foolsTest",
		"body": [
			"${TM_FILENAME_BASE/(test)/bob/i}"
		],
		"description": "Snippet Test"
	}
```

For a file named `test_test.dart`, this snippet would output "bob_test".