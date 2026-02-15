---
title: "Flutter, Firebase, and Google Sign In 7.1.0"
description: "Authenticate users using the newest Google Sign In Version"
date: 2025-10-15
tags:
  - flutter
---

In typical Google fashion, the [google_sign_in](https://pub.dev/packages/google_sign_in) package was updated recently and if you missed the [migration guide](https://github.com/flutter/packages/blob/main/packages/google_sign_in/google_sign_in/MIGRATION.md), your apps are broken. In this post, I'll walk you through using version 7.1.0 of the google_sign_in package with Firebase and Flutter.


## Setup

To get started, add the newest google_sign_in version to your pubspec.yaml:

```
google_sign_in: ^7.1.0
```

If you don't have one already, create a new Firebase project in the Firebase console and then navigate to the authentication tab. Under "Sign-in method", select "Add new provider" and choose "Google".

## Create a Web Client ID

You can create a web client ID a few ways. 

### Use Flutterfire Configure

### Use the Google Cloud Console

Once you have the client ID, add it to your environment variables file. I typically create a `config.json` file in my assets folder and load my variables from that using `String.fromEnvironment`:

```json
// config.json
{
  "SERVER_CLIENT_ID": "YOUR_CLIENT_ID"
}
```

## Initialize Google Sign In

```dart
await GoogleSignIn.instance.initialize(
        serverClientId: const String.fromEnvironment("SERVER_CLIENT_ID"));
```

## Setup iOS

You will need an iOS client ID to sign in with Google on iOS. To get one of these: 
1. Log into your Google Cloud Console
2. Navigate to APIs & Services
3. Select "Create credentials"
4. Select OAuth Client ID
5. Choose iOS from the application type dropdown
6. Fill in each of the fields and click save

Once you have the client ID, copy it and add it to your `Info.plist` file.



https://firebase.google.com/docs/auth/flutter/federated-auth


## Errors

### Developer console is not set up correctly.
> GoogleSignInException(code GoogleSignInExceptionCode.unknownError, [28444] Developer console is not set up correctly., null)

As pointed out in the [docs](https://github.com/flutter/packages/blob/60600d3f6b51072d2a50c57e782f5d1babefe8a6/packages/google_sign_in/google_sign_in/lib/google_sign_in.dart#L242-L243), "[clientId] is the identifier for your client application, as provided by the Google Sign In server configuration". In other words, you need to set the `serverClientId` to a _web_ client ID on Android, not an _android_ client ID.

### serverClientID must be provided
> Failed to sign in with Google: GoogleSignInException(code GoogleSignInExceptionCode.clientConfigurationError, serverClientId must be provided on Android, null)

Ensure that you are initializing the GoogleSignIn instance before calling any other methods. 

```dart
await GoogleSignIn.instance
        .initialize(serverClientId: const String.fromEnvironment("ANDROID_CLIENT_ID"));
```


### Execution failed for task ':app:checkDebugDuplicateClasses'.

> Execution failed for task ':app:checkDebugDuplicateClasses'.
> Querying the mapped value of provider(java.util.Set) before task ':app:processDebugGoogleServices' has completed is not supported

Update the Kotlin version in `android/gradle/wrapper/gradle-wrapper.properties` and `android/settings.gradle` to the latest Kotlin version (ex. 8.10):

```{3}
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.10-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

```gradle { 9 }
// settings.gradle
plugins {
    id "dev.flutter.flutter-plugin-loader" version "1.0.0" // apply true
    id "com.android.application" version "8.3.0" apply false
    // START: FlutterFire Configuration
    id "com.google.gms.google-services" version "4.3.14" apply false
    id "com.google.firebase.crashlytics" version "2.8.1" apply false
    // END: FlutterFire Configuration
    id "org.jetbrains.kotlin.android" version "1.8.10" apply false
}
```