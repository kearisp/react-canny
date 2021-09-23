class Canny {
    canny:any;

    constructor(canny:any) {
        this.canny = canny;
    }

    async render(options:any) {
        if(this.canny) {
            this.canny("render", options);
        }
    }
}


export {Canny};