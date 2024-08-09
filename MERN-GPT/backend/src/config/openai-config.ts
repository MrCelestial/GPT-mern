import Configuration from "openai";

export const openaiConfig=()=>{
    return new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        //organization: process.env.ORGANIZATION,

    })
};