---
title: "Firebase Secrets"
description: "To help you store sensitive configuration information, Cloud Functions for Firebase integrates with Google Cloud Secret Manager. This encrypted service stores configuration values securely, while still allowing easy access from your functions when needed."
date: 2026-05-04
draft: true
---
https://firebase.google.com/docs/functions/config-env#secret-manager
## Steps

Ensure that you have configured billing for your project

Initiate the secret setting flow:
```
firebase functions:secrets:set SECRET_NAME
```

You will then be prompted for the secret value (you won't be able to see the input):
```
Enter a value for GOOGLE_SEARCH_API_KEY:
```
