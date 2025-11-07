declare module "util" {
  export class TextEncoder {
    encode(input?: string): Uint8Array;
  }

  export class TextDecoder {
    constructor(
      label?: string,
      options?: { fatal?: boolean; ignoreBOM?: boolean }
    );
    decode(
      input?: ArrayBuffer | ArrayBufferView | null,
      options?: { stream?: boolean }
    ): string;
  }
}
