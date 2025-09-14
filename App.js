import React, { useEffect } from "react";
import AppContainer from "./views/AppContainer";
import { TranslationProvider } from "./contexts/TranslationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import * as Sentry from "@sentry/react-native";
import * as Notifications from "expo-notifications";

Sentry.init({
    dsn: "https://4f19405a2047b67d0c2b104beb5031df@o4510013934141440.ingest.de.sentry.io/4510013950394448",

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,

    // Configure Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration()],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
});

export default Sentry.wrap(function App() {
    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
        };

        requestPermissions();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true,
                shouldShowList: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });

        // Add notification listeners for background handling
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received:', notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification response received:', response);
            // Handle notification tap - could navigate to specific screen
        });

        // Cleanup listeners on unmount
        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    return (
        <ThemeProvider>
            <TranslationProvider>
                <AppContainer />
            </TranslationProvider>
        </ThemeProvider>
    );
});
