# React Canny

## Description

[Canny.io](https://canny.io/) integration for react


## Installation

```
npm install react-canny
```


## Usage

```jsx
import {
    CannyProvider,
    CannyWidget
} from "react-canny";


const APP_ID = "/* Your app id */";
const BOARD_TOKEN = "/* Tour token board */";
const SSO_TOKEN = "/* Your sso token */";

const App = () => {
    return (
        <CannyProvider appId={APP_ID}>
            <CannyWidget
              basePath="/feedback"
              user={{
                id: 1,
                email: "test@mail.com"
              }}
              boardToken={BOARD_TOKEN}
              ssoToken={SSO_TOKEN} />
        </CannyProvider>
    );
};
```
