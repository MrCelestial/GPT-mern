import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import {useAuth} from "../context/AuthContext.tsx";
import ChatItems from "../components/chat/ChatItems.tsx";
import {IoMdSend} from "react-icons/io"
import {useRef, useState} from "react";
import {sendChatRequest} from "../helpers/api-comms.tsx";

type Messages = {
    role:"user"|"assistant";
    content:"string"
};

function Chat() {
    const auth = useAuth();

    // Extracting username initials
    const username = auth?.user?.username || '';
    const initials = username ? username.split(' ').map(name => name[0]).join('') : '';
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleSubmit = async () => {
        const content = inputRef.current?.value as string;
        if(inputRef && inputRef.current){
            inputRef.current.value = "";
        }
        const newMessage:Messages = {role:"user", content};
        setChatMessages((prev)=>[...prev, newMessage]);
        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
        //
    };
    const [chatMeassages, setChatMessages] = useState([]);

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
                    <Typography sx={{ textAlign: 'center', color: '#e8eae3', fontFamily: "Glegoo", mb: 2 }}>
                        You are talking to an AI assistant chatbot
                    </Typography>
                    <Typography sx={{ textAlign: 'center', color: '#e8eae3', fontFamily: "Glegoo", mb: 4, px: 3 }}>
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
                    Gemini Pro!
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
                        //@ts-ignore
                        <ChatItems content={chat.content} role={chat.role} key={index}/>))}

                </Box>
                <div style={{width:"100%", display:'flex', borderTop: '1px solid #333', marginTop:'8px'}}>
                <input type="text" ref={inputRef} style={{
                    width: "90%",
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
                <IconButton onClick={handleSubmit} sx ={{ml: "auto", color:"white"}}><IoMdSend/></IconButton>
                </div>
            </Box>
        </Box>
    );
}

export default Chat;
