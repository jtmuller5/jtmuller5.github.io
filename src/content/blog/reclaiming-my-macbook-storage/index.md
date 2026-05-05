---
title: "Reclaiming My Macbook Storage"
date: 2026-02-22
draft: true
---

The biggest wins, in order:

  1. iOS Simulators (56 GB) - Biggest win

  You have 13 simulator runtimes including old ones (iOS 15,
  16, visionOS). Plus duplicate iOS 17.0 runtimes.

  # Delete ALL unavailable simulators
  xcrun simctl delete unavailable

  # Delete old runtimes you don't need (keep latest 1-2)
  # List them first:
  xcrun simctl runtime list
  # Then delete by name, e.g.:
  xcrun simctl runtime delete "iOS 16.0"
  xcrun simctl runtime delete "iOS 15.0"
  xcrun simctl runtime delete "iOS 17.0"   # both copies
  xcrun simctl runtime delete "iOS 17.2"
  xcrun simctl runtime delete "iOS 17.4"
  xcrun simctl runtime delete "iOS 17.5"
  xcrun simctl runtime delete "visionOS 1.0"
  xcrun simctl runtime delete "visionOS 1.1"

  2. Android AVDs (20 GB)

  # List AVDs
  emulator -list-avds
  # Delete ones you don't use from ~/.android/avd/

  3. Gradle cache (37 GB)

  rm -rf ~/.gradle/caches
  # Rebuilds automatically next build

  4. Docker (33 GB)

  If you're not actively using Docker containers, open Docker
  Desktop and prune:
  docker system prune -a

  5. Xcode DerivedData + Archives (5.3 GB)

  rm -rf ~/Library/Developer/Xcode/DerivedData/*
  rm -rf ~/Library/Developer/Xcode/Archives/*    # only if you
  don't need old .xcarchive builds

  6. Flutter project build dirs (29 GB)

  # Clean all Flutter projects at once
  find ~/Dev -maxdepth 4 -name "pubspec.yaml" -execdir flutter
  clean \;

  7. node_modules (25 GB)

  # Delete all node_modules (npm/yarn install restores them)
  find ~/Dev -maxdepth 4 -type d -name "node_modules" -exec rm
  -rf {} +

  8. Dart pub cache (15 GB)

  dart pub cache clean

  9. Homebrew + CocoaPods caches (2.8 GB)

  brew cleanup --prune=all
  pod cache clean --all