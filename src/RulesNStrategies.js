import React, { useState } from "react";
import './App.css';
import EditAGame from "./EditAGame";
import TagLevelsClass from "./TagLevelsClass";

function RulesNStrategies({games, gameobj, updateGame})
{
    if (games === undefined || games === null || games.length < 1)
    {
        throw new Error("there must be at least one game found!");
    }
    //else;//do nothing

    console.log("gameobj = ", gameobj);
    
    let myinitbasicrules = gameobj.rules.basic.map((rule) => "" + rule);
    let myinitvegasrules = gameobj.rules.vegasstyle.map((rule) => "" + rule);
    let myinitstrats = gameobj.strategies.map((strat) => "" + strat);

    const [basicrules, setBasicRules] = useState(myinitbasicrules);
    const [vegasrules, setVegasRules] = useState(myinitvegasrules);
    const [strats, setStrats] = useState(myinitstrats);
    
    const [editbasic, setEditBasic] = useState(false);
    const [editvegas, setEditVegas] = useState(false);
    const [editstrats, setEditStrats] = useState(false);
    const iseditingmode = (editbasic || editvegas || editstrats);
    
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
        const mytaglvs = new TagLevelsClass("");
        setSelTextDOMObj(mytaglvs.getSelectedTextAndDOMObj());
    }

    //this takes in and calls setState
    function getSelectedTextAndLoadFormatIn(event, isonblur = false)
    {
        if (iseditingmode);
        else return;

        console.log("isonblur = " + isonblur);
        if (isonblur === undefined || isonblur === null)
        {
            throw new Error("isonblur must be defined boolean variable, but it was not defined!");
        }
        else
        {
            if (isonblur === true || isonblur === false);
            else
            {
                throw new Error("isonblur must be defined boolean variable, but it was not a " +
                    "boolean variable!");
            }
        }

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
        const mytagclsobj = new TagLevelsClass("");
        if (isonblur)
        {
            myfinfmtdataobj = mytagclsobj.getFinalFormattedSelectedTextDataObj(seltxtdomobj, gameobj,
                null, basicrules, vegasrules, strats);
        }
        else
        {
            myfinfmtdataobj = mytagclsobj.getFinalFormattedSelectedTextDataObj(null, gameobj,
                null, basicrules, vegasrules, strats);
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

        
        const nwfmtobj = mytagclsobj.getNewFormatDataObj(myfinfmtdataobj, etgnd);
        console.log("nwfmtobj = ", nwfmtobj);
        

        let myrulesarr = null;
        if (myfinfmtdataobj.mytypestr === "basic") myrulesarr = basicrules;
        else if (myfinfmtdataobj.mytypestr === "vegas") myrulesarr = vegasrules;
        else if (myfinfmtdataobj.mytypestr === "strats") myrulesarr = strats;
        else throw new Error("invalid rule type was found and used here!");

        const ruleindx = myfinfmtdataobj.ruleindx;
        console.log("ruleindx = " + ruleindx);


        setMyFontData(nwfmtobj.nwfontdataobj);
        setTempSize(nwfmtobj.nwfontdataobj.size);

        if (nwfmtobj.gennwrule)
        {
            //take the rules array if the index matches.... use the new rule
            //else use the old rule
            let mynwrules = myrulesarr.map((rule, index) => (
                (index === ruleindx) ? nwfmtobj.nwruletxt : rule));
            if (myfinfmtdataobj.mytypestr === "basic") setBasicRules(mynwrules);
            else if (myfinfmtdataobj.mytypestr === "vegas") setVegasRules(mynwrules);
            else if (myfinfmtdataobj.mytypestr === "strats") setStrats(mynwrules);
            else throw new Error("invalid rule type was found and used here!");
        }
        //else;//do nothing

        if (isonblur) setSelTextDOMObj(null);
        //else;//do nothing
    }



    function genLisForBasicOrVegasRulesOrStats(userules, usebasic, useedit, arr)
    {
        let mytypestr = "";
        if (userules)
        {
            if (usebasic) mytypestr = "basic";
            else mytypestr = "vegas";
        }
        else mytypestr = "strats";

        const mytaglvs = new TagLevelsClass("");

        let mylis = null;
        if (useedit)
        {
            mylis = arr.map((rule, index) =>
                <ul key={"edit" + mytypestr + gameobj.name + index}>
                    <li key={"current" + mytypestr + gameobj.name + index}>
                        <textarea key={"current" + mytypestr + "rawtext" + gameobj.name + index}
                            id={"current" + mytypestr + "rawtext" + gameobj.name + index}
                            value={rule} style={{width: "1100px"}}
                            onChange={(event) => handleEditChange(event, userules, usebasic)} />
                    </li>
                    <li key={mytypestr + gameobj.name + index} id={mytypestr + gameobj.name + index}
                        dangerouslySetInnerHTML={
                            mytaglvs.generateAndCreateMarkUpForDisplayFrom(rule, false)} />
                </ul>
            );
        }
        else
        {
            mylis = arr.map((rule, index) =>
                <li key={mytypestr + gameobj.name + index} id={mytypestr + gameobj.name + index}
                    dangerouslySetInnerHTML={
                        mytaglvs.generateAndCreateMarkUpForDisplayFrom(rule, true)} />);
        }
        return mylis;
    }


    function changeEditingMode(event, userules, usebasic, nwstate = null)
    {
        console.log("CHANGE-EDIT-MODE: event.target = ", event.target);
        console.log("CHANGE-EDIT-MODE: userules = " + userules);
        console.log("CHANGE-EDIT-MODE: usebasic = " + usebasic);
        console.log("CHANGE-EDIT-MODE: nwstate = " + nwstate);
        console.log("CHANGE-EDIT-MODE: OLD editbasic = " + editbasic);
        console.log("CHANGE-EDIT-MODE: OLD editvegas = " + editvegas);
        console.log("CHANGE-EDIT-MODE: OLD editstrats = " + editstrats);

        if (userules)
        {
            if (usebasic) setEditBasic(!editbasic);
            else setEditVegas(!editvegas);
        }
        else setEditStrats(!editstrats);

        console.log("CHANGE-EDIT-MODE: NEW editbasic = " + editbasic);
        console.log("CHANGE-EDIT-MODE: NEW editvegas = " + editvegas);
        console.log("CHANGE-EDIT-MODE: NEW editstrats = " + editstrats);

        //state will still hold the previous state here because of the way I did it
        //I can figure out which one I changed then useing the other values
        //I can figure out if they changed to all being false

        let notediting = false;
        if (!editvegas && !editstrats && editbasic && usebasic && userules)
        {
            //one case where all are false
            notediting = true;
        }
        else if (editvegas && !editstrats && !editbasic && !usebasic && userules)
        {
            //another case where all are false
            notediting = true;
        }
        else if (!editvegas && editstrats && !editbasic && !userules)
        {
            //another case where all are false
            notediting = true;
        }
        //else;//do nothing at least one of them is true
        console.log("CHANGE-EDIT-MODE: notediting = " + notediting);

        if (notediting)
        {
            //now save all of the changes to state...
            //need to update the games object
            //also need to call setGames method
            //need access to it...
            //need to rebuild the games object before calling setGames
            //need to get all of the updates and then overrite state with the new rules...
            //need a way to add rules in editing mode...

            let nwgameobj = {...gameobj};
            console.log("CHANGE-EDIT-MODE: OLD nwgameobj = ", nwgameobj);
            console.log("CHANGE-EDIT-MODE: nwstate = " + nwstate);

            for (let k = 0; k < 2; k++)
            {
                let rtype = "";
                let myrulesarr = null;
                if (k === 0)
                {
                    rtype = "basic";
                    if (usebasic && userules && nwstate !== null) myrulesarr = nwstate;
                    else myrulesarr = basicrules;
                }
                else if (k === 1)
                {
                    rtype = "vegasstyle";
                    if (!usebasic && userules && nwstate !== null) myrulesarr = nwstate;
                    else myrulesarr = vegasrules;
                }
                else throw new Error("illegal value found and used for index k here!");

                if (nwgameobj.rules[rtype].length !== myrulesarr.length)
                {
                    const myoldruleslen = nwgameobj.rules[rtype].length;
                    for (let n = 0; n < myoldruleslen; n++) nwgameobj.rules[rtype].pop();
                    console.log("CHANGE-EDIT-MODE: NEW nwgameobj.rules[" + rtype + "] = ",
                        nwgameobj.rules[rtype]);

                    for (let n = 0; n < myrulesarr.length; n++)
                    {
                        nwgameobj.rules[rtype].push("" + myrulesarr[n]);
                    }
                }
                else
                {
                    for (let n = 0; n < myrulesarr.length; n++)
                    {
                        nwgameobj.rules[rtype][n] = "" + myrulesarr[n];
                    }
                }
                console.log("CHANGE-EDIT-MODE: FINAL nwgameobj.rules[" + rtype + "] = ",
                    nwgameobj.rules[rtype]);
            }//end of k for loop

            let myrulesarr = null;
            if (!usebasic && userules && nwstate !== null) myrulesarr = nwstate;
            else myrulesarr = strats;
            if (nwgameobj.strategies.length !== myrulesarr.length)
            {
                const myoldruleslen = nwgameobj.strategies.length;
                for (let n = 0; n < myoldruleslen; n++) nwgameobj.strategies.pop();
                console.log("CHANGE-EDIT-MODE: NEW nwgameobj.strategies = ", nwgameobj.strategies);

                for (let n = 0; n < myrulesarr.length; n++)
                {
                    nwgameobj.strategies.push("" + myrulesarr[n]);
                }
            }
            else
            {
                for (let n = 0; n < myrulesarr.length; n++)
                {
                    nwgameobj.strategies[n] = "" + myrulesarr[n];
                }
            }
            console.log("CHANGE-EDIT-MODE: FINAL nwgameobj.strategies = ", nwgameobj.strategies);
            console.log("FINAL nwgameobj = ", nwgameobj);
            //debugger;
            
            updateGame(nwgameobj);
        }
        //else;//do nothing
    }

    function handleEditChange(event, userules, usebasic)
    {
        console.log("event.target = ", event.target);
        console.log("event.target.id = " + event.target.id);
        console.log("event.target.value = ", event.target.value);
        console.log("userules = " + userules);
        console.log("usebasic = " + usebasic);

        let pidstrs = ["currentbasicrawtext", "currentvegasrawtext", "currentstratsrawtext"];
        let myidindx = -1;
        for (let n = 0; n < pidstrs.length; n++)
        {
            if (event.target.id.indexOf(pidstrs[n]) === 0)
            {
                myidindx = n;
                break;
            }
            //else;//do nothing
        }//end of n for loop
        console.log("myidindx = " + myidindx);

        if (myidindx < 0 || myidindx > pidstrs.length - 1)
        {
            throw new Error("illegal index found and used for the partial id string index!");
        }
        //else;//do nothing

        const fpidstr = pidstrs[myidindx] + gameobj.name;
        console.log("fpidstr = " + fpidstr);

        const midstr = event.target.id.substring(fpidstr.length);
        console.log("midstr = " + midstr);

        if (midstr === undefined || midstr === null || isNaN(midstr))
        {
            throw new Error("illegal id found and used for the edit text rule object!");
        }
        //else;//do nothing

        const mynumid = Number(midstr);
        let mystatearr = null;
        if (userules)
        {
            if (usebasic) mystatearr = basicrules;
            else mystatearr = vegasrules;
        }
        else mystatearr = strats;

        const mytaglvs = new TagLevelsClass("");
        if (mytaglvs.screener({input: event.target.value}))
        {
            console.error("attempted to enter invalid HTML input stopped!");
            console.log("changes aborted!");
            return;
        }
        //else;//do nothing safe to proceed

        let mynwrules = mystatearr.map((rule, index) => {
            if (index === mynumid) return event.target.value;
            else return rule;
        });
        
        if (userules)
        {
            if (usebasic) setBasicRules(mynwrules);
            else setVegasRules(mynwrules);
        }
        else setStrats(mynwrules);
    }

    function handleAddRuleClick(event, userules, usebasic)
    {
        console.log("event.target = ", event.target);
        console.log("userules = " + userules);
        console.log("usebasic = " + usebasic);

        let myrulesarr = null;
        if (userules)
        {
            if (usebasic) myrulesarr = basicrules;
            else myrulesarr = vegasrules;
        }
        else myrulesarr = strats;

        let mynwrules = [...myrulesarr, ""];
        if (userules)
        {
            if (usebasic) setBasicRules(mynwrules);
            else setVegasRules(mynwrules);
        }
        else setStrats(mynwrules);
    }

    function cancelChangesClick(event, userules, usebasic)
    {
        console.log("CANCEL-CHANGES: event.target = ", event.target);
        console.log("CANCEL-CHANGES: event.target.id = " + event.target.id);
        console.log("CANCEL-CHANGES: event.target.value = ", event.target.value);
        console.log("CANCEL-CHANGES: userules = " + userules);
        console.log("CANCEL-CHANGES: usebasic = " + usebasic);
        console.log("CANCEL-CHANGES: OLD basicrules = ", basicrules);
        console.log("CANCEL-CHANGES: OLD vegasrules = ", vegasrules);
        console.log("CANCEL-CHANGES: OLD strats = ", strats);

        //using the booleans we can determine which one it is and reset it
        let myarr = null;
        if (userules)
        {
            if (usebasic) myarr = gameobj.rules.basic;
            else myarr = gameobj.rules.vegasstyle;
        }
        else myarr = gameobj.strategies;

        const mynwrls = myarr.map((rule) => "" + rule);
        console.log("CANCEL-CHANGES: mynwrls = ", mynwrls);
        
        if (userules)
        {
            if (usebasic) setBasicRules(mynwrls);
            else setVegasRules(mynwrls);
        }
        else setStrats(mynwrls);

        console.log("CANCEL-CHANGES: changes cleared!");

        changeEditingMode(event, userules, usebasic, mynwrls);
    }

    //when clicking the edit button we show a list of lis for each list of text areas or input texts
    //these let you directly provide or view the encoding

    let mybasicrulelis = genLisForBasicOrVegasRulesOrStats(true, true, false, gameobj.rules.basic);
    let myvegasrulelis = genLisForBasicOrVegasRulesOrStats(true, false, false, gameobj.rules.vegasstyle);
    let mystratlis = genLisForBasicOrVegasRulesOrStats(false, false, false, gameobj.strategies);

    console.log("basicrules = ", basicrules);
    console.log("myinitbasicrules = ", myinitbasicrules);
    
    let mybasicruleeditlis = genLisForBasicOrVegasRulesOrStats(true, true, true, basicrules);
    let myvegasruleeditlis = genLisForBasicOrVegasRulesOrStats(true, false, true, vegasrules);
    let mystratsruleeditlis = genLisForBasicOrVegasRulesOrStats(false, false, true, strats);

    console.log("EDIT-MODE: editbasic = " + editbasic);
    console.log("EDIT-MODE: editvegas = " + editvegas);
    console.log("EDIT-MODE: editstrats = " + editstrats);
    console.log("EDIT-MODE: " + iseditingmode);

    return (
        <div>
            <h1>Rules And Strategies For <u>{gameobj.name}</u>:</h1>
            <h3>{iseditingmode ? "Editing" : "Viewing"} Mode: {iseditingmode ? (
                <EditAGame mid={gameobj.id} mydataobj={myfontdata} setMyDataObj={setMyFontData}
                    refresh={handleMouseUp} sizefocus={onFocusHandler} sizeblur={onBlurHandler}
                    tempsize={tempsize} setTempSize={setTempSize} colors={colors} setColors={setColors} />
                ) : null}</h3>
            <div onMouseUp={handleMouseUp}>
                <details>
                    <summary>Rules:</summary>
                    <p>Basic:<button
                        onClick={(event) => changeEditingMode(event, true, true, null)}>
                            {editbasic ? "Save" : "Edit"} Basic Rules</button>
                        {iseditingmode ? <button onClick={
                            (event) => cancelChangesClick(event, true, true)}>
                            Cancel Changes For Basic Rules</button> : null}
                    </p>
                    <ul>{editbasic ? mybasicruleeditlis : mybasicrulelis}</ul>
                    {editbasic ? <button onClick={(event) => handleAddRuleClick(event, true, true)}>
                        Add Basic Rule</button> : null}
                    <p>Vegas Style:<button
                        onClick={(event) => changeEditingMode(event, true, false, null)}>
                            {editvegas ? "Save" : "Edit"} Vegas Style Rules</button>
                        {iseditingmode ? <button onClick={
                            (event) => cancelChangesClick(event, true, false)}>
                            Cancel Changes For Vegas Rules</button> : null}
                    </p>
                    <ul>{editvegas ? myvegasruleeditlis : myvegasrulelis}</ul>
                    {editvegas ? <button onClick={(event) => handleAddRuleClick(event, true, false)}>
                        Add Vegas Rule</button> : null}
                </details>
                <details>
                    <summary>Strategies:<button
                        onClick={(event) => changeEditingMode(event, false, false, null)}>
                            {editstrats ? "Save" : "Edit"} Strategies</button>
                        {iseditingmode ? <button onClick={
                            (event) => cancelChangesClick(event, false, false)}>
                            Cancel Changes For Strategies</button> : null}
                    </summary>
                    <ul>{editstrats ? mystratsruleeditlis : mystratlis}</ul>
                    {editstrats ? <button onClick={(event) => handleAddRuleClick(event, false, false)}>
                        Add Strategy</button> : null}
                </details>
            </div>
        </div>
    );
}

export default RulesNStrategies;
