import React, { useEffect } from "react";

import { useCannyContext } from "../../contexts/CannyContext";
import { CannyOptions } from "../../makes/Canny";

const CannyWidget: React.FC<CannyOptions> = (props: CannyOptions) => {
  const { basePath, boardToken, ssoToken, onLoadCallback } = props;

  const { canny, isLoaded } = useCannyContext();

  useEffect(() => {
    if (isLoaded) {
      canny.render({
        basePath,
        boardToken,
        ssoToken,
        onLoadCallback,
      });
    }
  }, [ssoToken, isLoaded, basePath, boardToken]);

  return <div data-canny="" />;
};

export default CannyWidget;
