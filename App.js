import React from "react";
import AppContainer from "./views/AppContainer";
import { TranslationProvider } from "./contexts/TranslationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
    return (
        <ThemeProvider>
            <TranslationProvider>
                <AppContainer />
            </TranslationProvider>
        </ThemeProvider>
    );
}
