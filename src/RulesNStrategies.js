import React from "react";
import './App.css';

function RulesNStrategies({games, gameobj})
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
        "basic": [],
        "vegasstyle": []
    },
    "strategies": []
    */

    let mybasicrulelis = gameobj.rules.basic.map((rule, index) =>
        <li key={"basic" + gameobj.name + index}>{rule}</li>);
    let myvegasrulelis = gameobj.rules.vegasstyle.map((rule, index) =>
        <li key={"vegas" + gameobj.name + index}>{rule}</li>);
    let mystratlis = gameobj.strategies.map((rule, index) =>
        <li key={"strats" + gameobj.name + index}>{rule}</li>);
    
    return (
        <div>
            <h1>Rules And Strategies For <u>{gameobj.name}</u>:</h1>
            <details>
                <summary>Rules:</summary>
                <p>Basic:</p>
                <ul>{mybasicrulelis}</ul>
                <p>Vegas Style:</p>
                <ul>{myvegasrulelis}</ul>
            </details>
            <details>
                <summary>Strategies:</summary>
                <ul>{mystratlis}</ul>
            </details>
        </div>
    );
}

export default RulesNStrategies;
