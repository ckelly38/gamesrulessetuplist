import React from "react";
import GameFormRules from "./GameFormRules";

function AddAGame(props)
{
    function handleSubmit(event)
    {
        event.preventDefault();
        console.log("AddAGame handleSubmit: event.target = ", event.target);
    }

    function handleChange(event)
    {
        console.log("AddAGame handleChange: event.target = ", event.target);
        console.log("handleChange: event.target.value = " + event.target.value);
        debugger;
    }
    
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

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nwname" id="nwnamelbl">Game Name: </label>
            <input required={true} id="nwname" type="text" placeholder="Game Name:"
                onChange={handleChange} /><br />
            <label htmlFor="nwurl" id="nwurllbl">Image URL: </label>
            <input id="nwurl" type="text" placeholder="Image URL: " onChange={handleChange} /><br />
            <label htmlFor="nwimgdesc" id="nwimgdesclbl">Image Description: </label>
            <input id="nwimgdesc" type="text" placeholder="Image Description: "
                onChange={handleChange} /><br />
            <label htmlFor="minnumplayers" id="minnumplayerslbl">Minimum Number of Players: </label>
            <input required={true} id="minnumplayers" type="number" min="1" placeholder="0"
                onChange={handleChange} /><br />
            <label htmlFor="maxnumplayers" id="maxnumplayerslbl">Maximum Number of Players: </label>
            <input required={true} id="maxnumplayers" type="number" min="1" placeholder="0"
                onChange={handleChange} /><br />
            <label htmlFor="numdecks" id="numdeckslbl">Number of Decks: </label>
            <input required={true} id="numdecks" type="number" min="0" placeholder="0"
                onChange={handleChange} /><br />
            <label htmlFor="avnummins" id="avnumminslbl">Average Number of Minutes: </label>
            <input required={true} id="avnummins" type="number" min="0" step="any" placeholder="0"
                onChange={handleChange} /><br />
            <GameFormRules handleChange={handleChange} />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default AddAGame;
