import {AppBar, Toolbar} from "@mui/material";
import Logo from "./shared/Logo.tsx";


const Header = () => {
    return (
        <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow:"none"}}>
            <Toolbar sx={{display:"flex"}}>
                <Logo/>
            </Toolbar>
        </AppBar>
    );
};

export default Header;