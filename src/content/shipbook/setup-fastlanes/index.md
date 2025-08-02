---
title: "Setup Fastlanes"
description: "Step-by-step guide to upload app icons for your Flutter app"
pubDate: 2025-08-01T12:40:39-05:00
tags: ["flutter","android","assets","shipbook"]
---

## Android

You need to manually upload an app bundle to Google Play before you can start using Fastlane.

## iOS

In your `info.plist` file, set the `CFBundleName` to the display name of your app. This will determine where the iOS IPA is saved when you run `flutter build ipa`.

The typical output path is:

```
/build/ios/ipa/{CFBundleName}.ipa
```