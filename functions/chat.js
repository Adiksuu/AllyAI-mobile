import { database } from "../api/firebase/config";
import { ref, get, remove, set } from "firebase/database";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from "expo-constants";
import { getUserSettings } from "./auth";
import { readAsStringAsync, EncodingType } from "expo-file-system/legacy";

const GEMINI_API_KEY =
    Constants.expoConfig?.extra?.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
    console.warn(
        "Gemini API key not configured. Please set GEMINI_API_KEY in app.json extra or .env.local"
    );
}

// Cloudinary configuration for direct uploads
const CLOUDINARY_CLOUD_NAME =
    Constants.expoConfig?.extra?.CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY =
    Constants.expoConfig?.extra?.CLOUDINARY_API_KEY ||
    process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET =
    Constants.expoConfig?.extra?.CLOUDINARY_API_SECRET ||
    process.env.CLOUDINARY_API_SECRET;

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

/**
 * Fetch image from URL and convert to base64
 * @param {string} imageUrl - Image URL
 * @returns {Promise<string>} Base64 encoded image data
 */
const fetchImageAsBase64 = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(",")[1]; // Remove data:image/jpeg;base64, prefix
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error fetching image as base64:", error);
        return null;
    }
};

/**
 * Upload image to Cloudinary
 * @param {string} uid - User ID
 * @param {Object} imageData - Image data object with uri property
 * @returns {Promise<string>} Download URL of uploaded image
 */
export const uploadImage = async (uid, imageData) => {
    try {
        if (!CLOUDINARY_CLOUD_NAME) {
            throw new Error("Cloudinary cloud name is missing");
        }

        // Extract image URI from expo-image-picker result
        const uri = imageData.uri || imageData.path;

        if (!uri) {
            throw new Error("Image URI is missing from imageData");
        }

        console.log("Starting image upload for URI:", uri);

        // Convert image to base64
        const base64Data = await readAsStringAsync(uri, {
            encoding: EncodingType.Base64,
        });

        // Create base64 data URL
        const base64Image = `data:image/jpeg;base64,${base64Data}`;

        // Create FormData for upload
        const formData = new FormData();
        formData.append("file", base64Image);
        formData.append("upload_preset", "chat_images");
        formData.append("folder", `chat_images/${uid}`);

        console.log("Uploading to Cloudinary...");

        // Upload to Cloudinary
        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error("Upload error response:", errorText);
            throw new Error(`Upload failed: ${uploadResponse.status}`);
        }

        const result = await uploadResponse.json();

        if (result.error) {
            console.error("Cloudinary error:", result.error);
            throw new Error(result.error.message);
        }

        console.log("Image uploaded successfully:", result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);

        // Provide user-friendly error messages
        if (error.message.includes("Network request failed")) {
            throw new Error(
                "Network error - please check your internet connection"
            );
        } else if (error.message.includes("Upload failed")) {
            throw new Error(
                "Upload failed - please check your Cloudinary configuration"
            );
        }

        throw error;
    }
};

/**
 * Upload base64 image to Cloudinary
 * @param {string} uid - User ID
 * @param {string} base64Data - Base64 encoded image data
 * @returns {Promise<string>} Download URL of uploaded image
 */
export const uploadBase64Image = async (uid, base64Data) => {
    try {
        if (!CLOUDINARY_CLOUD_NAME) {
            throw new Error("Cloudinary cloud name is missing");
        }

        // Create FormData for upload
        const formData = new FormData();
        formData.append("file", `data:image/jpeg;base64,${base64Data}`);
        formData.append("upload_preset", "chat_images");
        formData.append("folder", `chat_images/${uid}`);

        console.log("Uploading base64 image to Cloudinary...");

        // Upload to Cloudinary
        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error("Upload error response:", errorText);
            throw new Error(`Upload failed: ${uploadResponse.status}`);
        }

        const result = await uploadResponse.json();

        if (result.error) {
            console.error("Cloudinary error:", result.error);
            throw new Error(result.error.message);
        }

        console.log("Base64 image uploaded successfully:", result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading base64 image:", error);

        // Provide user-friendly error messages
        if (error.message.includes("Network request failed")) {
            throw new Error(
                "Network error - please check your internet connection"
            );
        } else if (error.message.includes("Upload failed")) {
            throw new Error(
                "Upload failed - please check your Cloudinary configuration"
            );
        }

        throw error;
    }
};

