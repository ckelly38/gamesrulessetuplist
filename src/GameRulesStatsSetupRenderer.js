import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Stats from "./Stats";
import GameSetup from "./GameSetup";
import RulesNStrategies from "./RulesNStrategies";

function GameRulesStatsSetupRenderer({games, type, updateGame})
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

    function errorCheckBools(boolsobj)
    {
        if (boolsobj === undefined || boolsobj === null)
        {
            throw new Error("boolsobj must not be null! It must be defined!");
        }
        //else;//do nothing

        const usesetup = boolsobj.usesetup;
        const usestats = boolsobj.usestats;
        const userules = boolsobj.userules;

        console.log("usesetup = " + usesetup);
        console.log("usestats = " + usestats);
        console.log("userules = " + userules);
        if (usesetup === undefined || usesetup === null ||
            usestats === undefined || usestats === null ||
            userules === undefined || userules === null)
        {
            throw new Error("the bools object was created wrong because at least one of the " +
                "expected properties were not defined or were null, but all must be booleans!");
        }
        else
        {
            if ((usesetup === true || usesetup === false) &&
                (usestats === true || usestats === false) &&
                (userules === true || userules === false))
            {
                //they were defined as booleans correctly
            }
            else
            {
                throw new Error("the bools object was created wrong because at least one of the " +
                    "expected properties were not booleans and must be!");
            }
        }

        if (usesetup)
        {
            if (usestats || userules)
            {
                throw new Error("only one must be true!");
            }
            //else;//do nothing
        }
        //else;//do nothing
        if (usestats)
        {
            if (usesetup || userules)
            {
                throw new Error("only one must be true!");
            }
            //else;//do nothing
        }
        //else;//do nothing
        if (userules)
        {
            if (usesetup || usestats)
            {
                throw new Error("only one must be true!");
            }
            //else;//do nothing
        }
        //else;//do nothing
    }

    function finishRendering(boolsobj, useall, games)
    {
        errorCheckBools(boolsobj);
        if (useall)
        {
            let myretobjs = games.map((game) => {
                if (boolsobj.usesetup)
                {
                    return (
                        <GameSetup key={game.id} games={games} gameobj={game} updateGame={updateGame} />
                    );
                }
                else if (boolsobj.usestats)
                {
                    return (
                        <Stats key={game.id} games={games} gameobj={game} updateGame={updateGame} />
                    );
                }
                else if (boolsobj.userules)
                {
                    return (
                        <RulesNStrategies key={game.id} games={games} gameobj={game}
                            updateGame={updateGame} />
                    );
                }
                else throw new Error("illegal key found and used in the bools object");
            });

            return (
                <>
                    <NavBar />
                    {myretobjs}
                </>
            );
        }
        else
        {
            return (
                <>
                    <NavBar gameid={mygameobj.id} />
                    {boolsobj.usesetup ? ( <GameSetup games={games} gameobj={mygameobj}
                        updateGame={updateGame} /> ) : (
                        (boolsobj.usestats ? (
                            <Stats games={games} gameobj={mygameobj} updateGame={updateGame} />
                        ) : (boolsobj.userules ? (
                            <RulesNStrategies games={games} gameobj={mygameobj} updateGame={updateGame} />
                        ) : null))
                    )}
                </>
            );
        }
    }

    let myboolsobj = {
        usesetup: false,
        usestats: false,
        userules: false,
    };

    if (type === "SETUP" || type === "setup" || type === "Setup")
    {
        myboolsobj.usesetup = true;
        return finishRendering(myboolsobj, renderall, games);
    }
    else if (type === "STATS" || type === "stats" || type === "Stats" || type === "Statistics" ||
        type === "STATISTICS")
    {
        myboolsobj.usestats = true;
        return finishRendering(myboolsobj, renderall, games);
    }
    else if (type === "RULES" || type === "Rules" || type === "rules" ||
        type === "STRATEGIES" || type === "Strategies" || type === "strategies")
    {
        myboolsobj.userules = true;
        return finishRendering(myboolsobj, renderall, games);
    }
    else
    {
        throw new Error("invalid type found and used here!");
    }
}

export default GameRulesStatsSetupRenderer;
