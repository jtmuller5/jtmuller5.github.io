---
title: "Displaying Videos in Flutter from a URL"
date: 2022-09-17T16:26:21-04:00
draft: false
categories: ["tutorials"]
tags: ["flutter","firebase","mobile"]
---

Displaying Videos in Flutter from a URL
=======================================

With the Stacked architecture
-----------------------------

In this article, I will be explaining how to display a video directly from a URL in Flutter (although any video URL will work). If you’re interested in saving videos to Cloud Storage, check out my previous article on that exact subject.

[Uploading Images to Cloud Storage Using Flutter](https://medium.com/swlh/uploading-images-to-cloud-storage-using-flutter-130ac41741b2)

If you do have videos in [Cloud Storage](https://firebase.google.com/docs/storage), I’m assuming you’ll eventually want to display them. Maybe you need to show a video thumbnail on one screen and then the full video on another. Maybe you want to embed a video in a tutorial to explain how an app feature works. Whatever it is, your question is the same: How do I display my video?

Setup
=====

State Management
----------------

I’m personally a huge fan of Dane Mackier’s [Stacked](https://pub.dev/packages/stacked) package for state management so that’s what I’ll be using here. In short, it’s a Flutterized version of the MVVM architecture and it’s great for organizing projects of all sizes. If you haven’t used it before, check out the package on pub.dev and head over to [filledstacks.com](https://www.filledstacks.com/) for a few great tutorials.

Once you’re ready to jump in, add the package to your pubspec.

![](https://miro.medium.com/max/776/1*siMlxesixZ6HbcBvKBjLCw.png) 

> Quick tip: Tapping on the package name in pub.dev adds the newest version to your clipboard

Video Player
------------

The second and most important package for this tutorial is the [video\_player](https://pub.dev/packages/video_player) package. It’s a Flutter plugin supported directly by Google and it covers all of the basics involved in displaying videos.

![](https://miro.medium.com/max/982/1*8LUT0jtdk1XvN3SN8KHS9g.png)

After this is added to your pubspec.yaml file, run pub get.

Creating the View
=================

The Stacked package breaks your app architecture down into 3 pieces and greatly decreases your chances of writing spaghetti code.

*   **Views**: Represents the user interface
*   **ViewModels**: Manages the state of your views
*   **Services**: Wraps feature sets or functionalities

Of all of these pieces, the views are the simplest since they describe only the visual components of the app (“Views should contain zero to (preferred) no logic”). They’re easy to start with so let’s build one.

As is, this widget is pretty lackluster. It uses a ViewModel (see next section) to build and return a VideoPlayer widget that will play our desired video from a URL.

Creating the ViewModel
======================

ViewModels are the powerhouse of the cel- I mean Stacked architecture. While the View contains the UI components, the ViewModel contains the business logic and handles updating your app’s state based on user interaction. Without ViewModels, your app would just sit there…menacingly.

In this specific case, our ViewModel will be responsible for a VideoPlayerController so we’ll need to declare, initialize, and dispose of that properly.

We can write our own function called “initialize” to create the VideoPlayerController with the desired video URL. We call this from inside our view’s ViewModelBuilder using the onModelReady function.

And because the BaseViewModel class from the Stacked package extends ChangeNotifier, we can override its disposal method to dispose of our VideoPlayerController when we’re all done with it. Memory leaks begone!

A Quick Test
============

If we plug the StackedVideoView widget into a scaffold, we’ll see our video.

![](https://miro.medium.com/max/600/1*upof_jufxMLza4IX_ZcqAw.png)

The issues start to pop up when we try forcing this widget into a container with a fixed size. The VideoPlayer will try to fit its parent and as a result, the aspect ratio gets [warped](https://github.com/flutter/flutter/issues/31911). In the screenshot below, I wrapped the StackedVideoView in a container with a height of 300 and a width equal to the screen’s width. The result? Badness.

![](https://miro.medium.com/max/1400/1*j7As-Jz9b21hr6X44tOd7g.png)

Maintaining the Aspect Ratio
============================

To account for various parent dimensions, we can update our StackedVideoView to maintain it’s aspect ratio at all costs.

1.  Wrap the VideoPlayer is a SizedBox with dimensions equal to the video’s dimensions
2.  Wrap the SizedBox in FittedBox with a fit of BoxFit.cover

![](https://miro.medium.com/max/1400/1*7SwjYVGHjMOsSmOgvcRNAw.png)

If you want to see the full video viewport, you can scale the video to fit it’s the longest side. Find the longest side using the following line:

```
bool wideVideo = model.videoPlayerController.value.size.width >  
    model.videoPlayerController.value.size.height;
```

You can make a tall video fit the height of its container by nesting it inside an AspectRatio → Expanded → Column tree.

```
return Column(  
  children: \[  
    Expanded(child: AspectRatio(  
      aspectRatio: model.videoPlayerController.value.aspectRatio,  
      child: VideoPlayer(model.videoPlayerController),  
    ))  
  \],  
);
```

Similarly, you can make a wide video fit the width of its container by nesting it in an AspectRatio → Expanded → Row tree.

```
return Row(  
  children: \[  
    Expanded(child: AspectRatio(  
      aspectRatio: model.videoPlayerController.value.aspectRatio,  
      child: VideoPlayer(model.videoPlayerController),  
    ))  
  \],);
```

Adding Interactivity
====================

Prior to this point, the video might as well just be an image. The VideoPlayer widget doesn’t play videos by default so we will have to start ours manually. We can do this using a GestureDetector and playVideo/pauseVideo functions in our ViewModel. Add these to your StackedVideoViewModel class:

```
void playVideo(){  
  videoPlayerController.play();  
  notifyListeners();  
}  
  
void pauseVideo(){  
  videoPlayerController.pause();  
  notifyListeners();  
}
```

Then wrap your VideoPlayer widget in a GestureDetector. The onTap method will look like this:

```
onTap: () =>  
model.videoPlayerController.value.isPlaying  
    ? model.pauseVideo()  
    : model.playVideo(),
```

Now, tapping on the video will start or stop it depending on its current state.

**Extras**
==========

Custom ViewPort Alignment
-------------------------

Use the FittedBox’s alignment property to move the ViewPort up/down/left/right. x and y values can range between -1 and 1.

```
return FittedBox(  
  fit: BoxFit.cover,  
  alignment: Alignment(x, y),  
  child: SizedBox(  
    height: model.videoPlayerController.value.size?.height ?? 0,  
    width: model.videoPlayerController.value.size?.width ?? 0,  
    child: VideoPlayer(model.videoPlayerController),  
  ),  
);
```

Wait for Initialization
-----------------------

To prevent any wacky behavior, wrap your VideoPlayer in a conditional that checks the initialization status of the VideoPlayerController before displaying the video. Show a loading animation if the initialization is incomplete.

```
if (model.videoPlayerController.value.initialized) {  
  return GestureDetector(...);  
} else {  
  return Center(  
    child: CircularProgressIndicator(),  
  );  
}
```

Looping video
-------------

In the initialize function, set the videoPlayerController’s looping status to true to run the video continuously

```
void initialize(String videoUrl) {  
  videoPlayerController = VideoPlayerController.network(videoUrl);  
  videoPlayerController.initialize().then((value) {  
    videoPlayerController.setLooping(true);  
    notifyListeners();  
  });  
}
```

_\*The widgets in the Widget Depot repository contain all of these extra features_

Widget Depot
------------

You can find all of the code for this demo (and a lot more) in my Widget-Depot repository. Each widget should have Stacked and non-Stacked variations so you can use them regardless of how your app is structured. Pull requests and issues are welcome and encouraged!

[jtmuller5/Widget-Depot](https://github.com/jtmuller5/Widget-Depot)

[Joseph Muller is developing Flutter apps for 2021](https://www.buymeacoffee.com/mullr)
