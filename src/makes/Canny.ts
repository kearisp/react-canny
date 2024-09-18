export type RenderOptions = {
    boardToken: string;
    basePath?: null | string;
    theme?: "auto" | "light" | "dark";
    ssoToken?: string;
    onLoadCallback?: () => void;
};

export type ChangeLogOptions = {
    appID: string;
    align: "top" | "bottom" | "left" | "right";
    position: "top" | "bottom" | "left" | "right";
    labelIDs?: string[];
};


class Canny {
    public constructor(
        protected canny: any
    ) {}

    public identify(appID: string, user: any, callback?: () => void): void {
        if(!this.canny) {
            return;
        }

        this.canny("identify", {appID, user}, callback);
    }

    public authenticateCannyLink(url: string): string {
        if(!this.canny) {
            return url;
        }

        return this.canny("authenticateCannyLink", url);
    }

    public render(options: RenderOptions): void {
        if(!this.canny) {
            return;
        }

        this.canny("render", options);
    }

    public initChangelog(options: ChangeLogOptions): void {
        if(!this.canny) {
            return;
        }

        this.canny("initChangelog", options);
    }

    public closeChangelog(): void {
        if(!this.canny) {
            return;
        }

        this.canny("closeChangelog");
    }
}


export {Canny};
