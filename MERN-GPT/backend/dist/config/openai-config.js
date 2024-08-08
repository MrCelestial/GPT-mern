import Configuration from "openai";
export const openaiConfig = () => {
    const config = new Configuration({
        apiKey: process.env.API_KEY,
        //organization: process.env.ORGANIZATION,
    });
};
//# sourceMappingURL=openai-config.js.map