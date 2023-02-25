import React, {useRef, useEffect, ElementType} from "react";

import {useCannyContext} from "../../contexts";
import {RenderOptions} from "../../makes";


type Props = RenderOptions & {
    component?: ElementType;
};

const CannyFeedback: React.FC<Props> = (props: Props) => {
    const {
        component: Component = "div",
        basePath,
        boardToken,
        ssoToken,
        onLoadCallback,
        ...rest
    } = props;

    const handleLoad = useRef<typeof onLoadCallback>();

    handleLoad.current = onLoadCallback;

    const {
        isLoaded,
        canny
    } = useCannyContext();

    useEffect(() => {
        if(isLoaded) {
            canny.render({
                basePath,
                boardToken,
                ssoToken,
                onLoadCallback: handleLoad.current
            });
        }
    }, [ssoToken, isLoaded, basePath, boardToken]);

    return (
        <Component
          {...rest}
          data-canny="" />
    );
};


export type {Props as CannyFeedbackProps};
export {CannyFeedback};
