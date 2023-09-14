import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({gameid})
{
    return (
        <div>
            <NavLink className="App-link" exact to="/">Home</NavLink>
            <NavLink className="App-link" to={"/" + gameid + "/about"}>About</NavLink>
            <NavLink className="App-link" to={"/" + gameid + "/setup"}>Setup</NavLink>
        </div>
    );
}

export default NavBar;
