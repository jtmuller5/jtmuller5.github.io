---
title: "11-11-2024"
date: 2024-11-11T08:23:22-05:00
draft: false
categories: ["microblog"]
tags: ["ai"]
---

# November 11, 2024      

## Training the AI

I've been working on an AI receptionist recently and this must be what its like to build a frankenstein from the pieces lying around your workshop. The final result feels eerily human but noticeably artificial. I understand almost entirely how it works and that's the oddity that demarcates the thing as non-human. I can't predict what a human will do with 80% accuracy, nor will a human follow my script to a T.

To make the AI receptionist say what I want it to and when, I've employed a few strategies:

1. Only give it tools for the immediate next step. If you give a tool-using model a lot of tool, you can bet your bottom dollar it's going to use them.
2. Adjust the system prompt as you progress through the conversation. I don't trust an LLM of any size to remember all of my instructions for the entirety of the conversation. Instead, I want them to focus on one thing at a time.
3. Selectively prune the conversation history. Each request to the LLM is treated in isolation. What attaches a given request to the conversation is the message list you attach to the request. An interesting approach I've started to develop is keeping track of the full conversation history in one variable and the relevant conversation in another. This again helps to keep the model focused.


## Chat Rooms vs Web Pages

Andrej Karpathy [tweeted something interesting](https://x.com/karpathy/status/1856041540701040737) today about Discord's growing popularity. Why was the internet built as a giant library of static pages instead of rooms where you could ask questions to other humans. Is it because static websites are easier? That could be a fine explanation but for the purpose of teaching people new things, static can't compete with human and dynamic.

Imagine an internet where pages actually bustle like sidewalks in the city as you see the other 8 billion people of the world exist in a shared space. 7 other people are here now and the AI tutor that follows you everywhere is digesting everything.