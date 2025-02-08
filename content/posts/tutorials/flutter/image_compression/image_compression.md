image----
title: "Image Compression in Flutter"
date: 2022-09-17T16:26:21-04:00
draft: false
categories: ["tutorials"]
tags: ["flutter","mobile"]
---
> Inspired by this [Stack Overflow post](https://stackoverflow.com/questions/58800808/flutter-the-best-way-to-compress-image)

For an app that deals heavily with uploading and downloading images from a server, file size can make or break the user experience. Large files will take longer to save, display, and manipulate, all of which will affect the app’s network performance. Depending on how image-heavy the application is, users may spend more time staring at loading screens than actually interacting with content.

The [HTTP Archive](https://httparchive.org/reports/page-weight#bytesImg) has some interesting data on how often mobile applications and websites request images, as well as the average size of those images. To summarize the trends shown there, single web and mobile pages seem to be requesting fewer but larger images than they were three years ago.

![](https://miro.medium.com/max/588/1*uW3JnYO8zO9DerSJBd7nFg.png)

Image Bytes

![](https://miro.medium.com/max/776/1*Dup0pxjaLuWCI3oPEXWdrA.png)

Image Requests

In this article, I want to focus on the image size metric. As you can see, the median image size for mobile applications is ~900 KB. If the images you’re throwing around are larger than this, you can expect slower performances and lower user satisfaction. Below, I will show you several methods to compress images before saving them so that your app stays speedy.

TLDR; The flutter_image_compress package is simple and shrinks files more than the ImagePicker class

Research references
-------------------

*   [Reducing image download sizes](https://developer.android.com/topic/performance/network-xfer)
*   [5 essential image optimization techniques for web and mobile apps](https://blog.imagekit.io/5-essential-image-optimisation-techniques-for-web-and-mobile-apps-fcf79ed47f8c)
*   [How to Enhance User Experience by Improving Mobile App Performance](http://thinkapps.com/blog/post-launch/mobile-app-performance-tips/)

Existing Packages
=================

**Image Picker**
----------------

The [image\_picker](https://pub.dev/packages/image_picker) package has a built in imageQuality property from that allows you to compress an image. This property takes a value between 0 and 100 and represents a percentage of the original image quality. The benefit to this approach is that it’s built into the image\_picker package and is therefore incredibly easy to use.

```
File \_image; Future getImage() async {  
    var image = await ImagePicker.pickImage(  
        source: ImageSource.gallery,    
                imageQuality: 25,  
    ); setState(() {  
      \_image = image;  
    });  
  }
```

I did a little test to see how much various values effect the size of the image:

**100% Image Quality — 4.58MB**

![](https://miro.medium.com/max/1400/0*ZsCOceAHgNW6Qz_1.jpg)

I’ll omit the images here because the all look the same:

**50% Image Quality — 3.58MB  
25% Image Quality — 2.61MB  
1% Image Quality — 2.12MB  
0% Image Quality — 3.9MB**

In summary, you can reduce the file size of an image by more than half without much of a visible difference. Trying to force the image quality to 0% doesn’t actually shrink the file size.

**flutter\_image\_compress**
----------------------------

The [flutter\_image\_compress](https://pub.dev/packages/flutter_image_compress) package is fairly simple to use and it appears to be much better at actually reducing the file size.

```
Future<File> compressFile(File file) async {  
  final filePath = file.absolute.path; // Create output file path  
  // eg:- "Volume/VM/abcd\_out.jpeg"  
  final lastIndex = filePath.lastIndexOf(new RegExp(r'.jp'));  
  final splitted = filePath.substring(0, (lastIndex));  
  final outPath = "${splitted}\_out${filePath.substring(lastIndex)}";  
  var result = await FlutterImageCompress.compressAndGetFile(  
    file.absolute.path, outPath,  
    quality: 5,  
  ); print(file.lengthSync());  
  print(result.lengthSync()); return result;  
 }
```

**50% Image Quality — 590KB**  
**25% Image Quality — 276KB**  
**5% Image Quality — 211KB**

In summary, the flutter\_image\_compress package isn’t much harder to use and it’s capable of shrinking image file sizes to a greater degree than Image Picker.

**flutter\_native\_image**
--------------------------

The [flutter\_native\_image](https://pub.dev/packages/flutter_native_image) package is comparable to the flutter\_image\_compress package as far as file sizes go.

```
Future<File> compressFile(File file) async{  
    File compressedFile = await FlutterNativeImage.compressImage(file.path,  
        quality: 5,);  
    return compressedFile;  
  }
```

**50% Image Quality — 1.02MB**  
**25% Image Quality — 309KB**  
**5% Image Quality — 204KB**

I guess one of the benefits to this method is that you don’t need to provide it with an output pathway for the compressed file.

**TinyPNG**
===========

If for some reason you’d like to outsource the image compression to a third-party API, [TinyPNG](https://tinypng.com/developers) has an API that you can use to compress AND save the image to Cloud Storage ([Github page](https://github.com/tinify)). On the free version, you can compress 500 images each month without any additional cost. Overall, I wouldn’t recommend this unless there’s a very specific reason since the TinyPNG algorithm doesn’t shrink file sizes as much as the above packages and there is no control over how much your file is compressed. Here, I’ll just show you how to compress, retrieve, and upload your image using TinyPNG.

1.  Navigate to the [TinyPNG API page](https://tinypng.com/developers) and get an API key
2.  Use a website like [base64decode.org](https://www.base64encode.org/) to get the base64 version of the string “api:{YOUR API KEY}” . If your key is 123456, you would enter api:123456 into the top box and then click ENCODE.

![](https://miro.medium.com/max/1210/1*b3yL6K2q0dMgWh88P6bN3A.png)

3\. Send your image to TinyPNG for compression

I DO NOT RECOMMEND THIS. There are so many easier things you could do but the choice is yours.

In Conclusion
=============

Image compression is an easy win if your app contains lots of images but it’s not the only way to reduce your network demands. Resizing, caching, and formatting your images appropriately can yield additional benefits for your mobile app. Stay speedy!

My Setup
========

I’m a self-taught developer who believes that marketable software solutions can be created by dedicated lone wolves (or _very_ small teams). I blog about development tools like Flutter, Google Firestore, and RevenueCat since I believe these will be staples of every successful mobile app start-up in the near future. With these in your arsenal, you can do the work of 4 or 5 people in a ridiculously short amount of time. I also blog about computer literacy and efficiency since both of those things have exponential returns.

Hardware
========

*   [Omen by HP Obelisk Desktop Computer](https://amzn.to/3ms7tHA)
*   [MacBook Pro with Intel Core i9](https://amzn.to/2EdH0wc)
*   [LG 27UL500 Monitor](https://amzn.to/3mzyfxY)
*   [Two HP 27" LED Monitors](https://amzn.to/33DGQqp)
*   [Corsair Scimitar Gaming Mouse](https://amzn.to/2FHrxVw)

*I may earn money if you purchase something after clicking these links
