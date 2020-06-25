import React from "react";
import App from "next/app";
import {LightTheme, ThemeProvider} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import {styletron, debug} from '../config/styletron';
import '../style/global.css';

// noinspection JSUnusedGlobalSymbols
export default class CustomApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
                <ThemeProvider theme={LightTheme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </StyletronProvider>
        );
    }
}
