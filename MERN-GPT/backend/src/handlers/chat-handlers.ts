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

        const chats: ChatMessage[] = user.chats.map(({ role, content }) => ({
            role: role as "user" | "assistant",
            content,
        }));

        chats.push({ content: message, role: "user" });

        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = model.startChat({
            history: chats.map(chat => ({
                role: chat.role,
                parts: [{ text: chat.content }],
            })),
        });

        const result = await chat.sendMessage(message);
        const botReply = result.response.text();

        chats.push({ content: botReply, role: "assistant" });
        user.chats.push({ content: botReply, role: "assistant" });

        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", cause: error.message });
    }
};
