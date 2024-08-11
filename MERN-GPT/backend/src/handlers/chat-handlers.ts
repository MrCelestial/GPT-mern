import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not found." });

        // Create chat history ensuring the initial message has role 'user'
        const chatHistory = user.chats.map(({ role, content }) => ({
            role,
            parts: [{ text: content }],
        }));

        // Add the new user message to history
        chatHistory.push({
            role: "user",
            parts: [{ text: message }],
        });

        // Initialize Google Generative AI client
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Start chat with history
        const chat = model.startChat({ history: chatHistory });

        // Send the new message
        const result = await chat.sendMessage(message);
        const botReply = result.response.text();

        // Update chat history
        user.chats.push({ content: message, role: "user" });
        user.chats.push({ content: botReply, role: "assistant" });

        // Save updated user data
        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", cause: error.message });
    }
};
