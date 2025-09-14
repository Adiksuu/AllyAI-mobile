import { auth, database } from '../api/firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail as firebaseSendPasswordResetEmail,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    deleteUser
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
                errorMessage = 'No account found with this email address';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed login attempts. Please try again later';
                break;
            default:
                errorMessage = 'Login failed. Please try again';
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
                errorMessage = 'An account with this email already exists';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled';
                break;
            default:
                errorMessage = 'Registration failed. Please try again';
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
                errorMessage = 'Please sign in again before deleting your account';
                break;
            case 'auth/user-not-found':
                errorMessage = 'User account not found';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled';
                break;
            default:
                errorMessage = 'Failed to delete account. Please try again';
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
                errorMessage = 'No account found with this email address';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many requests. Please try again later';
                break;
            default:
                errorMessage = 'Failed to send password reset email';
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