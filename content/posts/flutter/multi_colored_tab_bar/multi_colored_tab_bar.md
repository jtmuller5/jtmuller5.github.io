---
title: "Implementing a Multi-Colored TabBar in Flutter"
date: 2022-09-17T16:26:21-04:00
draft: false
categories: ["tutorials"]
tags: ["flutter","mobile"]
---

The Legend of the Multi-Colored TabBar

A majority of popular mobile apps on the app store use a tried and true navigation scheme: the [Bottom Navigation Bar](https://www.smashingmagazine.com/2016/11/the-golden-rules-of-mobile-navigation-design/). The idea is to have all 4 or 5 of the app’s main activities visible and within thumb’s reach. If you do a quick browse through the apps on your phone, you’ll find this pattern is far and away the most used.

**Bottom Navigation Bar Apps**:

*   Spotify
*   Instagram
*   Reddit
*   Twitter
*   YouTube
*   Slack
*   Snapchat
*   LinkedIn
*   AirBnB
*   Coinbase
*   PayPal
*   TikTok
*   Pandora
*   McDonald’s
*   WordPress
*   CashApp
*   Teams
*   Amazon Shopping
*   Zillow
*   Etsy

You should notice a significant absence in this list and that’s because [Facebook uses a top tab bar](https://blog.prototypr.io/facebook-app-ui-tab-bar-changes-the-thumb-zone-9a31a151f66a). In fact, in my 30 minutes of swiping through apps, I can’t find another popular app that uses this navigation pattern (if you know of one, comment it [here](https://twitter.com/Mullr33/status/1436389243278987271)!).

Why is this?

I wish I had a specific answer but it doesn’t seem clear. Maybe it’s because a top tab bar offers less distraction from the content in the main window. Maybe Facebook just likes to do things differently (although I found an article hinting that they might [shift to a Bottom Navigation Bar](https://www.androidcentral.com/facebook-trying-improve-one-handed-experience-its-android-app-bottom-bar)). Regardless of what the reason is, millions of people see a top tab bar each time they log into Facebook…so let’s give it a try!

Tab Bar Basics
==============

Implementing a TabBar in Flutter requires three components:

*   A [TabController](https://api.flutter.dev/flutter/material/TabController-class.html) that manages the Tab Bar animation and index
*   A [TabBar](https://api.flutter.dev/flutter/material/TabBar-class.htmlhttps://api.flutter.dev/flutter/material/TabBar-class.htmlhttps://api.flutter.dev/flutter/material/TabBar-class.htmlhttps://api.flutter.dev/flutter/material/TabBar-class.htmlhttps://api.flutter.dev/flutter/material/TabBar-class.htmlhttps://api.flutter.dev/flutter/material/TabBar-class.htmlhttps://api.flutter.dev/flutter/material/TabBar-class.html) that actually holds the individual tabs in the UI
*   A [TabBarView](https://api.flutter.dev/flutter/material/TabBarView-class.html) that holds the contents of each tab

The most basic form would look like this:

![](https://miro.medium.com/proxy/0*lxXAoTulWLx0CqmE)

[https://gist.github.com/jtmuller5/5e7f5e82c3de735c73ccdfee21b66a02](https://gist.github.com/jtmuller5/5e7f5e82c3de735c73ccdfee21b66a02)

The issue with using a DefaultTabController is that you have less direct control over the TabController since it’s part of the widget tree. There are ways to acquire this control but I prefer creating my own TabController and passing it to both the TabBar and TabBarView. There’s a few ways to do this but since I’m a huge fan of the MVVM architecture, I tend to use [flutter\_hooks](https://pub.dev/packages/flutter_hooks) wherever I need a TickerProvider. The full code for the gradient AppBar is shown here ([Gist](https://gist.github.com/jtmuller5/3e6c0780335b9a19ddbbd87bcaeef32c)).

![](https://miro.medium.com/proxy/0*q8fGxE253LHf6RsB)AppBar View![](https://miro.medium.com/proxy/0*LDPxZAhXLy4ejQ6R)

As you can see in the above screenshots, creating your own TabController allows you to listen to the tabController events. Adding a listener to the tabController directly lets you listen for when the active index changes. Note that this does NOT let you listen for _any_ scroll events.

![](https://miro.medium.com/proxy/0*6FZLj06fVk553A0V)

If you want to listen to scroll events, such as when the user starts to scroll from tab to tab, you need to add a listener to the tabController’s animation property.

![](https://miro.medium.com/proxy/0*eqrIMBh7RmCaMejg)

Color along a Gradient
======================

Now that we have the foundational architecture set up and our listeners listening, we can jump into the fun part of this feature: changing the color of the AppBar. There’s a couple different ways you can do this but my approach was this:

1.  Create a LinearGradient
2.  Determine where along the TabBar the tab indicator is (0 being the start, 1 being the end)
3.  Grab the color from the linear gradient at the position determined in step 2

You can create any Linear Gradient you want but I’d suggest creating one that has just as many colors as your TabBar has tabs.

![](https://miro.medium.com/proxy/0*5DNg-CkQWaMSjspu)

Then you can calculate the position of the TabBar’s indicator using this snippet:

`position: _(_tabController.index / _(_tabController.length-1_))_ + _((_1 / _(_tabController.length - 1_))_ * tabController.offset_)_,`

And finally, using that position, get the color at the corresponding position along your gradient. I created an extension method for doing this that can be found [here](https://gist.github.com/jtmuller5/f61d3f96a3f769c45f258b71eb5ea038).

![](https://miro.medium.com/proxy/0*Ks1sR6So9et0HVWz)

Tying it Together
=================

Once you calculate the new color value, you can save it off in your ViewModel. This color should then be plugged in to your AppBar’s backgroundColor property. If you visit this tweet you can see the end result.

Using a lot of the same logic you can add some additional animations to each Tab in the tab bar. I went a little further to create a version of tab scrolling I call the “Handoff”. Check it out here!

Weekly Promo
============

My current computer mouse has short cuts for copying, pasting, navigating forward and backward, formatting code, moving windows from screen to screen, hitting enter, and pulling up documentation in Android Studio. Without it I’d easily be half as fast.

[**Amazon.com: Corsair Scimitar RGB Elite, MOBA/MMO Gaming Mouse, Black, Backlit RGB LED, 18000 DPI, Optical : Video Games**](https://www.amazon.com/Corsair-Scimitar-Gaming-Backlit-Optical/dp/B082LRMY53?utm_campaign=Flutter%20Fast%2C%20Flutter%20Far&utm_medium=email&utm_source=Revue%20newsletter) **—** [**www.amazon.com**](https://www.amazon.com/Corsair-Scimitar-Gaming-Backlit-Optical/dp/B082LRMY53)

