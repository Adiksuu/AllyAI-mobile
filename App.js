import React from "react";
import AppContainer from "./views/AppContainer";
import { TranslationProvider } from "./contexts/TranslationContext";

export default function App() {
    return (
        <TranslationProvider>
            <AppContainer />
        </TranslationProvider>
    );
}
