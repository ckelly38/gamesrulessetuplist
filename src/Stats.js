import React, {useState} from "react";
import ListOfNumbers from "./ListOfNumbers";
import DeckTypeSelection from "./DeckTypeSelection";
import './App.css';

function Stats({games, gameobj, screener, updateGame})
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

    const cpmypexsgameobj = gameobj.NumberOfPlayersExcluding.map((val) => val);

    const [myodecktype, setMyODeckType] = useState("");
    const [mypartialgamedata, setMyPartialGameDataObj] = useState({
        name: "" + gameobj.name,
        KindOfDeck: "" + gameobj.KindOfDeck,
        AverageMinutes: gameobj.AverageMinutes,
        MinNumberOfPlayers: gameobj.MinNumberOfPlayers,
        MaxNumberOfPlayers: gameobj.MaxNumberOfPlayers,
        NumberOfDecks: gameobj.NumberOfDecks,
        NumberOfPlayersExcluding: cpmypexsgameobj
    });
    console.log("mypartialgamedata = ", mypartialgamedata);

    //handleChange from AddAGame function more or less ids are about the only thing that is different
    //on the AddAGame component the ids are unique by themselves only rendered once on the page
    function handleChange(event)
    {
        console.log("Stats AddAGame handleChange: event.target = ", event.target);
        console.log("handleChange: event.target.value = " + event.target.value);
        console.log("handleChange: event.target.id = " + event.target.id);
        console.log("handleChange: OLD gameobj = ", gameobj);

        let nwpgameobj = {...mypartialgamedata};

        console.log("handleChange: OLD nwpgameobj = ", nwpgameobj);
        
        //do something with the value all we need is the key
        let objkey = "";
        const usenumber = ((event.target.id.indexOf("edit-minplayers") === 0) ||
            (event.target.id.indexOf("edit-maxplayers") === 0) ||
            (event.target.id.indexOf("edit-numdecks") === 0) ||
            (event.target.id.indexOf("edit-averagemins") === 0));
        const usedrop = (event.target.id.indexOf("deck-type") === 0);
        
        if (event.target.id.indexOf("edit-game-name") === 0) objkey = "name";
        else if (event.target.id.indexOf("edit-minplayers") === 0) objkey = "MinNumberOfPlayers";
        else if (event.target.id.indexOf("edit-maxplayers") === 0) objkey = "MaxNumberOfPlayers";
        else if (event.target.id.indexOf("edit-numdecks") === 0) objkey = "NumberOfDecks";
        else if (event.target.id.indexOf("edit-averagemins") === 0) objkey = "AverageMinutes";
        else if (event.target.id.indexOf("deck-type") === 0) objkey = "KindOfDeck";
        else if ((event.target.id.indexOf("other-deck-type") === 0) ||
            (event.target.id.indexOf("otherdecktype") === 0))
        {
            objkey="KindOfDeck";
        }
        else
        {
            throw new Error("handleChange: NEED TO DO SOMETHING HERE TO HANDLE THE ID (" +
                event.target.id + ")!");
        }
        console.log("handleChange: objkey = " + objkey);
        console.log("handleChange: usenumber = " + usenumber);
        console.log("handleChange: usedrop = " + usedrop);

        if (usenumber) nwpgameobj[objkey] = Number(event.target.value);
        else
        {
            if (!usedrop && screener({input: "" + event.target.value}))
            {
                console.error("handleChange: input (" + event.target.value +
                    ") has illegal characters in it!");
                console.log("changes aborted!");
                return;
            }
            else nwpgameobj[objkey] = event.target.value;
            if ((event.target.id.indexOf("other-deck-type") === 0) ||
                (event.target.id.indexOf("otherdecktype") === 0))
            {
                setMyODeckType(event.target.value);
            }
            //else;//do nothing
        }
        console.log("handleChange: NEW nwpgameobj = ", nwpgameobj);

        setMyPartialGameDataObj(nwpgameobj);
    }

    function changeEditingMode(nwstate = null)
    {
        console.log("editmode = " + editmode);
        
        if (editmode)
        {
            //do a lot to exit the editing mode...
            //take the data from the state variables or from nwstate and
            //load it into a new game object then update the game on the server
            console.log("nwstate = ", nwstate);

            let nwgameobj = {...gameobj};
            nwgameobj.rules.basic = [...gameobj.rules.basic];
            nwgameobj.rules.vegasstyle = [...gameobj.rules.vegasstyle];
            nwgameobj.strategies=[...gameobj.strategies];

            debugger;

            throw new Error("NOT DONE YET HERE 10-5-2023 9:45 PM!");
            //updateGame(nwgameobj);
        }
        //else;//do nothing

        setEditMode(!editmode);
    }

    function cancelChangesClick(event)
    {
        console.log("event.target = ", event.target);
        
        //revert the state variables then save it in editing mode
        let nwstate = null;
        console.error("NOT DONE YET HERE 10-6-2023 12:30 AM!");
        console.log("nwstate = ", nwstate);

        if (nwstate === undefined || nwstate === null)
        {
            debugger;
            throw new Error("nwstate must be defined!");
        }
        //else;//do nothing

        changeEditingMode(nwstate);
    }

    function handleEditSaveClick(event)
    {
        console.log("event.target = ", event.target);
        
        changeEditingMode(null);
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
                {editmode ? <input type="text" id={"edit-game-name" + gameobj.id}
                    value={mypartialgamedata.name} style={{fontSize: "18px", height: "20px"}}
                    onChange={handleChange} /> : gameobj.name}</u>:</h1>
            <div><b>{editmode ? "Editing" : "Viewing"} Mode: </b>
                <button id={"switchmodebtn" + gameobj.id} onClick={handleEditSaveClick}>
                    {editmode ? "Save Changes" : "Edit These"}</button>
                {editmode ? (
                    <button id={"cancelbtn" + gameobj.id} onClick={cancelChangesClick}>
                        Cancel Changes</button>) : null}
            </div>
            <table className="App-table">
                <th>Item</th>
                <th className="tabletextleft">Value</th>
                <tr>
                    <td className="tabletextright">Average # of Minutes:</td>
                    <td>{editmode ? <input id={"edit-averagemins" + gameobj.id} type="number" step="any"
                        value={mypartialgamedata.AverageMinutes}
                        onChange={handleChange} /> : gameobj.AverageMinutes}</td>
                </tr>
                <tr>
                    <td className="tabletextright"># of Players:</td>
                    <td>{editmode ? (<><input id={"edit-minplayers" + gameobj.id} type="number" step="1"
                        value={mypartialgamedata.MinNumberOfPlayers} onChange={handleChange} /> - <input
                        id={"edit-maxplayers" + gameobj.id} type="number" step="1"
                        value={mypartialgamedata.MaxNumberOfPlayers}
                        onChange={handleChange} /> (inclusive)</>):
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
                        value={mypartialgamedata.NumberOfDecks}
                        onChange={handleChange} /> : gameobj.NumberOfDecks}</td>
                </tr>
                <tr>
                    <td className="tabletextright">Type of Decks:</td>
                    <td>{editmode ? (<DeckTypeSelection gameobj={mypartialgamedata} mid={gameobj.id}
                        handleChange={handleChange}
                        myotherdecktype={myodecktype} />) : (gameobj.KindOfDeck)}</td>
                </tr>
            </table>
        </div>
    );
}

export default Stats;
