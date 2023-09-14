import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function GameSetup({games, gameobj})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);

    const imgsrc = gameobj.image;
    const name = gameobj.name;

    if (imgsrc === undefined || imgsrc === null || imgsrc.length < 1 ||
        name === undefined || name === null || name.length < 1)
    {
        throw new Error("both the name and imgsrc attributes/props are required!");
    }
    //else;//do nothing

    return (
        <>
            <NavBar gameid={gameobj.id} />
            <div>
                <h1>{name} Game Setup:</h1>
                <img src={imgsrc} alt={name + " setup"} />
            </div>
        </>
    );
}

export default GameSetup;
