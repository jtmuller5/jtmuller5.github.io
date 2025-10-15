---
title: Dev Log 1
description: Markdown based config for chat agents.
lastUpdated: 2025-10-15
---

This project grows larger every 10 minutes I spend thinking about it. 

The end goal is to create a "framework" of sorts that allows the developer to completely define how their conversational AI agent behaves using a markdown file. The framework will let the developer create shared prompt sections, sub-agents, transitions, and functions and then outline how the agent is allowed to transition between sub-agents in a type-safe way. By type-safe, I mean that the framework will provide it's own language server that validates the overall structure of the `.agent` file. For example, if you define three subagents (Intro, Schedule, and Outro), the language server will expect every transition to reference one of those three and nothing else (attempting to transition to a fourth "Cancel" agent will cause the language server to throw an error).

Once you've created a valid `.agent` file, you should then be able to compile it to a production ready agent using the Talkdown compiler. This agent will fully encapsulate the transition logic and can be thought of as a state machine. In addition to the agent, the Talkdown compiler will also create a TypeScript interface with all of the allowed modes, variables, and conditions that the `.agent` file references. When you create the agent using the compiler function, all of the relevant arguments can be provided as a config object.

The trouble with developing this framework is simply that the iteration loop is clunky. There are 4 necessary parts:
- Parser: A package that parses `.agent` files and converts them to an `AgentDefinition` object
- Language Server: A language server that follows the Language Server Protocol (LSP) to provide diagnostics, completions, references, etc based on a given `.agent` file. This uses the parser.
- VS Code Extension: A VS code extension that uses the language server to provide Talkdown support to VS Code
