import React from 'react';
import {Link} from "react-router-dom";

function Logo(props) {
    return (
        <div style={{
            display: "flex",
            marginRight: "auto",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px"
        }}>
            <Link to={"/"}>
                <img src="" alt="" width="30px" height="30px" />
            </Link>
        </div>
    );
}

export default Logo;