import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAz1MUWJf6iCGIINz9RmQjzwtLd5QCNs3g",
    authDomain: "ally-ai-3.firebaseapp.com",
    databaseURL: "https://ally-ai-3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ally-ai-3",
    storageBucket: "ally-ai-3.firebasestorage.app",
    messagingSenderId: "862055900979",
    appId: "1:862055900979:web:6667674ff6aaaddb80c046"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const database = getDatabase(app);

// Initialize Auth with React Native persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { database, auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
