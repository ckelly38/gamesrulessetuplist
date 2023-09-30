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

    const iseditingmode = (editbasic || editvegas || editstrats);

    const [mycolor, setMyColor] = useState("#000000");
    

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

        if (myseltext.length < 1) return;
        //else;//do nothing

        //this will always be raw text
        //domnd is the event.target
        //the rule text is event.target.value
        
        debugger;
        throw new Error("NOT DONE YET 9-27-2023 2:50 AM!");
    }

    function getRawIndexRelativeToParts(myparts, txtonlyindx, myformattingparts, usestart)
    {
        //now compute the new indexes using the parts and formatting parts as guides
        //everything on parts[n] will count on the original indexes
        //everything on myformattingparts[n] was not counted originally
        //it is parts[n] then myformattingparts[n] then n advances...

        if ((myparts === undefined || myparts === null || myparts.length < 1) ||
        (myformattingparts === undefined || myformattingparts === null || myformattingparts.length < 1))
        {
            throw new Error("the text only and formatting only parts must be defined!");
        }
        //else;//do nothing

        if (txtonlyindx === undefined || txtonlyindx === null || isNaN(txtonlyindx) || txtonlyindx < 0)
        {
            throw new Error("invalid value found and used here for the textonlyindx index!");
        }
        //else;//do nothing

        if (usestart === undefined || null)
        {
            throw new Error("usestart must be a defined boolean variable, but it was not defined!");
        }
        else
        {
            if (usestart === true || usestart === false);
            else
            {
                throw new Error("usestart must be a defined boolean variable, but it was not a " +
                    "boolean variable!");
            }
        }
        
        let cumpartslen = -1;
        let mysparti = -1;
        let mysireltoparti = -1;
        for (let n = 0; n < myparts.length; n++)
        {
            if (n === 0) cumpartslen = myparts[n].length;
            else if (n > 0 && n < myparts.length) cumpartslen += myparts[n].length;
            else throw new Error("invalid value found and used for index n here!");
            //console.log("cumpartslen = " + cumpartslen);

            if (((cumpartslen - myparts[n].length < txtonlyindx) ||
                (usestart && (cumpartslen - myparts[n].length === txtonlyindx))) &&
                txtonlyindx < cumpartslen)
            {
                //this is the part we want...
                console.log("found the part we want!");
                console.log("cumpartslen - myparts[" + n + "].length = " +
                    (cumpartslen - myparts[n].length));
                console.log("txtonlyindx = " + txtonlyindx);
                console.log("cumpartslen = " + cumpartslen);
                
                mysireltoparti = txtonlyindx - (cumpartslen - myparts[n].length);
                mysparti = n;
                break;
            }
            else if ((cumpartslen - myparts[n].length < txtonlyindx) && ((txtonlyindx < cumpartslen) ||
                ((txtonlyindx === cumpartslen) && !usestart)))
            {
                //this is the part we want...
                console.log("found the part we want!");
                console.log("cumpartslen - myparts[" + n + "].length = " +
                    (cumpartslen - myparts[n].length));
                console.log("txtonlyindx = " + txtonlyindx);
                console.log("cumpartslen = " + cumpartslen);
                
                mysireltoparti = txtonlyindx - (cumpartslen - myparts[n].length);
                mysparti = n;
                break;
            }
            //else;//do nothing
        }//end of n for loop
        console.log("mysparti = " + mysparti);
        console.log("mysireltoparti = " + mysireltoparti);

        if (mysparti < 0 || mysparti > myparts.length - 1)
        {
            throw new Error("illegal value found and used here for mysparti index!");
        }
        //else;//do nothing
        
        console.log("myparts[" + mysparti + "] = " + myparts[mysparti]);
        console.log("myparts[" + mysparti + "].length = " + myparts[mysparti].length);

        if ((mysireltoparti > 0 || mysireltoparti === 0) &&
        ((mysireltoparti < myparts[mysparti].length) || (mysireltoparti === myparts[mysparti].length)))
        {
            //do nothing
        }
        else
        {
            throw new Error("illegal value found and used here for mysireltoparti start index!");
        }

        //we know the start si is between or equal to the length of the part
        //if equal the calculations are easiser
        //if not equal, then it is harder...

        let rawtexti = 0;
        for (let n = 0; n < mysparti && n < myparts.length; n++)
        {
            if (n === 0) rawtexti = 0;
            //else;//do nothing

            rawtexti += myparts[n].length + myformattingparts[n].length;
        }
        rawtexti += mysireltoparti;
        console.log("NEW rawtexti = " + rawtexti);

        if (rawtexti < 0 || rawtexti < mysireltoparti || rawtexti < txtonlyindx)
        {
            throw new Error("the text index was invalid!");
        }
        //else;//do nothing

        return rawtexti;
    }

    function handleMouseUp(event)
    {
        console.log("event = ", event);

        if (iseditingmode);
        else return;
        
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
            mydomnd = docselect.anchorNode;
        }
        else
        {
            myseltext = myselect.toString();
            mydomnd = myselect.anchorNode;
        }
        if (mydomnd.tagName === "LI")
        {
            if (mydomnd.id === undefined || mydomnd.id === null || mydomnd.id.length < 1)
            {
                mydomnd = mydomnd.children[0];
            }
            //else;//do nothing
        }
        //else;//do nothing

        console.log("myseltext = " + myseltext);

        if (myseltext.length < 1) return;
        //else;//do nothing

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

        console.log("myseltext = " + myseltext);
        console.log("mydomnd.textContent = " + mydomnd.textContent);

        //we cannot rely on the offsets in the select object to be valid end points
        //but we can get the index of the seltext
        //from there we could calculate the end index
        const myhtmlsi = mydomnd.textContent.indexOf(myseltext);
        console.log("myhtmlsi = " + myhtmlsi);

        if (myhtmlsi < 0 || (myhtmlsi > mydomnd.textContent.length - 1 &&
            mydomnd.textContent.length > 0) || mydomnd.textContent.length === 0)
        {
            throw new Error("illegal value found and used for the htmlsi index!");
        }
        //else;//do nothing

        const myhtmlei = myhtmlsi + myseltext.length;
        console.log("myhtmlei = " + myhtmlei);

        if (myhtmlei < 0 || myhtmlei > mydomnd.textContent.length)
        {
            throw new Error("illegal value found and used for the htmlei index!");
        }
        //else;//do nothing

        const mytaglvs = new TagLevelsClass(myruletext);

        const maxdiff = myruletext.length - mydomnd.textContent.length;
        console.log("maxdiff = " + maxdiff);

        if (maxdiff < 0)
        {
            throw new Error("illegal maxdiff between the rule and the rendered text lengths " +
                "found and used here!");
        }
        //else;//do nothing

        //we can see anyone above, but the style must be after one of them.
        let mytagis = null;
        let treatasrawtext = false;
        if (israwtext) treatasrawtext = true;
        else
        {
            //need to make sure that the raw rule has no tags in it for this to be true
            //if there are no tag indexes, then treat as rawtext with escape characters
            //if the entire selection is before all of the tag indexes, then treat as raw text
            //otherwise it is not safe to do that
            mytagis = mytaglvs.getAllTagIndexes(myruletext);
            console.log("mytagis = ", mytagis);
            
            if (mytagis === undefined || mytagis === null || mytagis.length < 1)
            {
                console.log("there are no tags on the rule (this is raw text)!");

                treatasrawtext = true;
            }
            else
            {
                console.log("checking if the entire selection ends before the tags start!");

                treatasrawtext = true; 
                for (let n = 0; n < mytagis.length; n++)
                {
                    if (myhtmlei < mytagis[n]);
                    else
                    {
                        console.log("there exists one tag that the end selection is after " +
                            "(this is not raw text)!");
                        treatasrawtext = false;
                        break;
                    }
                }

                if (treatasrawtext)
                {
                    console.log("the entire selection ends before the tags start (this is raw text)!");
                }
                //else;//do nothing
            }

            if (maxdiff === 0);
            else
            {
                if (treatasrawtext)
                {
                    treatasrawtext = false;
                    console.log("escape characters are present (not raw text, but very close to it)!");
                }
                //else;//do nothing
            }
        }
        console.log("treatasrawtext = " + treatasrawtext);
        console.log("israwtext = " + israwtext);


        //now that the mouse up event is recognized as text being selected
        //an new problem exists, that when I want to select some text and then copy it,
        //or delete it, the event is recognized as selecting text and it become next to impossible to
        //copy or delete the text....

        const stagis = mytaglvs.areAllTagsStartingTags(myruletext, mytagis);
        const etagis = mytaglvs.areAllTagsEndingTags(myruletext, mytagis);
        const mytagnms = mytaglvs.getAllTags(myruletext, mytagis);
        console.log("stagis = ", stagis);
        console.log("etagis = ", etagis);
        console.log("mytagnms = ", mytagnms);


        let rawtextsi = -1;
        let rawtextei = -1;
        if (israwtext || treatasrawtext)
        {
            //best case position for selection is absolute
            //the rule text is mydomnd.textContent

            console.log("the start and the end are on the raw text values!");

            rawtextsi = myhtmlsi;
            rawtextei = myhtmlei;
            console.log("NEW rawtextsi = " + rawtextsi);
            console.log("NEW rawtextei = " + rawtextei);
        }
        else
        {
            //worst case, positions need to be recalculated
            //and we need to be careful if it contains formatting code around it
            //it would be nice if starting positions line up... cannot be guranteed...
            //word count would hold if formatting code is skipped...
            //the rules and strats come in from state and from the gameobj

            //we can see if there are no tag indexes before htmlsi on the rule
            //then we can calculate the raw text index as being htmlsi + all_tags
            //and stuff between them...
            //if there are any style tags, we count the stuff between them

            


            
            //do at lot here to handle this case...
            //we are near or selecting formatting code or over it as well
            //
            //GOAL: compute the start and end indexes based on similarities of the two rules
            //one rule being raw formatting code and data and the other is text only
            //GIVEN: two rules and the starting and ending indexes according to the text only rule
            //WE WANT TO TAKE THOSE POINTS: and get them according to the raw formatting code rule
            //
            //
            //all tags and anything between the two style tags will not be displayed
            //that accounts as for why the rules are different
            //
            //in this case, one rule is displayed text only (mydomnd.textContent)
            //and the other rule has the formatting code (myruletext)
            
            //go until the first difference is found between the two rules
            //then determine if it is a tag index
            //what we want to do is split the text only rule by the nonformatted rule
            //so we can see where the formatting code is inserted...
            //then we can go over that

            let myparts = [];
            let myformattingparts = [];
            let mytxtonlyi = 0;
            let mytxtonlysi = 0;
            let myformattingpartstr = "";
            let useformat = false;
            for (let i = 0; i < myruletext.length; i++)
            {
                console.log("myruletext.charAt(i=" + i + ") = " + myruletext.charAt(i));
                console.log("mydomnd.textContent.charAt(mytxtonlyi=" + mytxtonlyi + ") = " +
                    mydomnd.textContent.charAt(mytxtonlyi));
                if (myruletext.charAt(i) === mydomnd.textContent.charAt(mytxtonlyi))
                {
                    mytxtonlyi++;

                    if (useformat)
                    {
                        myformattingparts.push("" + myformattingpartstr);
                        myformattingpartstr = "";
                        useformat = false;
                        mytxtonlysi = i;

                        console.log("NEW myformattingpartstr = " + myformattingpartstr);
                        console.log("NEW useformat = " + useformat);
                        console.log("NEW mytxtonlysi = " + mytxtonlysi);
                    }
                    //else;//do nothing

                    if (i + 1 === myruletext.length)
                    {
                        myparts.push(myruletext.substring(mytxtonlysi));
                        myformattingparts.push("");
                    }
                    //else;//do nothing
                }
                else
                {
                    console.log("diff found at i = " + i + "!");
                    console.log("OLD useformat = " + useformat);

                    if (useformat);
                    else
                    {
                        myparts.push(myruletext.substring(mytxtonlysi, i));
                        useformat = true;
                        console.log("NEW useformat = " + useformat);
                    }
                    

                    //determine if we are at a tag index
                    let attagi = false;
                    let mytagi = -1;
                    for (let k = 0; k < mytagis.length; k++)
                    {
                        if (mytagis[k] === i)
                        {
                            attagi = true;
                            mytagi = k;
                            break;
                        }
                        //else;//do nothing
                    }//end of k for loop
                    console.log("attagi = " + attagi);
                    console.log("mytagi = " + mytagi);

                    if (attagi)
                    {
                        if (mytagi < 0 || mytagi > mytagis.length - 1)
                        {
                            throw new Error("invalid tag index found and used here! We are at a " +
                                "tag, but index not set correctly!");
                        }
                        //else;//do nothing
                    }
                    else
                    {
                        if (mytagi < 0 || mytagi > mytagis.length - 1);
                        else
                        {
                            throw new Error("invalid tag index found and used here! We are not " +
                                "at a tag, but the tag index suggests otherwise!");
                        }
                    }

                    if (attagi)
                    {
                        //determine if it is style or not
                        //if it is not style just add the tag name, then move on
                        //if it is style skip to the style pair index

                        if (mytagnms[mytagi] === "/style")
                        {
                            console.log("style tag found at i = " + i + "!");
                            
                            if (stagis[mytagi])
                            {
                                let pi = mytaglvs.getTagPairIndex(myruletext, mytagis[mytagi], mytagis);
                                console.log("pi = " + pi);

                                if (mytagi + 1 < mytagis.length)
                                {
                                    if (mytagis[mytagi + 1] === pi && etagis[mytagi + 1])
                                    {
                                        myformattingpartstr += myruletext.substring(i, pi + 6);
                                        i = pi + 6 - 1;
                                    }
                                    else
                                    {
                                        throw new Error("invalid pair index found and used or tag " +
                                            "was wrongly identified as a starting style tag (wrong " +
                                            "pair index)!");
                                    }
                                }
                                else
                                {
                                    throw new Error("invalid pair index found and used or tag was " +
                                        "wrongly identified as a starting style tag!");
                                }
                            }
                            else
                            {
                                console.log("this ending style tag was already counted!");

                                if (etagis[mytagi]);
                                else
                                {
                                    throw new Error("this tag must be an ending style tag, but it " +
                                        "was not!");
                                }
                            }
                        }
                        else
                        {
                            console.log("non-style tag formatting code found at i = " + i + "!");

                            let isspecialbtag = false;
                            if (mytagnms[mytagi] === "/b")
                            {
                                if (i + 1 < myruletext.length)
                                {
                                    if (myruletext.charAt(i + 1) === 'b');
                                    else isspecialbtag = true;
                                }
                                else
                                {
                                    throw new Error("this claimed to be a tag, but it has an " +
                                        "illegal index!");
                                }
                            }
                            //else;//do nothing
                            console.log("isspecialbtag = " + isspecialbtag);

                            if (isspecialbtag)
                            {
                                myformattingpartstr += "//" + mytagnms[mytagi];
                                i += 2 + mytagnms[mytagi].length - 1;
                            }
                            else
                            {
                                //add the tag name to the formatting code
                                myformattingpartstr += mytagnms[mytagi];
                                i += mytagnms[mytagi].length - 1;
                            }
                        }
                        console.log("NEW myformattingpartstr = " + myformattingpartstr);
                        console.log("NEW i = " + i);

                        if (i + 1 === myruletext.length)
                        {
                            myformattingparts.push("" + myformattingpartstr);
                            myformattingpartstr = "";
                            useformat = false;
                            mytxtonlysi = i;
                        }
                        //else;//do nothing
                    }
                    else
                    {
                        if (myruletext.charAt(i) === '/')
                        {
                            console.log("this is an escape character found at i = " + i + "!");
                            
                            myformattingpartstr += "/";
                            
                            console.log("NEW myformattingpartstr = " + myformattingpartstr);
                            console.log("NEW i = " + i);
                        }
                        else
                        {
                            throw new Error("illegal formating characters found at i = " + i +
                                " on the rule (" + myruletext + ")!");
                        }
                    }
                }
            }//end of i for loop
            console.log("myparts = ", myparts);
            console.log("myformattingparts = ", myformattingparts);

            if (myparts.length === myformattingparts.length);
            else
            {
                throw new Error("there must be the same number of text only parts as the formatting " +
                    "parts!");
            }

            let myresstr = "";
            for (let n = 0; n < myparts.length; n++)
            {
                myresstr += "" + myparts[n] + myformattingparts[n];
            }
            console.log("  myresstr = " + myresstr);
            console.log("myruletext = " + myruletext);

            if (myresstr === myruletext);
            else
            {
                throw new Error("the rule text only plus formatting parts in the correct order must " +
                    "be the same as the original rule text, but it was not!");
            }
            console.log("no data integrity violation!");


            //now compute the new indexes here
            console.log("myhtmlsi = " + myhtmlsi);
            console.log("myhtmlei = " + myhtmlei);
            rawtextsi = getRawIndexRelativeToParts(myparts, myhtmlsi, myformattingparts, true);
            rawtextei = getRawIndexRelativeToParts(myparts, myhtmlei, myformattingparts, false);

            console.log("NEW rawtextsi = " + rawtextsi);
            console.log("NEW rawtextei = " + rawtextei);
        }
        console.log("FINAL rawtextsi = " + rawtextsi);
        console.log("FINAL rawtextei = " + rawtextei);

        if (rawtextsi < 0 || rawtextei < 0 || rawtextei < rawtextsi ||
            rawtextei > myruletext.length - 1 || rawtextsi > myruletext.length - 1)
        {
            throw new Error("invalid start or end index found and used for the rule text here!");
        }
        //else;//do nothing

        const fmtseltextstr = myruletext.substring(rawtextsi, rawtextei);
        console.log("myruletext.substring(rawtextsi=" + rawtextsi + ", rawtextei=" + rawtextei +
            ") = fmtseltextstr = " + fmtseltextstr);
        console.log("myseltext = " + myseltext);
        console.log("myruletext = " + myruletext);
        console.log("mytagis = ", mytagis);
        console.log("stagis = ", stagis);
        console.log("etagis = ", etagis);
        console.log("mytagnms = ", mytagnms);

        
        //now we need to take the formatted selected text and load in the defaults to the editgame
        //need to change the colors, the size, etc...
        //
        //need to take the rule text and figure out if these are inside any tags...
        //bold, underline, italics, and if it is inside anything that would change the font, size, color
        //setMyColor();
        //

        //we want to know starting tags and ending tags around the selected text
        //if the tag index is a starting tag and if it is at or just before rawtextsi
        //and if an ending index is found after rawtextsi and before or after rawtextei
        //then it is included

        const mylvs = mytaglvs.getLevelsForAllTags(myruletext, mytagis);
        console.log("mylvs = ", mylvs);

        const mydispstrs = mytaglvs.getLevelsDisplayStrOrStrs(myruletext, mylvs, true);
        console.log("mydispstrs = ", mydispstrs);

        let minsindx = -1;
        let minsi = -1;
        for (let n = stagis.length - 1; n > -1 && n < stagis.length; n--)
        {
            if (stagis[n])
            {
                if (mytagis[n] < rawtextsi || mytagis[n] === rawtextsi)
                {
                    //this is the nearest starting tag found before the starting index
                    //this needs to be included
                    console.log("found are starting tag index at n = " + n + "!");
                    console.log("mytagis[" + n + "] = " + mytagis[n]);
                    console.log("rawtextsi = " + rawtextsi);
                    console.log("rawtextei = " + rawtextei);

                    let pi = mytaglvs.getTagPairIndex(myruletext, mytagis[n], mytagis);
                    console.log("pi = " + pi);

                    if (pi < rawtextsi);
                    else
                    {
                        //pi === rawtextsi || pi > rawtextsi
                        //keep it...
                        console.log("NEED TO KEEP THIS PAIR...!");
                        if (minsindx < 0 && minsi < 0)
                        {
                            minsindx = mytagis[n];
                            minsi = n;
                        }
                        else
                        {
                            if (mytagis[n] < minsindx)
                            {
                                minsindx = mytagis[n];
                                minsi = n;
                            }
                            //else;//do nothing
                        }
                        console.log("NEW minsindx = " + minsindx);
                        console.log("NEW minsi = " + minsi);
                    }
                }
                //else;//do nothing
            }
            //else;//do nothing
        }//end of n for loop
        console.log("FINAL minsindx = " + minsindx);
        console.log("FINAL minsi = " + minsi);

        if (minsindx < 0 || minsindx > myruletext.length - 1)
        {
            throw new Error("invalid value found and used here for minsindx index value!");
        }
        //else;//do nothing

        if (minsi < 0 || minsi > mytagis.length - 1)
        {
            throw new Error("invalid value found and used here for minsi index!");
        }
        //else;//do nothing

        const finrawtextsi = minsindx;
        console.log("rawtextsi = " + rawtextsi);
        console.log("finrawtextsi = " + finrawtextsi);

        const mytagpi = mytaglvs.getTagPairIndex(myruletext, mytagis[minsi], mytagis);
        console.log("mytagpi = " + mytagpi);

        let mytagpilen = mytagnms[minsi].length;
        if (mytagnms[minsi] === "\b")
        {
            if (myruletext.charAt(mytagpi + 2) === 'b');
            else mytagpilen += 2;
        }
        //else;//do nothing
        console.log("mytagpilen = " + mytagpilen);
        console.log("mytagpi + mytagpilen = " + (mytagpi + mytagpilen));

        let finrawtextei = -1;
        if (mytagpi + mytagpilen < rawtextei) finrawtextei = rawtextei;
        else finrawtextei = mytagpi + mytagpilen;
        console.log("finrawtextei = " + finrawtextei);
        
        const finfmtseltextstr = myruletext.substring(finrawtextsi, finrawtextei);
        console.log("myruletext.substring(finrawtextsi=" + finrawtextsi + ", finrawtextei=" +
            finrawtextei + ") = finfmtseltextstr = " + finfmtseltextstr);
        
        console.log("finfmtseltextstr.length = " + finfmtseltextstr.length);
        console.log("fmtseltextstr.length = " + fmtseltextstr.length);

        const fmtdifflen = finfmtseltextstr.length - fmtseltextstr.length;
        console.log("fmtdifflen = " + fmtdifflen);

        //need to ask if certain tags are present
        //this will contain information that we want...
        //if bold or underline or italics are present
        //we will then determine if all of the selected text is bolded, underlined, or italics...
        let finfmttagis = mytaglvs.getAllTagIndexes(finfmtseltextstr);
        let finfmtstagis = mytaglvs.areAllTagsStartingTags(finfmtseltextstr, finfmttagis);
        let finfmtetagis = mytaglvs.areAllTagsEndingTags(finfmtseltextstr, finfmttagis);
        let finfmttagnms = mytaglvs.getAllTags(finfmtseltextstr, finfmttagis);
        console.log("finfmttagis = ", finfmttagis);
        console.log("finfmtstagis = ", finfmtstagis);
        console.log("finfmtetagis = ", finfmtetagis);
        console.log("finfmttagnms = ", finfmttagnms);

        const mysearchtags = ["/b", "/u", "/i", "/style"];
        let mytagspresent = [];
        if (finfmttagis === undefined || finfmttagis === null || finfmttagis.length < 1);
        else
        {
            for (let k = 0; k < mysearchtags.length; k++)
            {
                mytagspresent[k] = false;
                for (let n = 0; n < finfmttagis.length; n++)
                {
                    if (finfmttagnms[n] === mysearchtags[k])
                    {
                        mytagspresent[k] = true;
                        break;
                    }
                    //else;//do nothing
                }//end of n for loop
            }//end of k for loop
        }
        console.log("boldtagspresent = " + mytagspresent[0]);
        console.log("underlinetagspresent = " + mytagspresent[1]);
        console.log("italicstagspresent = " + mytagspresent[2]);
        console.log("styletagspresent = " + mytagspresent[3]);

        debugger;
        
        //need to check where each of the present tags are and
        //ask if our start and end selection is between this entire thing
        //if it is then it is that item
        let aremytags = [];
        for (let n = 0; n < mysearchtags.length; n++)
        {
            aremytags[n] = false;
            console.log("OLD aremytags[" + n + "] = " + aremytags[n]);
            console.log("mytagspresent[" + n + "] = " + mytagspresent[n]);
            console.log("tag we are looking for = mysearchtags[" + n + "] = " + mysearchtags[n]);

            if (mytagspresent[n]);
            else continue;

            for (let k = 0; k < finfmttagis.length; k++)
            {
                if (finfmttagnms[k] === mysearchtags[n])
                {
                    console.log("found our tag at k = " + k + "!");
                    console.log("our tag is = finfmttagnms[" + k + "] = " + finfmttagnms[k]);

                    let useparenttag = false;
                    if (mysearchtags[n] === "/style") useparenttag = true;
                    //else;//do nothing
                    console.log("useparenttag = " + useparenttag);

                    const mykindx = (useparenttag ? k - 1 : k);
                    console.log("mykindx = " + mykindx);

                    if (mykindx < 0) throw new Error("invalid value found and used for mykindx index!");
                    //else;//do nothing

                    if (finfmtstagis[mykindx])
                    {
                        console.log("this is a starting tag!");
                        console.log("finfmttagis[" + mykindx + "] + finrawtextsi = " +
                            (finfmttagis[mykindx] + finrawtextsi));
                        console.log("rawtextsi = " + rawtextsi);
                        console.log("rawtextei = " + rawtextei);

                        let pi = mytaglvs.getTagPairIndex(finfmtseltextstr, finfmttagis[mykindx],
                            finfmttagis);
                        console.log("pi + finrawtextsi = " + (pi + finrawtextsi));

                        if (finfmttagis[mykindx] + finrawtextsi < rawtextsi &&
                            ((rawtextei < pi + finrawtextsi) || (rawtextei === pi + finrawtextsi)))
                        {
                            aremytags[n] = true;
                            break;
                        }
                        //else;//do nothing
                        k++;
                    }
                    //else;//do nothing
                }
                //else;//do nothing
            }//end of k for loop
            console.log("NEW aremytags[" + n + "] = " + aremytags[n]);
        }//end of n for loop

        let myinstylestr = "";
        if (aremytags[3])
        {
            //need to get the information between the two style tags
            for (let n = 0; n < finfmttagis.length; n++)
            {
                if (mysearchtags[n] === "/style")
                {
                    if (finfmtstagis[n])
                    {
                        let pi = mytaglvs.getTagPairIndex(finfmtseltextstr, finfmttagis[n],
                            finfmttagis);
                        console.log("pi = " + pi);

                        myinstylestr = finfmtseltextstr.substring(
                            finfmtstagis[n] + mysearchtags[n].length, pi);
                        break;
                    }
                    //else;//do nothing
                }
                //else;//do nothing
            }
        }
        //else;//do nothing
        console.log("myinstylestr = " + myinstylestr);

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
                    strats={strats} mycolor={mycolor} setMyColor={setMyColor} refresh={handleMouseUp} />
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
