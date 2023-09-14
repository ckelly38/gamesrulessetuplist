import React from "react";

function GameSetup({imgsrc, name})
{
    if (imgsrc === undefined || imgsrc === null || imgsrc.length < 1 ||
        name === undefined || name === null || name.length < 1)
    {
        throw new Error("both the name and imgsrc attributes/props are required!");
    }
    //else;//do nothing

    return (
        <div>
            <h1>{name} Game Setup:</h1>
            <img src={imgsrc} alt={name + " setup"} />
        </div>
    );
}

export default GameSetup;
