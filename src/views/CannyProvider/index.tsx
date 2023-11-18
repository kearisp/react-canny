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
    user?: {
        id: number | string;
        name: string;
        email: string;
        avatarURL?: string;
        created?: string;
    };
}>;

const CannyProvider: React.FC<Props> = (props: Props) => {
    const {
        appId,
        user,
        children
    } = props;

    const [isLoaded, setLoaded] = useState(false);
    const refCanny = useRef<any|null>(null);

    const canny = useMemo(() => {
        return new Canny(refCanny.current);
    }, [isLoaded]);

    useEffect(() => {
        (async () => {
            const loader = new CannyLoader();

            try {
                refCanny.current = await loader.load();

                setLoaded(true);
            }
            catch(err) {
                console.error(err);
            }
        })();
    }, []);

    useEffect(() => {
        if(!isLoaded) {
            return;
        }

        canny.identify(appId, user);
    }, [isLoaded, appId, user]);

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
