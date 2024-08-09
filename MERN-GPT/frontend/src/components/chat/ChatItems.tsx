import {Avatar, Box, Typography} from "@mui/material";
import {useAuth} from "../../context/AuthContext.tsx";

const ChatItems = ({content, role}:{content:String, role:"user"|"assistant"}) => {
    const auth = useAuth();
    const username = auth?.user?.username || '';
    const initials = username ? username.split(' ').map(name => name[0]).join('') : '';
    return role=== "assistant" ?(
        <Box sx={{display: "flex", p:2, bgcolor: "gray.700", my:2, gap:2}}>
            <Avatar sx ={{ml: "0"}}>
                <img src="/logo.svg" width={40} height={40} alt=""/>
            </Avatar>
            <Box>
                <Typography color='' fontSize={"20px"}>{content}</Typography>
            </Box>
        </Box>)
        :(
            <Box sx={{display: "flex", p:2, bgcolor: "", gap:2}}>
                <Avatar sx ={{ml: "0", bgcolor:"black", color:""}}>
                    {initials}
                </Avatar>
                <Box>
                    <Typography color='' fontSize={"20px"}>{content}</Typography>
                </Box>
            </Box>
        );

};

export default ChatItems;