import React, { useState } from "react";
import TagLevelsClass from './TagLevelsClass';
import EditAGame from "./EditAGame";

function GameSetup({games, gameobj, updateGame})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);

    if (gameobj === undefined || gameobj === null)
    {
        throw new Error("game object is required and must not be null!");
    }
    //else;//do nothing

    const imgsrc = gameobj.image;
    const name = gameobj.name;
    
    console.log("imgsrc = " + imgsrc);
    console.log("name = " + name);

    if (imgsrc === undefined || imgsrc === null || imgsrc.length < 1 ||
        name === undefined || name === null || name.length < 1)
    {
        throw new Error("both the name and imgsrc attributes/props are required!");
    }
    //else;//do nothing


    const [editMode, setEditMode] = useState(false);
    const [mytemimgurldesc, setTempImgURLAndDescObj] = useState({
        image: "" + gameobj.image,
        description: "" +
            ((gameobj.description === undefined || gameobj.description === null) ? "" : gameobj.description)
    });

    const mytaglvsobj = new TagLevelsClass("");

    const [seltxtdomobj, setSelTextDOMObj] = useState(null);
    const [tempsize, setTempSize] = useState(mytaglvsobj.getDefaultFontDataObject().size);
    const [colors, setColors] = useState(["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#0000FF",
        "#4B0082", "#7F00FF", "#000000", "#FFFFFF"]);

    const [myfontdata, setMyFontData] = useState(mytaglvsobj.getDefaultFontDataObject());
    

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

    //this calls setState method
    function loadDefaults()
    {
        let mycpdefaultfontobj = mytaglvsobj.getDefaultFontDataObject();
        setMyFontData(mycpdefaultfontobj);
    }

    //this calls a method that takes in state
    function handleMouseUp(event)
    {
        getSelectedTextAndLoadFormatIn(event, false);
    }

    //this calls a method that takes in state
    function onBlurHandler(event)
    {
        getSelectedTextAndLoadFormatIn(event, true);
    }

    //this calls setState method
    function onFocusHandler(event)
    {
        setSelTextDOMObj(mytaglvsobj.getSelectedTextAndDOMObj());
    }

    //this takes in and calls setState
    //variable must be a boolean
    function getSelectedTextAndLoadFormatIn(event, isonblur = false)
    {
        if (editMode);
        else return;

        console.log("isonblur = " + isonblur);
        mytaglvsobj.varMustBeDefinedBool(isonblur, "isonblur");

        let etgnd = null;
        if (event === undefined || event === null);
        else
        {
            console.log("event.target = ", event.target);
            console.log("event.target.id = ", event.target.id);
            if (event.target.id === null || event.target.id === undefined ||
                event.target.id.toString().length < 1)
            {
                if (event.target.tagName === "B" || event.target.tagName === "U" ||
                    event.target.tagName === "I")
                {
                    console.log("event.target.parentNode = ", event.target.parentNode);
                    console.log("event.target.parentNode.value = ", event.target.parentNode.value);
                    //log state here...
                    etgnd = event.target.parentNode;
                    console.log("myfontdata = ", myfontdata);
                }
                else if (event.target.tagName === "BUTTON")
                {
                    console.log("button clicked, but no id!");
                    return;
                }
                else
                {
                    console.log("no id!");
                }
            }
            else
            {
                console.log("this has an id!");

                etgnd = event.target;
            }
            console.log("etgnd = ", etgnd);
            
            if (etgnd === undefined || etgnd === null);
            else
            {
                console.log("etgnd.id = ", etgnd.id);
                console.log("event.target.value = ", event.target.value);
            }
            if (isonblur) console.log("seltxtdomobj = ", seltxtdomobj);
            //else;//do nothing
            //debugger;
        }
        
        let myfinfmtdataobj = null;
        if (isonblur)
        {
            myfinfmtdataobj = mytaglvsobj.getFinalFormattedSelectedTextDataObj(seltxtdomobj, gameobj,
                mytemimgurldesc.description, null, null, null);
        }
        else
        {
            myfinfmtdataobj = mytaglvsobj.getFinalFormattedSelectedTextDataObj(null, gameobj,
                mytemimgurldesc.description, null, null, null);
        }
        console.log("myfinfmtdataobj = ", myfinfmtdataobj);

        if (myfinfmtdataobj === undefined || myfinfmtdataobj === null)
        {
            console.log("no selected text!");
            loadDefaults();
            return;
        }
        //else;//do nothing safe to proceed

        console.log("myfinfmtdataobj.finfmtseltextstr.length = " +
            myfinfmtdataobj.finfmtseltextstr.length);
        console.log("myfinfmtdataobj.fmtseltextstr.length = " + myfinfmtdataobj.fmtseltextstr.length);

        const fmtdifflen = myfinfmtdataobj.finfmtseltextstr.length - myfinfmtdataobj.fmtseltextstr.length;
        console.log("fmtdifflen = " + fmtdifflen);

        
        const nwfmtobj = mytaglvsobj.getNewFormatDataObj(myfinfmtdataobj, etgnd);
        console.log("nwfmtobj = ", nwfmtobj);
        

        //let myrulesarr = null;
        //if (myfinfmtdataobj.mytypestr === "basic") myrulesarr = basicrules;
        //else if (myfinfmtdataobj.mytypestr === "vegas") myrulesarr = vegasrules;
        //else if (myfinfmtdataobj.mytypestr === "strats") myrulesarr = strats;
        //else throw new Error("invalid rule type was found and used here!");

        const ruleindx = myfinfmtdataobj.ruleindx;
        console.log("ruleindx = " + ruleindx);


        setMyFontData(nwfmtobj.nwfontdataobj);
        setTempSize(nwfmtobj.nwfontdataobj.size);

        if (nwfmtobj.gennwrule)
        {
            //take the rules array if the index matches.... use the new rule
            //else use the old rule
            //let mynwrules = myrulesarr.map((rule, index) => (
            //    (index === ruleindx) ? nwfmtobj.nwruletxt : rule));
            //if (myfinfmtdataobj.mytypestr === "basic") setBasicRules(mynwrules);
            //else if (myfinfmtdataobj.mytypestr === "vegas") setVegasRules(mynwrules);
            //else if (myfinfmtdataobj.mytypestr === "strats") setStrats(mynwrules);
            //else throw new Error("invalid rule type was found and used here!");
            
            let nwdescobj = {...mytemimgurldesc};
            nwdescobj.description = nwfmtobj.nwruletxt;
            setTempImgURLAndDescObj(nwdescobj);
        }
        //else;//do nothing

        if (isonblur) setSelTextDOMObj(null);
        //else;//do nothing
    }


    function changeEditingMode(nwstate = null)
    {
        console.log("editMode = " + editMode);
        
        if (editMode)
        {
            //do a lot to exit the editing mode...
            //take the data from the state variables or from nwstate and
            //load it into a new game object then update the game on the server
            console.log("nwstate = ", nwstate);

            let nwgameobj = {...gameobj};
            nwgameobj.rules.basic = [...gameobj.rules.basic];
            nwgameobj.rules.vegasstyle = [...gameobj.rules.vegasstyle];
            nwgameobj.strategies=[...gameobj.strategies];
            nwgameobj.NumberOfPlayersExcluding = gameobj.NumberOfPlayersExcluding.map((val) => val);

            if (nwstate === undefined || nwstate === null)
            {
                //safe to copy from state
                console.log("safe to copy the data from the state variable!");

                nwgameobj.image = "" + mytemimgurldesc.image;
                nwgameobj.description = "" + mytemimgurldesc.description;
            }
            else
            {
                //must copy from nwstate
                console.log("NOT safe to copy the data from the state variable! MUST COPY FROM nwstate!");
                
                nwgameobj.image = "" + nwstate.image;
                nwgameobj.description = "" + nwstate.description;
            }
            console.log("nwgameobj = ", nwgameobj);
            //debugger;

            updateGame(nwgameobj);
        }
        //else;//do nothing

        setEditMode(!editMode);
    }

    function cancelChangesClick(event)
    {
        console.log("event.target = ", event.target);
        
        //revert the state variables then save it in editing mode
        let nwstate = {...gameobj};
        console.log("nwstate = ", nwstate);

        if (nwstate === undefined || nwstate === null) throw new Error("nwstate must be defined!");
        //else;//do nothing

        changeEditingMode(nwstate);
    }

    function handleEditSaveClick(event)
    {
        console.log("event.target = ", event.target);
        
        changeEditingMode(null);
    }

    function handleChange(event)
    {
        console.log("event.target = ", event.target);
        console.log("event.target.id = " + event.target.id);
        console.log("event.target.value = " + event.target.value);
        //debugger;

        let objkey = "";
        if (event.target.id.indexOf("editimgurl") === 0) objkey = "image";
        else if (event.target.id.indexOf("editimgdesc") === 0) objkey = "description";
        else
        {
            throw new Error("handleChange: NEED TO DO SOMETHING HERE TO HANDLE THE ID (" +
                event.target.id + ")!");
        }

        let nwpimgurlanddesc = {...mytemimgurldesc};
        const mytaglvs = new TagLevelsClass("");
        if (mytaglvs.screener({input: "" + event.target.value}))
        {
            console.error("handleChange: input (" + event.target.value + ") has illegal characters in it!");
            console.log("changes aborted!");
            return;
        }
        else nwpimgurlanddesc[objkey] = event.target.value;
        console.log("handleChange: NEW nwpimgurlanddesc = ", nwpimgurlanddesc);

        setTempImgURLAndDescObj(nwpimgurlanddesc);
    }

    let description = "";
    let usedefaultdesc = false;
    if (mytemimgurldesc.description === undefined || mytemimgurldesc.description === null ||
        mytemimgurldesc.description.length < 1)
    {
        description = "This shows the general setup of the game: " + name + ".";
        usedefaultdesc = true;
    }
    else description = mytemimgurldesc.description;
    console.log("description = " + description);
    console.log("usedefaultdesc = " + usedefaultdesc);

    return (
        <div className="App" style={{backgroundColor: "orange"}}>
            <h1>{name} Game Setup:</h1>
            <h3><b>{editMode ? "Editing" : "Viewing"} Mode: </b>
            {editMode ? (
                <EditAGame mid={gameobj.id} mydataobj={myfontdata} setMyDataObj={setMyFontData}
                    refresh={handleMouseUp} sizefocus={onFocusHandler} sizeblur={onBlurHandler}
                    tempsize={tempsize} setTempSize={setTempSize} colors={colors} setColors={setColors} />
                ) : null}</h3>
            <p><button id={"switchmodebtn" + gameobj.id} onClick={handleEditSaveClick}>
                    {editMode ? "Save Changes" : "Edit These"}</button>
                {editMode ? (<button id={"cancelbtn" + gameobj.id}
                    onClick={cancelChangesClick}>Cancel Changes</button>) : null}</p>
            {editMode ? (<>
                <textarea id={"editimgurl" + gameobj.id} value={mytemimgurldesc.image}
                    style={{width: "1200px"}} onChange={handleChange} />
                    <img src={mytemimgurldesc.image} alt={name + " setup"} /></>
                ) : <img src={mytemimgurldesc.image} alt={name + " setup"} />}
            {editMode ? <div onMouseUp={handleMouseUp}>
                <textarea id={"editimgdesc" + gameobj.id} value={description} style={{width: "1200px"}}
                    onChange={handleChange} />
                <p id={"imgdesc" + gameobj.id} dangerouslySetInnerHTML={
                    mytaglvsobj.generateAndCreateMarkUpForDisplayFrom(description, true)} /></div> :
                (usedefaultdesc ? <p id={"imgdesc" + gameobj.id}>{description}</p> :
                <p id={"imgdesc" + gameobj.id} dangerouslySetInnerHTML={
                    mytaglvsobj.generateAndCreateMarkUpForDisplayFrom(description, true)} />)}
        </div>
    );
}

export default GameSetup;
