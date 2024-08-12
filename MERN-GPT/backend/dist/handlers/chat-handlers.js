import User from "../models/user.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not found." });
        if (!message) {
            return res.status(400).json({ message: "Please enter a message." });
        }
        // Convert user.chats to an array if it's not already
        const existingChatHistory = Array.isArray(user.chats) ? user.chats : [user.chats].filter(Boolean);
        // Process chat history
        const chatHistory = existingChatHistory.map(chat => ({
            role: chat.role === 'user' ? 'user' : 'model',
            parts: [{ text: chat.content }],
        }));
        // Ensure the history starts with a user message
        if (chatHistory.length === 0 || chatHistory[0].role !== 'user') {
            chatHistory.unshift({
                role: 'user',
                parts: [{ text: 'Hello' }],
            });
        }
        // Add the new user message
        chatHistory.push({
            role: 'user',
            parts: [{ text: message }],
        });
        // Initialize Google Generative AI client
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Start chat and send message
        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const botReply = result.response.text();
        // Update user's chat history
        // Assuming user.chats is a subdocument, we need to set its properties
        if (!Array.isArray(user.chats)) {
            user.chats = {
                role: "user",
                content: message,
            };
            await user.save();
            user.chats = {
                role: "assistant",
                content: botReply,
            };
        }
        else {
            // If it's an array, we can push to it
            user.chats.push({ role: "user", content: message });
            user.chats.push({ role: "assistant", content: botReply });
        }
        // Save updated user data
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", cause: error.message });
    }
};
//# sourceMappingURL=chat-handlers.js.map