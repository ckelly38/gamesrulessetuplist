import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import About from "./About";
import GameSetup from "./GameSetup";

function GameRulesSetupRenderer({games, type})
{
    const params = useParams();
    console.log("params = ", params);

    if (params.id === undefined || params.id === null || isNaN(params.id))
    {
        //
    }
    //else;//do nothing

    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    function getGameObj(mid)
    {
        console.log("mid = " + mid);

        let mygamesindex = games.findIndex((game) => {
            console.log("game.id = " + game.id);
            if (game.id === mid) return true;
            else return false;
        });
        console.log("mygamesindex = " + mygamesindex);

        if (mygamesindex < 0 || (mygamesindex > games.length - 1 && games.length > 0))
        {
            throw new Error("illegal index found and used for the games object index! " +
                "The id must be found on the list of games, but it was not!");
        }
        else return games[mygamesindex];
    }
    const mygameobj = getGameObj(parseInt(params.id));
    console.log("mygameobj = ", mygameobj);

    if (type === "SETUP" || type === "setup" || type === "Setup")
    {
        return (
            <GameSetup games={games} gameobj={mygameobj} />
        );
    }
    else if (type === "ABOUT" || type === "about" || type === "About")
    {
        return (
            <About games={games} gameobj={mygameobj} />
        );
    }
    else
    {
        throw new Error("invalid type found and used here!");
    }
}

export default GameRulesSetupRenderer;
