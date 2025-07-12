import React, {useRef, useEffect, ElementType} from "react";
import {useCannyContext} from "../../contexts";
import {RenderOptions} from "../../makes";


export type CannyFeedbackProps = RenderOptions & {
    component?: ElementType;
};

export const CannyFeedback: React.FC<CannyFeedbackProps> = (props) => {
    const {
        component: Component = "div",
        basePath,
        boardToken,
        ssoToken,
        theme,
        onLoadCallback,
        ...rest
    } = props;

    const handleLoad = useRef<typeof onLoadCallback>(onLoadCallback);

    handleLoad.current = onLoadCallback;

    const {canny} = useCannyContext();

    useEffect(() => {
        canny.render({
            basePath,
            boardToken,
            ssoToken,
            theme,
            onLoadCallback: handleLoad.current
        });
    }, [ssoToken, boardToken, basePath, theme]);

    return (
        <Component
          {...rest}
          data-canny="" />
    );
};

