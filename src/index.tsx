import React from "react";
import { createRoot } from "react-dom/client";



import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";


const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);




root.render(
        <React.StrictMode>

        <Auth0Provider
            domain="dev-z36fpjti.us.auth0.com"
            clientId="snx1ghXR2jz3IwpGJAql5YvBAeXFnszE"
            authorizationParams={{ redirect_uri: window.location.origin }}
        >
                <App />
        </Auth0Provider>
            
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
