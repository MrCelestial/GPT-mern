import User from "../models/user.js";
import { GeminiClient } from "google-gemini"; // Replace with the actual Gemini client import
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables
const geminiClient = new GeminiClient({
    apiKey: process.env.GOOGLE_AI, // Use Gemini API key
});
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not found." });
        // Ensure user.chats has the correct role types
        const chats = user.chats.map(({ role, content }) => ({
            role: role, // Type assertion if needed
            content
        }));
        // Add the new message
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });
        // Call Gemini API
        const response = await geminiClient.chat.complete({
            model: "gemini-1.0", // Use the correct model for Gemini
            messages: chats,
        });
        // Extract bot reply from the response
        const botReply = response.choices[0].message.content;
        // Add the bot's reply to the user's chat history
        chats.push({ content: botReply, role: 'assistant' });
        user.chats.push({ content: botReply, role: 'assistant' });
        // Save the updated user
        await user.save();
        // Send back the response
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", cause: error.message });
    }
};
//# sourceMappingURL=chat-handlers.js.map