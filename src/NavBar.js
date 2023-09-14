import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({gameid})
{
    return (
        <div>
            <NavLink className="App-link" style={{paddingLeft: "20px", paddingRight: "20px"}}
                exact to="/">Home</NavLink>
            <NavLink className="App-link" style={{paddingLeft: "20px", paddingRight: "20px"}}
                to={"/" + gameid + "/about"}>About</NavLink>
            <NavLink className="App-link" style={{paddingLeft: "20px", paddingRight: "20px"}}
                to={"/" + gameid + "/setup"}>Setup</NavLink>
        </div>
    );
}

export default NavBar;
