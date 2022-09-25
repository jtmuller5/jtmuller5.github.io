---
title: "Flugo"
date: 2022-09-23T14:20:47-07:00
draft: true
---
Flutter Web is notoriously "not the correct solution" for content-heavy web pages. All Flutter content is rendered on an HTML canvas making it impossible for web crawlers to properly index any web page built with Flutter. This limitation is a nightmare for marketing folks whose jobs rely on SEO and similarly, a threat to the future of the Flutter framework. If the framework can only be used for standalone apps disconnected from the world wide web, I can't imagine a future where it beats out a sea of technologies built to coalesce with the internet's native tech stack (eg. HTML, CSS, JavaScript).

There have been several articles and GitHub issues created to highlight this shortcoming, as well as propose solutions, but in the end their proposals are hardly worth implementing. At best, they improve your app's indexability by a few percentage points. At worst, they put your app at risk of violating Google's cloaking guidelines.

This said, Flutter is still growing, beating out React Native to become the most popular cross-platform language in this year's StackOverflow Developer survey. I don't think its going anywhere anytime soon, but without a solution to the indexability issue, I believe Flutter will be pushed out of the web space and relegated to a mobile-only corner of the market. As a Flutter developer myself, this thought is a bit scary. Losing a supported platform will make all Flutter developers less valuable and teams will need to hire an extra brain to create web experiences. 

Once this movement away from Flutter starts, what's to stop it? 
1. A company hires a new developer to build a native website. 
2. The website is easily converted into a PWA.
3. App downloads become irrelevant.
4. You get fired.

Maybe this is a catastrophic viewpoint to have but for some companies it makes a lot of sense. Content-heavy platforms like marketplaces or blogs don't _need_ a mobile app component to find significant success.

# A Cross-Framework Solution for a Cross-Platform Problem
If we take a step back and stop trying to make Flutter do everything, we might realize the actual solution is fairly simple. Let Flutter take care of the bubbly animations and user interactions and let something else take care of displaying the content in a web-friendly fashion. "Flutter web" would then become a label for something that's not just an app painted on a canvas. It would instead be the label for something that elegantly combines the best of all frameworks available to us. A Flutter web app would be only be Flutter to the extent that it needs to be Flutter.

How I see it, a perfect Flutter website may only be 25% Flutter. The rest would be built using an open source static website generator like Hugo or Jekyl. This really isn't a unique idea either and something similar is [proposed in the official Flutter docs](source).

This approach gives teams the best of both worlds. On the indexability side, your website will be connected to the internet by keywords, reverse links, and meta tags. On the user-experience side, the parts of your website that require user interaction will feel buttery smooth at 60 FPS.

So then, what's the catch? Breaking your website up across technologies generates a few challenges that need to be addressed. To start, user data, authentication status, and navigation arguments need to be preserved when you jump from one technology to another. For instance, if a user logs in on a Flutter page and then navigates to a Hugo page, can you tell that they are still authenticated? What about if a user wants to navigate from Flutter -> Hugo -> Flutter? Can the built-in Flutter navigator support this?

In this article, I'd like to propose one set of solutions to this set of problems.

# Flugo
Flutter + Hugo.

All pages that require user input in any form are built with Flutter. All pages that specifically display static content are handled by Hugo.

