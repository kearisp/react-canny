class CannyLoader {
    get Canny() {
        return (window as any).Canny;
    }

    async load(subdomain?: string, domain?: string) {
        if(this.Canny) {
            return this.Canny;
        }

        const script = document.createElement("script");

        script.type = "text/javascript";
        script.async = true;

        const url = new URL("https://canny.io/sdk.js");

        if(subdomain) {
            url.hostname = `${subdomain}.canny.io`;
        }

        if(domain) {
            url.hostname = domain;
        }

        script.src = url.toString();

        return new Promise((resolve, reject) => {
            script.onload = () => {
                resolve(this.Canny);
            };

            script.onerror = (err) => {
                reject(err);
            };

            document.head.append(script);
        });
    }
}


export {CannyLoader};
