import React from "react";

function About({games, gameobj})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);

    return (
        <div>About</div>
    );
}

export default About;
