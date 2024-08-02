import {Link} from "react-router-dom";
import {Typography} from "@mui/material";

function Logo() {
    return (
        <div style={{
            display: "flex",
            marginRight: "auto",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "3px"
        }}>
            <Link to={"/"}>
                <img src="/logo.svg"
                     alt="logo"
                     width="50px"
                     height="auto"
                     className="logo-inverted"/>

            </Link>
            <Typography sx ={
                {display:{md:"block", sm:"none", xs:"none" },
                    mr:"auto",
                    fontWeight:"800",
                    textShadow: "2px 2px 20px #000"
                }}
            >
                    <span style ={{fontSize: "20px"}}>
                        Y@psalot
                    </span>-GPT
            </Typography>
        </div>
    );
}

export default Logo;