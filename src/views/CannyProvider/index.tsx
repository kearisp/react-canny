import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    ReactNode
} from "react";

import {Canny, CannyLoader} from "../../makes";
import {CannyContext} from "../../contexts";


type Props = {
    appId: string;
    children: ReactNode;
};

const CannyProvider: React.FC<Props> = (props: Props) => {
    const {
        children,
        appId
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
