import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://api-eu-central-1.graphcms.com/v2/ckpo4azd71eqv01w6b00qcl42/master",
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
