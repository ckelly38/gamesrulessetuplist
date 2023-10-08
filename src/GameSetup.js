import React, { useState } from "react";
import TagLevelsClass from './TagLevelsClass';

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
    let usedefaultdesc = true;//should be false;
    //but to fix rendering problems due to heirarchy problems temporarily set to true.
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
        <div className="App">
            <h1>{name} Game Setup:</h1>
            <h3><b>{editMode ? "Editing" : "Viewing"} Mode: </b>
                <button id={"switchmodebtn" + gameobj.id} onClick={handleEditSaveClick}>
                    {editMode ? "Save Changes" : "Edit These"}</button>
                {editMode ? (<button id={"cancelbtn" + gameobj.id}
                    onClick={cancelChangesClick}>Cancel Changes</button>) : null}
            </h3>
            {editMode ? (<>
                <textarea id={"editimgurl" + gameobj.id} value={mytemimgurldesc.image}
                    style={{width: "1200px"}} onChange={handleChange} />
                    <img src={mytemimgurldesc.image} alt={name + " setup"} /></>
                ) : <img src={mytemimgurldesc.image} alt={name + " setup"} />}
            {editMode ? <textarea id={"editimgdesc" + gameobj.id} value={description}
                style={{width: "1200px"}} onChange={handleChange} /> : (usedefaultdesc ?
                <p>{description}</p> : <p dangerouslySetInnerHTML={description} />)}
        </div>
    );
}

export default GameSetup;
