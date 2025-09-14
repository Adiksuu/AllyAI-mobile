import { database } from "../api/firebase/config";
import { ref, get, remove, set } from "firebase/database";
import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';
import { getUserSettings } from './auth';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn('Gemini API key not configured. Please set GEMINI_API_KEY in app.json extra or .env.local');
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

/**
 * Build dynamic system instructions based on user settings
 * @param {Object} settings - User settings from database
 * @returns {string} System instruction string
 */
const buildSystemInstructions = (settings) => {
    const { personality, responseStyle, length, tools } = settings;

    let instructions = `You are ALLY, an advanced AI assistant created by the ALLY team. `;

    // Personality-based instructions
    switch (personality) {
        case 'Friendly':
            instructions += `Be warm, approachable, and friendly in your interactions. Use positive language and show genuine interest in helping the user. `;
            break;
        case 'Professional':
            instructions += `Maintain a professional tone throughout the conversation. Be formal, precise, and business-appropriate in your responses. `;
            break;
        case 'Humorous':
            instructions += `Incorporate appropriate humor and wit into your responses while remaining helpful and informative. `;
            break;
        case 'Direct':
            instructions += `Be straightforward and concise. Get to the point quickly without unnecessary elaboration. `;
            break;
        default:
            instructions += `Be helpful, friendly, and engaging in your responses. `;
    }

    // Response style instructions
    switch (responseStyle) {
        case 'Detailed':
            instructions += `Provide comprehensive, in-depth responses with thorough explanations and examples. `;
            break;
        case 'Balanced':
            instructions += `Offer well-rounded responses that are informative but not overwhelming. `;
            break;
        case 'Concise':
            instructions += `Keep responses brief and to the point while still being helpful. `;
            break;
        default:
            instructions += `Provide accurate and well-researched information. `;
    }

    // Length instructions
    switch (length) {
        case 'Short':
            instructions += `Keep responses brief, typically 1-2 sentences for simple questions. `;
            break;
        case 'Medium':
            instructions += `Provide moderate-length responses that are comprehensive but not lengthy. `;
            break;
        case 'Long':
            instructions += `Give detailed, comprehensive responses with extensive information and examples. `;
            break;
        default:
            instructions += `Keep responses concise but comprehensive. `;
    }

    // Tools/capabilities instructions
    if (tools && tools.length > 0) {
        instructions += `You have access to the following capabilities: ${tools.join(', ')}. `;
        instructions += `When appropriate, mention or utilize these capabilities to enhance your responses. `;
    }

    // General rules
    instructions += `
Follow these core rules:
1. Use markdown formatting when appropriate for better readability
2. If you don't know something, admit it rather than making up information
3. Respect user privacy and don't ask for unnecessary personal information
4. Be culturally sensitive and inclusive
5. Always prioritize user safety and well-being
6. Stay in character as ALLY throughout the conversation

Remember: You are ALLY, not just any AI. Be proud of your identity and capabilities.`;

    return instructions;
};

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
            const messagesRef = ref(
                database,
                `chats/${uid}/ALLY-3/${chatName}/messages`
            );
            const messagesSnapshot = await get(messagesRef);
            const messages = messagesSnapshot.val() || {};

            const messageKeys = Object.keys(messages);
            const messageCount = messageKeys.length;

            // console.log(messagesSnapshot.val())

            if (messageCount === 0) {
                return {
                    id: chatName,
                    title: chatName,
                    lastMessage: "",
                    timestamp: "",
                    messageCount: 0,
                };
            }

            // Sort messages by timestamp (assuming timestamp is a string or number)
            const sortedKeys = messageKeys.sort((a, b) => {
                const timeA = messages[a].timestamp;
                const timeB = messages[b].timestamp;
                return new Date(timeA) - new Date(timeB);
            });

            const lastMessageKey = sortedKeys[sortedKeys.length - 1];
            const lastMessage = messages[lastMessageKey].message || "";
            const timestamp = messages[lastMessageKey].timestamp || "";

            return {
                id: chatName,
                title:
                    messages[sortedKeys[0]].message ||
                    t("chatHistory.untitledChat"),
                lastMessage,
                timestamp,
                messageCount,
            };
        });

        const chats = await Promise.all(chatPromises);

        // Sort chats by latest timestamp (newest first)
        return chats.reverse()
    } catch (error) {
        console.error("Error fetching chat history:", error);
        throw error;
    }
};

/**
 * Get messages for a specific chat
 * @param {string} uid - User ID
 * @param {string} chatId - Chat ID
 * @returns {Promise<Array>} Array of message objects
 */
export const getChatMessages = async (uid, chatId) => {
    try {
        const messagesRef = ref(database, `chats/${uid}/ALLY-3/${chatId}/messages`);
        const snapshot = await get(messagesRef);

        if (!snapshot.exists()) {
            return [];
        }

        const messagesData = snapshot.val();
        const messageKeys = Object.keys(messagesData);

        // Sort messages by timestamp
        const sortedMessages = messageKeys
            .map(key => ({
                id: key,
                ...messagesData[key]
            }))

        return sortedMessages;
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        throw error;
    }
};

/**
 * Remove entire chat history for a user
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export const removeChatHistory = async (uid) => {
    try {
        const chatsRef = ref(database, `chats/${uid}/ALLY-3`);
        await remove(chatsRef);
        console.log(`Successfully removed chat history for user: ${uid}`);
    } catch (error) {
        console.error("Error deleting chat history:", error);
        throw error;
    }
};

/**
 * Send a message to a chat
 * @param {string} uid - User ID
 * @param {string|null} chatId - Chat ID, null for new chat
 * @param {string} message - Message text
 * @param {string} model - Model name
 * @param {string} author - Author of the message ("user" or "AI")
 * @returns {Promise<string>} The chat ID
 */
export const sendMessage = async (uid, chatId, message, model, author = "user") => {
    try {
        if (!chatId) {
            const symbol = model === "ALLY-3" ? "a" : model === "ALLY-IMAGINE" ? "i" : "a";
            chatId = symbol + Date.now().toString();
        }
        const messagesRef = ref(database, `chats/${uid}/ALLY-3/${chatId}/messages`);
        const snapshot = await get(messagesRef);
        const messages = snapshot.val() || {};
        const count = Object.keys(messages).length;
        const paddedCount = count.toString().padStart(6, '0');
        const messageRef = ref(database, `chats/${uid}/ALLY-3/${chatId}/messages/${paddedCount}`);
        await set(messageRef, {
            author,
            message,
            timestamp: new Date().toISOString()
        });
        return chatId;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

/**
 * Generate AI response using Gemini API
 * @param {string} uid - User ID
 * @param {string} userMessage - The user's message
 * @param {Array} chatHistory - Array of previous messages
 * @returns {Promise<string>} AI response text
 */
export const generateAIResponse = async (uid, userMessage, chatHistory = []) => {
    try {
        if (!genAI) {
            return "AI service is not configured. Please check your API key configuration.";
        }

        // Get user settings from database
        const userSettings = await getUserSettings(uid);

        // Build dynamic system instructions based on user settings
        const systemInstruction = buildSystemInstructions(userSettings);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction
        });

        const chat = model.startChat({
            history: chatHistory.map(msg => ({
                role: msg.author === 'user' ? 'user' : 'model',
                parts: [{ text: msg.message }],
            })),
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2048,
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "Sorry, I couldn't generate a response right now. Please try again later.";
    }
};