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

export class Canny {
    protected static pull: any[][] = [];

    protected get handle() {
        return (window as any).Canny;
    }

    protected push(...args: any[]): void {
        Canny.pull.push(args);
        this.flush();
    }

    public flush(): void {
        if(!this.handle) {
            return;
        }

        while(Canny.pull.length > 0) {
            const row = Canny.pull.shift();

            if(row) {
                this.handle(...row);
            }
        }
    }

    public identify(appID: string, user: any, callback?: () => void): void {
        this.push("identify", {appID, user}, callback);
    }

    public authenticateCannyLink(url: string): string {
        if(!this.handle) {
            return url;
        }

        return this.handle("authenticateCannyLink", url);
    }

    public render(options: RenderOptions): void {
        this.push("render", options)
    }

    public initChangelog(options: ChangeLogOptions): void {
        this.push("initChangelog", options);
    }

    public closeChangelog(): void {
        this.push("closeChangelog");
    }
}
