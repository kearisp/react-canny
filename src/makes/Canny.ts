export interface CannyOptions {
  boardToken: string;
  user?: {
    id?: any;
    email?: any;
  };
  basePath?: string;
  ssoToken?: string;
  onLoadCallback: () => void;
}
class Canny {
  canny: any;

  constructor(canny: any) {
    this.canny = canny;
  }

  async render(options: CannyOptions) {
    if (this.canny) {
      this.canny("render", options);
    }
  }
}

export { Canny };
