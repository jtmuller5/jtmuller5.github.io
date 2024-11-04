---
title: "Microblog 11 04 2024"
date: 2024-11-04T08:23:22-05:00
draft: false
categories: ["microblog"]
tags: ["ai", "philosophy"]
---

# November 4, 2024

## The Conversation Cost

AI copilots make you fast until they don't. There is a very real "conversation cost" that accrues as you use AI tools and its best illustrated with an example.
 
Say you want to create a two-sided marketplace for recruiters and job seekers. Standing in the middle of the greenfield, you can erect what appear to be finished structures in an incredibly short amount of time with AI. A landing page, authentication middleware, dashboards, database interfaces. The outline of the project is fast to assemble because the brush of the AI copilot is wide. 

But the slowdowns spawn almost as quickly as the wireframe was created. Soon, the length of your natural language request approaches the length of the change you want to make. In other words, at the beginning an input like, "Create a React app using Tailwind, TypeScript, and Supabase" will yield hundreds of lines of code and the input-to-output ratio is 1-to-500. But the details are devilish and soon you're asking copilot to "Rewrite this function to check for nulls" The ratio has plummeted to 1-to-5, let's say. And then you hit the wall where asking for the change would take just as much time as making the change with your own fingers. An input-to-output ratio of 1-to-1 is doubtfully good.

AI _does_ make you faster. But the friction of using it to build large applications is obvious after the first 2 hours. I want to know how this friction can be reduced so that building with AI feels sprightly and speedy from the first line of code to the last.

A few things come to mind immediately. 

First, we could abbreviate things; package requests up in pre-configured prompts so we can hit a hotkey rather than type or speak the words "shorten this function and add documentation". Similarly, our IDEs could suggest common code edits like adding documentation, adding try-catch blocks, shortening, or making more robust. Github Copilot does something like this now but it's not as snappy of an experience as I would like.

A more original idea - we could map vocabulary words to complex operations. There is a wealth of shakespearean and non words in the English language that are rarely used but would be perfect for optimizing the input-to-output ratios of working with AI copilots. For example, maybe we could map the word "spry" to the modifier "with try catch blocks and documentation". Give me a spry function to make this POST request. That sounds fun and its endlessly customizable. I can imagine a world where developers are building apps with flowery language that sounds almost dulcet to an outside observer. This language would be called PoemScript.

Finally, we might evolve in our coding practice to a point where character-by-character communication with the computer and AI assistant is a sluggish artifact of the past. What's faster? Speaking, of course, but that's boring. Art. That's more interesting. Perhaps we can evade the conversation cost of working with AI by evading the conversation altogether. Rather than have a back and forth with a program to build a program, we can transform our interactions into a unidirectional creative process. I'm writing in vagueities but it's because I don't know exactly what art as code would look like. Maybe we learn to draw ontological diagrams that are insta-translated into code. Or perhaps we return to the quill and our superintelligent systems know how to convert stroke widths, colors, and visual patterns into JavaScript. The integrated development environment could become the integrated _drawing_ environment and every picture and painting could be compiled, like the images on the walls of the castle in Super Mario 64. Beautiful.

---