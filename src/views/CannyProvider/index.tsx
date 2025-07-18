import React, {useState, useMemo, useRef, useEffect, PropsWithChildren} from "react";
import {Canny, CannyLoader} from "../../makes";
import {CannyContext} from "../../contexts";


export type CannyProviderProps = PropsWithChildren<{
    appId: string;
    domain?: string;
    subdomain?: string;
    user?: {
        id: number | string;
        name: string;
        email: string;
        avatarURL?: string;
        created?: string;
    };
    onIdentify?: () => void;
}>;

export const CannyProvider: React.FC<CannyProviderProps> = (props: CannyProviderProps) => {
    const {
        appId,
        domain,
        subdomain,
        user,
        children,
        onIdentify
    } = props;

    const [isLoaded, setLoaded] = useState(false),
          [isIdentified, setIdentified] = useState(false),
          canny = useMemo(() => new Canny(), []),
          onIdentifyRef = useRef(onIdentify);

    onIdentifyRef.current = onIdentify;

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                let url = new URL("https://canny.io/sdk.js");

                if(subdomain) {
                    url.hostname = `${subdomain}.canny.io`;
                }

                if(domain) {
                    url.hostname = domain;
                }

                await CannyLoader.load("canny-jssdk", url.toString());

                canny.flush();

                if(!mounted) {
                    return;
                }

                setLoaded(true);
            }
            catch(err) {
                console.error(err);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if(!user) {
            return;
        }

        let mounted = true;

        canny.identify(appId, user, (...data) => {
            if(!mounted) {
                return;
            }

            setIdentified(true);

            if(onIdentifyRef.current) {
                onIdentifyRef.current(...data);
            }
        });

        return () => {
            mounted = false;
        };
    }, [appId, user]);

    return (
        <CannyContext.Provider
          value={{
            appId,
            isLoaded,
            isIdentified,
            canny
          }}>
            {children}
        </CannyContext.Provider>
    );
};
