import React from "react";

function GameSetup({games, gameobj})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);

    if (gameobj === undefined || gameobj === null)
    {
        throw new Error("game object is required and must not be null!");
    }
    //else;//do nothing

    const imgsrc = gameobj.image;
    const name = gameobj.name;
    
    console.log("imgsrc = " + imgsrc);
    console.log("name = " + name);

    if (imgsrc === undefined || imgsrc === null || imgsrc.length < 1 ||
        name === undefined || name === null || name.length < 1)
    {
        throw new Error("both the name and imgsrc attributes/props are required!");
    }
    //else;//do nothing

    let description = "";
    if (gameobj.description === undefined || gameobj.description === null || gameobj.description.length < 1)
    {
        description = "This shows the general setup of the game: " + name + ".";
    }
    else description = gameobj.description;
    console.log("description = " + description);

    return (
        <div>
            <h1>{name} Game Setup:</h1>
            <img src={imgsrc} alt={name + " setup"} />
            <p>{description}</p>
        </div>
    );
}

export default GameSetup;
