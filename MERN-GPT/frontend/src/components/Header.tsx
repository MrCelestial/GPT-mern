import {AppBar, Toolbar} from "@mui/material";
import Logo from "./shared/Logo.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import NavigationLink from "./shared/NavigationLink.tsx";


const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{bgcolor: "transparent", position: "relative", boxShadow: "none"}}>
            <Toolbar sx={{display: "flex"}}>
                <Logo/>
                <div style={{marginTop:"5px"}}>
                    {auth?.isLoggedIn ? (
                        <>
                            <NavigationLink bg = "" to ="/chat" text = "Go to chat" textColor="#fa2742"/>
                            <NavigationLink bg="" to ="/" text ="logout" textColor="#fa2742" onClick={auth.logout}/>
                        </>
                    ) : (
                        <>
                            <NavigationLink bg = "" to ="/login" text = "Login" textColor="#fa2742"/>
                            <NavigationLink bg="" to ="/signup" text ="Signup" textColor="#fa2742" onClick={auth.logout}/>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;