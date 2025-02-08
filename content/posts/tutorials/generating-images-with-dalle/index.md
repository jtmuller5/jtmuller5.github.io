---
title: "Generating Images With Dalle"
date: 2024-09-29T15:13:36-04:00
draft: false
categories: ["tutorials"]
tags: ["openai","flutter"]
cover:
  image: "images/painter.png"
  relative: false
  alt: "Psychedelic painter"
---

I've recently been working on an app with my wife called "Abi's Recipes". The app, designed for mobile and TV, aims to be the Netflix of recipes, with a focus on beautiful images and a simple interface. We wanted to generate images for the recipes that we don't have photos for, and we wanted to do it in a way that was fun and creative. That's where DALL-E comes in.

Generating an image is as simple as sending a prompt to the DALL-E API and receiving an image in response. The prompt is a description of the image you want to generate. For example, "A banana cookie recipe" could generate an image of a banana cookie recipe. The API uses a model trained on a dataset of images and text to generate images based on the prompt.

The [request](https://platform.openai.com/docs/guides/images/generations):

```bash
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "a banana cookie recipe",
    "n": 1,
    "size": "1024x1024"
  }'
```

The response:

```json
{
  "created": 1724527201,
  "data": [
    {
      "revised_prompt": "An image capturing the essence of a banana cookies recipe. In the foreground, a smooth, bright yellow banana lays on a vintage wooden cutting board accented with knife marks. An unopened bag of golden flour and a clear glass jar of white sugar are nearby. Pats of creamy butter, a cup of semi-sweet chocolate chips, and a bottle of vanilla extract complete the scene. In the background, an open, vintage, recipe book details the process of making banana cookies, while a wire rack holds freshly baked, golden-brown banana cookies cooling.",
      "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-LwqjJysqBqapmNfjM37TmJRL/user-BJDirObNfew0bvdRfn3QvFJp/img-jzdRWeNIDqmCllzqGEQkDNyX.png?st=2024-08-24T18%3A20%3A01Z&se=2024-08-24T20%3A20%3A01Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-08-23T23%3A16%3A04Z&ske=2024-08-24T23%3A16%3A04Z&sks=b&skv=2024-08-04&sig=PbnLwymfw0vGr1OwgaXLYZ2C2VJUgVIy8vvUMwUfhtg%3D"
    }
  ]
}
```

![Banana Cookie Recipe](images/image.png)

I tested this interaction in Postman to make sure it worked but the end goal was to integrate it into our Flutter app.

Since the only thing I needed the OpenAI API for was generating images, I decided to use the `http` package to make the request directly (instead of using a package that wraps the API).

```dart
final apiKey = const String.fromEnvironment('CHAT_KEY');
    final url = 'https://api.openai.com/v1/images/generations';
    final headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $apiKey',
    };
    final body = jsonEncode({
      'model': 'dall-e-3',
      'prompt': '${recipe.title} recipe image',
      'n': 1,
      'size': '1024x1024',
    });

final response = await http.post(
    Uri.parse(url),
    headers: headers,
    body: body,);
```

As noted above, a successful response includes a nested `data` object with a `url` property that contains the URL of the generated image. These URLs can't be used directly inside a web app because of CORS, and I frankly don't know how long they are valid for. I decided to download the image and upload it to Firebase Storage where I would have more control over it. The full function looks like this:

```dart
Future<String?> generateAiImage({
    required Recipe recipe,
  }) async {
    final apiKey = const String.fromEnvironment('CHAT_KEY');
    final url = 'https://api.openai.com/v1/images/generations';
    final headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $apiKey',
    };
    final body = jsonEncode({
      'model': 'dall-e-3',
      'prompt': '${recipe.title} recipe image',
      'n': 1,
      'size': '1024x1024',
    });

    try {
      final response = await http.post(Uri.parse(url), headers: headers, body: body);
      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final imageUrl = responseData['data'][0]['url'];

        // Download the image
        final imageResponse = await http.get(Uri.parse(imageUrl));
        if (imageResponse.statusCode == 200) {
          String downloadUrl = '';

            final tempDir = await getTemporaryDirectory();
            final file = File('${tempDir.path}/generated_image.png');
            await file.writeAsBytes(imageResponse.bodyBytes);

            // Upload to Firebase Storage
            final storageRef = FirebaseStorage.instance.ref().child('generated_images/${recipe.recipeId}.png');
            final uploadTask = storageRef.putFile(file);

            final snapshot = await uploadTask.whenComplete(() => {});
            downloadUrl = await snapshot.ref.getDownloadURL();

          print('Image uploaded to Firebase Storage: $downloadUrl');

          return downloadUrl;
        } else {
          print('Failed to download image: ${imageResponse.body}');
          return null;
        }
      } else {
        print('Failed to generate image: ${response.body}');
        return null;
      }
    } catch (e) {
      print('Error: $e');
      return null;
    }
  }
```

Interestingly, the response from OpenAI also includes a `revised_prompt` property that describes the image generated. I'm not using this in the app but it could be useful for debugging or displaying to the user. We can update the function above to return a [record](https://dart.dev/language/records) with the image URL and the revised prompt:

```dart
 Future<(String, String)?> generateAiImage({
    required Recipe recipe,
  }) async {
    final apiKey = const String.fromEnvironment('CHAT_KEY');
    final url = 'https://api.openai.com/v1/images/generations';
    final headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $apiKey',
    };
    final body = jsonEncode({
      'model': 'dall-e-3',
      'prompt': '${recipe.title} recipe image',
      'n': 1,
      'size': '1024x1024',
    });

    try {
      final response = await http.post(Uri.parse(url), headers: headers, body: body);
      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final imageUrl = responseData['data'][0]['url'];
        String revisedPrompt = responseData['data'][0]['revised_prompt'];

        // Download the image
        final imageResponse = await http.get(Uri.parse(imageUrl));
        if (imageResponse.statusCode == 200) {
          String downloadUrl = '';

            final tempDir = await getTemporaryDirectory();
            final file = File('${tempDir.path}/generated_image.png');
            await file.writeAsBytes(imageResponse.bodyBytes);

            // Upload to Firebase Storage
            final storageRef = FirebaseStorage.instance.ref().child('generated_images/${recipe.recipeId}.png');
            final uploadTask = storageRef.putFile(file);

            final snapshot = await uploadTask.whenComplete(() => {});
            downloadUrl = await snapshot.ref.getDownloadURL();

          print('Image uploaded to Firebase Storage: $downloadUrl');

          return (downloadUrl, revisedPrompt);
        } else {
          print('Failed to download image: ${imageResponse.body}');
          return null;
        }
      } else {
        print('Failed to generate image: ${response.body}');
        return null;
      }
    } catch (e) {
      print('Error: $e');
      return null;
    }
  }
```

I initially wanted to generate the images using Google's Vertex AI but the Imagen models are locked behind an access form. When they become publicly available, I will most likely migrate away from OpenAI. There is now a [flutter_vertexai](https://pub.dev/packages/firebase_vertexai) package that lets you directly interact with Google's generative AI models from your Flutter applications and it makes everything a lot simpler for apps already using Firebase.
