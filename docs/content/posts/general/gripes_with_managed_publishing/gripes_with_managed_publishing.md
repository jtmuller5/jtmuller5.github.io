---
title: "Gripes with Managed Publishing"
date: 2022-09-20T10:57:17-04:00
draft: false
categories: ["explorations"]
tags: ["google play","mobile"]
---

Google Play's Developer Console offers a pretty neat "[Managed Publishing](https://support.google.com/googleplay/android-developer/answer/9859654?hl=en)" feature that lets you decide when approved builds and app updates are published. 

Without Managed Publishing:
1. Develop a new feature
2. Add your new build to Google Play's Production track
3. Submit the build for review
4. App passes review
5. App is automatically published to the masses

With Managed Publishing:
1. Develop a new feature
2. Add your new build to Google Play's Production track
3. Submit the build for review
4. App passes review
5. [NEW] App is added to a list of "Changes ready to publish"  
6. [NEW] App can be manually published when you're ready

It's undeniably an amazing feature offered by our Lord and Savior, Google, but like all things software, it's not perfect. As I discovered earlier today, there are some annoying quirks that aren't documented anywhere but in the deepest abysses of StackOverflow. So, I decided to compile them into one place.

## Quirk 1: It Publishes Everything
Each time an item is approved by the Google Play reviewers, it gets added to the list of things that can be published. This list can include production builds, test track builds, app description updates, privacy policy updates, and a lot of other things you can change through the console. To publish these changes, you just need to tap the big blue button.

_Tapper beware_, though.

When the "Publish Changes" button is pressed and you confirm the action, all changes in the list will be published. In other words there is no way publish the internal test build and NOT the production build. This can be extremely frustrating in a number of different situations.

For example, say you submit build 100 to your alpha track and version 101 to your production track. You're not ready to publish to production and instead you'd rather ship the alpha version to your trusted testers. Can you do it? No.


![img.png](/images/publishing_overview.png)

## Quirk 2: Full Rollouts vs Staged Rollouts

Google Play's Managed Publishing appears to treat Full Rollouts (builds that go to everyone all at once) and Staged Rollouts as independent "tracks". Said differently, you can submit two builds to production and they can both be approved simultaneously. The lower build number needs to be the full rollout while the higher build number needs to be the stage rollout. In this scenario, it's possible for both versions to wind up in the ready to publish list.

And finally...

## Quirk 3: Deletions Don't Exist

Once an item gets added to the ready to publish list, it cannot be removed. Let that sink in for a moment.

.

.

.

Okay, cool. So what does this mean? It means that if you accidentally submit a build with a full rollout scheme and it gets approved, you basically just committed to rolling out your build to everyone. In my scenario:
1. I submitted build 126 as a Full Rollout
2. Build 126 was approved
3. Later, I decided I did not want to do that and submitted build 127 as a Staged Rollout starting at 25%
4. Build 127 was approved
My assumption was that the higher build number from (4) would take precedence over the build from (2). Instead, I found myself staring at 2 approved builds and no way to remove the old one.

Insanity.

## Takeaway

Don't submit a build for review unless you're 100% ready to publish it because let's face it, you might not have a choice.

## StackOverflow Questions
- https://stackoverflow.com/questions/69227084/multiple-app-versions-in-managed-publishing-google-play-console
- https://stackoverflow.com/questions/72179853/google-play-console-publish-only-certain-changes-with-managed-publishing
- https://stackoverflow.com/questions/65047233/new-google-play-console-managed-publishing-for-first-app-release-issue-for-mul?rq=1