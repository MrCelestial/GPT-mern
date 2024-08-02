import {AppBar, Toolbar} from "@mui/material";
import Logo from "./shared/Logo.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import NavigationLink from "./shared/NavigationLink.tsx";


const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
            <Toolbar sx={{display: "flex"}}>
                <Logo/>
                <div>
                    {auth?.isLoggedIn ? (
                        <>
                            <NavigationLink bg = "" to ="/chat" text = "Go to chat" textColor="black"/>
                            <NavigationLink bg="" to ="/" text ="logout" textColor="white" onClick={auth.logout}/>
                        </>
                    ) : (
                        <>
                            <NavigationLink bg = "" to ="/login" text = "Login" textColor="white"/>
                            <NavigationLink bg="" to ="/signup" text ="Signup" textColor="white" onClick={auth.logout}/>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;