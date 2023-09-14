import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function About({games, gameobj})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);

    return (
        <>
            <NavBar gameid={gameobj.id} />
            <div>About</div>
        </>
    );
}

export default About;
