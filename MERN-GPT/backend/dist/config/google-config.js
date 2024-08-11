import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.GOOGLE_AI;
if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
}
const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//# sourceMappingURL=google-config.js.map