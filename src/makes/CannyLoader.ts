export class CannyLoader {
    protected static loaders: {
        [script: string]: CannyLoader;
    } = {};
    protected _loader?: Promise<any>;
    protected script: HTMLScriptElement;

    protected constructor(
        protected readonly scriptId: string,
        protected readonly href: string
    ) {
        const script = document.createElement("script");

        script.id = this.scriptId;
        script.type = "text/javascript";
        script.async = true;
        script.src = this.href;

        this.script = script;
    }

    public get loader(): Promise<void> {
        if(!this._loader) {
            this._loader = new Promise<void>((resolve, reject) => {
                const handleLoad = (): void => {
                    resolve(this.handleLoad());
                };

                const handleError = (err: any): void => {
                    reject(this.handleError(err));
                };

                if(this.script.addEventListener) {
                    this.script.addEventListener("load", handleLoad);
                    this.script.addEventListener("error", handleError);
                }
                else {
                    this.script.onload = handleLoad;
                    this.script.onerror = handleError;
                }

                document.head.append(this.script);
            });
        }

        return this._loader;
    }

    protected handleLoad(): Promise<void> {
        this._loader = Promise.resolve();

        return this._loader;
    }

    protected handleError(err: any): Promise<void> {
        this.script.remove();

        delete this._loader;

        if(CannyLoader.loaders[this.scriptId]) {
            delete CannyLoader.loaders[this.scriptId];
        }

        return Promise.reject(err);
    }

    public static async load(scriptId: string, href: string): Promise<void> {
        if(!CannyLoader.loaders[scriptId]) {
            CannyLoader.loaders[scriptId] = new CannyLoader(scriptId, href);
        }

        const loader: CannyLoader = CannyLoader.loaders[scriptId];

        return loader.loader;
    }
}
