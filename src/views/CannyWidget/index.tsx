import React, {useEffect} from "react";

import {useCannyContext} from "../../contexts/CannyContext";


type Props = {
    basePath:string;
    user?:{
        id?:any;
        email?:any;
    },
    boardToken?:string;
    ssoToken?:string;
};

const CannyWidget:React.FC<Props> = (props:Props) => {
    const {
        basePath,
        boardToken,
        ssoToken
    } = props;

    const {
        canny,
        isLoaded
    } = useCannyContext();

    useEffect(() => {
        if(isLoaded) {
            canny.render({
                basePath,
                boardToken,
                ssoToken
            });
        }
    }, [ssoToken, isLoaded, basePath, boardToken]);

    return (
        <div data-canny="" />
    );
};


export default CannyWidget;