---
title: "Flutter: Build an IPA"
date: 2022-09-17T16:26:21-04:00
draft: false
categories: ["tutorials"]
tags: ["flutter","ios","mobile"]
---

If you’d like to distribute your Flutter app to iOS-using testers via [Firebase Distribution](https://firebase.google.com/docs/app-distribution), you’ll need to build IPA files. IPA files are simply iOS Application files that behave like APK or app bundles on Android.

Unlike APK or app bundles however, you can’t just run a flutter build command and create an IPA.

[**Build App Bundle**](https://flutter.dev/docs/deployment/android):

```
flutter build appbundle
```

[**Build APK**](https://flutter.dev/docs/deployment/android):

```
flutter build apk
```

This article will show you the fastest way to build an IPA for your Flutter app.

Steps
=====

Get your Team ID
----------------

First, you will need your 10 digit Team ID found in Accounts > Membership > Team ID. Write this down as you’ll need it later.

Create a Provisioning Profile
-----------------------------

The IPA requires a provisioning profile that has all of the permissions your app requires.

*   While still in your Apple Developer account, select Certificates, IDs & Profiles from the side menu
*   On the new page, select the Profiles tab
*   Select the plus button to add a new profile

You can find more information on [creating your profile here](https://support.staffbase.com/hc/en-us/articles/115003598691-Creating-the-iOS-Provisioning-Profiles) but in the end you need to download the profile.

Import the Provisioning Profile
-------------------------------

In xCode, navigate to the Runner/Runner folder and select the Signing & Capabilities tab from along the top toolbar. Here you can tap the arrows on Provisioning Profile and choose to “Import Profile…”. Import the one you just created and jot down the name.

Create an exportOptions.plist
-----------------------------

Flutter now has a [flutter build ipa](https://github.com/flutter/website/issues/4852) command line method but without a .plist file to specify how the IPA is built, it will only generate a .xarchive file. To address this, create a new file called exportOptions.plist under your ios folder and paste in the below code:

```
<?xml version=”1.0" encoding=”UTF-8"?>  
 <!DOCTYPE plist PUBLIC “-//Apple//DTD PLIST 1.0//EN” “[http://www.apple.com/DTDs/PropertyList-1.0.dtd](http://www.apple.com/DTDs/PropertyList-1.0.dtd)">  
 <plist version=”1.0">  
 <dict>  
 <key>method</key>  
 <string>development</string>  
 <key>teamID</key>  
 <string>{10-DIGIT TEAM ID}</string>  
 <key>provisioningProfiles</key>  
 <dict>  
 <key>{com.example.app}</key>  
 <string>{Provisioning Profile Name}</string>  
 </dict>  
 </dict>  
 </plist>
```

Update the following items according to your project details:

1.  Change the “method” string to development or app-store based on the type of your provisioning profile (found on your Apple Developer account)
2.  Update the teamID string to your 10-digit team ID from the beginning of this article (ex. <string>1234567890</string>
3.  Replace the example bundle ID with your own
4.  Replace the Provisioning Profile Name with your own

Run the Build Method
--------------------

cd to the root of your flutter project and run the following command in your terminal:

```
flutter build ipa --export-options-plist=ios/exportOptions.plist
```

It may take a while but if everything goes well, you should see something like this at the end of the build:

```
Built IPA to /Users/{USER}/{YOUR PROJECT PATHWAY}/build/ios/ipa.
```

Upload the IPA to Firebase
--------------------------

This .ipa file can be uploaded to Firebase distribution through the Firebase console.

![](https://miro.medium.com/max/1400/1*lsnTWFLesM-HKGejQ2Mjow.png)

If you primarily use Firebase for distributing test builds, this info should help you out a bit. The alternative is to use Apple’s TestFlight. You can read more about how [Firebase App Distribution compares to TestFlight here](https://www.brightec.co.uk/blog/firebase-app-distribution-vs-testflight).

Gotchas
=======

While this method will work for creating .ipa files, there are a few things you should be aware of.

First, each time you want to add a new user to your Firebase App Distribution tests, you need to send them an invite and then update your Apple provisioning profile with their device’s UDID. This is the biggest reason why I might consider TestFlight over Firebase but if you don’t have many testers than this should be fine.

Second, the flutter build ipa command seems to mess with your podfile and occasionally you may hit a long list of errors that say your podfile is out of sync. In this case, you can delete your podfile and podfile.lock and rebuild the app locally.

Conclusion
==========

Hopefully this short article saves you an hour or three of Google Searches. If you have any questions, leave a comment and I’ll update the article accordingly!
