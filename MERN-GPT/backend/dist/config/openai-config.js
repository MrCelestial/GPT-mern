import Configuration from "openai";
export const openaiConfig = () => {
    return new Configuration({
        apiKey: process.env.GOOGLE_AI,
        //organization: process.env.ORGANIZATION,
    });
};
//# sourceMappingURL=openai-config.js.map