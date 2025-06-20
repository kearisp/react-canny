import {createContext, useContext} from "react";
import {Canny} from "../makes";


type CannyContextProps = {
    appId?: string;
    isLoaded: boolean;
    isIdentified: boolean;
    canny: Canny;
};

export const CannyContext = createContext<CannyContextProps>({
    isLoaded: false,
    isIdentified: false,
    canny: new Canny()
});

export const useCannyContext = (): CannyContextProps => {
    return useContext(CannyContext);
};
