import { getChatHistory } from './chat';
import { getUserTokens } from './auth';

/**
 * Get user statistics for profile display
 * @param {string} uid - User ID
 * @returns {Promise<Object>} User stats object
 */
export const getUserStats = async (uid) => {
    try {
        // Get conversations count
        const chatHistory = await getChatHistory(uid);
        const conversations = chatHistory.length;

        // Get token data
        const tokenData = await getUserTokens(uid);
        const tokens = tokenData.tokens;
        const tokenLimit = 75; // Daily limit
        const resetAt = tokenData.resetAt;

        return {
            conversations,
            tokens,
            tokenLimit,
            resetAt
        };
    } catch (error) {
        console.error('Error getting user stats:', error);
        return {
            conversations: 0,
            tokens: 0,
            tokenLimit: 75,
            resetAt: Date.now() + 24 * 60 * 60 * 1000
        };
    }
};