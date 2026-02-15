---
title: "Add Amplitude Analytics to Astro Website"
description: "Start tracking your traffic with Amplitude"
date: 2025-06-15
tags:
  - astro
---

There are a handful of blogs about adding Google Analytics to your Astro website and virtually none that do the same for Amplitude. In this post, I'll show you how to quickly set up Amplitude analytics on an Astro website so you can use all of the marvelous charting tools Amplitude has to offer.

### Create a New Amplitude Project

In the Amplitude dashboard, navigate to `Settings` -> `Organization Settings` -> `Projects` and create a new project for your website or blog. Copy the API key for the next steps.

### Install Partytown

In your Astro project, run the following command to install the [Partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/) plugin:

```bash
npx astro add partytown
```

This will add the Partytown plugin to your `astro.config.js` file:

```js
// astro.config.js
import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';

export default defineConfig({
  // ...
  integrations: [
    partytown(),
  ],
});
```

For this to work, you'll need to add the following line to the plugin setup:

```js {5}
export default defineConfig({
  // ...
  integrations: [
    partytown(
        config: { forward: ["amplitude", "amplitude.init"] },
    ),
  ],
});
```

Because Partytown scripts run in a separate web worker, you need to tell Partytown what variables it needs to [forward](https://partytown.qwik.dev/forwarding-events/) to the `window` object.

### Add the Amplitude Scripts

In a shared head component, add the following two scripts

```tsx
// BaseHead.astro
<script
  is:inline
  type="text/partytown"
  src="https://cdn.amplitude.com/script/AMPLITUDE_API_KEY.js"
></script>

<script is:inline type="text/javascript">
  window.amplitude = window.amplitude || {};
  window.amplitude.init =
    window.amplitude.init ||
    function () {
      (window.amplitude._q = window.amplitude._q || []).push(arguments);
    };

  window.amplitude.init("AMPLITUDE_API_KEY", {
    autocapture: true,
  });
</script>
```

> Remember to replace AMPLITUDE_API_KEY with your API key from step 1

### Deploy and Track

This is basically all you need to start tracking website traffic. With the [autocapture](https://amplitude.com/docs/data/autocapture) flag set to true, Amplitude will track page views, button clicks, and digital demographics.

In the Amplitude dashboard, you can use a pre-built dashboard to start monitoring your website. I like the "User Activity" dashboard which gives you information like:

- Daily active users
- Daily new users
- Returning users
- Average session length
- Device breakdown

Happy coding ☕️

