import { auth, database } from '../api/firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail as firebaseSendPasswordResetEmail,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    deleteUser,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth';
import { ref, set, get, update, remove } from 'firebase/database';

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data or error
 */
export const signInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update last login time
        await updateLastLoginTime(user.uid);

        // Get user data from database
        const userData = await getUserData(user.uid);

        return {
            success: true,
            user: {
                uid: user.uid,
                email: user.email,
                // emailVerified: user.emailVerified,
                // displayName: user.displayName,
                // photoURL: user.photoURL,
                ...userData
            }
        };
    } catch (error) {
        let errorMessage = '';
        console.log(error)

        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'userNotFound';
                break;
            case 'auth/wrong-password':
                errorMessage = 'wrongPassword';
                break;
            case 'auth/invalid-email':
                errorMessage = 'invalidEmail';
                break;
            case 'auth/user-disabled':
                errorMessage = 'userDisabled';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'tooManyRequests';
                break;
            default:
                errorMessage = 'generic';
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

/**
 * Sign up with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data or error
 */
export const signUpWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const date = new Date()

        // Create user data in database
        await createUserData(user.uid, {
            email: user.email,
            createdAt: date.toISOString(),
            lastLoginAt: date.toISOString(),
            models: { tokens: 0, resetAt: date.getTime() + 24 * 60 * 60 * 1000 },
            premium: { isPremium: false, expireAt: null },
            settings: { personality: "Friendly", responseStyle: "Balanced", length: "Medium", tools: ['Web Search', 'Image Generation', 'Memory & Context', 'File Analysis'] }
        });

        return {
            success: true,
            user: {
                email: user.email,
            }
        };
    } catch (error) {
        let errorMessage = '';

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'emailAlreadyInUse';
                break;
            case 'auth/invalid-email':
                errorMessage = 'invalidEmail';
                break;
            case 'auth/weak-password':
                errorMessage = 'weakPassword';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'operationNotAllowed';
                break;
            default:
                errorMessage = 'generic';
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

/**
 * Sign out current user
 * @returns {Promise<Object>} Success or error
 */
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: 'Sign out failed'
        };
    }
};

/**
 * Remove user account and all associated data
 * @returns {Promise<Object>} Success or error
 */
