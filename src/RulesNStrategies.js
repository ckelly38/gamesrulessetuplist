import React, { useEffect, useState } from "react";
import './App.css';
import EditAGame from "./EditAGame";
import TagLevelsClass from "./TagLevelsClass";

function RulesNStrategies({games, gameobj, screener, updateGame})
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

    //const [selectedtext, setSelectedText] = useState("" + window.getSelection().toString());

    const iseditingmode = (editbasic || editvegas || editstrats);
    

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

    function handleSelectionChange(event)
    {
        console.log("event = ", event);
        console.log("event.target.id = " + event.target.id);
        console.log("event.target.value = " + event.target.value);
        console.log("event.target.selectionStart = " + event.target.selectionStart);
        console.log("event.target.selectionEnd = " + event.target.selectionEnd);
        
        const myseltext = event.target.value.substring(event.target.selectionStart,
            event.target.selectionEnd);
        
        console.log("myseltext = \"" + myseltext + "\"");

        //this will always be raw text
        //domnd is the event.target
        //the rule text is event.target.value
        
        debugger;
        throw new Error("NOT DONE YET 9-27-2023 2:50 AM!");
    }

    function handleMouseUp(event)
    {
        console.log("event = ", event);
        console.log("event.target = ", event.target);
        
        let myselect = window.getSelection();
        let docselect = document.selection;
        let usedocselect = false;
        console.log("myselect = ", myselect);
        console.log("docselect = ", docselect);
        
        if (myselect === undefined || myselect === null || myselect.toString().length < 1)
        {
            if (docselect === undefined || docselect === null) return;
            else
            {
                if (docselect.createRange().text.length < 1) return;
                else usedocselect = true;
            }
        }
        //else;//do nothing safe to proceed below

        let myseltext = null;
        let mydomnd = null;
        if (usedocselect)
        {
            myseltext = docselect.createRange().text;
            mydomnd = docselect.anchorNode.parentNode;
        }
        else
        {
            myseltext = myselect.toString();
            mydomnd = myselect.anchorNode.parentNode;
        }
        console.log("myseltext = " + myseltext);
        console.log("mydomnd = ", mydomnd);
        console.log("mydomnd.id = " + mydomnd.id);

        while (mydomnd.id === undefined || mydomnd.id === null || mydomnd.id.length < 1)
        {
            mydomnd = mydomnd.parentNode;
            console.log("NEW mydomnd = ", mydomnd);
            console.log("NEW mydomnd.id = " + mydomnd.id);

            if (mydomnd.tagName === "body") throw new Error("no DOM node with an id was found!");
            //else;//do nothing
        }
        console.log("FINAL mydomnd = ", mydomnd);
        console.log("FINAL mydomnd.id = " + mydomnd.id);

        //use the event target to get the dom node to get the rule index to get the rule
        //or we could use the selection to get the dom node to get the rule index to get the rule

        //unless it is in the raw text, if it is the rendered version, it will be text only,
        //styleing info will not be visible or even part of it

        //we always want to use the selected text to determine against the raw text
        //unless we are on the raw text
        const myrulestratstypes = ["basic", "vegas", "strats"];
        
        //the id is in this format: "current" + mytypestr + "rawtext" + gameobj.name + index
        let mybeginsrawidstrs = [];
        for (let k = 0; k < myrulestratstypes.length; k++)
        {
            mybeginsrawidstrs[k] = "current" + myrulestratstypes[k] + "rawtext" + gameobj.name;
        }
        
        //the id is in this format: mytypestr + gameobj.name + index
        let mybeginsdispidstrs = [];
        for (let k = 0; k < myrulestratstypes.length; k++)
        {
            mybeginsdispidstrs[k] = myrulestratstypes[k] + gameobj.name;
        }

        let israwtext = false;
        let myrawidindx = -1;
        for (let k = 0; k < mybeginsrawidstrs.length; k++)
        {
            let myindx = mydomnd.id.indexOf(mybeginsrawidstrs[k]);
            //console.log("myindx = " + myindx);

            if (myindx === 0)
            {
                myrawidindx = k;
                israwtext = true;
                break;
            }
            //else;//do nothing
        }
        console.log("israwtext = " + israwtext);
        console.log("myrawidindx = " + myrawidindx);
        
        let mydispidindx = -1;
        for (let k = 0; k < mybeginsdispidstrs.length; k++)
        {
            let myindx = mydomnd.id.indexOf(mybeginsdispidstrs[k]);
            //console.log("myindx = " + myindx);

            if (myindx === 0)
            {
                mydispidindx = k;
                break;
            }
            //else;//do nothing
        }
        console.log("mydispidindx = " + mydispidindx);

        if (israwtext)
        {
            if (myrawidindx < 0 || myrawidindx > mybeginsrawidstrs.length - 1)
            {
                throw new Error("invalid value found and used for the myrawidindx index!");
            }
            //else;//do nothing

            if (mydispidindx < 0 || mydispidindx > mybeginsdispidstrs.length - 1);
            else
            {
                throw new Error("invalid value found and used for the mydispidindx index!");
            }
        }
        else
        {
            if (myrawidindx < 0 || myrawidindx > mybeginsrawidstrs.length - 1);
            else
            {
                throw new Error("invalid value found and used for the myrawidindx index!");
            }

            if (mydispidindx < 0 || mydispidindx > mybeginsdispidstrs.length - 1)
            {
                throw new Error("invalid value found and used for the mydispidindx index!");
            }
            //else;//do nothing
        }
        
        let mypartidstr = null;
        if (israwtext) mypartidstr = mybeginsrawidstrs[myrawidindx];
        else mypartidstr = mybeginsdispidstrs[mydispidindx];
        console.log("mypartidstr = " + mypartidstr);

        const myruleidnumstr = mydomnd.id.substring(mypartidstr.length);
        console.log("myruleidnumstr = " + myruleidnumstr);

        if (myruleidnumstr.length < 1 || isNaN(myruleidnumstr))
        {
            throw new Error("illegal value found and used for the rule index here!");
        }
        //else;//do nothing

        let mytypestr = null;
        if (israwtext) mytypestr = myrulestratstypes[myrawidindx];
        else mytypestr = myrulestratstypes[mydispidindx];
        console.log("mytypestr = " + mytypestr);

        const ruleindx = Number(myruleidnumstr);
        console.log("ruleindx = " + ruleindx);

        let myrulesarr = null;
        if (mytypestr === "basic") myrulesarr = basicrules;
        else if (mytypestr === "vegas") myrulesarr = vegasrules;
        else if (mytypestr === "strats") myrulesarr = strats;
        else throw new Error("invalid rule type was found and used here!");

        const myruletext = myrulesarr[ruleindx];
        console.log("myruletext = " + myruletext);

        if (israwtext)
        {
            //best case position for selection is absolute
            //the rule text is mydomnd.textContent
        }
        else
        {
            //worst case, positions need to be recalculated
            //and we need to be careful if it contains formatting code around it
            //it would be nice if starting positions line up... cannot be guranteed...
            //word count would hold if formatting code is skipped...
            //the rules and strats come in from state and from the gameobj
        }

        debugger;
        throw new Error("NOT DONE YET 9-27-2023 2:50 AM!");
    }

    function generateMarkUpForDisplayFromRule(rule)
    {
        //need some way of Bolding, Underlining, Italicizing, Changing the Font Color, Changing the Font,
        //adding a new line like both br and p
        //How about /b /i /u /br /p /span
        //when the next character is r use ///b
        // /style font-family: name; font-size: #####px; color: name or hexvalue or rgb(r,g,b,a) /style
        //and pair them like html except for br is auto closed

        //be careful with b and br
        //be careful with i and onto/into
        //be careful with onto/unto
        //be careful with post/patch
        //if we have // ignores the escape character
        
        //how to let them change the font name...
        //usually basic drop down with the values...?
        //that is not what we will be doing here...

        console.log("genmarkup: rule = " + rule);

        if (rule === undefined || rule === null) return null;
        else if (rule.length < 1) return "";
        //else;//do nothing

        if (screener({input: "" + rule}))
        {
            //revert to orig
            console.error("No HTML!");
            alert("HTML forbidden here!");
            throw new Error("No HTML allowed!");
        }
        //else;//do nothing safe

        
        const mytaglvs = new TagLevelsClass(rule);


        //we can see anyone above, but the style must be after one of them.
        let mytagis = mytaglvs.getAllTagIndexes(rule);
        console.log("genmarkup: mytagis = ", mytagis);
        
        let mytags = mytaglvs.getAllTags(rule, mytagis);
        console.log("genmarkup: mytags = ", mytags);

        let stis = mytaglvs.getStartingOrEndingTagIndexes(rule, mytagis, true);
        console.log("genmarkup: stis = ", stis);
        
        let etis = mytaglvs.getStartingOrEndingTagIndexes(rule, mytagis, false);
        console.log("genmarkup: etis = ", etis);

        for (let n = 0; n < mytagis.length; n++)
        {
            let pairi = mytaglvs.getTagPairIndex(rule, mytagis[n], mytagis);
            console.log("genmarkup call 1: pair tag index for indx (" + mytagis[n] + ") = " + pairi);

            if (pairi < 0 || (pairi > rule.length - 1 && rule.length > 0) || rule.length === 0)
            {
                throw new Error("the tag found at index " + mytagis[n] + " has an invalid pair index!");
            }
            //else;//do nothing
            
            let opairi = mytaglvs.getTagPairIndex(rule, pairi, mytagis);
            console.log("genmarkup call 2: pair tag index for indx (" + mytagis[n] + ") = " + pairi);
            console.log("genmarkup: pair tag index for indx (" + pairi + ") = " + opairi);
            if (mytagis[n] === opairi);
            else throw new Error("the indexes for the pairs must match up, but they did not!");
        }

        //console.log(mytaglvs.getLevelsDisplayStrs([1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,6,6,6,
        //    7,7,7,8,8,8,9,9,9,10,100,10,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,4,4,4,4,3,3,3,3,3,2,2,2,2,2,
        //    1,1,1,1,1]));

        //console.log(mytaglvs.getLevelsAndDisplayStrs(rule, mytagis));

        if (mytaglvs.isValidTagsMarkup(rule, mytagis));
        else
        {
            //run the code again and get the error message and then do something about it...
            //open the editing mode...
            throw new Error("Markup Not Valid!");
        }

        let rulemkup = "";
        const otag = "<";
        const ctag = "</";
        for (let i = 0; i < rule.length; i++)
        {
            if (rule.charAt(i) === "/")
            {
                console.log("found the forward slash at i = " + i + "!");
                console.log("OLD rulemkup = " + rulemkup);
                if (i + 1 < rule.length)
                {
                    if (rule.charAt(i + 1) === "/")
                    {
                        let renesc = false;
                        if (i + 3 < rule.length)
                        {
                            if (rule.charAt(i + 2) === "/")
                            {
                                if (rule.charAt(i + 3) === "b")
                                {
                                    //render the bold here
                                    //style can also be inside of this
                                    console.log("render the bold here at i = " + i + "!");

                                    let tagstr = "";
                                    if (mytaglvs.isTagIndexOnListOfIndexes(rule, i, stis))
                                    {
                                        tagstr = "" + otag;
                                    }
                                    else tagstr = "" + ctag;
                                    console.log("tagstr = " + tagstr);

                                    rulemkup += tagstr + rule.charAt(i + 3) + ">";
                                    i += 3;
                                }
                                else renesc = true;
                            }
                            else renesc = true;
                        }
                        else renesc = true;

                        if (renesc)
                        {
                            //just render the escape character
                            console.log("render the escape character at i = " + i + "!");
                            rulemkup += rule.charAt(i);
                            i++;
                        }
                        //else;//do nothing
                    }
                    else if (rule.charAt(i + 1) === "i" || rule.charAt(i + 1) === "u" ||
                        rule.charAt(i + 1) === "p")
                    {
                        //render the italics or under line here
                        console.log("render the italics or underline or p at i = " + i + "!");
                        
                        //need to know which kind opening or closing tag to render
                        //style can be inside any of these too
                        
                        let tagstr = "";
                        if (mytaglvs.isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
                        else tagstr = "" + ctag;
                        console.log("tagstr = " + tagstr);

                        rulemkup += tagstr + rule.charAt(i + 1) + ">";
                        i++;
                    }
                    else if (rule.charAt(i + 1) === "b")
                    {
                        let rendbld = false;
                        if (i + 2 < rule.length)
                        {
                            if (rule.charAt(i + 2) === "r")
                            {
                                //render the new line here
                                console.log("render the new line here at i = " + i + "!");
                                rulemkup += "<br />";
                                i += 2;
                            }
                            else rendbld = true;
                        }
                        else rendbld = true;

                        if (rendbld)
                        {
                            //render the bold here
                            //style can also be inside of this
                            console.log("render the bold here at i = " + i + "!");

                            let tagstr = "";
                            if (mytaglvs.isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
                            else tagstr = "" + ctag;
                            console.log("tagstr = " + tagstr);

                            rulemkup += tagstr + rule.charAt(i + 1) + ">";
                            i++;
                        }
                        //else;//do nothing
                    }
                    else if (rule.charAt(i + 1) === "s")
                    {
                        let temptagnm = "";
                        if (i + 5 < rule.length)
                        {
                            if (rule.charAt(i + 2) === "t")
                            {
                                if (i + 6 < rule.length) temptagnm = rule.substring(i, i + 6);
                                else temptagnm = rule.substring(i);
                                //console.log("temptagnm = " + temptagnm);

                                if (temptagnm === "/style")
                                {
                                    console.log("render the style tag here at i = " + i + "!");
                                    if (mytaglvs.isTagIndexOnListOfIndexes(rule, i, stis))
                                    {
                                        let pi = mytaglvs.getTagPairIndex(rule, i, mytagis);
                                        console.log("pi = " + pi);

                                        if (pi < i || pi > rule.length - 1)
                                        {
                                            throw new Error("illegal value found and used for the pair " +
                                                "index for the style tag found at index i = " + i + "!");
                                        }
                                        //else;//do nothing

                                        rulemkup = rulemkup.substring(0, rulemkup.length - 1) +
                                            " style=\"" + rule.substring(i + 6, pi).trimStart().trim() +
                                            '"' + rulemkup.substring(rulemkup.length - 1);
                                        i = pi + 5;
                                    }
                                    else
                                    {
                                        console.log("this tag was already rendered with its pair!");
                                    }
                                }
                            }
                            else if (rule.charAt(i + 2) === "p")
                            {
                                if (i + 5 < rule.length) temptagnm = rule.substring(i, i + 5);
                                else temptagnm = rule.substring(i);
                                //console.log("temptagnm = " + temptagnm);

                                if (temptagnm === "/span")
                                {
                                    console.log("render the span tag here at i = " + i + "!");
                                    let tagstr = "";
                                    if (mytaglvs.isTagIndexOnListOfIndexes(rule, i, stis))
                                    {
                                        tagstr = "" + otag;
                                    }
                                    else tagstr = "" + ctag;
                                    console.log("tagstr = " + tagstr);

                                    rulemkup += tagstr + "span>";
                                    i += 4;
                                }
                                //else;//do nothing
                            }
                            //else;//do nothing
                        }
                        else if (i + 5 === rule.length)
                        {
                            if (rule.charAt(i + 2) === "p")
                            {
                                if (i + 5 < rule.length) temptagnm = rule.substring(i, i + 5);
                                else temptagnm = rule.substring(i);
                                //console.log("temptagnm = " + temptagnm);

                                if (temptagnm === "/span")
                                {
                                    console.log("render the span tag here at i = " + i + "!");
                                    let tagstr = "";
                                    if (mytaglvs.isTagIndexOnListOfIndexes(rule, i, stis))
                                    {
                                        tagstr = "" + otag;
                                    }
                                    else tagstr = "" + ctag;
                                    console.log("tagstr = " + tagstr);

                                    rulemkup += tagstr + "span>";
                                    i += 4;
                                }
                                //else;//do nothing
                            }
                            //else;//do nothing
                        }
                        //else;//do nothing
                    }
                    //else;//do nothing
                }
                //else;//do nothing
                console.log("NEW rulemkup = " + rulemkup);
            }
            else rulemkup += rule.charAt(i);
        }//end of i for loop
        console.log("FINAL rulemkup = " + rulemkup);

        return rulemkup;
    }

    function createMarkUp(content)
    {
        return {__html: "" + content};
    }

    function generateAndCreateMarkUpForDisplayFrom(rule, throwerrors = true)
    {
        if (throwerrors) return createMarkUp(generateMarkUpForDisplayFromRule(rule));
        else
        {
            try{
                return createMarkUp(generateMarkUpForDisplayFromRule(rule));
            }
            catch(err)
            {
                console.error(err);
                debugger;
                let errindxstr = "";
                if (err.message.indexOf("the tag found at index ") === 0)
                {
                    let myopartmsgi = err.message.indexOf(" has an invalid pair index!");
                    let mynumstr = err.message.substring(23, myopartmsgi);
                    const mynumfromstr = Number(mynumstr);
                    for (let n = 0; n < mynumfromstr * 1.55; n++) errindxstr += "&nbsp;";
                    errindxstr += "^<br />";
                }
                else if (err.message === "No HTML allowed!")
                {
                    return createMarkUp('<div style="color: red">Attempted to enter HTML and ' +
                        'it is not allowed!</div>');
                }
                //else;//do nothing
                return createMarkUp('<div style="color: red">' + rule + "<br /><span>" + errindxstr +
                    "</span>" + err + "</div>");
            }
            //return null;
        }
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
                        dangerouslySetInnerHTML={generateAndCreateMarkUpForDisplayFrom(rule, false)} />
                </ul>
            );
        }
        else
        {
            mylis = arr.map((rule, index) =>
                <li key={mytypestr + gameobj.name + index} id={mytypestr + gameobj.name + index}
                    dangerouslySetInnerHTML={createMarkUp(generateMarkUpForDisplayFromRule(rule))} />);
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

        if (screener({input: event.target.value}))
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
        <div onSelectCapture={handleSelectionChange} onMouseUp={handleMouseUp}>
            <h1>Rules And Strategies For <u>{gameobj.name}</u>:</h1>
            <h3>{iseditingmode ? "Editing" : "Viewing"} Mode: {iseditingmode ? (
                <EditAGame mid={gameobj.id} basicrules={basicrules} vegasrules={vegasrules}
                    strats={strats} />
                ) : null}</h3>
            <details>
                <summary>Rules:</summary>
                <p>Basic:<button
                    onClick={(event) => changeEditingMode(event, true, true, null)}>
                        {editbasic ? "Save" : "Edit"} Basic Rules</button>
                    {iseditingmode ? <button onClick={(event) => cancelChangesClick(event, true, true)}>
                        Cancel Changes For Basic Rules</button> : null}
                </p>
                <ul>{editbasic ? mybasicruleeditlis : mybasicrulelis}</ul>
                {editbasic ? <button onClick={(event) => handleAddRuleClick(event, true, true)}>
                    Add Basic Rule</button> : null}
                <p>Vegas Style:<button
                    onClick={(event) => changeEditingMode(event, true, false, null)}>
                        {editvegas ? "Save" : "Edit"} Vegas Style Rules</button>
                    {iseditingmode ? <button onClick={(event) => cancelChangesClick(event, true, false)}>
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
                    {iseditingmode ? <button onClick={(event) => cancelChangesClick(event, false, false)}>
                        Cancel Changes For Strategies</button> : null}
                </summary>
                <ul>{editstrats ? mystratsruleeditlis : mystratlis}</ul>
                {editstrats ? <button onClick={(event) => handleAddRuleClick(event, false, false)}>
                    Add Strategy</button> : null}
            </details>
        </div>
    );
}

export default RulesNStrategies;
