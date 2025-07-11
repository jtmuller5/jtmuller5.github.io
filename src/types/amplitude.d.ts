import type { AmplitudeReturn } from "@amplitude/analytics-browser";

declare global {
  interface Window {
    amplitude: AmplitudeReturn;
  }
}

export {};
