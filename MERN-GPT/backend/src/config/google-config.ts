interface GeminiConfig {
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
    // endpoint?: string;
    // timeout?: number;
    // retries?: number;
    // loggingLevel?: string;
}

export const getGeminiConfig = (): GeminiConfig => ({
    apiKey: process.env.GOOGLE_AI || '',
    model: 'text-bison@001',
    temperature: 0.7,
    maxTokens: 256,
})
