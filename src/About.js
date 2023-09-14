import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function About({games, gameobj, shownavbar, nonavbarid = false})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);
    console.log("shownavbar = " + shownavbar);
    console.log("nonavbarid = " + nonavbarid);

    return (
        <>
            {shownavbar ? (nonavbarid ? <NavBar /> : <NavBar gameid={gameobj.id} />) : null}
            <div>About</div>
        </>
    );
}

export default About;
