import {
    createContext,
    useContext
} from "react";

import {Canny} from "../makes";


type CannyContextProps = {
    appId?: string;
    isLoaded: boolean;
    canny: Canny;
};

const CannyContext = createContext<CannyContextProps>({
    isLoaded: false,
    canny: new Canny(null)
});

const useCannyContext = () => {
    return useContext(CannyContext);
};


export {
    useCannyContext,
    CannyContext
};