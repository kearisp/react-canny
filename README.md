# React Canny

[![npm version](https://img.shields.io/npm/v/react-canny.svg)](https://www.npmjs.com/package/react-canny)
[![Publish](https://github.com/kearisp/react-canny/actions/workflows/publish-latest.yml/badge.svg?event=release)](https://github.com/kearisp/react-canny/actions/workflows/publish-latest.yml)
[![License](https://img.shields.io/npm/l/react-canny)](https://github.com/kearisp/react-canny/blob/main/LICENSE)

[![npm total downloads](https://img.shields.io/npm/dt/react-canny.svg)](https://www.npmjs.com/package/react-canny)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-canny)](https://bundlephobia.com/package/react-canny)


## Description

[Canny.io](https://canny.io/) integration for react


## Installation

```
npm install react-canny
```


## Usage


### Feedback Widget

> ℹ️ Widget component name changed from CannyWidget to CannyFeedback.

```jsx
import {
    CannyProvider,
    CannyFeedback
} from "react-canny";


const APP_ID = "/* Your app id */";
const BOARD_TOKEN = "/* Tour token board */";
const SSO_TOKEN = "/* Your sso token */";

const App = () => {
    return (
        <CannyProvider appId={APP_ID}>
            <CannyFeedback
              basePath="/feedback"
              boardToken={BOARD_TOKEN}
              ssoToken={SSO_TOKEN} />
        </CannyProvider>
    );
};
```

### Change Log Widget

```jsx
import {
    CannyProvider,
    CannyChangelog
} from "react-canny";

const APP_ID = "/* Your app id */";
const LABEL_IDS = [/* Your label ids */];


const App = () => {
    return (
        <CannyProvider appId={APP_ID}>
            <CannyChangelog
              type="button"
              className="change-log-button"
              align="top"
              position="left"
              labelIDs={LABEL_IDS}>
                Change Log
            </CannyChangelog>
        </CannyProvider>
    );
};
```

Also, you can customize your change log button:

```jsx
const APP_ID = "/* Your app id */";


const CustomButton = (props) => {
    return (
        <button {...props}
          type="button"
          className="my-custom-button" />
    );
};


const App = () => {
    return (
        <CannyProvider appId={APP_ID}>
            <CannyChangelog
              component={CustomButton}>
                Change Log
            </CannyChangelog>
        </CannyProvider>
    );
};
```

### Identify & Authentication

Canny Identify is built-into the CannyProvider, and specifying the user details will trigger user identification.

```jsx
import { CannyProvider } from "react-canny";

const APP_ID = "/* Your app id */";

const USER = {
    id: "/* User id */",
    name: "/* User name */",
    email: "/* User email */"
};

const App = () => {
    const onIdentify = () => {
        /* An optional callback */
    };

    return (
        <CannyProvider
          appId={APP_ID}
          user={USER}
          onIdentify={onIdentify} />
    );
};
```

If Canny Identify isn't working and you need to generate an authenticated link yourself, use `authenticateCannyLink`.

```jsx
import { CannyProvider, useCannyContext } from "react-canny";

const APP_ID = "/* Your app id */";
const USER = {
    id: "/* User id */",
    name: "/* User name */",
    email: "/* User email */"
};
const CANNY_URL = 'https://my-subdomain.canny.io';

const App = () => {
    return (
        <CannyProvider appId={APP_ID} user={USER}>
            <CannyLink href={CANNY_URL}>
                Leave feedback
            </CannyLink>
        </CannyProvider>
    );
};

const CannyLink = ({ children, href }) => {
    const { canny, isLoaded } = useCannyContext();

    if(!isLoaded) {
        return null;
    }

    return (
        <a href={canny.authenticateCannyLink(href)}>{children}</a>
    );
};
```
