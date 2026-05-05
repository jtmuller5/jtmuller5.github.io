---
title: "Firebase App Check"
description: "App Check helps protect your app backends from abuse by preventing unauthorized clients from accessing your backend resources. It works with both Google services (including Firebase and Google Cloud services) and your own custom backends to keep your resources safe."
date: 2026-05-04
draft: true
---
https://firebase.google.com/docs/app-check

## Android

https://developers.google.com/android/guides/client-auth

In Firebase, select the App Check option. Next to the Android application, choose "Register":

![[Pasted image 20260504085140.png]]

To retrieve your SHA-256 certificate fingerprint, use the following command:
```
keytool -list -v -alias upload -keystore ./android/keys/abi-keystore.jks
```

Paste the SHA-256 key into the Play Integrity field and save.

> I typically store the `.jks` key in the `android/keys` directory in my Flutter apps.

## IOS
