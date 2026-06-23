/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_FIELD_VET_URL?: string;
  readonly VITE_FIELD_VET_WS_URL?: string;
  readonly VITE_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface NDEFReadingEvent extends Event {
  serialNumber: string;
  message: unknown;
}

declare class NDEFReader extends EventTarget {
  scan(): Promise<void>;
  onreading: ((this: NDEFReader, ev: NDEFReadingEvent) => void) | null;
  onreadingerror: ((this: NDEFReader, ev: Event) => void) | null;
}

interface Window {
  NDEFReader?: typeof NDEFReader;
}

declare module "virtual:pwa-register" {
  export function registerSW(options?: { immediate?: boolean }): (reload?: boolean) => void;
}
