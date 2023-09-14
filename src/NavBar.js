import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(props)
{
    return (
        <div>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/:id/about">About</NavLink>
            <NavLink to="/:id/setup">Setup</NavLink>
        </div>
    );
}

export default NavBar;
