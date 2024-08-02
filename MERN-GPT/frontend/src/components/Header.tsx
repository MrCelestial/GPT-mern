import React from 'react';
import {AppBar, Toolbar} from "@mui/material";

const Header = (props) => {
    return (
        <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow:"none"}}>
            <Toolbar sx={{display:"flex"}}></Toolbar>
        </AppBar>
    );
};

export default Header;