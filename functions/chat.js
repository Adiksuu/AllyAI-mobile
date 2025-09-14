import { database } from '../api/firebase/config';
import { ref, get } from 'firebase/database';

/**
 * Get chat history for a user
 * @param {string} uid - User ID
 * @returns {Promise<Array>} Array of chat objects
 */

export const getChatHistory = async (uid, t) => {
    try {
        const chatsRef = ref(database, `chats/${uid}/ALLY-3`);
        const snapshot = await get(chatsRef);

        if (!snapshot.exists()) {
            return [];
        }

        const chatData = snapshot.val();
        const chatNames = Object.keys(chatData);

        const chatPromises = chatNames.map(async (chatName) => {
            const messagesRef = ref(database, `chats/${uid}/ALLY-3/${chatName}/messages`);
            const messagesSnapshot = await get(messagesRef);
            const messages = messagesSnapshot.val() || {};

            const messageKeys = Object.keys(messages);
            const messageCount = messageKeys.length;

            // console.log(messagesSnapshot.val())

            if (messageCount === 0) {
                return {
                    id: chatName,
                    title: chatName,
                    lastMessage: '',
                    timestamp: '',
                    messageCount: 0
                };
            }

            // Sort messages by timestamp (assuming timestamp is a string or number)
            const sortedKeys = messageKeys.sort((a, b) => {
                const timeA = messages[a].timestamp;
                const timeB = messages[b].timestamp;
                return new Date(timeA) - new Date(timeB);
            });

            const lastMessageKey = sortedKeys[sortedKeys.length - 1];
            const lastMessage = messages[lastMessageKey].message || '';
            const timestamp = messages[lastMessageKey].timestamp || '';

            return {
                id: chatName,
                title: messages[sortedKeys[0]].message || t("chatHistory.untitledChat"),
                lastMessage,
                timestamp,
                messageCount
            };
        });

        const chats = await Promise.all(chatPromises);

        // Sort chats by latest timestamp
        return chats.reverse()
    } catch (error) {
        console.error('Error fetching chat history:', error);
        throw error;
    }
};