/**
 * Build dynamic system instructions based on user settings
 * @param {Object} settings - User settings from database
 * @returns {string} System instruction string
 */
const buildSystemInstructions = (settings) => {
    const { personality, responseStyle, length, tools } = settings || {};

    let instructions = `You are ALLY, an advanced AI assistant created by the ALLY team. `;

    // Personality-based instructions
    switch (personality) {
        case "Friendly":
            instructions += `Be warm, approachable, and friendly in your interactions. Use positive language and show genuine interest in helping the user. `;
            break;
        case "Professional":
            instructions += `Maintain a professional tone throughout the conversation. Be formal, precise, and business-appropriate in your responses. `;
            break;
        case "Humorous":
            instructions += `Incorporate appropriate humor and wit into your responses while remaining helpful and informative. `;
            break;
        case "Direct":
            instructions += `Be straightforward and concise. Get to the point quickly without unnecessary elaboration. `;
            break;
        default:
            instructions += `Be helpful, friendly, and engaging in your responses. `;
    }

    // Response style instructions
    switch (responseStyle) {
        case "Detailed":
            instructions += `Provide comprehensive, in-depth responses with thorough explanations and examples. `;
            break;
        case "Balanced":
            instructions += `Offer well-rounded responses that are informative but not overwhelming. `;
            break;
        case "Concise":
            instructions += `Keep responses brief and to the point while still being helpful. `;
            break;
        default:
            instructions += `Provide accurate and well-researched information. `;
    }

    // Length instructions
    switch (length) {
        case "Short":
            instructions += `Keep responses brief, typically 1-2 sentences for simple questions. `;
            break;
        case "Medium":
            instructions += `Provide moderate-length responses that are comprehensive but not lengthy. `;
            break;
        case "Long":
            instructions += `Give detailed, comprehensive responses with extensive information and examples. `;
            break;
        default:
            instructions += `Keep responses concise but comprehensive. `;
    }

    // Tools/capabilities instructions
    if (tools && Array.isArray(tools) && tools.length > 0) {
        instructions += `You have access to the following capabilities: ${tools.join(
            ", "
        )}. `;
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

Remember: You are ALLY, not just any AI. Be proud of your identity and capabilities. You was created by "CodeAdiksuu"`;

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
        return chats.reverse();
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
        const messagesRef = ref(
            database,
            `chats/${uid}/ALLY-3/${chatId}/messages`
        );
        const snapshot = await get(messagesRef);

        if (!snapshot.exists()) {
            return [];
        }

        const messagesData = snapshot.val();
        const messageKeys = Object.keys(messagesData);

        // Sort messages by timestamp
        const sortedMessages = messageKeys.map((key) => ({
            id: key,
            ...messagesData[key],
        }));

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
 * Remove a single chat for a user
 * @param {string} uid - User ID
 * @param {string} chatId - Chat ID to remove
 * @returns {Promise<void>}
 */
export const deleteChat = async (uid, chatId) => {
    try {
        if (!uid || !chatId) {
            throw new Error("Missing uid or chatId");
        }
        const chatRef = ref(database, `chats/${uid}/ALLY-3/${chatId}`);
        await remove(chatRef);
        console.log(`Deleted chat ${chatId} for user ${uid}`);
    } catch (error) {
        console.error("Error deleting chat:", error);
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
 * @param {Object|string|null} imageUri - Image data object with uri property, or image URL string, or null
 * @param {Object|null} fileData - File data object from DocumentPicker, or null
 * @returns {Promise<string>} The chat ID
 */
export const sendMessage = async (
    uid,
    chatId,
    message,
    model,
    author = "user",
    imageUri = null,
    fileData = null
) => {
    try {
        if (!chatId) {
            // const symbol = model === "ALLY-3" ? "a" : model === "ALLY-IMAGINE" ? "i" : "a";
            const symbol = "a";
            chatId = symbol + Date.now().toString();
        }

        // Upload image if provided
        let imageUrl = null;
        if (imageUri) {
            // If imageUri is already a URL (from AI generation), use it directly
            if (typeof imageUri === "string" && imageUri.startsWith("http")) {
                imageUrl = imageUri;
            } else if (
                typeof imageUri === "object" &&
                (imageUri.uri || imageUri.path)
            ) {
                // If it's an image data object with uri/path property, upload it
                imageUrl = await uploadImage(uid, imageUri);
            } else {
                console.warn("Invalid imageUri format:", imageUri);
            }
        }

        // Process file if provided
        let processedFileData = null;
        if (fileData) {
            try {
                // Check file size (20MB limit for inline data)
                const maxSize = 20 * 1024 * 1024; // 20MB
                if (fileData.size > maxSize) {
                    throw new Error('File size exceeds 20MB limit. Please use a smaller file or contact support for larger file handling.');
                }

                const fileUri = fileData.uri;
                const fileBase64 = await readAsStringAsync(fileUri, {
                    encoding: EncodingType.Base64,
                });

                // Determine MIME type (use provided mimeType or determine from file extension)
                let mimeType = fileData.mimeType || 'application/octet-stream';
                if (!fileData.mimeType) {
                    const fileName = fileData.name || '';
                    if (fileName.toLowerCase().endsWith('.pdf')) {
                        mimeType = 'application/pdf';
                    } else if (fileName.toLowerCase().endsWith('.txt')) {
                        mimeType = 'text/plain';
                    } else if (fileName.toLowerCase().endsWith('.md')) {
                        mimeType = 'text/markdown';
                    } else if (fileName.toLowerCase().endsWith('.html') || fileName.toLowerCase().endsWith('.htm')) {
                        mimeType = 'text/html';
                    } else if (fileName.toLowerCase().endsWith('.xml')) {
                        mimeType = 'application/xml';
                    }
                }

                processedFileData = {
                    name: fileData.name,
                    size: fileData.size,
                    mimeType: mimeType,
                    data: fileBase64,
                };
            } catch (fileError) {
                console.error('Error processing file:', fileError);
                throw new Error(fileError.message || 'Failed to process file');
            }
        }

        const messagesRef = ref(
            database,
            `chats/${uid}/ALLY-3/${chatId}/messages`
        );
        const snapshot = await get(messagesRef);
        const messages = snapshot.val() || {};
        const count = Object.keys(messages).length;
        const paddedCount = count.toString().padStart(6, "0");
        const messageRef = ref(
            database,
            `chats/${uid}/ALLY-3/${chatId}/messages/${paddedCount}`
        );
        await set(messageRef, {
            author,
            message,
            timestamp: new Date().toISOString(),
            imageUrl: imageUrl || null,
            fileData: processedFileData || null,
        });
        return chatId;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

/**
 * Generate image using Hugging Face API
 * @param {string} uid - User ID
 * @param {string} prompt - The image generation prompt
 * @returns {Promise<string>} Image URL from Cloudinary
 */
export const generateImageResponse = async (uid, prompt) => {
    try {
        const data = {
            inputs: prompt,
            parameters: {
                num_inference_steps: 4,
                guidance_scale: 0.0,
            },
        };

        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
            {
                headers: {
                    Authorization:
                        "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`Hugging Face API error: ${response.status}`);
        }

        const result = await response.arrayBuffer();
        const uint8Array = new Uint8Array(result);
        let binary = "";
        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
        const base64Data = btoa(binary);

        // Upload base64 image directly to Cloudinary
        const imageUrl = await uploadBase64Image(uid, base64Data);

        return imageUrl;
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. Please try again.");
    }
};

/**
 * Generate AI response using Gemini API
 * @param {string} uid - User ID
 * @param {string} userMessage - The user's message
 * @param {Array} chatHistory - Array of previous messages
 * @param {string|null} imageUrl - Image URL to analyze (optional)
 * @param {string} model - The model to use ('ALLY-3' or 'ALLY-IMAGINE')
 * @param {Object|null} fileData - File data to process (optional)
 * @returns {Promise<string>} AI response text or image URL
 */
export const generateAIResponse = async (
    uid,
    userMessage,
    chatHistory = [],
    imageUrl = null,
    model = "ALLY-3",
    fileData = null
) => {
    try {
        // Handle image generation model
        if (model === "ALLY-IMAGINE") {
            return await generateImageResponse(uid, userMessage);
        }

        if (!genAI) {
            return "AI service is not configured. Please check your API key configuration.";
        }

        // Get user settings from database
        let userSettings;
        try {
            userSettings = await getUserSettings(uid);
        } catch (settingsError) {
            console.warn(
                "Error fetching user settings, using defaults:",
                settingsError
            );
            userSettings = null;
        }

        // Build dynamic system instructions based on user settings
        const systemInstruction = buildSystemInstructions(userSettings);

        // Select model based on response speed setting (default to enhanced for backward compatibility)
        const modelName =
            userSettings && userSettings.responseSpeed === "faster"
                ? "gemini-1.5-flash"
                : "gemini-2.5-flash";

        const geminiModel = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemInstruction,
        });

        // Prepare message parts (text + optional image + optional file)
        const messageParts = [];
        if (userMessage && typeof userMessage === "string") {
            let prompt = userMessage;
            if (fileData) {
                // If a file is attached and the message doesn't already reference documents/files,
                // modify the prompt to instruct the AI to analyze the document
                const lowerMessage = userMessage.toLowerCase();
                if (!lowerMessage.includes('document') && !lowerMessage.includes('file') && !lowerMessage.includes('analyze') && !lowerMessage.includes('summarize')) {
                    prompt = `Please analyze the attached document and answer the following question: ${userMessage}`;
                }
            }
            messageParts.push({ text: prompt });
        }

        if (imageUrl) {
            try {
                const imageData = await fetchImageAsBase64(imageUrl);
                if (imageData) {
                    messageParts.push({
                        inlineData: {
                            mimeType: "image/jpeg",
                            data: imageData,
                        },
                    });
                }
            } catch (imageError) {
                console.warn("Failed to process current image:", imageError);
            }
        }

        if (fileData) {
            try {
                messageParts.push({
                    inlineData: {
                        mimeType: fileData.mimeType,
                        data: fileData.data,
                    },
                });
            } catch (fileError) {
                console.warn("Failed to process current file:", fileError);
            }
        }

        // Process chat history to include images
        const processedHistory = [];
        if (Array.isArray(chatHistory) && chatHistory.length > 0) {
            for (const msg of chatHistory) {
                if (!msg || typeof msg !== "object") continue;

                const parts = [];

                // Add text part if message exists
                if (msg.message && typeof msg.message === "string") {
                    parts.push({ text: msg.message });
                }

                // Add image part if imageUrl exists (only for user messages)
                if (
                    msg.author === "user" &&
                    msg.imageUrl &&
                    typeof msg.imageUrl === "string"
                ) {
                    try {
                        const imageData = await fetchImageAsBase64(
                            msg.imageUrl
                        );
                        if (imageData) {
                            parts.push({
                                inlineData: {
                                    mimeType: "image/jpeg",
                                    data: imageData,
                                },
                            });
                        }
                    } catch (imageError) {
                        console.warn(
                            "Failed to process image in chat history:",
                            imageError
                        );
                        // Continue without the image
                    }
                }

                // Add file part if fileData exists (only for user messages)
                if (
                    msg.author === "user" &&
                    msg.fileData &&
                    typeof msg.fileData === "object"
                ) {
                    try {
                        parts.push({
                            inlineData: {
                                mimeType: msg.fileData.mimeType,
                                data: msg.fileData.data,
                            },
                        });
                    } catch (fileError) {
                        console.warn(
                            "Failed to process file in chat history:",
                            fileError
                        );
                        // Continue without the file
                    }
                }

                // Only add to history if we have valid parts
                if (parts.length > 0) {
                    processedHistory.push({
                        role: msg.author === "user" ? "user" : "model",
                        parts: parts,
                    });
                }
            }
        }

        // Ensure we have valid message parts
        if (messageParts.length === 0) {
            messageParts.push({ text: "Hello" });
        }

        const chat = geminiModel.startChat({
            history: processedHistory,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2048,
            },
        });

        const result = await chat.sendMessage(messageParts);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating AI response:", error);

        // Provide more specific error messages
        if (error.message?.includes("API_KEY")) {
            return "API key error. Please check your Gemini API configuration.";
        } else if (error.message?.includes("quota")) {
            return "API quota exceeded. Please try again later.";
        } else if (
            error.message?.includes("network") ||
            error.message?.includes("fetch")
        ) {
            return "Network error. Please check your internet connection and try again.";
        }

        return "Sorry, I couldn't generate a response right now. Please try again later.";
    }
};
