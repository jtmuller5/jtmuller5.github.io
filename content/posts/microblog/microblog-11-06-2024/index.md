---
title: "11-06-2024"
date: 2024-11-06T08:23:22-05:00
draft: false
categories: ["microblog"]
tags: ["ai", "vercel", "deepgram"]
---

# November 6, 2024

## Towards Something

The more I work as a developer, the more it becomes clear that I could spend my entire life struggling with the details. Every day there are new tools, frameworks, and patterns to learn. Tools you mastered change. The language syntaxes you burned into your connectome aren't resilient to the turn of the clock hand. If I were an electrician, I could spend a lifetime pinching at the wires with solder-coated fingers.

The issue is that I don't actually want that, despite how entertaining and mentally stimulating it can be. I don't want to build and burn my memory channels on repeat until my brain fries. I want to build towards something with every burst of neural energy so that my daily skirmishes at the keyboard are not for the sake of themselves. I want my brain to mutate towards a better understanding of reality, of society, and of programs.

Especially in light of AI and the battalion of tools that march in its wake, its hard to stay on this track. Lunging from one framework to another to another will make you tired and in a month, 3 months, a year you can still find yourself lunging, albeit with less energy and excitement. The question today is how do we lunge towards something so that all of our efforts can stack instead of spread.

## Deepgram Internals

I'm working on an AI voice assistant and have been playing with Deepgram quite a bit over the last few weeks. I initially believed that Deepgram had some magical TTS model that instantly converted incoming text to audio but alas, I was wrong. 

The world isn't magical.

Deepgram is still impressive but their TTS model uses an internal text buffer under the hood that can be [flushed and cleared using commands](https://developers.deepgram.com/docs/tts-streaming-feature-overview#control-messages). The `clear` command in particular is interesting because it can be used to clear any text or audio in the Deepgram processing pipeline when a user interrupts your LLM during a realtime chat.

## No Voice AI with Vercel

I learned that Vercel does not support web sockets since it is a serverless hosting solution. This means throwing together a quick demo with code designed to work with Twilio web sockets is not "quick". Luckily there is a popular library called [Socket IO](https://socket.io/) that's designed to facilitate realtime connections between clients and servers.

- https://socket.io/how-to/use-with-nextjs
- https://github.com/deepgram-starters/text-to-speech-starter-node/tree/output-streaming
