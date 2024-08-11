import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import TextServiceClient  from "@google-cloud/aiplatform"; // Updated client import

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not found." });
        interface ChatMessage {
            role: 'user' | 'system' | 'assistant';
            content: string;
        }
        // Ensure user.chats has the correct role types
        const chats: ChatMessage[] = user.chats.map(({ role, content }) => ({
            role: role as "user" | "assistant", // Type assertion if needed
            content,
        }));

        // Add the new user message
        chats.push({ content: message, role: "user" });

        // Configure TextServiceClient (assuming you have project setup)
        // @ts-ignore
        const client = new TextServiceClient();

        // Prepare request object for Gemini 1.5 Flash
        const request = {
            parent: client.locationPath("assistant-20565", "India"), // Replace with project and region
            textInput: message,
            models: ["projects/assistant-20565/locations/india/models/text-flash-001@001"], // Replace with project, region, and model ID
            contexts: chats.map((chat) => ({
                query: chat.content,
                parameters: {
                    role: chat.role,

                },
            })),
        };

        // Call Gemini API (1.5 Flash)
        const [response] = await client.generateText(request);

        // Extract bot reply from the response
        const botReply = response.generatedText;

        // Add the bot's reply to the user's chat history
        chats.push({ content: botReply, role: "assistant" });
        user.chats.push({ content: botReply, role: "assistant" });

        // Save the updated user
        await user.save();

        // Send back the response
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", cause: error.message });
    }
};
