import React, {useState} from "react";
import GameFormRules from "./GameFormRules";
import ListOfNumbers from "./ListOfNumbers";
import DeckTypeSelection from "./DeckTypeSelection";
import TagLevelsClass from './TagLevelsClass';

function AddAGame({addGame})
{
    const [gameobj, setGameObject] = useState({
        "name": "name",
        "MinNumberOfPlayers": 0,
        "MaxNumberOfPlayers": 0,
        "NumberOfPlayersExcluding": [],
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
    const [myrules, setMyRules] = useState([{
        id: "rule1",
        isbasic: false,
        isvegas: false,
        text: ""
    }]);
    const [mystrats, setMyStrategies] = useState([{
        id: "strategy1",
        text: ""
    }]);
    //{
    //    id: "pex1",
    //    value: 0
    //}
    const [myplayerexclusions, setMyPlayerExclusion] = useState([]);
    const [myotherdecktype, setMyOtherDeckType] = useState("");

    function handleSubmit(event)
    {
        event.preventDefault();
        console.log("AddAGame handleSubmit: event.target = ", event.target);
        console.log("AddAGame handleSubmit: gameobj = ", gameobj);
        console.log("AddAGame handleSubmit: myrules = ", myrules);
        console.log("AddAGame handleSubmit: mystrats = ", mystrats);

        let nwgameobj = {...gameobj};
        for (let n = 0; n < myrules.length; n++)
        {
            if (myrules[n].isbasic) nwgameobj.rules.basic.push("" + myrules[n].text);
            else if (myrules[n].isvegas) nwgameobj.rules.vegasstyle.push("" + myrules[n].text);
            else throw new Error("invalid type of rule found here!");
        }
        for (let n = 0; n < mystrats.length; n++)
        {
            nwgameobj.strategies.push(mystrats[n].text);
        }
        for (let n = 0; n < myplayerexclusions.length; n++)
        {
            nwgameobj.NumberOfPlayersExcluding.push(myplayerexclusions[n].value);
        }
        console.log("AddAGame handleSubmit: NEW nwgameobj = ", nwgameobj);
        setGameObject(nwgameobj);

        //take the new game object and call addGame(gameobj);
        addGame(nwgameobj);
    }
    
    function handleChange(event)
    {
        console.log("AddAGame handleChange: event.target = ", event.target);
        console.log("handleChange: event.target.value = " + event.target.value);
        console.log("handleChange: event.target.id = " + event.target.id);
        console.log("handleChange: OLD gameobj = ", gameobj);

        let nwgameobj = {...gameobj};
        nwgameobj.rules.basic = [...gameobj.rules.basic];
        nwgameobj.rules.vegasstyle = [...gameobj.rules.vegasstyle];
        nwgameobj.strategies=[...gameobj.strategies];

        console.log("handleChange: COPY OLD gameobj = ", nwgameobj);
        
        //do something with the value all we need is the key
        let objkey = "";
        const usenumber = ((event.target.id === "minnumplayers") || (event.target.id === "maxnumplayers") ||
            (event.target.id === "numdecks") || (event.target.id === "avnummins"));
        const usedrop = (event.target.id === "deck-type");
        
        if (event.target.id === "nwname") objkey = "name";
        else if (event.target.id === "nwurl") objkey = "image";
        else if (event.target.id === "nwimgdesc") objkey = "description";
        else if (event.target.id === "minnumplayers") objkey = "MinNumberOfPlayers";
        else if (event.target.id === "maxnumplayers") objkey = "MaxNumberOfPlayers";
        else if (event.target.id === "numdecks") objkey = "NumberOfDecks";
        else if (event.target.id === "avnummins") objkey = "AverageMinutes";
        else if (event.target.id === "deck-type") objkey = "KindOfDeck";
        else if (event.target.id === "other-deck-type" || event.target.id === "otherdecktype")
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

        if (usenumber) nwgameobj[objkey] = Number(event.target.value);
        else
        {
            const mytaglvs = new TagLevelsClass("");
            if (!usedrop && mytaglvs.screener({input: "" + event.target.value}))
            {
                console.error("handleChange: input (" + event.target.value +
                    ") has illegal characters in it!");
                console.log("changes aborted!");
                return;
            }
            else nwgameobj[objkey] = event.target.value;
            if (event.target.id === "other-deck-type" || event.target.id === "otherdecktype")
            {
                setMyOtherDeckType(event.target.value);
            }
            //else;//do nothing
        }
        console.log("handleChange: NEW nwgameobj = ", nwgameobj);

        setGameObject(nwgameobj);
    }
    
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

    const mytaglvs = new TagLevelsClass("");
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nwname" id="nwnamelbl">Game Name: </label>
            <input required={true} style={{width: "200px"}} id="nwname" type="text"
                placeholder="Game Name:" value={gameobj.name} onChange={handleChange} /><br />
            <label htmlFor="nwurl" id="nwurllbl">Image URL: </label>
            <input required={true} id="nwurl" style={{width: "400px"}} type="text"
                placeholder="Image URL: " value={gameobj.image} onChange={handleChange} /><br />
            <label htmlFor="nwimgdesc" id="nwimgdesclbl">Image Description: </label>
            <input id="nwimgdesc" type="text" style={{width: "400px"}} placeholder="Image Description: "
                value={gameobj.description} onChange={handleChange} /><br />
            <label htmlFor="minnumplayers" id="minnumplayerslbl">Minimum Number of Players: </label>
            <input required={true} id="minnumplayers" type="number" min="1" placeholder="0"
                 value={gameobj.MinNumberOfPlayers} onChange={handleChange} /><br />
            <label htmlFor="maxnumplayers" id="maxnumplayerslbl">Maximum Number of Players: </label>
            <input required={true} id="maxnumplayers" type="number" min="1" placeholder="0"
                value={gameobj.MaxNumberOfPlayers} onChange={handleChange} /><br />
            <ListOfNumbers label="Excluding Number of Players" myexs={myplayerexclusions}
                setMyExs={setMyPlayerExclusion} />
            <label htmlFor="numdecks" id="numdeckslbl">Number of Decks: </label>
            <input required={true} id="numdecks" type="number" min="0" placeholder="0"
                value={gameobj.NumberOfDecks} onChange={handleChange} /><br />
            <label htmlFor="avnummins" id="avnumminslbl">Average Number of Minutes: </label>
            <input required={true} id="avnummins" type="number" min="0" step="any" placeholder="0"
                value={gameobj.AverageMinutes} onChange={handleChange} /><br />
            <label htmlFor="deck-type" id="deck-typelbl">Deck Type: </label>
            <DeckTypeSelection gameobj={gameobj} handleChange={handleChange} mid=""
                myotherdecktype={myotherdecktype} />
            <GameFormRules type="rules" myrules={myrules} setMyRules={setMyRules}
                handleChange={mytaglvs.screener} />
            <GameFormRules type="strategies" myrules={mystrats} setMyRules={setMyStrategies}
                handleChange={mytaglvs.screener} />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default AddAGame;
