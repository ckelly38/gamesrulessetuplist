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

    const mydefaultfontdataobj = {
        color: "#000000",
        size: 16,
        name: "Times New Roman",
        isbold: false,
        isunderline: false,
        isitalics: false
    };

    const [seltxtdomobj, setSelTextDOMObj] = useState(null);
    const [tempsize, setTempSize] = useState(mydefaultfontdataobj.size);
    const [colors, setColors] = useState(["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#0000FF",
        "#4B0082", "#7F00FF", "#000000", "#FFFFFF"]);

    const [myfontdata, setMyFontData] = useState(mydefaultfontdataobj);
    

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
        let mycpdefaultfontobj = {...mydefaultfontdataobj};
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
                basicrules, vegasrules, strats);
        }
        else
        {
            myfinfmtdataobj = mytagclsobj.getFinalFormattedSelectedTextDataObj(null, gameobj,
                basicrules, vegasrules, strats);
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

        const mytaglvs = myfinfmtdataobj.mytaglvs;

        //need to ask if certain tags are present
        //this will contain information that we want...
        //if bold or underline or italics are present
        //we will then determine if all of the selected text is bolded, underlined, or italics...
        let finfmttagis = mytaglvs.getAllTagIndexes(myfinfmtdataobj.finfmtseltextstr);
        let finfmtstagis = mytaglvs.areAllTagsStartingTags(myfinfmtdataobj.finfmtseltextstr, finfmttagis);
        let finfmtetagis = mytaglvs.areAllTagsEndingTags(myfinfmtdataobj.finfmtseltextstr, finfmttagis);
        let finfmttagnms = mytaglvs.getAllTags(myfinfmtdataobj.finfmtseltextstr, finfmttagis);
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

        //need to check where each of the present tags are and
        //ask if our start and end selection is between this entire thing
        //if it is then it is that item
        let aremytags = [];
        let aremytagsandeis = [];
        for (let n = 0; n < mysearchtags.length; n++)
        {
            aremytags[n] = false;
            aremytagsandeis[n] = null;
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
                        console.log("finfmttagis[" + mykindx + "] + myfinfmtdataobj.finrawtextsi = " +
                            (finfmttagis[mykindx] + myfinfmtdataobj.finrawtextsi));
                        console.log("myfinfmtdataobj.rawtextsi = " + myfinfmtdataobj.rawtextsi);
                        console.log("myfinfmtdataobj.rawtextei = " + myfinfmtdataobj.rawtextei);

                        let pi = mytaglvs.getTagPairIndex(myfinfmtdataobj.finfmtseltextstr,
                            finfmttagis[mykindx], finfmttagis);
                        console.log("pi + myfinfmtdataobj.finrawtextsi = " +
                            (pi + myfinfmtdataobj.finrawtextsi));

                        if (finfmttagis[mykindx] + myfinfmtdataobj.finrawtextsi <
                            myfinfmtdataobj.rawtextsi &&
                            ((myfinfmtdataobj.rawtextei < pi + myfinfmtdataobj.finrawtextsi) ||
                            (myfinfmtdataobj.rawtextei === pi + myfinfmtdataobj.finrawtextsi)))
                        {
                            aremytagsandeis[n] = {
                                rwtgsi: finfmttagis[mykindx] + myfinfmtdataobj.finrawtextsi,
                                rwtgei: pi + myfinfmtdataobj.finrawtextsi
                            };
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
            console.log("NEW aremytagsandeis[" + n + "] = ", aremytagsandeis[n]);
        }//end of n for loop

        const myetxtidstrs = ["bold", "underline", "italics", ""];
        let myetxtstrsi = -1;
        if (etgnd === undefined || etgnd === null);
        else
        {
            console.log("etgnd.id = " + etgnd.id);

            for (let n = 0; n < myetxtidstrs.length - 1; n++)
            {
                if (etgnd.id.indexOf(myetxtidstrs[n]) === 0)
                {
                    myetxtstrsi = n;
                    break;
                }
                //else;//do nothing
            }
        }
        console.log("myetxtstrsi = " + myetxtstrsi);

        if (myetxtstrsi < 0 || myetxtstrsi > myetxtidstrs.length - 1) myetxtstrsi = 3;
        //else;//do nothing
        console.log("FINAL myetxtstrsi = " + myetxtstrsi);

        if (myetxtstrsi < 0 || myetxtstrsi > myetxtidstrs.length - 1)
        {
            throw new Error("invlaid value found and used for the myetxtstrsi index!");
        }
        //else;//do nothing
        console.log("aremytags[" + myetxtstrsi + "] = " + aremytags[myetxtstrsi]);
        console.log("aremytagsandeis[" + myetxtstrsi + "] = ", aremytagsandeis[myetxtstrsi]);

        let nwruletxt = "" + myfinfmtdataobj.myruletext;
        let gennwrule = false;
        if (myetxtstrsi === 3);
        else
        {
            //log state
            gennwrule = true;
            console.log("myfontdata = ", myfontdata);

            const myfontobjkey = "is" + myetxtidstrs[myetxtstrsi];
            console.log("myfontobjkey = " + myfontobjkey);
            console.log("myfontdata[" + myfontobjkey + "] = " + myfontdata[myfontobjkey]);

            if (aremytags[myetxtstrsi])
            {
                //remove it from the rule...
                //the moment we remove one, all indexes will be invalid
                //we need to know if the bold tag is special or not
                for (let n = 0; n < 2; n++)
                {
                    let i = -1;
                    if (n === 0) i = aremytagsandeis[myetxtstrsi].rwtgei;
                    else i = aremytagsandeis[myetxtstrsi].rwtgsi;
                    console.log("i = " + i);

                    let tgisspcal = false;
                    if (myetxtidstrs[myetxtstrsi] === "bold")
                    {
                        //might be special
                        if (myfinfmtdataobj.myruletext.charAt(i + 1) === "b");
                        else tgisspcal = true;
                    }
                    //else;//do nothing
                    console.log("tgisspcal = " + tgisspcal);

                    const tglen = (tgisspcal ? mysearchtags[myetxtstrsi].length + 2:
                        mysearchtags[myetxtstrsi].length);
                    console.log("tglen = " + tglen);

                    console.log("nwruletxt.substring(0, " + i + ") = " + nwruletxt.substring(0, i));
                    
                    if (i + tglen < nwruletxt.length)
                    {
                        console.log("nwruletxt.substring(" + (i + tglen) + ") = " +
                            nwruletxt.substring(i + tglen));
                        
                        nwruletxt = nwruletxt.substring(0, i) + nwruletxt.substring(i + tglen);
                    }
                    else
                    {
                        console.log("it ends after that tag!");

                        nwruletxt = nwruletxt.substring(0, i);
                    }
                    console.log("NEW nwruletxt = " + nwruletxt);
                }//end of n for loop
                console.log("FINAL nwruletxt = " + nwruletxt);

                aremytags[myetxtstrsi] = false;
                console.log("NEW aremytags[" + myetxtstrsi + "] = " + aremytags[myetxtstrsi]);
            }
            else
            {
                //add it to the rule...
                console.log("part 1: nwruletxt.substring(0, " + myfinfmtdataobj.finrawtextsi + ") = " +
                    nwruletxt.substring(0, myfinfmtdataobj.finrawtextsi));
                
                console.log("mysearchtags[" + myetxtstrsi + "] = " + mysearchtags[myetxtstrsi]);
                
                let myfirsttg = "";
                if (mysearchtags[myetxtstrsi] === "/b")
                {
                    if (nwruletxt.charAt(myfinfmtdataobj.finrawtextsi) === 'r')
                    {
                        //this tag needs to be special
                        myfirsttg = "//" + mysearchtags[myetxtstrsi];
                    }
                    else myfirsttg = "" + mysearchtags[myetxtstrsi];
                }
                else myfirsttg = "" + mysearchtags[myetxtstrsi];
                console.log("part 2: myfirsttg = " + myfirsttg);
                
                console.log("part 3: nwruletxt.substring(" + myfinfmtdataobj.finrawtextsi + ", " +
                    myfinfmtdataobj.finrawtextei + ") = " +
                    nwruletxt.substring(myfinfmtdataobj.finrawtextsi, myfinfmtdataobj.finrawtextei));

                let myotg = "";
                if (mysearchtags[myetxtstrsi] === "/b")
                {
                    if (myfinfmtdataobj.finrawtextei < nwruletxt.length)
                    {
                        if (nwruletxt.charAt(myfinfmtdataobj.finrawtextei) === 'r')
                        {
                            //this tag needs to be special
                            myotg = "//" + mysearchtags[myetxtstrsi];
                        }
                        else myotg = "" + mysearchtags[myetxtstrsi];
                    }
                    else myotg = "" + mysearchtags[myetxtstrsi];
                }
                else myotg = "" + mysearchtags[myetxtstrsi];
                console.log("part 4: myotg = " + myotg);

                if (myfinfmtdataobj.finrawtextei < nwruletxt.length)
                {
                    console.log("part 5: nwruletxt.substring(" + myfinfmtdataobj.finrawtextei + ") = " +
                        nwruletxt.substring(myfinfmtdataobj.finrawtextei));
                }
                else console.log("part 5: ");

                if (myfinfmtdataobj.finrawtextei < nwruletxt.length)
                {
                    nwruletxt = nwruletxt.substring(0, myfinfmtdataobj.finrawtextsi) + myfirsttg +
                        nwruletxt.substring(myfinfmtdataobj.finrawtextsi, myfinfmtdataobj.finrawtextei) +
                        myotg + nwruletxt.substring(myfinfmtdataobj.finrawtextei);
                }
                else
                {
                    nwruletxt = nwruletxt.substring(0, myfinfmtdataobj.finrawtextsi) + myfirsttg +
                        nwruletxt.substring(myfinfmtdataobj.finrawtextsi, myfinfmtdataobj.finrawtextei) +
                        myotg;
                }
                console.log("FINAL nwruletxt = " + nwruletxt);

                aremytags[myetxtstrsi] = true;
                console.log("NEW aremytags[" + myetxtstrsi + "] = " + aremytags[myetxtstrsi]);
            }
        }
        console.log("gennwrule = " + gennwrule);
        //debugger;

        let myinstylestr = "";
        let myfontvals = ["", "", ""];
        const fontstrs = [" font-family: ", " font-size: ", " color: "];
        const fontpidstrs = ["fonts-drop-down", "fontsize", "font-color"];
        let instylestrsi = -1;
        let instylestrei = -1;
        let myfontsindxs = [];
        let myfontvalssindxs = [];
        let myfonteindxs = [];
        if (aremytags[3])
        {
            //need to get the information between the two style tags
            for (let n = 0; n < finfmttagis.length; n++)
            {
                if (finfmttagnms[n] === "/style")
                {
                    if (finfmtstagis[n])
                    {
                        let pi = mytaglvs.getTagPairIndex(myfinfmtdataobj.finfmtseltextstr, finfmttagis[n],
                            finfmttagis);
                        console.log("pi = " + pi);

                        myinstylestr = myfinfmtdataobj.finfmtseltextstr.substring(
                            finfmttagis[n] + finfmttagnms[n].length, pi);
                        instylestrsi = finfmttagis[n] + finfmttagnms[n].length;
                        instylestrei = pi;
                        break;
                    }
                    //else;//do nothing
                }
                //else;//do nothing
            }
            console.log("myinstylestr = " + myinstylestr);

            if (myinstylestr === undefined || myinstylestr === null || myinstylestr.length < 1)
            {
                throw new Error("the string of characters inside of the style tags should not be empty!");
            }
            //else;//do nothing

            //extract the font family, the font size, the color
            myfontsindxs = fontstrs.map((mystr) => myinstylestr.indexOf(mystr));
            const myfontsindxsvld = myfontsindxs.map((fsi) =>
                ((fsi > 0 || fsi === 0) && fsi < myinstylestr.length));
            console.log("fontstrs = ", fontstrs);
            console.log("myfontsindxs = ", myfontsindxs);
            console.log("myfontsindxsvld = ", myfontsindxsvld);

            for (let n = 0; n < fontstrs.length; n++)
            {
                console.log("myfontsindxsvld[" + n + "] = " + myfontsindxsvld[n]);
                if (myfontsindxsvld[n])
                {
                    console.log("the start index is valid!");

                    myfontvalssindxs[n] = myfontsindxs[n] + fontstrs[n].length;
                }
                else myfontvalssindxs[n] = myfontsindxs[n];
                console.log("NEW myfontvalssindxs[" + n + "] = " + myfontvalssindxs[n]);
            }//end of n for loop
            console.log("myfontvalssindxs = ", myfontvalssindxs);

            //go until ; or end of string index from the start index
            for (let n = 0; n < fontstrs.length; n++)
            {
                console.log("myfontsindxsvld[" + n + "] = " + myfontsindxsvld[n]);
                if (myfontsindxsvld[n])
                {
                    console.log("the start index is valid!");

                    myfonteindxs[n] = -1;
                    for (let i = myfontsindxs[n] + fontstrs[n].length; i < myinstylestr.length; i++)
                    {
                        if (myinstylestr.charAt(i) === ';')
                        {
                            console.log("found a semi-colon at i = " + i + "!");
                            myfonteindxs[n] = i;
                            break;
                        }
                        else
                        {
                            if (i + 1 === myinstylestr.length)
                            {
                                console.log("reached the end of the string length!");
                                myfonteindxs[n] = myinstylestr.length;
                                break;
                            }
                            //else;//do nothing
                        }
                    }//end of i for loop
                }
                else myfonteindxs[n] = myfontsindxs[n];
                console.log("NEW myfonteindxs[" + n + "] = " + myfonteindxs[n]);
            }//end of n for loop
            console.log("myfonteindxs = ", myfonteindxs);
            console.log("");

            console.log("myinstylestr = " + myinstylestr);
            console.log("fontstrs = ", fontstrs);
            console.log("myfontsindxs = ", myfontsindxs);
            console.log("myfontsindxsvld = ", myfontsindxsvld);
            console.log("myfontvalssindxs = ", myfontvalssindxs);
            console.log("myfonteindxs = ", myfonteindxs);

            for (let n = 0; n < fontstrs.length; n++)
            {
                if (myfontsindxsvld[n])
                {
                    myfontvals[n] = myinstylestr.substring(myfontvalssindxs[n], myfonteindxs[n]);
                }
                else myfontvals[n] = "";
            }
            console.log("myfontvals = ", myfontvals);
        }
        //else;//do nothing

        //get and save the vals now
        console.log("fontstrs = ", fontstrs);
        console.log("myfontvals = ", myfontvals);
        
        if (aremytags[3])
        {
            console.log("etgnd = ", etgnd);
            if (etgnd === undefined || etgnd === null);
            else
            {
                console.log("etgnd.id = " + etgnd.id);
                console.log("etgnd.value = " + etgnd.value);
                
                for (let n = 0; n < fontstrs.length; n++)
                {
                    if (fontstrs[n] === " font-family: " || fontstrs[n] === " color: " ||
                        fontstrs[n] === " font-size: ")
                    {
                        if (etgnd.id.indexOf(fontpidstrs[n]) === 0)
                        {
                            let mytempstr = "";
                            if (fontstrs[n] === " font-size: ") mytempstr = "" + etgnd.value + "px";
                            else mytempstr = "" + etgnd.value;
                            console.log("init mytempstr = " + mytempstr);

                            if (fontstrs[n] === " font-family: ")
                            {
                                //replace the spaces with -s
                                for (let i = 0; i < mytempstr.length; i++)
                                {
                                    if (mytempstr.charAt(i) === ' ')
                                    {
                                        if (i + 1 < mytempstr.length)
                                        {
                                            mytempstr = mytempstr.substring(0, i) + "-" +
                                                mytempstr.substring(i + 1);
                                        }
                                        else mytempstr = mytempstr.substring(0, i) + "-";
                                        console.log("NEW mytempstr = " + mytempstr);
                                    }
                                    //else;//do nothing
                                }//end of i for loop
                            }
                            //else;//do nothing
                            console.log("FINAL mytempstr = " + mytempstr);

                            myfontvals[n] = "" + mytempstr;

                            console.log("NEW myfontvals[" + n + "] = " + myfontvals[n]);
                            console.log("myfinfmtdataobj.finrawtextsi = " + myfinfmtdataobj.finrawtextsi);
                            console.log("instylestrsi = " + instylestrsi);
                            console.log("instylestrei = " + instylestrei);
                            console.log("myfontsindxs[" + n + "] = " + myfontsindxs[n]);
                            console.log("myfontvalssindxs[" + n + "] = " + myfontvalssindxs[n]);
                            console.log("myfonteindxs[" + n + "] = " + myfonteindxs[n]);

                            console.log("instylestrsi + myfinfmtdataobj.finrawtextsi = " +
                                (instylestrsi + myfinfmtdataobj.finrawtextsi));
                            
                            console.log("nwruletxt.substring(myfontvalssindxs[n] + instylestrsi + " +
                                "myfinfmtdataobj.finrawtextsi, myfonteindxs[n] + instylestrsi + " +
                                "myfinfmtdataobj.finrawtextsi) = " +
                                nwruletxt.substring(myfontvalssindxs[n] + instylestrsi +
                                myfinfmtdataobj.finrawtextsi, myfonteindxs[n] + instylestrsi +
                                myfinfmtdataobj.finrawtextsi));
                            
                            console.log(nwruletxt.substring(0, myfontvalssindxs[n] + instylestrsi +
                                myfinfmtdataobj.finrawtextsi));
                            console.log(mytempstr);
                            console.log(nwruletxt.substring(myfonteindxs[n] + instylestrsi +
                                myfinfmtdataobj.finrawtextsi));
                            
                            nwruletxt = nwruletxt.substring(0, myfontvalssindxs[n] + instylestrsi +
                                myfinfmtdataobj.finrawtextsi) + mytempstr +
                                nwruletxt.substring(myfonteindxs[n] + instylestrsi +
                                    myfinfmtdataobj.finrawtextsi);
                            gennwrule = true;
                            
                            console.log("NEW nwruletxt = " + nwruletxt);
                            console.log("NEW gennwrule = " + gennwrule);

                            break;
                        }
                        //else;//do nothing
                    }
                    else throw new Error("illegal font property found in the style tag!");
                }//end of n for loop
            }
        }
        //else;//do nothing
        //debugger;
        
        let nwfontdataobj = {...mydefaultfontdataobj};
        nwfontdataobj.isbold = aremytags[0];
        nwfontdataobj.isunderline = aremytags[1];
        nwfontdataobj.isitalics = aremytags[2];
        if (myinstylestr.length < 1);
        else
        {
            console.log("now beginning to add the styleing information to the object!");

            if (fontstrs.length === 3);
            else throw new Error("there must be at least one string on the font strings to look for!");

            for (let n = 0; n < fontstrs.length; n++)
            {
                if (fontstrs[n] === " font-family: ")
                {
                    //take the value and replace -s with spaces
                    //then add to the object
                    let mynwnm = "";
                    for (let i = 0; i < myfontvals[n].length; i++)
                    {
                        if (myfontvals[n].charAt(i) === '-') mynwnm += " ";
                        else mynwnm += myfontvals[n].charAt(i);
                    }
                    console.log("mynwnm = " + mynwnm);

                    nwfontdataobj.name = "" + mynwnm;
                }
                else if (fontstrs[n] === " font-size: ")
                {
                    //remove the px at the end and convert remainder to a number
                    //if invalid do not set and use defaults in state
                    //then add to the object
                    let mypxindx = myfontvals[n].indexOf("px");
                    console.log("mypxindx = " + mypxindx);

                    if (mypxindx < 0 || mypxindx > myfontvals[n].length - 1 || myfontvals[n].length === 0)
                    {
                        continue;
                    }
                    //else;//do nothing safe to proceed

                    let mynumstr = myfontvals[n].substring(0, mypxindx);
                    console.log("mynumstr = " + mynumstr);
                    
                    if (mynumstr.length < 1) continue;
                    //else;//do nothing

                    let mynumsz = Number(mynumstr);
                    if (isNaN(mynumsz)) continue;
                    //else;//do nothing
                    console.log("mynumsz = " + mynumsz);

                    nwfontdataobj.size = mynumsz;
                }
                else if (fontstrs[n] === " color: ")
                {
                    //this has multiple values just load it
                    //value must not be empty, use defaults in state
                    //then add to the object

                    let mycolorstr = "" + myfontvals[n];
                    console.log("mycolorstr = " + mycolorstr);

                    if (mycolorstr.length < 1) continue;
                    //else;//do nothing

                    nwfontdataobj.color = "" + mycolorstr;
                }
                else throw new Error("illegal font property found in the style tag!");
            }//end of n for loop
        }
        console.log("nwfontdataobj = ", nwfontdataobj);
        console.log("gennwrule = " + gennwrule);

        
        let myrulesarr = null;
        if (myfinfmtdataobj.mytypestr === "basic") myrulesarr = basicrules;
        else if (myfinfmtdataobj.mytypestr === "vegas") myrulesarr = vegasrules;
        else if (myfinfmtdataobj.mytypestr === "strats") myrulesarr = strats;
        else throw new Error("invalid rule type was found and used here!");

        const ruleindx = myfinfmtdataobj.ruleindx;
        console.log("ruleindx = " + ruleindx);


        setMyFontData(nwfontdataobj);
        setTempSize(nwfontdataobj.size);

        if (gennwrule)
        {
            //take the rules array if the index matches.... use the new rule
            //else use the old rule
            let mynwrules = myrulesarr.map((rule, index) => ((index === ruleindx) ? nwruletxt : rule));
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
