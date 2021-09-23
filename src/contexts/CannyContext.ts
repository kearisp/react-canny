import {
    createContext,
    useContext
} from "react";


const CannyContext = createContext<any>({});

const useCannyContext = () => {
    return useContext(CannyContext);
};


export {
    useCannyContext,
    CannyContext
};