export const removeAccount = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            return {
                success: false,
                error: 'No user is currently signed in'
            };
        }

        // Delete user data from database
        const userRef = ref(database, `users/${user.uid}`);
        await remove(userRef);

        // Delete user account from Firebase Auth
        await deleteUser(user);

        return {
            success: true
        };
    } catch (error) {
        let errorMessage = '';

        switch (error.code) {
            case 'auth/requires-recent-login':
                errorMessage = 'requiresRecentLogin';
                break;
            case 'auth/user-not-found':
                errorMessage = 'userNotFoundDelete';
                break;
            case 'auth/user-disabled':
                errorMessage = 'userDisabled';
                break;
            default:
                errorMessage = 'generic';
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

/**
 * Change user password
 * @param {string} currentPassword - Current password for reauthentication
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Success or error
 */
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            return {
                success: false,
                error: 'No user is currently signed in'
            };
        }

        // Reauthenticate user with current password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);

        return {
            success: true
        };
    } catch (error) {
        let errorMessage = '';

        // Error messages will be handled by the component using translation keys
        // Return the raw error for component-level translation
        switch (error.code) {
            case 'auth/wrong-password':
                errorMessage = 'wrongCurrentPassword';
                break;
            case 'auth/weak-password':
                errorMessage = 'weakPassword';
                break;
            case 'auth/requires-recent-login':
                errorMessage = 'requiresRecentLogin';
                break;
            case 'auth/user-disabled':
                errorMessage = 'userDisabled';
                break;
            case 'auth/user-not-found':
                errorMessage = 'userNotFoundDelete';
                break;
            default:
                errorMessage = 'generic';
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

/**
 * Get current user
 * @returns {Object|null} Current user or null
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChanged = (callback) => {
    return firebaseOnAuthStateChanged(auth, callback);
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<Object>} Success or error
 */
export const sendPasswordResetEmail = async (email) => {
    try {
        await firebaseSendPasswordResetEmail(auth, email);
        return {
            success: true
        };
    } catch (error) {
        let errorMessage = '';

        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'userNotFound';
                break;
            case 'auth/invalid-email':
                errorMessage = 'invalidEmail';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'tooManyRequests';
                break;
            default:
                errorMessage = 'generic';
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

/**
 * Create user data in database
 * @param {string} uid - User ID
 * @param {Object} userData - User data
 * @returns {Promise<void>}
 */
const createUserData = async (uid, userData) => {
    try {
        const userRef = ref(database, `users/${uid}`);
        await set(userRef, userData);
    } catch (error) {
        console.error('Error creating user data:', error);
        throw error;
    }
};

/**
 * Get user data from database
 * @param {string} uid - User ID
 * @returns {Promise<Object>} User data
 */
const getUserData = async (uid) => {
    try {
        const userRef = ref(database, `users/${uid}`);
        const snapshot = await get(userRef);
        return snapshot.val() || {};
    } catch (error) {
        console.error('Error getting user data:', error);
        return {};
    }
};

/**
 * Update user data in database
 * @param {string} uid - User ID
 * @param {Object} updates - Data to update
 * @returns {Promise<void>}
 */
export const updateUserData = async (uid, updates) => {
    try {
        const userRef = ref(database, `users/${uid}`);
        await update(userRef, updates);
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};

/**
 * Update user's last login time
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
const updateLastLoginTime = async (uid) => {
    try {
        const userRef = ref(database, `users/${uid}`);
        await update(userRef, {
            lastLoginAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating last login time:', error);
        // Don't throw error here as it's not critical for login
    }
};

/**
 * Update user's last login time (exported version)
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export const updateUserLastLogin = async (uid) => {
    return updateLastLoginTime(uid);
};

/**
 * Get user settings from database
 * @param {string} uid - User ID
 * @returns {Promise<Object>} User settings
 */
export const getUserSettings = async (uid) => {
    try {
        const userRef = ref(database, `users/${uid}/settings`);
        const snapshot = await get(userRef);
        return snapshot.val() || {
            personality: "Friendly",
            responseStyle: "Balanced",
            length: "Medium",
            tools: ['Web Search', 'Image Generation', 'Memory & Context', 'File Analysis']
        };
    } catch (error) {
        console.error('Error getting user settings:', error);
        return {
            personality: "Friendly",
            responseStyle: "Balanced",
            length: "Medium",
            tools: ['Web Search', 'Image Generation', 'Memory & Context', 'File Analysis']
        };
    }
};

/**
 * Update user settings in database
 * @param {string} uid - User ID
 * @param {Object} settings - Settings to update
 * @returns {Promise<void>}
 */
export const updateUserSettings = async (uid, settings) => {
    try {
        const userRef = ref(database, `users/${uid}/settings`);
        await update(userRef, settings);
    } catch (error) {
        console.error('Error updating user settings:', error);
        throw error;
    }
};

/**
 * Reset user settings to default values
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export const resetUserSettings = async (uid) => {
    try {
        const defaultSettings = {
            personality: "Friendly",
            responseStyle: "Balanced",
            length: "Medium",
            tools: ['Web Search', 'Image Generation', 'Memory & Context', 'File Analysis']
        };
        await updateUserSettings(uid, defaultSettings);
        return defaultSettings;
    } catch (error) {
        console.error('Error resetting user settings:', error);
        throw error;
    }
};

/**
 * Get user token data
 * @param {string} uid - User ID
 * @returns {Promise<Object>} Token data { tokens: number, resetAt: timestamp }
 */
export const getUserTokens = async (uid) => {
    try {
        const userRef = ref(database, `users/${uid}/models`);
        const snapshot = await get(userRef);
        const data = snapshot.val();

        if (!data) {
            // Initialize with default values
            const now = Date.now();
            const defaultTokens = {
                tokens: 0,
                resetAt: now + 24 * 60 * 60 * 1000 // 24 hours from now
            };
            await updateUserTokens(uid, defaultTokens);
            return defaultTokens;
        }

        // Check if reset time has passed
        const now = Date.now();
        if (data.resetAt && now > data.resetAt) {
            // Reset tokens
            const resetTokens = {
                tokens: 0,
                resetAt: now + 24 * 60 * 60 * 1000
            };
            await updateUserTokens(uid, resetTokens);
            return resetTokens;
        }

        return data;
    } catch (error) {
        console.error('Error getting user tokens:', error);
        return { tokens: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 };
    }
};

/**
 * Update user token data
 * @param {string} uid - User ID
 * @param {Object} tokenData - Token data to update
 * @returns {Promise<void>}
 */
export const updateUserTokens = async (uid, tokenData) => {
    try {
        const userRef = ref(database, `users/${uid}/models`);
        await update(userRef, tokenData);
    } catch (error) {
        console.error('Error updating user tokens:', error);
        throw error;
    }
};

/**
 * Check if user can afford token cost
 * @param {string} uid - User ID
 * @param {number} cost - Token cost
 * @returns {Promise<boolean>} Whether user can afford the cost
 */
export const canAffordTokens = async (uid, cost) => {
    try {
        const tokenData = await getUserTokens(uid);
        return tokenData.tokens + cost <= 75; // Daily limit is 75 tokens
    } catch (error) {
        console.error('Error checking token affordability:', error);
        return false;
    }
};

/**
 * Deduct tokens from user
 * @param {string} uid - User ID
 * @param {number} cost - Token cost to deduct
 * @returns {Promise<boolean>} Success status
 */
export const deductTokens = async (uid, cost) => {
    try {
        const tokenData = await getUserTokens(uid);
        const newTokens = tokenData.tokens + cost;

        if (newTokens > 75) {
            return false; // Would exceed limit
        }

        await updateUserTokens(uid, { tokens: newTokens });
        return true;
    } catch (error) {
        console.error('Error deducting tokens:', error);
        return false;
    }
};
