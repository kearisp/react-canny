import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    PropsWithChildren
} from "react";

import {Canny, CannyLoader} from "../../makes";
import {CannyContext} from "../../contexts";


type Props = PropsWithChildren<{
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

type Data = Pick<Props, "appId" | "user" | "onIdentify">;

const CannyProvider: React.FC<Props> = (props: Props) => {
    const {
        appId,
        domain,
        subdomain,
        user,
        children,
        onIdentify
    } = props;

    const [isLoaded, setLoaded] = useState(false);
    const refCanny = useRef<any|null>(null);
    const dataRef = useRef<Data>({
        appId,
        user,
        onIdentify
    });

    const canny = useMemo(() => {
        return new Canny(refCanny.current);
    }, [isLoaded]);

    useEffect(() => {
        (async () => {
            const loader = new CannyLoader();

            try {
                refCanny.current = await loader.load(subdomain, domain);

                setLoaded(true);
            }
            catch(err) {
                console.error(err);
            }
        })();
    }, []);

    useEffect(() => {
        dataRef.current = {
            appId,
            user,
            onIdentify
        };
    }, [appId, user, onIdentify]);

    useEffect(() => {
        if(!isLoaded) {
            return;
        }

        canny.identify(
            dataRef.current.appId,
            dataRef.current.user,
            dataRef.current.onIdentify
        );
    }, [isLoaded]);

    return (
        <CannyContext.Provider
          value={{
            appId,
            isLoaded,
            canny
          }}>
            {children}
        </CannyContext.Provider>
    );
};


export type {Props as CannyProviderProps};
export {CannyProvider};
