---
title: "Enhanced Enums in Flutter"
description: "Use enhanced enums from Flutter 3 to simplify your code"
date: 2024-10-15
tags:
  - flutter
---

> Enums were good. Now they’re great.

Flutter 3
---------

Flutter 3.0 was announced at Google IO yesterday and as can be expected from a major version jump, there were a lot of new features to dig through. A few of the big ones:

*   Stable support for macOS and Linux apps
*   Improved Firebase integration
*   Material 3 support
*   Foldable phone support
*   iOS release improvements
*   Performance improvements for the web
*   Theme extensions

You can read more about the full release in the announcement [here](https://medium.com/flutter/whats-new-in-flutter-3-8c74a5bc32d0) and if you’re someone that wants to see _everything_ that was added, check out the [release notes](https://docs.flutter.dev/development/tools/sdk/release-notes/release-notes-3.0.0).

Enhanced Enums
--------------

The feature that excited me the most didn’t quite make it into the announcement articles, though. Flutter 3.0\* also shipped with full support for [enhanced enums](https://github.com/dart-lang/language/blob/d16704ae6c9a5fd8f30b7ba9d33a5ab650c7447d/accepted/future-releases/enhanced-enums/feature-specification.md), meaning that your enums can now behave like mini-classes with members and methods.

Before now, enums were extremely simple — basically just lists of values. If you wanted to make them more useful, you’d need to extend them using the extension syntax. Not too difficult but not too convenient, either.

With enhanced enums, everything can be packed into the enum itself — and that’s awesome.

_\* Technically speaking, enhanced enums are a Dart 2.17.0 feature. That’s why they were in the_ [_Dart announcement_](https://medium.com/dartlang/dart-2-17-b216bfc80c5d) _and not the Flutter announcement…but either way…_

Without Enhanced Enums
----------------------

My app, FitJo, has an enum called “Metric” that contains all the possible body-related metrics a user can track in the app. Simple, right? Not quite. Different metrics track different types of units.

*   The “weight” metric tracks lbs/kgs
*   The “bodyFatPercentage” metric tracks a percent value
*   The “chest” metric tracks in/cm

To address this, I created an enum extension with a giant, ugly switch statement that let me know what type each metric was.

![](https://miro.medium.com/proxy/0*x0dpLHrJIkP3Y2pr)

With Enhanced Enums
-------------------

After migrating to the enhanced enums structure, the above monstrosity looks like this:

![](https://miro.medium.com/proxy/0*-h2s2uhi-tcuaoaT)

From **64** lines to **26**!

This [Stack Overflow answer](https://stackoverflow.com/a/71412047/12806961) provides some more details on everything that’s possible with enhanced enums so check it out if you’re interested.

Applications
------------

In addition to reducing the overall lines of code cluttering your project, enhanced enums seem like the ideal solution for a number of different problems.

Say you have a backend with a fixed list of available endpoints. You could set up an enum for each endpoint that includes fields for the URL pathway and the API version.

If your app lets users set up social profiles, you could create an enhanced enum for all potential social platforms. Each enum would have the name of the platform (Twitter), the URL prefix that goes before the username ([https://twitter.com/),](https://twitter.com/),) the icon that should be displayed (Icons.twitter), and the tooltip text that will appear when a user hovers over the icon (‘Twitter’).

For subscription apps, you may want an enum that contains all the features a subscription will unlock. Each enhanced enum would have the name of the feature, a short description, and an image asset path. When a non-paying member stumbles across your offerings page, you can cycle through the Feature.values enum list and show them what they’re missing.

Happy coding!
