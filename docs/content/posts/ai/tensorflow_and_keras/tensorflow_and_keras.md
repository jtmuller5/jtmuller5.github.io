---
title: "A Brief Intro to Tensorflow and Keras"
date: 2022-09-19T21:21:28-04:00
draft: false
categories: ["explorations"]
tags: ["ai","tensorflow","keras"]
---
The future seems to be full of complexities the human mind will not fully comprehend. We don't know everything and we won't know everything and so it seems appropriate to operate under the 
assumption that we will always be pushing up against new knowledge.

With that said, becoming familiar with machine learning and artificial intelligence early will put you in the best position to conquer the complex world of the future. For one, you'll understand 
the foundation that the most foreign complexities are built on (ex. AGI, Stable Diffusion, large language models, etc). For two, you'll have an incredibly powerful tool in your pocket to attack the 
problems you do 
understand.

In this post I'm going to outline what TensorFlow and Keras are, why they're useful, and where the road begins on the way to ML mastery.

# Motivation
Learn something to do something. 

My goal with learning these technologies is to eventually add a .tflite version of the [Stable Diffusion](https://github.com/divamgupta/stable-diffusion-tensorflow) 
Keras models to a Flutter app. Specifically, I want to add this functionality to the ParaSight app so that users can describe the things they saw and have shareable images of creatures or 
otherworldly phenomena generated directly on their phones.

# TensorFlow
[TensorFlow](https://www.tensorflow.org/) advertises itself as an end-to-end machine learning platform. From preparing data to creating ML models to deploying and monitoring those models, TFlow is 
your bro.

Serdar Yegulalp wrote an extremely insightful article on TensorFlow which you can find [here](https://www.infoworld.com/article/3278008/what-is-tensorflow-the-machine-learning-library-explained.html). To summarize his summary, TensorFlow is a machine learning framework, or a set of libraries and packages, that lets developers build and interact with their models in Python or JavaScript. TensorFlow applications are typically 
dataflow graphs that explain how input data should be processed to generate a meaningful output and these applications can be run on anything that even acts like a computer:
- Big computers
- Small computers
- Mobile phones
- CPUs
- GPUs
- TPUs
- IOT devices

Compared to Keras, TensorFlow is a lower level framework with C++ binaries to handle the intense number crunching that ML models require.

# Keras

What TensorFlow is to algorithms, [Keras](https://keras.io/) is to TensorFlow.

Keras is a human-first deep learning framework that aims to make creating neural networks as straightforward as possible. It's designed to integrate with TensorFlow 2.0, but it can be used 
with alternative back-end engines like CNTK, Theano, MXNet, and PlaidML.

It sounds useful, but what is it actually _doing_? 

Most machine learning models used today are large structures built from lots of layers. Data that's passed to these models will 
travel through each layer sequentially and be manipulated or analyzed in one way or another so that a specific output can be produced. In their raw form, these layers are mathematical computations 
and they aren't always easy to understand. Keras provides a high-level API, or language, for creating models from layers.

> Keras is a high-level API to build and train models in TensorFlow ([Source](https://colab.research.google.com/github/tensorflow/docs/blob/master/site/en/tutorials/keras/classification.ipynb))  

Models created with Keras come in two formats: [SavedModel and HF](https://www.tensorflow.org/guide/keras/save_and_serialize#whole-model_saving_loading). 
* SavedModel - Newer, heavier
  * Model's architecture
  * Model's weight values
  * Model's compilation information
  * The optimizer and its state
  * External losses & metrics
  * Computation graph of custom objects


* H5 (HDF5) - Older, lighter
  * Model's architecture
  * Model's weight values
  * Model's compilation information
  * The optimizer and its state

Conveniently, both of these model formats can be converted to the TFLite format so they can run on Android and iOS devices. 

More details about the Keras framework can be found in this [article](https://www.infoworld.com/article/3336192/what-is-keras-the-deep-neural-network-api-explained.html) by Martin Heller.

# Keras or TensorFlow First?
If you choose to seriously study the art of machine learning, you'll inevitably learn both of these technologies. But as a noob to the space, knowing where to start is always difficult. According to 
this [article](https://medium.com/@nezar.a/should-i-learn-tensorflow-or-keras-4bfe35d508a8), you should start with Keras if you're new to deep learning and want to build a neural network fast. If 
your goal is instead to do research in the area of machine learning and you want to dive into the low level details of model building, start with TensorFlow.

Since I'm in the business of building things fast, Keras seems like the place to start.

# More About Models

At this point, I understand the landscape a bit more than I did at the beginning. TensorFlow is Google's machine learning shark that efficiently handles the hardcore mathematics and tensor 
manipulations while Keras is the remora fish coming along for the ride while also making significant contributions to the ML ecosystem. Cool cool.

Now for the questions that weren't answered.

### Can you create a layered model in TensorFlow without Keras?

Yes. Keras is, for all intents and purposes, a convenient add-on to the Tensorflow framework. While it does abstract away a lot of the implementation details for certain layer types, it is not 
required.

### Can you create a Keras model without TensorFlow?

Yes. [In 2015](https://datascience.stackexchange.com/a/65754), Keras was refactored to be an engine-agnostic API that can work with a handful of alternative backends including [CNTK](https://learn.microsoft.com/en-us/cognitive-toolkit/), [Theano](https://github.com/Theano/Theano), [Aesara](https://github.com/aesara-devs/aesara) (Theano's successor), and [MxNet](https://mxnet.apache.org/versions/1.9.1/). Then in 2019, [multi-backend Keras was abandoned](https://devclass.com/2019/09/18/another-one-bites-the-dust-keras-team-steps-away-from-multi-backends-refocuses-on-tf-keras/) by Google and Keras was more or less merged into TensorFlow. Keras 2.3 still exists and you can use it with the other backends listed....but let's be honest, you probably shouldn't.

### So do you create a Keras model or a TensorFlow model?

Considering Keras has effectively been absolved into TensorFlow, you'll usually be creating a Keras model ([tf.keras.Model](https://www.tensorflow.org/api_docs/python/tf/keras/Model)).

