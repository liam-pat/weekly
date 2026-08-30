/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "heti/js/heti-addon.js" {
  export default class Heti {
    constructor(selector?: string);
    autoSpacing(): void;
  }
}

declare module "@pagefind/default-ui" {
  interface PagefindUIOptions {
    element: string | HTMLElement;
    baseUrl?: string;
    bundlePath?: string;
    showImages?: boolean;
    translations?: Record<string, string>;
  }

  export class PagefindUI {
    constructor(options: PagefindUIOptions);
  }
}
