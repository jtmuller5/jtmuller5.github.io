---
title: "An Intro to Route Guards in Flutter"
date: 2022-09-17T16:26:21-04:00
draft: true
categories: ["tutorials"]
tags: ["flutter","mobile"]
---

Intro to Route Guards in Flutter
====================================

Hey! Don’t go there!

Navigation in a mobile app is a bit more involved than pushing a route here and popping a route there. Some routes should only be viewed by a user who is authenticated while others are available to the public. Some routes will only behave and display properly if the user has an active internet connection while others show static assets that never change.

Is it possible to verify these requirements are met before loading each new route? With Route Guards, anything is possible.

Route Guards
============

Route Guards were first introduced in the Angular programming language as interfaces used to [control the accessibility of a route based on a given condition](https://codeburst.io/understanding-angular-guards-347b452e1892#:~:text=What%20is%20Route%20Guards,class%20implementation%20of%20that%20interface.). This Angular feature set included methods for monitoring forward and backward navigation, as well as processing the data that was sent from one route to another. As the name indicates, guards would sit between routes and determine if navigation between the two was allowed.

The problem is that Flutter doesn’t provide built-in support for guards so a lot of the navigation-validation-leg-work has to be done inside your route code. For example, you can perform a check in the initialization method of your route to determine if the route should actually be rendered. Or, you could [wrap your view in a FutureBuilder](https://stackoverflow.com/a/51225160/12806961) and perform your check there. Either way, you would still be pushing the requested route onto your navigation stack which is not ideal.

Auto Route Guards
=================

Luckily, the auto\_route package on pub.dev exists. Aside from being a full-fledged navigation solution that makes passing arguments, naming routes, and implementing nested navigation a breeze, it offers support for route guards.

![](https://miro.medium.com/proxy/0*XNToTUuqLjo3auXB)

[**auto\_route 2.4.2**](https://pub.dev/packages/auto_route?utm_campaign=Flutter%20Fast%2C%20Flutter%20Far&utm_medium=email&utm_source=Revue%20newsletter#route-guards) **—** [**pub.dev**](https://pub.dev/packages/auto_route#route-guards)  
AutoRoute is a declarative routing solution, where everything needed for navigation is automatically generated for you.

You can read more about the actual implementation in the link above, but to summarize, you can extend the AutoRouteGuard class to perform any kind of navigation check you can think of. Each guard class can be used on as many routes as you like and to make the deal even sweeter, each route in your navigation tree can use multiple guards. Below, I’ve shared a few of the guards I’ve created.

Firebase Authentication Guard
=============================
> Tweet deleted

At Protocol Authentication Guard
================================
> Tweet deleted

Connectivity Guard
==================
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m using the auto_route package for all things navigation. The connectivity check is performed by the connectivity_plus package by the <a href="https://twitter.com/FlutterComm?ref_src=twsrc%5Etfw">@FlutterComm</a>.<a href="https://t.co/zjPCJaPZVn">pic.twitter.com/zjPCJaPZVn</a></p>&mdash; Joe Muller 💙 (@Mullr33) <a href="https://twitter.com/Mullr33/status/1442133297988087817?ref_src=twsrc%5Etfw">September 26, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Time of Day Guard
=================
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Here&#39;s one last route guard for all you <a href="https://twitter.com/hashtag/Flutter?src=hash&amp;ref_src=twsrc%5Etfw">#Flutter</a> folks.<br><br>You can prevent a user from accessing a certain route based on the time of day. I based this one on <a href="https://twitter.com/tacobell?ref_src=twsrc%5Etfw">@tacobell</a>&#39;s <a href="https://twitter.com/hashtag/HappyHour?src=hash&amp;ref_src=twsrc%5Etfw">#HappyHour</a> --&gt;<a href="https://t.co/RbRdCMXlRD">pic.twitter.com/RbRdCMXlRD</a></p>&mdash; Joe Muller 💙 (@Mullr33) <a href="https://twitter.com/Mullr33/status/1446170803540791300?ref_src=twsrc%5Etfw">October 7, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Navigate Carefully
==================

It should be clear by now that route guarding is potentially very powerful. With a few extra lines of code you can protect user information and avoid making database calls without an internet connection. Certain checks, like checking for an authenticated user or an active network connection, are ideal because they can be made quickly without the user noticing.

That said, route guarding isn’t perfect for all situations. Because the guard logic is executed before the next route is added, you want to avoid making calls that can take a noticeable amount of time to complete…otherwise the user will experience latency. If the delay is long enough, they’ll actually be able to continue using the app between the time the navigation was requested and when it’s performed.

Support Me
==========

If you found this newsletter helpful, consider supporting me on BMAC or GitHub! I’m aiming to send one 2–3 minute newsletter a week to help you become a better Flutter developer.

![](https://miro.medium.com/proxy/0*VeZP5ErqixSejWE5)

[**Joseph Muller is developing Flutter apps for 2021**](https://www.buymeacoffee.com/mullr?utm_campaign=Flutter%20Fast%2C%20Flutter%20Far&utm_medium=email&utm_source=Revue%20newsletter) **—** [**www.buymeacoffee.com**](https://www.buymeacoffee.com/mullr)

Coding In/Writing About Flutter Current Projects:- Stacked architecture tutorials- Att@ched app (@protocol)- Flutter Plugins

[**Sponsor @jtmuller5 on GitHub Sponsors · GitHub**](https://github.com/sponsors/jtmuller5?utm_campaign=Flutter%20Fast%2C%20Flutter%20Far&utm_medium=email&utm_source=Revue%20newsletter) **—** [**github.com**](https://github.com/sponsors/jtmuller5)  
GitHub is where people build software. More than 65 million people use GitHub to discover, fork, and contribute to over 200 million projects.
