import React, {useState} from "react";
import GameFormRules from "./GameFormRules";

function AddAGame({addGame})
{
    const [gameobj, setGameObject] = useState({
        "name": "name",
        "MinNumberOfPlayers": 0,
        "MaxNumberOfPlayers": 0,
        "NumberOfDecks": 0,
        "AverageMinutes": 0,
        "KindOfDeck": "A normal 52 card deck that has the 4 suits and no jokers",
        "image": "",
        "description": "",
        "rules": {
            "basic": [],
            "vegasstyle": []
        },
        "strategies": []
    });

    function handleSubmit(event)
    {
        event.preventDefault();
        console.log("AddAGame handleSubmit: event.target = ", event.target);
        //take the new game object and call addGame(gameobj);
        addGame(gameobj);
    }

    function handleChange(event)
    {
        console.log("AddAGame handleChange: event.target = ", event.target);
        console.log("handleChange: event.target.value = " + event.target.value);
        console.log("handleChange: event.target.id = " + event.target.id);
        console.log("handleChange: OLD gameobj = ", gameobj);

        let nwgameobj = {...gameobj};
        nwgameobj.rules.basic = {...gameobj.rules.basic};
        nwgameobj.rules.vegasstyle = {...gameobj.rules.vegasstyle};
        nwgameobj.strategies={...gameobj.strategies};

        console.log("handleChange: COPY OLD gameobj = ", nwgameobj);
        
        //do something with the value all we need is the key
        let objkey = "";
        const usenumber = ((event.target.id === "minnumplayers") || (event.target.id === "maxnumplayers") ||
            (event.target.id === "numdecks") || (event.target.id === "avnummins"));
        
        if (event.target.id === "nwname") objkey = "name";
        else if (event.target.id === "nwurl") objkey = "image";
        else if (event.target.id === "nwimgdesc") objkey = "description";
        else if (event.target.id === "minnumplayers") objkey = "MinNumberOfPlayers";
        else if (event.target.id === "maxnumplayers") objkey = "MaxNumberOfPlayers";
        else if (event.target.id === "numdecks") objkey = "NumberOfDecks";
        else if (event.target.id === "avnummins") objkey = "AverageMinutes";
        else throw new Error("NEED TO DO SOMETHING HERE TO HANDLE THE ID (" + event.target.id + ")!");
        console.log("handleChange: objkey = " + objkey);
        console.log("handleChange: usenumber = " + usenumber);

        if (usenumber) nwgameobj[objkey] = Number(event.target.value);
        else nwgameobj[objkey] = event.target.value;
        console.log("handleChange: NEW nwgameobj = ", nwgameobj);

        setGameObject(nwgameobj);
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
            <input required={true} id="nwname" type="text" placeholder="Game Name:" value={gameobj.name}
                onChange={handleChange} /><br />
            <label htmlFor="nwurl" id="nwurllbl">Image URL: </label>
            <input id="nwurl" type="text" placeholder="Image URL: " value={gameobj.image}
                onChange={handleChange} /><br />
            <label htmlFor="nwimgdesc" id="nwimgdesclbl">Image Description: </label>
            <input id="nwimgdesc" type="text" placeholder="Image Description: " value={gameobj.description}
                onChange={handleChange} /><br />
            <label htmlFor="minnumplayers" id="minnumplayerslbl">Minimum Number of Players: </label>
            <input required={true} id="minnumplayers" type="number" min="1" placeholder="0"
                 value={gameobj.MinNumberOfPlayers} onChange={handleChange} /><br />
            <label htmlFor="maxnumplayers" id="maxnumplayerslbl">Maximum Number of Players: </label>
            <input required={true} id="maxnumplayers" type="number" min="1" placeholder="0"
                value={gameobj.MaxNumberOfPlayers} onChange={handleChange} /><br />
            <label htmlFor="numdecks" id="numdeckslbl">Number of Decks: </label>
            <input required={true} id="numdecks" type="number" min="0" placeholder="0"
                value={gameobj.NumberOfDecks} onChange={handleChange} /><br />
            <label htmlFor="avnummins" id="avnumminslbl">Average Number of Minutes: </label>
            <input required={true} id="avnummins" type="number" min="0" step="any" placeholder="0"
                value={gameobj.AverageMinutes} onChange={handleChange} /><br />
            <GameFormRules handleChange={handleChange} />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default AddAGame;
