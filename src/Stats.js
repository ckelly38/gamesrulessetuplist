import React from "react";
import './App.css';

function Stats({games, gameobj})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);

    //# of Players: {min}-{max} (inclusive)
    //Average Number of Minutes: {time}
    //Number of Decks: {num}
    //Kind of Deck: {normal, or special and included}
    //rules and play strategies
    /*
    "name": "name",
    "id": 0,
    "MinNumberOfPlayers": 0,
    "MaxNumberOfPlayers": 0,
    "NumberOfDecks": 0,
    "AverageMinutes": 0,
    "KindOfDeck": "A normal 52 card deck that has the 4 suits and no jokers",
    "image": "url",
    "description": "",
    "rules": {
        "basic": []
    },
    "strategies": []
    */

    return (
        <div>
            <h1>Stats or Statistics or Requirements For <u>{gameobj.name}</u>:</h1>
            <table className="App-table">
                <th>Item</th>
                <th className="tabletextleft">Value</th>
                <tr>
                    <td className="tabletextright">Average # of Minutes:</td>
                    <td>{gameobj.AverageMinutes}</td>
                </tr>
                <tr>
                    <td className="tabletextright"># of Players:</td>
                    <td>{gameobj.MinNumberOfPlayers} - {gameobj.MaxNumberOfPlayers} (inclusive)</td>
                </tr>
                <tr>
                    <td className="tabletextright"># of Decks:</td><td>{gameobj.NumberOfDecks}</td>
                </tr>
                <tr>
                    <td className="tabletextright">Type of Decks:</td><td>{gameobj.KindOfDeck}</td>
                </tr>
            </table>
        </div>
    );
}

export default Stats;
