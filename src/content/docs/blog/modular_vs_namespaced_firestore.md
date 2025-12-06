---
title: "Modular vs Namespaced Firestore"
description: "Tips and tricks to wield Firestore like a pro on serverless cloud functions"
date: 2025-10-20
---

There are currently two versions of the Firebase APIs, one that is namespaced and one that is modular. For at least a year, I brushed off the notion that they were different and was repeatedly confused/frustrated when VS Code would lint the Firebase methods I've known and loved. Today, I finally decided to educate myself.

Google has a [brief explanation](https://firebase.google.com/docs/web/learn-more#modular-version) about why new apps should use the modular API. Long story short, code organized into [modules](https://www.typescriptlang.org/docs/handbook/modules/introduction.html) allows build tools to remove unused code in a process known as "tree shaking". Code organized using [namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html), does not allow for this type of optimization. 

That makes sense.

Unfortunately, the way Google implemented the modular API destroyed the API's discoverability and made it pretty difficult to get used to. All functions are now isolated from one another and queries must be built from parts instead of chained together.

New Modular API:
```ts
const postsQuery = query(
  collection(doc(collection(db, 'users'), '123'), 'posts'),
  where('status', '==', 'published'),
  orderBy('date'),
  limit(10)
)
```

Old Namespaced API:

```ts
db.collection('users')
  .doc('123')
  .collection('posts')
  .where('status', '==', 'published')
  .orderBy('date')
  .limit(10)
```

In other words, the new syntax is the complete inverse of the original namespaced API. It looks like the namespaced code is being turned inside out. Just look at this line:

```ts
collection(doc(collection(db, 'users'), '123'), 'posts'),
```

Why is the database instance buried three layers deep in the query?

This is a cut and dry case of tree-shaking and bundle size being prioritized over developer ergonomics.

What makes this change even worse is that the NodeJS API continues to use the "namespaced" API. This makes it rather easy to put yourself in the mentally taxing position where half of your stack uses an intuitive Firebase API while the other half reads like something GPT-2 would write. For example, [Cloud Functions](https://firebase.google.com/docs/functions/) written in TypeScript use the original namespaced API. Code switching between these two interfaces can be crazy-making...but for now that's just the way it is.

## Namespaced API

For this example, I'll walk through using the [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) in  [Firebase Cloud Functions](https://firebase.google.com/docs/functions/). Cloud functions are considered a "privileged environment" so using the Admin SDK here is generally safe.

### Installation

You can install the Admin SDK like this:

```bash
npm install firebase-admin --save
```

### Initialization
Next, initialize the SDK:

```ts
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  console.log("Initializing Firebase Admin SDK");
  admin.initializeApp();
} else {
  console.log("Firebase Admin SDK already initialized");
}

export default admin;
```

This code will run the required `initializeApp()` method as soon as your Cloud Function is activated. Then, in other files, you can use the `admin` object by importing it:

```ts
import admin from "../firebase_admin";
```

### Interacting with Firestore

The Admin SDK gives you access to Firestore, as well as nearly every other Firebase product, via an appropriately named method on the `admin` instance. To interact with Firestore:

```ts
const db = admin.firestore();
```

The namespaced API let's you do basically everything by using methods on instances. In the code below, `collection()`, `doc()`, and `set()` are all methods that intuitively chain together to do something that reads like a sentence - "In the "cities" collection, find the "LA" doc and set it's data:

```ts
const data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA'
};

// Add a new document in collection "cities" with ID 'LA'
const res = await db.collection('cities').doc('LA').set(data);
```

## Modular API

Since the Modular API primarily relates to frontend code where you wouldn't be using the Admin SDK, this example will use the normal Firebase library.

### Installation
Install the library like this:

```bash
npm install firebase@12.4.0 --save
```

### Initialization

Once installed, you can initialize your app using the `initializeApp` function:

```ts
import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    FIREBASE_CONFIGURATION
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

This is where the similarities between the old API and the new one end.

### Interacting with Firestore

To interact with Firestore, you first need to initialize it and retrieve a reference to the "service":

```ts
// Pass in the initialized app from above
const db = getFirestore(app);
```

Now, instead of using chained methods like in the namespaced API, you need to use specific functions for action you want to take. For example, `addDoc`, `setDoc`, `deleteDoc`, etc:

```ts
import { collection, addDoc } from "firebase/firestore"; 

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
```

In my opinion, this provides a much worse developer experience. Instead of ctrl-spacing your way from one method to the next, you need to remember [everything](https://firebase.google.com/docs/reference/js/firestore_.md#@firebase/firestore). That sucks.