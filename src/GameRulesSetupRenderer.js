import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import About from "./About";
import GameSetup from "./GameSetup";

function GameRulesSetupRenderer({games, type})
{
    const params = useParams();
    console.log("params = ", params);

    const renderall = (params.id === undefined || params.id === null || isNaN(params.id));
    console.log("renderall = " + renderall);

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
    let mygameobj = null;
    if (renderall);
    else mygameobj = getGameObj(parseInt(params.id));
    console.log("mygameobj = ", mygameobj);
    console.log("type = " + type);

    function finishRendering(usesetup, useall, games)
    {
        if (useall)
        {
            let myretobjs = games.map((game) => {
                if (usesetup)
                {
                    return (
                        <GameSetup key={game.id} games={games} gameobj={game} shownavbar={game.id === 1} />
                    );
                }
                else
                {
                    return (
                        <About key={game.id} games={games} gameobj={game} shownavbar={game.id === 1} />
                    );
                }
            });
            return myretobjs;
        }
        else
        {
            if (usesetup)
            {
                return (
                    <GameSetup games={games} gameobj={mygameobj} shownavbar={true} />
                );
            }
            else
            {
                return (
                    <About games={games} gameobj={mygameobj} shownavbar={true} />
                );
            }
        }
    }

    if (type === "SETUP" || type === "setup" || type === "Setup")
    {
        return finishRendering(true, renderall, games);
    }
    else if (type === "ABOUT" || type === "about" || type === "About")
    {
        return finishRendering(false, renderall, games);
    }
    else
    {
        throw new Error("invalid type found and used here!");
    }
}

export default GameRulesSetupRenderer;
