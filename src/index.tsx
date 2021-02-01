import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/styles.css";
import { client } from './apollo';
import { ApolloProvider } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();