import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    ReactNode
} from "react";

import {Canny} from "../../makes/Canny";
import {CannyLoader} from "../../makes/CannyLoader";

import {CannyContext} from "../../contexts/CannyContext";


type Props = {
    appId:string;
    children:ReactNode;
};

const CannyProvider:React.FC<Props> = (props:Props) => {
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
        const loader = new CannyLoader();

        loader.load().then((cannySDK) => {
            refCanny.current = cannySDK;
            setLoaded(true);
        }).catch((err) => {
            console.log(err);
        });
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


export default CannyProvider;