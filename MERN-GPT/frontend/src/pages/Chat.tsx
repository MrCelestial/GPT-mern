import {Avatar, Box, Button, Typography} from "@mui/material";
import { useAuth } from "../context/AuthContext.tsx";
import ChatItems from "../components/chat/ChatItems.tsx";

function Chat() {
    const auth = useAuth();

    // Extracting username initials
    const username = auth?.user?.username || '';
    const initials = username ? username.split(' ').map(name => name[0]).join('') : '';
    const chatMeassages = [
        {
            role: 'assistant',
            content: "Hello! How can I assist you today?"
        },
        {
            role: 'user',
            content: "Can you help me with a project I'm working on?"
        },
        {
            role: 'assistant',
            content: "Of course! What specifically do you need help with?"
        },
        {
            role: 'user',
            content: "I need help understanding how to use a specific API."
        },
        {
            role: 'assistant',
            content: "Sure, I can help with that. Which API are you referring to?"
        },
        {
            role: 'user',
            content: "It's the OpenAI API. I want to know how to make requests."
        },
        {
            role: 'assistant',
            content: "To make requests to the OpenAI API, you'll need to use the API key and send requests to the appropriate endpoint. Do you have specific questions about making requests?"
        },
        {
            role: 'user',
            content: "Yes, how do I handle authentication?"
        },
        {
            role: 'assistant',
            content: "Authentication is handled via an API key that you include in the header of your requests. Ensure that you keep your API key secure and do not expose it in public repositories."
        },
        {
            role: 'user',
            content: "Got it, thanks!"
        },
        {
            role: 'assistant',
            content: "You're welcome! If you have any more questions, feel free to ask."
        }
    ];

    return (
        <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3 }}>
            <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.3, flexDirection: 'column', alignItems: 'center' ,mx:2}}>
                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: "100%",
                    height: "60vh",
                    bgcolor: "black",
                    borderRadius: '10px',
                    mx: 3,
                    py: 3
                }}>
                    <Avatar sx={{
                        bgcolor: "white",
                        color: "black",
                        fontWeight: 700,
                        width: 80,
                        height: 80,
                        fontSize: 40,
                        mb: 2
                    }}>
                        {initials}
                    </Avatar>
                    <Typography sx={{ textAlign: 'center', color: 'white', fontFamily: "Glegoo", mb: 2 }}>
                        You are talking to an AI assistant chatbot
                    </Typography>
                    <Typography sx={{ textAlign: 'center', color: 'white', fontFamily: "Glegoo", mb: 4, px: 3 }}>
                        Yapsalot-GPT provides fun and automated responses based on input; not a substitute for professional advice or human interaction.
                    </Typography>
                    <Button
                        sx={{
                            width: "200px",
                            color: "black",
                            fontWeight: 700,
                            borderRadius: 3,
                            bgcolor: "#fa2742",
                            ":hover": { bgcolor: "#e8eae3", color: "black" },
                            py: 1.5
                        }}
                    >
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            <Box sx={{
                width: "100%",
                display: "flex",
                flex: {md: 0.8, xs: 1, sm: 1},
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <Typography sx={{fontSize: '40px', color: 'white', mb: 2, textAlign: 'center', fontWeight: 700}}>
                    Model - GPT 3.5 Turbo
                </Typography>
                <Box sx={{
                    width: "100%",
                    height: "60vh",
                    borderRadius: 3,
                    mx: "auto",
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'scroll',
                    overflowX: "hidden",
                    scrollBehavior: "smooth"
                }}>
                    {chatMeassages.map((chat, index) => (
                        <ChatItems content={chat.content} role={chat.role} key={index}/>))}

                </Box>
                <div style={{width:"100%", borderTop: '1px solid #333', marginTop:'8px'}}>
                <input type="text" style={{
                    width: "98%",
                    alignItems:"initial",
                    backgroundColor: "transparent",
                    margin: "5px",
                    padding: "2px",
                    border: "none",
                    outline: "none",
                    color: "white",
                    fontSize: "16px",
                    fontFamily: "Glegoo"
                    }} placeholder="Type your mesage here~"/>
                </div>
            </Box>
        </Box>
    );
}

export default Chat;
