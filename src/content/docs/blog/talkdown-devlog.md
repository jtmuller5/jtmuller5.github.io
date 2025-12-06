---
title: Talkdown Devlog
description: Markdown based config for chat agents.
date: 2025-10-15
sidebar:
  order: 2
---

- Name: Talkdown
- Description: Markdown based config for chat agents.
- Link: 

---
title: Dev Log 1
description: Markdown based config for chat agents.
lastUpdated: 2025-10-15
---

This project grows larger every minute I spend thinking about it. 

## The Goal

The end goal is to create a "framework" of sorts that allows the developer to completely define how their conversational AI agent behaves using a markdown file. The framework will let the developer create shared prompt sections, sub-agents, transitions, and functions and then outline how the agent is allowed to transition between sub-agents in a type-safe way. By type-safe, I mean that the framework will provide it's own language server that validates the overall structure of the `.agent` file. For example, if you define three subagents (Intro, Schedule, and Outro), the language server will expect every transition to reference one of those three and nothing else (attempting to transition to a fourth "Cancel" agent will cause the language server to throw an error).

Once you've created a valid `.agent` file, you should then be able to compile it to a production ready prompt using the Talkdown compiler. This prompt will fully encapsulate the transition logic and can be thought of as a state machine. In addition to the agent, the Talkdown compiler will also generate two things:
1. A TypeScript interface with all of the allowed modes, variables, and conditions that the `.agent` file references. When you create the agent using the compiler function, all of the relevant arguments can be provided as a config object.
2. Prompt previews for each sub-agent so you can see more or less what the compiled prompt will look like under specific conditions

The trouble with developing this framework is simply that the iteration loop is clunky. There are 3 necessary parts:
- A parser package that parses `.agent` markdown files and converts them to an `AgentDefinition` object
- A language server that follows the Language Server Protocol (LSP) to provide diagnostics, completions, references, etc based on a given `.agent` file. This uses the parser.
- A VS code extension that uses the language server to provide Talkdown support to VS Code

While it's possible for me to run the parser directly against a `.agent` file and print out the results, I really dislike that workflow. 

## The Development Loop

What I don't dislike is using my VS Code extension directly, the way I intend to use it when this project is production ready. Because the VS Code extension uses the language server which uses the _built_ parser, every change to the parser requires that I rebuild it and restart the VS Code extension. For the first two days, I was simply rerunning `tsc` whenever I made a change but that got old fast.

Queue `--watch`:

```bash
tsc --watch
```

Running `tsc` with the --watch flag automatically rebuilds the parser. Unfortunately, one watched code base is not enough. I also have to run `tsc --watch` on the language server to rebuild every time I apply changes required by the new parser.

With both codebases being rebuilt on changes, the only thing left for me to do is restart the VS Code extension. I can live with that.

## Early Obstacles

### Forgetting Positions

I have never built a language server before so my initial approach to parsing the markdown was short-sighted. I created a bunch of interfaces to capture the content I was interested in like this:

```ts
export interface GlobalConfig {
  model?: string;
  thinkingBudget?: number;
  provider?: string;
  summaryPrompt?: string;
  summaryFrequency?: number;
  temperature?: number;
}
```

And then went about finding the relevant content in the `.agent` file. I then passed the final `AgentDefinition` object to the language server...and realized that the parsed object is only useful if I know where every value comes from (specifically, the line and character number). This position data is used by the language server to communicate with the IDE to tell it where to draw the red, squiggly lines.

With that in mind, I took another pass at the parser and introduced two new "Positioned" interfaces:

```ts
export interface Range {
  start: Position;
  end: Position;
}

export interface PositionedString {
  text: string;
  range: Range;
}

export interface PositionedNumber {
  value: number;
  range: Range;
}

export interface GlobalConfig {
  model?: PositionedString;
  thinkingBudget?: PositionedNumber;
  provider?: PositionedString;
  summaryPrompt?: PositionedString;
  summaryFrequency?: PositionedNumber;
  temperature?: PositionedNumber;
}
```

With that information, it became fairly straightforward to point the language server at the erroneous code.

### Content VS Structure Validation

Another naive mistake I made was 