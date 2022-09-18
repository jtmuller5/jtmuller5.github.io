---
title: "Continuous Animations in Flutter"
date: 2022-09-17T16:26:21-04:00
draft: false
categories: ["tutorials"]
tags: ["flutter","mobile"]
---

If your app ain’t animating, users ain’t engaging.

It’s a simple law of mobile app development that gets less attention than it deserves. Users want the impression that your app is alive — a living, breathing creation that does more than respond to taps and scrolls. Dynamically changing gradients, bouncing dots, and widgets that push at their boundaries like animals in a cage all give your app a personality that users will be thinking about long after they lock their screens.

So how can we add these types of digital dances to our Flutter apps?

In this issue of Flutter Fast, Flutter Far, I’ll be showing you how you can set up animations that never stop. Maybe they continue moving forward forever or maybe they pendulum between start and end values until someone tells them to stop.

Control That Animation
======================

The life force behind all animations in Flutter is the [AnimationController](https://api.flutter.dev/flutter/animation/AnimationController-class.html). This class allows you to run an animation in the forward and reverse directions at varying speeds and gives you, the developer, insight into how the animation is progressing. To show you how it works, I’m going to make a notification bell spin. See this tweet for the video.

In order to make this work, you first have to create your AnimationController. I’m a big fan of the [stacked](https://pub.dev/packages/stacked) state management solution so all of my widgets are usually stateless. This makes things a tad more complicated since AnimationControllers require a TickerProvider and you normally can only get that from a State class with the TickerProviderMixin.

Never fear. For building animations in stateless widgets, you can use [flutter\_hooks](https://pub.dev/packages/flutter_hooks). This is a cool package for creating utility objects like:

*   TextEditingControllers (useTextEditingController)
*   AnimationControllers (useAnimationController)
*   TabControllers (useTabController)
*   FocusNodes (useFocusNode)
*   Contexts (useContext)
*   And lots more!

In our case, we just need to useAnimationController and as you can see in this tweet, all of the AnimationController’s properties can be set when you call the hook.

This code snippet also shows a very sequential (and bad) way of running a continuous animation. I would never suggest using this approach since there are much cleaner alternatives but the example does provide some value.

1.  Animations need to be started. In this example, I create my AnimationController and then set it in motion by calling the [forward](https://api.flutter.dev/flutter/animation/AnimationController/forward.html)() method. This call starts running the animation from the lower bound (0) to the upper bound (maxValue).
2.  You can listen to the status of the AnimationController with the addStatusListener method. If the status equals _Completed_, it means the animation has hit the upper bound and is stopped. If the status is _Dismissed_, it means the animation has hit the lower bound and is stopped.
3.  At any time, you can manipulate the direction of the AnimationController by calling the forward() or reverse() methods.

Simplify, Simplify, Simplify
============================

Now that we’ve established a foundational understanding of how animations work, we’re going to play some code golf and make this example a whole lot cleaner.

The AnimationController class has a [repeat](https://api.flutter.dev/flutter/animation/AnimationController/repeat.html)() method that starts the animation and instructs it to continue running forever. This method also has a reverse property that will cause the animation to act like a yo-yo, bouncing back and forth between the upper and lower bounds. This alone saves us ~15 lines of code and removes the need for the status listener.

Can we clean this up even more? Hell yeah we can.

SIMPLIFY
========

If I was okay settling, I would say the last code snippet is completely fine and there’s no need to keep trying. But the world isn’t easy on settlers.

There happens to be a sweet package called [simple\_animations](https://pub.dev/packages/simple_animations) that makes building simple animations simple and it has just the thing we need: a LoopAnimation widget. As you can guess, this widget builds it’s child based on values that continuously loop ‘begin’ to ‘end’. I’ve added the line count so you can see just how concise this is.

As an added bonus, we don’t have to deal with hooks nor do we have to manage the lifecycle of an AnimationController. Those things are still great to know but simplicity is bliss.

Weekly Promo
============

I work at a standing desk and try to be on my feet at least 80% of the day. I think it’s good for my back and by extension my posture. Nonetheless, it kinda sucks and for the longest time I was standing on the floor, wearing out my bare feet.

I recently bought an [Uplift Bamboo Rocker Board](https://amzn.to/39uA3D6) to stand on and it’s surprisingly awesome. I shift back and forth between it and the floor and it keeps the fidgety side of my mind busy. The bamboo finish also matches my desktop pretty nicely so I feel professional all day, everyday.

[**Sponsor @jtmuller5 on GitHub Sponsors · GitHub**](https://github.com/sponsors/jtmuller5?utm_campaign=Flutter%20Fast%2C%20Flutter%20Far&utm_medium=email&utm_source=Revue%20newsletter) **—** [**github.com**](https://github.com/sponsors/jtmuller5)

Help me write technical articles for Flutter!
