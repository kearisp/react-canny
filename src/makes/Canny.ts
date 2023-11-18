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
    canny: any;

    constructor(canny: any) {
        this.canny = canny;
    }

    identify(appID: string, user: any) {
        this.canny("identify", {appID, user});
    }

    render(options: RenderOptions) {
        if(this.canny) {
            this.canny("render", options);
        }
    }

    initChangelog(options: ChangeLogOptions) {
        if(this.canny) {
            this.canny("initChangelog", options);
        }
    }

    closeChangelog() {
        if(this.canny) {
            this.canny("closeChangelog");
        }
    }
}


export {Canny};