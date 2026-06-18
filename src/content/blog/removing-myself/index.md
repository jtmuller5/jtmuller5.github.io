---
title: "Removing Myself"
description: "An accidental eureka moment"
date: 2026-06-11
tags: []
---
I started building BrainFables today. It is a personal dashboard for visualizing features you build with AI. But it's not just for code. It can also be used to visualize physics phenomena, mathematical theorems, chemical reactions, and anything else you need to understand. A "Fable", playfully named after the model that made it, is an interactive file built on top of a simple markdown file. I was inspired by this interactive explanation of the Riehmann hypothesis and decided to productize it like any wannabe entrepreneur would.

The details don't matter much but what is interesting is how much was built with very little babysitting. Here is the stack:
- TanStack Start Frontend and Backend
- Posthog Analytics (MCP)
- Neon DB (MCP)
- Better Auth 
- Netlify Hosting (MCP)

All of these components were tied together without my intervention to add a single environment variable in a web form. I just hooked Claude Fable up to the associated MCP servers and let it rip. In fact, the experience was so amazing that I don't think I will ever work with technology that does not offer an MCP server. Why? An MCP server keeps me out of my browser. There is no painstaking navigation through web forms, submenus, tabs, or docs. Having an MCP server significantly cuts down the human time required to productionize something because the model can stay in go-mode.

A forgotten Neon DB MCP server was what really opened my eyes. I had connected my account via MCP server a few months ago and somehow the connection didn't break. Before I knew what was happening, Claude had created a new project, spun up a database, added RLS, and pushed the keys to my Netlify account. I opened the production website at brainfables.com and everything worked. All in all, the setup took 30 minutes and the only task for me was the DNS setup on my Namecheap account (turns out people have made MCP servers for Namecheap as well so I won't be doing that anymore).

All of this got me thinking that the most efficient thing I can do is remove myself from every process in my life. Software moves faster in my absence, in everyone's absence for that matter, and it's not hard to envision a world without computer screens. No keyboards or mice. No desks becase those mainly exists to hold the machinery needed to interact with screens. Remove the desks and then every "1 bedroom with a den" apartment listing becomes "2 bedroom" overnight. We'll still want to command the computer but we won't need to be stationary to do it. Sure, you can use voice but there are plenty of scenarios where that's not possible and even when it is, people don't want to talk all day long. How do we remove ourselves while retaining granular control and observability?
