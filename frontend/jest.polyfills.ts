// jest.polyfills.ts

// Polyfill TextEncoder & TextDecoder for Jest (jsdom)
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from "util";

if (typeof (globalThis as any).TextEncoder === "undefined") {
  (globalThis as any).TextEncoder = NodeTextEncoder;
}

if (typeof (globalThis as any).TextDecoder === "undefined") {
  (globalThis as any).TextDecoder = NodeTextDecoder as any;
}
