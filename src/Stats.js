import React, {useState} from "react";
import ListOfNumbers from "./ListOfNumbers";
import DeckTypeSelection from "./DeckTypeSelection";
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
    "NumberOfPlayersExcluding": [],
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

    const [editmode, setEditMode] = useState(false);

    const mypexobjsarr = gameobj.NumberOfPlayersExcluding.map((num, index) => {
        return {
            id: ("pex" + index + 1),
            value: num
        };
    });
    const [mypexs, setMyPExs] = useState(mypexobjsarr);

    const [myodecktype, setMyODeckType] = useState("");

    function handleEditSaveClick(event)
    {
        console.log("event.target = ", event.target);
        console.log("editmode = " + editmode);
        
        if (editmode)
        {
            //do a lot to exit the editing mode...
            console.error("NOT DONE YET HERE 10-5-2023 9:45 PM!");
            debugger;
        }
        //else;//do nothing

        setEditMode(!editmode);
    }

    const myexps = gameobj.NumberOfPlayersExcluding;
    let mydispmyexps = "";
    if (myexps === undefined || myexps === null || myexps.length < 1)
    {
        mydispmyexps = "None";
    }
    else
    {
        for (let n = 0; n < myexps.length; n++)
        {
            mydispmyexps += myexps[n] + ((n + 1 < myexps.length) ? ", " : "");
        }
    }

    return (
        <div>
            <h1>Stats or Statistics or Requirements For <u>
                {editmode ? <input type="text" id={"edit-game-name" + gameobj.id} value={gameobj.name}
                    style={{fontSize: "18px", height: "20px"}} onChange={null} /> : gameobj.name}</u>:</h1>
            <div><b>{editmode ? "Editing" : "Viewing"} Mode: </b>
                <button id={"switchmodebtn" + gameobj.id} onClick={handleEditSaveClick}>
                    {editmode ? "Save Changes" : "Edit These"}</button>
                {editmode ? (
                    <button id={"cancelbtn" + gameobj.id} onClick={null}>Cancel Changes</button>) : null}
            </div>
            <table className="App-table">
                <th>Item</th>
                <th className="tabletextleft">Value</th>
                <tr>
                    <td className="tabletextright">Average # of Minutes:</td>
                    <td>{editmode ? <input id={"edit-averagemins" + gameobj.id} type="number" step="any"
                        value={gameobj.AverageMinutes} onChange={null} /> : gameobj.AverageMinutes}</td>
                </tr>
                <tr>
                    <td className="tabletextright"># of Players:</td>
                    <td>{editmode ? (<><input id={"edit-minplayers" + gameobj.id} type="number" step="1"
                        value={gameobj.MinNumberOfPlayers} onChange={null} /> - <input
                        id={"edit-maxplayers" + gameobj.id} type="number" step="1"
                        value={gameobj.MaxNumberOfPlayers} onChange={null} /> (inclusive)</>):
                        (gameobj.MinNumberOfPlayers + " - " +
                        gameobj.MaxNumberOfPlayers + " (inclusive)")}</td>
                </tr>
                <tr>
                    <td className="tabletextright">Excluding:</td>
                    <td>{editmode ? <ListOfNumbers myexs={mypexs}
                        setMyExs={setMyPExs} />: mydispmyexps}</td>
                </tr>
                <tr>
                    <td className="tabletextright"># of Decks:</td>
                    <td>{editmode ? <input id={"edit-numdecks" + gameobj.id} type="number" step="1"
                        value={gameobj.NumberOfDecks} onChange={null} /> : gameobj.NumberOfDecks}</td>
                </tr>
                <tr>
                    <td className="tabletextright">Type of Decks:</td>
                    <td>{editmode ? (<DeckTypeSelection gameobj={gameobj} handleChange={null}
                        myotherdecktype={myodecktype} />) : (gameobj.KindOfDeck)}</td>
                </tr>
            </table>
        </div>
    );
}

export default Stats;
