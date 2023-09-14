import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function About({games, gameobj, shownavbar})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);
    console.log("shownavbar = " + shownavbar);

    return (
        <>
            {shownavbar ? <NavBar gameid={gameobj.id} /> : null}
            <div>About</div>
        </>
    );
}

export default About;
