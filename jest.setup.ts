
class MockTextDecoder implements TextDecoder {
  constructor(label?: string, options?: TextDecoderOptions) {
    this.encoding = label;
    this.fatal = options?.fatal || false;
    this.ignoreBOM = options?.ignoreBOM || false;
  }

  decode(input?: AllowSharedBufferSource, options?: TextDecodeOptions): string {
    throw new Error("Method not implemented.");
  }
  encoding: string;
  fatal: boolean;
  ignoreBOM: boolean;
}

class MockTextEncoder implements TextEncoder {
  encode(input?: string): Uint8Array {
    throw new Error("Method not implemented.");
  }
  encodeInto(source: string, destination: Uint8Array): TextEncoderEncodeIntoResult {
    throw new Error("Method not implemented.");
  }
  encoding: string;
}

global.TextDecoder = MockTextDecoder;
global.TextEncoder = MockTextEncoder;
