import React, {
    useEffect,
    ElementType,
    PropsWithChildren
} from "react";
import {ChangeLogOptions} from "../../makes";
import {useCannyContext} from "../../contexts";


export type CannyChangelogProps = PropsWithChildren<{
    component?: ElementType;
    className?: string;
} & Partial<Omit<ChangeLogOptions, "appId">> & {
    [prop: string]: any;
}>;

export const CannyChangelog: React.FC<CannyChangelogProps> = (props) => {
    const {
        component: Component = "button",
        align = "left",
        position = "bottom",
        labelIDs,
        children,
        ...rest
    } = props;

    const {
        appId,
        canny
    } = useCannyContext();

    useEffect(() => {
        if(!appId) {
            return;
        }

        canny.initChangelog({
            appID: appId,
            align,
            position,
            labelIDs
        });

        return () => canny.closeChangelog();
    }, [appId, align, position, labelIDs]);

    return (
        <Component
          {...rest}
          data-canny-changelog="">
            {children}
        </Component>
    );
};
