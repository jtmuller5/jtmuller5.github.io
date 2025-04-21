---
title: "Fly Safe"
date: 2022-11-20T12:30:33-05:00
draft: false
categories: []
tags: ["flutter","mobile","firebase","pwa"]
---
Over the last 3 years I've spent countless hours learning and using Google's cross-platform UI framework, [Flutter](https://flutter.dev/). I've built over 20 hobby apps, worked for several small startups, and used Flutter professionally at two large healthcare companies. Flutter is amazing and it's allowed me to build an early career in software development.

The longer I use Flutter though, the more often I bump up against one of its major downsides - there's no fast way to update broken code installed through the app stores.

When I first started building apps for myself and the 10 or so people that would find my app on the app stores, I didn't think too much about things like hot-fixes or app review times. If something broke in the early days, I chalked it up as a lesson learned the hard way and moved on. After all, the impact of my broken code was almost nothing.

Over time more people started using my apps. I started working at companies with larger audiences. I started working at companies that weren't just shipping to-do apps and fitness trackers. Very quickly, the impact of broken code ballooned to the point that shipping was stressful. The added pressure helped me learn automated testing and turned me into an amateur QA specialist, but even with extra testing the stress of hitting the "Publish" button didn't go away.

Why?

I've written a few Twitter threads about this: https://twitter.com/Mullr33/status/1557197870687731712?ref_src=twsrc%5Etfw

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Deploying a <a href="https://twitter.com/hashtag/Flutter?src=hash&amp;ref_src=twsrc%5Etfw">#Flutter</a> app to Google Play or the Apple App Store can be stressful, even if its been rigorously tested. Why?<br><br>Because it&#39;s basically impossible to perform a hot fix <br>🔥🫠<br><br>A pessimistic thread on a problem I&#39;d like a solution to 🧵</p>&mdash; @Muller@fosstodon.org 💙 🆓️ (@Mullr33) <a href="https://twitter.com/Mullr33/status/1557197870687731712?ref_src=twsrc%5Etfw">August 10, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

In short, both Google Play and the Apple App store do not support rollbacks. To fix a bug, you need to manually pull the last working branch of your code, make the necessary change, update the version number, and resubmit your app to the app store. At this point, the app stores will review your change and if you're lucky enough to get approved the first time, you can release the new version. All in all, this process could take hours or it could take days. Either way, that's usually way too long.

Other cross-platform frameworks, like React Native, offer methods to instantaneously update your apps without submitting a formal review ([Code Push](https://github.com/microsoft/react-native-code-push)) and you could make [a strong argument that this feature alone makes React Native superior](https://www.youtube.com/watch?v=3_FcxGCCnUs). Imagine releasing code with true peace of mind. If something breaks, you can fix it immediately, perhaps even before a real user encounters an error.

## The Workarounds
Over time, I've noticed my deployment workflow across projects morphing into something that is admittedly sub-optimal. In other words, I started adjusting my deployment strategy to compensate for the inability to make ad-hoc changes.

### Web First
I now release all of my Flutter apps on the web first through a hosting platform like [Firebase Hosting](https://firebase.google.com/docs/hosting). Firebase Hosting allows for immediate rollbacks so if I really messed something up, I can click a button and be back on safe ground. If the web release runs for a day or two without any major issues, I'll start prepping my Android and iOS releases.

### PWA Support
Since all Flutter apps can run as progressive web apps (PWA), I've also found myself designing my "apps" more for a browser-based audience. The benefits in terms of deployment are obvious. Updates can be distributed to all PWA users _instantly_. As above, broken builds can be rolled back _instantly_. For a lot of apps, the PWA experience is very similar to the native app experience.

### More Testing Channels
If I decide that a build is ready and deserving of the app stores, I hardly ever ship to production directly. You could argue this is a good thing, but a lot of the times I don't want to deal with the overhead of pushing a build from internal -> beta -> production. That's extra time and brainpower that I'd rather be spending on new features and optimizations.

### Flutterception
My wildest attempt at recreating the effects of Code Push was to wrap my entire app in an if statement that references Firebase Remote Config. If the "app_okay" flag in Remote Config was true, the app would be run like normal. If the "app_okay" flag was false, I'd replace the entire app with a web view that points to the web version of my app (which can be updated on the spot). This type of thing is actually allowed on the app stores according to this [StackOverflow answer](https://stackoverflow.com/questions/31170598/does-app-store-or-play-store-allow-apps-that-have-a-webview-only-to-my-site). The performance of the "WebView app" was a bit degraded but I'll take a slight degradation over a completely bricked app anyday.

All of this is to say that I find myself being more and more cautious when shipping apps, to the point that it's detracting from the overall experience of using my apps. I'll be the first to admit that Flutter web is inferior to Flutter on mobile. But, when I ship to Flutter web, I can sleep soundly at night. And anyone with access to a browser can use and [install](https://pub.dev/packages/pwa_install) the app.

## Summary
In many, many ways, Flutter is an incredible technology with immense potential to change how development teams approach the market. Out of the box, apps look and feel great and the community is growing significantly. Nonetheless, I think all Flutter folks need to acknowledge that it has its issues.

Being unable to rapidly update an app once it hits the app stores is inarguably a bad thing. Would I say that using Flutter is "choosing to harm your users"? Lol, no. But I might say that using Flutter is choosing to take on more risk in your software deployment process.

> I also want to point out that the issue of slow hot-fixes is not specific to Flutter. From what I can tell, Code Push is really just a solution for React Native. Developers publishing native Kotlin or Swift apps would be in the same boat as us.