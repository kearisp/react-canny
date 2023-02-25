import React, {
    useEffect,
    ElementType,
    PropsWithChildren
} from "react";

import {ChangeLogOptions} from "../../makes";
import {useCannyContext} from "../../contexts";


type Props = PropsWithChildren<{
    component?: ElementType;
    className?: string;
} & Partial<Omit<ChangeLogOptions, "appId">> & {
    [prop: string]: any;
}>;

const CannyChangelog: React.FC<Props> = (props) => {
    const {
        component: Component = "button",
        align = "left",
        position = "bottom",
        labelIDs,
        children,
        ...rest
    } = props;

    const {
        isLoaded,
        appId,
        canny
    } = useCannyContext();

    useEffect(() => {
        if(isLoaded && appId) {
            canny.initChangelog({
                appID: appId,
                align,
                position,
                labelIDs
            });

            return () => canny.closeChangelog();
        }
    }, [isLoaded, appId, align, position, labelIDs]);

    return (
        <Component
          {...rest}
          data-canny-changelog="">
            {children}
        </Component>
    );
};


export type {Props as CannyChangelogProps};
export {CannyChangelog};
