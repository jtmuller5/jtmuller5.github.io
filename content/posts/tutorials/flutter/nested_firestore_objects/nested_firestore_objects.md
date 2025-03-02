---
title: "Handling Nested Objects in Firestore With Flutter"
date: 2022-09-17T16:26:21-04:00
draft: false
categories: ["tutorials"]
tags: ["flutter","firebase","mobile"]
---

[Google’s Cloud Firestore](https://firebase.google.com/docs/firestore) is a tool that should be in every mobile app developer’s tool belt. The flexible and scalable database that it provides is unlike anything a coder could create alone and if your app is designed for a global audience, there aren’t many solutions like it. Plus, there’s a Flutter package ( [cloud\_firestore](https://pub.dev/packages/cloud_firestore)) that’s designed to make Flutter and Flame play nicely together.

Unfortunately, there is one downside. The tool isn’t free to use and every read/write transaction your app makes with the Firestore database is counted against your [daily quota](https://firebase.google.com/docs/firestore/quotas) (50,000 daily reads and 20,000 daily writes for the free tier plan). Therefore, it’s essential you design your database with these usage limits in mind…otherwise, your dreams of creating a profitable mobile app will be stamped out like a flame.

In this article, I’m going to discuss how you can use nested objects in your Firestore database to reduce the amount of transactions you’re making. Rather than retrieve data from one document and two different subcollections, you’ll be able to query a single document and handle the nested data on the client side. #MoneyMoves.

Writing Nested Data
===================

Maps — Manual
=============

The simplest way to save nested data to a Firestore document is by using a map. After [setting up Firestore in your Flutter app](https://firebase.google.com/docs/flutter/setup?platform=android) and creating a database, you can save nested map data like this:

```
void SaveNestedData() { Firestore.instance.collection("exercises").add(  
{ "name": "Dumbbell curl",  
  "muscle": "Biceps",   
  "sets": {   
     "reps": 10,   
     "weight": 40}   
});   
}
```

The output will look like this:

![](https://miro.medium.com/max/1400/0*7t9OnJHDAH-KgXcy)

For many cases, this method might be completely satisfactory…in other cases, not so much. In my example, an “exercise” should be able to have multiple “sets”, each of which have a weight and reps value. Ideally, I would be storing an array of maps in a single field called sets.

An array of maps — Manual
=========================

The code to accomplish this is only slightly more complicated than the code to save a single map. All you have to do is add brackets to indicate the value is a list:

```
void SaveNestedData() { Firestore.instance.collection("exercises").add(  
{ "name": "Dumbbell curl",   
  "muscle": "Biceps",   
  "sets": \[ {"reps": 10, "weight": 40},   
            {"reps": 10, "weight": 40},   
            {"reps": 10, "weight": 40}\]   
});   
}
```

The result of this function can be seen here:

![](https://miro.medium.com/max/558/0*Dp_k6KpClgWXHzW5)

Nonetheless, manually writing out the data you want to save is inefficient and prone to inconsistencies. To solve this, you would create a class that holds the values for each object you wanted to save.

Maps — Using objects
====================

The first step towards saving objects to Firestore is to create the object [class](https://api.flutter.dev/flutter/dart-core/Object-class.html). This class will hold the properties and methods that define your object.

```
class Exercise {   
final String name;   
final String muscle;   
List<dynamic> sets = \[   
{"reps": 10, "weight": 40},   
{"reps": 10, "weight": 40},   
{"reps": 10, "weight": 40} \];   
Exercise(this.name, this.muscle);   
}
```

Now, instead of declaring each value in a map, you can create an instance of your new class and assign the values using dot notation.

```
Exercise exercise = Exercise("Dumbbell Curl", "Biceps");
```

Saving this object to Firestore is [simple in non-Flutter languages](https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects) but sadly, there is no equivalent to document().set(data) in Flutter. Instead what we have is document().setData(), which takes a Map<String,dynamic> argument and _not_ an Object argument. To make matters worse, Dart (the Flutter language) has [no method for converting Objects to Maps.](https://stackoverflow.com/questions/54949087/how-to-convert-class-object-to-data-structure-map-or-a-list-of-maps-in-dart)

This leaves us with one option: create the object-to-map function ourselves. This sounds more intimidating than it is. Really all it means is that we need to create a function inside our class that assigns the object’s values to a map and returns the map. My Exercise class would look like this:

```
class Exercise {   
final String name;   
final String muscle;   
List<dynamic> sets = \[   
{"reps": 10, "weight": 40},   
{"reps": 10, "weight": 40},   
{"reps": 10, "weight": 40} \]; Exercise(this.name, this.muscle); Map<String,dynamic> toMap() => {   
"name": this.name,   
"muscle": this.muscle,   
"sets": this.sets };   
}
```

And saving data to your Firestore Database is as easy as this:

```
void SaveNestedData() {   
Exercise exercise = Exercise("Tricep Extension", "Triceps"); Firestore.instance.collection("exercises") .document().setData(exercise.toMap()); }
```

Array of objects
================

Creating the nested object
--------------------------

In the last example, I was still distinctly writing out the “sets” list as a series of {maps}. What I really want to do is turn each “set” into an object, too. This will grant me more control over each set data as well as allow me to add new sets to an Exercise whenever I want. So again, the first step is to create the class. This time, we’ll also add the toMap() function so it’s primed and ready to be saved to Firestore.

```
class Set {   
final int reps;   
final int weight; Set(this.reps, this.weight); Map<String,dynamic> toMap() => { "reps": this.reps, "weight": this.weight   
};   
}
```

And now, when I first save the Exercise object, I’ll save it with a blank array of Set objects.

```
class Exercise {   
final String name;   
final String muscle;   
List<dynamic> sets = \[\]; Exercise(this.name, this.muscle); Map<String,dynamic> toMap() => {   
"name": this.name,   
"muscle": this.muscle,   
"sets": this.sets }; }void SaveNestedData() {   
Exercise exercise = Exercise("Tricep Extension", "Triceps"); Firestore.instance.collection("exercises").document("OWXsZjJRy3jjWmaM3Rup").setData(exercise.toMap());  
}
```

Adding objects to an array
--------------------------

When you want to add an object to the empty array, do this:

```
void AddObjectToArray() {   
Set set = Set(10,35); Firestore.instance.collection("exercises") .document("OWXsZjJRy3jjWmaM3Rup").updateData({   
"sets": FieldValue.arrayUnion(\[set.toMap()\]) });   
}
```

A couple important things about this function:

*   I’m using the updateData() method to update a single field in a document. This requires that you know the document ID.
*   To add a value to an array, I’m using the FieldValue.arrayUnion() method which takes a List<dynamic> argument.
*   I’m calling the toMap() function for my Set object so that it get’s turned into Map<String,dynamic> format.

If you trigger this function again, you’ll notice something peculiar. The array in your database won’t appear to update and you’ll still have just one entry in the “sets” field.

![](https://miro.medium.com/max/620/0*C0o1Ku-Yb7Gdc3AN)

This is because the arrayUnion(method) only [adds a value to an array if it doesn’t already exist](https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array). For my use case, that won’t work. A single exercise may have multiple sets that are defined by the same number of reps and weight. So what do now?

![](https://miro.medium.com/max/450/0*TkFsMRoCZR7nUICv)

Adding multiple objects to an array
-----------------------------------

This is where things get a little hairy. The only way to add duplicate values to an array in Firestore is to read a document, update the array with your duplicate values, and then rewrite it to the database. We’ll revisit this problem in second.

Reading Nested Data
===================

When you attempt to read data from a document within your database, you’ll get a DocumentSnapshot first. This object contains a data property that holds the contents of the document in a giant Map<String,dynamic> object. So, if we wanted to grab the “name” value from one of our previously created documents, we’d do something like this:

```
void ReadNestedData() {   
Firestore.instance.collection("exercises") .document("OWXsZjJRy3jjWmaM3Rup")   
.get().then((docSnapshot) => {   
log(docSnapshot.data\["name"\]) });   
}
```

In this case, we’re simply grabbing one of the keys out of the map. This works out of the box because the “name” field contains a String value. But what if we want to read data from the “sets” field? Chaos. Just kidding…unless chaos means poor readability and data inaccessibility.

```dart
void ReadNestedData() {   
Firestore.instance.collection("exercises") .document("OWXsZjJRy3jjWmaM3Rup") .get().then((docSnapshot) => { log("Sets: " + docSnapshot.data["sets"].toString()) });   
}
```
![](https://miro.medium.com/max/824/0*mVyY0d6UM[rjjk257)]()

In fact, if I wanted to retrieve the reps for the first set of this exercise manually, I’d have to do something like this:

![](https://miro.medium.com/max/1382/0*1uU3irg4Dyp7u17D)

There is an easier way.

Creating Objects from Firestore Documents
=========================================

Just like we did with writing data, we can create a function in our class that creates the object from a Map.

```dart
class Set {   
final int reps;   
final int weight;   
Set(this.reps, this.weight); Map<String, dynamic> toMap() => {   
"reps": this.reps,   
"weight": this.weight }; Set.fromMap(Map<dynamic, dynamic> map) :   
reps = map["reps"].toInt(),   
weight = map["weight"].toInt(); }
```

We can then use our new function to create a Set object from the data in the DocumentSnapshot:

```dart
void ReadNestedData() { Set set;   
Firestore.instance.collection("exercises") .document("OWXsZjJRy3jjWmaM3Rup") .get().then((docSnapshot) => {   
set = Set.fromMap(docSnapshot.data["sets"][0]),   
log("Data :" + docSnapshot.data.toString()),   
log("Reps: " + set.reps.toString()) });   
}
```

This is still not perfect though since we have to manually select the item from the array we are retrieving (see the docSnapshot.data\[“sets”\]\[0\] piece above).

Creating Nested Objects from Firestore Documents
================================================

Ideally, what we want to do is read the document in full and parse out all of it’s contents at once (while being cautious of document size, of course). To do this, you’ll need to manually create nested object lists in your fromMap() methods. For example, to create a list of Set objects inside our Exercise object, we can do this:

```dart
class Exercise {   
final String name;   
final String muscle;   
List<dynamic> sets = \[\];   
Exercise(this.name, this.muscle); Map<String, dynamic> toMap() => {   
"name": this.name,   
"muscle": this.muscle,   
"sets": this.sets }; Exercise.fromMap(Map<dynamic, dynamic> map) :   
name = map\['name'\],   
muscle = map\['muscle'\],   
sets = map\['sets'\].map((set) {   
return Set.fromMap(set); }).toList();   
}
```

Now, you can retrieve the document snapshot, convert it into an Exercise object with a nested array of Set objects, and then manipulate those Sets however you’d like.

```dart
void ReadNestedData() {   
Exercise exercise; Firestore.instance.collection("exercises").document("OWXsZjJRy3jjWmaM3Rup").get().then((docSnapshot) => { exercise = Exercise.fromMap(docSnapshot.data), exercise.sets.forEach((set) {   
Set setInst = set as Set;   
log("Reps :" + setInst.reps.toString()); }) });   
}
```

Adding Multiple Objects to an Array
===================================

Returning to the problem from above, how can we save duplicate objects to an array in Firestore?

1.  First, read the document that you want to update and create an object from it.
2.  Then, create a new object and add it to the list of objects already there
3.  Finally, rewrite the document to Firestore

```dart
void AddObjectToArray() {   
Exercise exercise;   
Set newSet; Firestore.instance .collection("exercises") .document("OWXsZjJRy3jjWmaM3Rup") .get() .then((docSnapshot) => { newSet = Set(10, 30),   
exercise = Exercise.fromMap(docSnapshot.data), exercise.sets.add(newSet), Firestore.instance.collection("exercises") .document("OWXsZjJRy3jjWmaM3Rup") .setData(exercise.toMap())});   
}
```


Does it work? NOPE. If you run this function as is, you’ll probably get an error like this:

> _\[ERROR:flutter/lib/ui/ui\_dart\_state.cc(157)\] Unhandled Exception: Invalid argument: Instance of ‘Set’_

This is because our current Exercise.toMap() function doesn’t prepare the nested Set objects for Firestore. We’ll need to update our Exercise class to look like this:

```dart
class Exercise {   
final String name;   
final String muscle;   
List<dynamic> sets = [];   
Exercise(this.name, this.muscle);   
Map<String, dynamic> toMap() => {  
"name": this.name,   
"muscle": this.muscle,   
"sets": firestoreSets()}; List<Map<String,dynamic>> firestoreSets() {  
    List<Map<String,dynamic>> convertedSets = [];  
    this.sets.forEach((set) {   
    Set thisSet = set as Set;   
    convertedSets.add(thisSet.toMap());   
    });   
return convertedSets; } Exercise.fromMap(Map<dynamic, dynamic> map) :   
name = map['name'],   
muscle = map['muscle'],   
sets = map['sets'].map((set) {   
return Set.fromMap(set); }).toList();   
}
```

I’ve added a new function called firestoreSets that loops through all of the Set objects in the “sets” variable and converts them to Maps. If you run the code again, it should work and even better — you can add as many identical Set objects to the array as you’d like.

![](https://miro.medium.com/max/584/0*A3TfDp1iApxPK2rE)

In Conclusion
=============

This was quite a long article but once you have the basics of Firestore in Flutter down, there are very few limits (aside from usage quotas) on what you can do with the Cloud database. I’ll be updating this article as I learn more so check back periodically. Keep coding!

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

_Originally published at_ [_http://lonercoder.wordpress.com_](https://lonercoder.wordpress.com/2020/07/05/handling-nested-objects-in-firestore-with-flutter/) _on July 5, 2020._
