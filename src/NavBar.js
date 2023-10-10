import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({gameid})
{
    console.log("NavBar: gameid = " + gameid);
    
    return (
        <>
            <div className="App">
                <NavLink className="App-link" style={{paddingLeft: "20px", paddingRight: "20px"}}
                    exact to="/">Home</NavLink>
                <NavLink className="App-link" style={{paddingLeft: "20px", paddingRight: "20px"}}
                    to={"/about/" + gameid}>Stats</NavLink>
                <NavLink className="App-link" style={{paddingLeft: "20px", paddingRight: "20px"}}
                    to={"/setup/" + gameid}>Setup</NavLink>
                <NavLink className="App-link" style={{paddingLeft: "20px", paddingRight: "20px"}}
                    to={"/rules/" + gameid}>Rules</NavLink>
                <NavLink className="App-link" style={{paddingLeft: "20px", paddingRight: "20px"}}
                    exact to={"/new"}>New</NavLink>
            </div>
            <hr />
        </>
    );
}

export default NavBar;
