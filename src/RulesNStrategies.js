import React, { useEffect, useState } from "react";
import './App.css';
import EditAGame from "./EditAGame";

function RulesNStrategies({games, gameobj, screener})
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

    function getAllTagIndexes(rule)
    {
        if (rule === undefined || rule === null || rule.length < 1) return null;
        //else;//do nothing

        let tagis = [];
        for (let i = 0; i < rule.length; i++)
        {
            if (rule.charAt(i) === "/")
            {
                //console.log("found the forward slash at i = " + i + "!");
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
                                    //console.log("render the bold here at i = " + i + "!");
                                    tagis.push(i);
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
                            //console.log("render the escape character at i = " + i + "!");
                            i++;
                        }
                        //else;//do nothing
                    }
                    else if (rule.charAt(i + 1) === "i" || rule.charAt(i + 1) === "u" ||
                        rule.charAt(i + 1) === "p")
                    {
                        //render the italics or under line here
                        //console.log("render the italics or underline at i = " + i + "!");
                        tagis.push(i);
                    }
                    else if (rule.charAt(i + 1) === "b")
                    {
                        if (i + 2 < rule.length)
                        {
                            if (rule.charAt(i + 2) === "r")
                            {
                                //render the new line here
                                //console.log("render the new line here at i = " + i + "!");
                            }
                            else
                            {
                                //render the bold here
                                //console.log("render the bold here at i = " + i + "!");
                            }
                            tagis.push(i);
                        }
                        else if (i + 2 === rule.length) tagis.push(i);
                        else
                        {
                            throw new Error("illegal value found and used for index i here " +
                                "because i + 2 will at most equal the rule length, but it was greater!");
                        }
                    }
                    else if (rule.charAt(i + 1) === "s")
                    {
                        if (i + 5 < rule.length)
                        {
                            let temptagnm = "";
                            if (rule.charAt(i + 2) === "t")
                            {
                                if (i + 6 < rule.length) temptagnm = rule.substring(i, i + 6);
                                else temptagnm = rule.substring(i);
                                //console.log("temptagnm = " + temptagnm);

                                if (temptagnm === "/style")
                                {
                                    //console.log("render the style tag here at i = " + i + "!");
                                    tagis.push(i);
                                }
                                //else;//do nothing
                            }
                            else if (rule.charAt(i + 2) === "p")
                            {
                                if (i + 5 < rule.length) temptagnm = rule.substring(i, i + 5);
                                else temptagnm = rule.substring(i);
                                //console.log("temptagnm = " + temptagnm);

                                if (temptagnm === "/span")
                                {
                                    //console.log("render the span tag here at i = " + i + "!");
                                    tagis.push(i);
                                }
                                //else;//do nothing
                            }
                            //else;//do nothing
                        }
                        else if (i + 5 === rule.length)
                        {
                            let temptagnm = "";
                            if (rule.charAt(i + 2) === "p")
                            {
                                if (i + 5 < rule.length) temptagnm = rule.substring(i, i + 5);
                                else temptagnm = rule.substring(i);
                                //console.log("temptagnm = " + temptagnm);

                                if (temptagnm === "/span")
                                {
                                    //console.log("render the span tag here at i = " + i + "!");
                                    tagis.push(i);
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
            }
            //else;//do nothing
        }//end of i for loop

        return tagis;
    }

    function getTagFromIndex(rule, tagsi)
    {
        if (rule === undefined || rule === null || rule.length < 1)
        {
            throw new Error("illegal rule text found and used here!");
        }
        else
        {
            if (tagsi < 0 || (tagsi > rule.length - 1 && rule.length > 0))
            {
                console.error("rule = " + rule);
                throw new Error("illegal tagsi (" + tagsi + ") found and used here!");
            }
            //else;//do nothing
        }

        let mytagtext = "";
        if (rule.charAt(tagsi + 1) === "i" || rule.charAt(tagsi + 1) === "u" ||
            rule.charAt(tagsi + 1) === "p")
        {
            mytagtext = "/" + rule.charAt(tagsi + 1);
        }
        else if (rule.charAt(tagsi + 1) === "b")
        {
            if (tagsi + 2 < rule.length)
            {
                if (rule.charAt(tagsi + 2) === "r")
                {
                    mytagtext = "/br";
                }
                else mytagtext = "/" + rule.charAt(tagsi + 1);
            }
            else
            {
                mytagtext = "/b";
            }
        }
        else if (rule.charAt(tagsi + 1) === "/" && rule.charAt(tagsi + 2) === "/" &&
            rule.charAt(tagsi + 3) === "b")
        {
            mytagtext = "/b";
        }
        else if (rule.charAt(tagsi + 1) === "s")
        {
            if (tagsi + 5 < rule.length)
            {
                let temptagnm = "";
                if (rule.charAt(tagsi + 2) === "t")
                {
                    if (tagsi + 6 < rule.length) temptagnm = rule.substring(tagsi, tagsi + 6);
                    else temptagnm = rule.substring(tagsi);
                    //console.log("temptagnm = " + temptagnm);

                    if (temptagnm === "/style")
                    {
                        mytagtext = "/style";
                    }
                    //else;//do nothing
                }
                else if (rule.charAt(tagsi + 2) === "p")
                {
                    if (tagsi + 5 < rule.length) temptagnm = rule.substring(tagsi, tagsi + 5);
                    else temptagnm = rule.substring(tagsi);
                    //console.log("temptagnm = " + temptagnm);

                    if (temptagnm === "/span")
                    {
                        //console.log("render the span tag here at tagsi = " + tagsi + "!");
                        mytagtext = "/span";
                    }
                    //else;//do nothing
                }
                //else;//do nothing
            }
            else if (tagsi + 5 === rule.length)
            {
                let temptagnm = "";
                if (rule.charAt(tagsi + 2) === "p")
                {
                    if (tagsi + 5 < rule.length) temptagnm = rule.substring(tagsi, tagsi + 5);
                    else temptagnm = rule.substring(tagsi);
                    //console.log("temptagnm = " + temptagnm);

                    if (temptagnm === "/span")
                    {
                        //console.log("render the span tag here at tagsi = " + tagsi + "!");
                        mytagtext = "/span";
                    }
                    //else;//do nothing
                }
                //else;//do nothing
            }
            //else;//do nothing
        }
        else throw new Error("illegal tag found and used here in the tag text!");
        //console.log("mytagtext = " + mytagtext);

        return mytagtext;
    }

    function getAllTags(rule, alltagis = getAllTagIndexes(rule))
    {
        let tags = alltagis.map((tagsi) => getTagFromIndex(rule, tagsi));
        return tags;
    }

    function isStartingOrEndingTag(rule, tagindx, usestart, mytagis = getAllTagIndexes(rule))
    {
        if (rule === undefined || rule === null || rule.length < 1)
        {
            throw new Error("illegal rule text found and used here!");
        }
        else
        {
            if (tagindx < 0 || (tagindx > rule.length - 1 && rule.length > 0))
            {
                throw new Error("illegal tagindx (" + tagindx + ") found and used here!");
            }
            //else;//do nothing
        }

        if (usestart === undefined || usestart === null)
        {
            throw new Error("usestart must be a defined boolean, but it was not defined!");
        }
        else
        {
            if (usestart === true || usestart === false);
            else
            {
                throw new Error("usestart must be a defined boolean, but it was not a boolean!");
            }
        }

        let mytags = getAllTags(rule, mytagis);

        //console.log("mytagis = ", mytagis);
        //console.log("mytags = ", mytags);

        if (mytagis.length === mytags.length);
        else throw new Error("there must be the same number of tag indexs as tags!");
        
        for (let n = 0; n < mytagis.length; n++)
        {
            if (n + 1 < mytagis.length)
            {
                if (mytagis[n] < mytagis[n + 1]);
                else
                {
                    throw new Error("the indexes of tagis must be sorted in ascending order, but " +
                        "a is before b in the list and a (" + mytagis[n] + ") and b (" + mytagis[n + 1] +
                        ")!");
                }
            }
            //else;//do nothing
        }
        //console.log("the indexes are in ascending order!");

        //the first index on this list is always a starting tag
        //the last one should be an ending index, but is not always

        //for (let p = 0; p < mytags.length; p++)
        //{
        //    console.log("p = " + p);
        //    console.log("the tag: " + mytags[p] + " is found at index: " + mytagis[p] + "!");
        //}
        //console.log("");
        //console.log("tagindx = " + tagindx);

        for (let n = 0; n < mytags.length; n++)
        {
            //console.log("n = " + n);
            //console.log("the tag: " + mytags[n] + " is found at index: " + mytagis[n] + "!");
            //if it is a self closing tag in that case we have both a starting and an ending.
            if (mytagis[n] === tagindx)
            {
                if (mytags[n] === "/br")
                {
                    //console.log("this tag is self-closing!");
                    return true;
                }
                //else;//do nothing
            }
            //else;//do nothing not a self closing tag

            if (mytagis[0] === tagindx)
            {
                //this is a starting index
                //console.log("this is a starting index!");
                return usestart;
            }
            else
            {
                if (mytagis[n] === tagindx)
                {
                    //since mytagis are sorted, we can say that we need to know the
                    //number of the same tag found before and including this one
                    //if that number is even, then we have a starting tag.
                    //if that number is odd, then we have an ending tag.
                    //console.log("this is our tagindx (" + tagindx + ") the one we were looking for!");
                    //console.log("the current tag is: mytags[n=" + n + "] = " + mytags[n]);

                    let numtags = 0;
                    for (let k = 0; k < n + 1; k++)
                    {
                        if (mytags[k] === mytags[n]) numtags++;
                        //else;//do nothing
                    }
                    //console.log("numtags = " + numtags);//includes the current tag

                    //1 is starting, 2 is ending, 0 is invalid...
                    if (numtags < 1)
                    {
                        throw new Error("invalid number of tags found! We must have at least one!");
                    }
                    else
                    {
                        if (numtags % 2 === 0)
                        {
                            //console.log("this is an ending tag!");
                            return !usestart;
                        }
                        else
                        {
                            //console.log("this is a starting tag!");
                            return usestart;
                        }
                    }
                }
                //else;//do nothing
            }
        }

        //if no tags or tagindx is not found, then error
        throw new Error("no tags or tagindx not found or not valid!");
    }
    function isStartingTag(rule, tagsi, alltagis = getAllTagIndexes(rule))
    {
        return isStartingOrEndingTag(rule, tagsi, true, alltagis);
    }
    function isEndingTag(rule, tagsi, alltagis = getAllTagIndexes(rule))
    {
        return isStartingOrEndingTag(rule, tagsi, false, alltagis);
    }


    function isTagIndexOnListOfIndexes(rule, tagsi, alltagis = getAllTagIndexes(rule))
    {
        if (alltagis === undefined || alltagis === null || alltagis.length < 1) return false;
        else
        {
            for (let n = 0; n < alltagis.length; n++)
            {
                if (alltagis[n] === tagsi) return true;
                //else;//do nothing
            }
            return false;
        }
    }


    function getStartingOrEndingTagIndexes(rule, alltagis, usestart)
    {
        if (usestart === undefined || usestart === null)
        {
            throw new Error("usestart must be a defined boolean, but it was not defined!");
        }
        else
        {
            if (usestart === true || usestart === false);
            else
            {
                throw new Error("usestart must be a defined boolean, but it was not a boolean!");
            }
        }

        if (rule === undefined || rule === null || rule.length < 1)
        {
            throw new Error("illegal rule text found and used here!");
        }
        //else;//do nothing

        if (alltagis === undefined || alltagis === null || alltagis.length < 1)
        {
            return null;
        }
        //else;//do nothing

        let sis = [];
        let eis = [];
        for (let n = 0; n < alltagis.length; n++)
        {
            let isstart = isStartingTag(rule, alltagis[n], alltagis);
            let isend = isEndingTag(rule, alltagis[n], alltagis);
            //console.log("alltagis[" + n + "] = " + alltagis[n]);
            //console.log("isstart = " + isstart);
            //console.log("isend = " + isend);
            
            if (isstart) sis.push(alltagis[n]);
            //else;//do nothing
            if (isend) eis.push(alltagis[n]);
            //else;//do nothing
            
            if (isstart || isend);
            else
            {
                throw new Error("every tag on the all tags list must also be on either the starting " +
                    "tags list or the ending tags list or sometimes both!");
            }
        }

        if (usestart) return sis;
        else return eis;
    }
    function getStartingTagIndexs(rule, alltagis = getAllTagIndexes(rule))
    {
        return getStartingOrEndingTagIndexes(rule, alltagis, true);
    }
    function getEndingTagIndexs(rule, alltagis = getAllTagIndexes(rule))
    {
        return getStartingOrEndingTagIndexes(rule, alltagis, false);
    }


    function getTagPairIndex(rule, tagindx, alltagis = getAllTagIndexes(rule))
    {
        const stis = getStartingTagIndexs(rule, alltagis);
        const etis = getEndingTagIndexs(rule, alltagis);
        const mytag = getTagFromIndex(rule, tagindx);
        //console.log("getpairindex: alltags = ", getAllTags(rule, alltagis));
        //console.log("getpairindex: mytag = " + mytag);
        //console.log("getpairindex: alltagis = ", alltagis);
        //console.log("getpairindex: stis = ", stis);
        //console.log("getpairindex: etis = ", etis);

        let ististarti = false;
        for (let n = 0; n < stis.length; n++)
        {
            if (stis[n] === tagindx)
            {
                ististarti = true;
                break;
            }
            //else;//do nothing
        }
        //console.log("getpairindex: ististarti = " + ististarti);

        let istiei = false;
        for (let n = 0; n < etis.length; n++)
        {
            if (etis[n] === tagindx)
            {
                istiei = true;
                break;
            }
            //else;//do nothing
        }
        //console.log("getpairindex: istiei = " + istiei);
        //console.log("getpairindex: tagindx = " + tagindx);

        if (ististarti === istiei)
        {
            if (ististarti) return tagindx;
            else
            {
                throw new Error("the given index is neither a start index nor is it an ending index " +
                    "and it must be one or the other or both, but it must be one of them!");
            }
        }
        else
        {
            //console.log("getpairindex: mytag = " + mytag);

            let pi = -1;
            if (ististarti)
            {
                //we are looking for an ending index for our tag after the starting index
                //it will be the first one after our starting index
                for (let n = 0; n < etis.length; n++)
                {
                    if (tagindx > etis[n]);
                    else if (tagindx === etis[n])
                    {
                        throw new Error("the case should have already been handled above!");
                    }
                    else
                    {
                        let ctag = getTagFromIndex(rule, etis[n]);
                        //console.log("getpairindex: ctag = " + ctag);

                        if (mytag === ctag)
                        {
                            pi = etis[n];
                            break;
                        }
                        //else;//do nothing
                    }
                }//end of n for loop
            }
            else
            {
                //we are looking for a starting index for our tag before the ending index
                //it will be the one just before the ending index
                for (let n = stis.length - 1; (n > 0 || n === 0) && n < stis.length; n--)
                {
                    if (tagindx < stis[n]);
                    else if (tagindx === stis[n])
                    {
                        throw new Error("the case should have already been handled above!");
                    }
                    else
                    {
                        let ctag = getTagFromIndex(rule, stis[n]);
                        //console.log("getpairindex: ctag = " + ctag);

                        if (mytag === ctag)
                        {
                            pi = stis[n];
                            break;
                        }
                        //else;//do nothing
                    }
                }//end of n for loop
            }
            //console.log("getpairindex: FINAL mytag = " + mytag);
            //console.log("getpairindex: FINAL tagindx = " + tagindx);
            //console.log("getpairindex: FINAL pi = " + pi);

            if (pi < 0 || (pi > rule.length - 1 && rule.length > 0))
            {
                console.error("no tag pairs with this one or invalid tag index found and used here!");
            }
            //else;//do nothing

            return pi;
        }
    }


    function areAllTagsStartingOrEndingTags(rule, usestart, alltagis = getAllTagIndexes(rule))
    {
        let startingtis = getStartingTagIndexs(rule, alltagis);
        let endingtis = getEndingTagIndexs(rule, alltagis);

        let myisstartingtis = [];
        for (let n = 0; n < alltagis.length; n++)
        {
            let issi = false;
            let kmax = -1;
            if (usestart) kmax = startingtis.length;
            else kmax = endingtis.length;
            for (let k = 0; k < kmax; k++)
            {
                if (usestart) issi = (alltagis[n] === startingtis[k]);
                else issi = (alltagis[n] === endingtis[k]);
                if (issi) break;
                //else;//do nothing
            }
            myisstartingtis[n] = issi;
        }

        return myisstartingtis;
    }
    function areAllTagsStartingTags(rule, alltagis = getAllTagIndexes(rule))
    {
        return areAllTagsStartingOrEndingTags(rule, true, alltagis);
    }
    function areAllTagsEndingTags(rule, alltagis = getAllTagIndexes(rule))
    {
        return areAllTagsStartingOrEndingTags(rule, false, alltagis);
    }

    function areAllTagsSelfClosing(rule, alltagis = getAllTagIndexes(rule))
    {
        let startingtags = areAllTagsStartingTags(rule, alltagis);
        let endingtags = areAllTagsEndingTags(rule, alltagis);

        //the tag must be on both to be self closing
        let areallselfclosing = [];
        for (let n = 0; n < alltagis.length; n++)
        {
            areallselfclosing[n] = (startingtags[n] && endingtags[n]);
        }
        return areallselfclosing;
    }


    function getLevelsForAllTags(rule, alltagis = getAllTagIndexes(rule))
    {
        //<b><u><i> ... </i></u></b>
        //11122233344444333322221111

        //<b><u><i> ... </i></b></u>
        //11122233344444333322221111

        //<b><u><i> ... </i><p> ... </p></u></b>
        //11122233344444333333344444333322221111

        //when level is 10 or more say it anyways but have a display method to:
        //1112223334444...10...44444333322221111 to
        //1112223334444...0...44444333322221111
        //                1                    
        //                1                    ...

        //console.log("rule = " + rule);
        //console.log("alltagis = ", alltagis);

        if (rule === undefined || rule === null || rule.length < 1) return null;
        else if (alltagis === undefined || alltagis === null || alltagis.length < 1)
        {
            let mylvs = [];
            for (let i = 0; i < rule.length; i++) mylvs[i] = 1;
            return mylvs;
        }
        //else;//do nothing safe to proceed
        //get the tags, then we want to know the type of tag
        let mytags = getAllTags(rule, alltagis);
        let aretagssis = areAllTagsStartingTags(rule, alltagis);
        let aretagseis = areAllTagsEndingTags(rule, alltagis);
        let aretagsscs = areAllTagsSelfClosing(rule, alltagis);
        //console.log("mytags = ", mytags);
        //console.log("alltagis = ", alltagis);
        //console.log("aretagssis = ", aretagssis);
        //console.log("aretagseis = ", aretagseis);
        //console.log("aretagsscs = ", aretagsscs);
        //console.log("");

        //console.log("alltag information:");
        //for (let n = 0; n < alltagis.length; n++)
        //{
        //    console.log("mytags[" + n + "] = " + mytags[n]);
        //    console.log("alltagis[" + n + "] = " + alltagis[n]);
        //    console.log("aretagssis[" + n + "] = " + aretagssis[n]);
        //    console.log("aretagseis[" + n + "] = " + aretagseis[n]);
        //    console.log("aretagssis[" + n + "] = " + aretagsscs[n]);
        //}
        //console.log("");

        let mylvs = [];
        for (let i = 0; i < rule.length; i++) mylvs[i] = -1;

        let clv = 1;
        for (let i = 0; i < rule.length; i++)
        {
            let isatagi = false;
            let mytagi = -1;
            for (let k = 0; k < alltagis.length; k++)
            {
                if (alltagis[k] === i)
                {
                    isatagi = true;
                    mytagi = k;
                    break;
                }
                //else;//do nothing
            }//end of k for loop
            //console.log("isatagi = " + isatagi);
            //console.log("mytagi = " + mytagi);

            if (isatagi)
            {
                if (mytagi < 0 || (mytagi > alltagis.length - 1 && alltagis.length > 0) ||
                    alltagis.length === 0)
                {
                    throw new Error("mytagi was set incorrectly!");
                }
                //else;//do nothing

                //console.log("found my tag at i = " + i + "!");
                //console.log("mytags[" + mytagi + "] = " + mytags[mytagi]);
                //console.log("alltagis[" + mytagi + "] = " + alltagis[mytagi]);
                //console.log("aretagssis[" + mytagi + "] = " + aretagssis[mytagi]);
                //console.log("aretagseis[" + mytagi + "] = " + aretagseis[mytagi]);
                //console.log("aretagssis[" + mytagi + "] = " + aretagsscs[mytagi]);

                //need to know how long the tag is
                //then from index to length is all still current level
                //unless it is a closing tag
                //if it is self closing tag do not increment/decrement level

                let mytag = mytags[mytagi];
                //console.log("mytag = " + mytag);
                //console.log("mytag.length = " + mytag.length);

                if (aretagsscs[mytagi])
                {
                    //console.log("this tag is self-closing!");
                }
                else
                {
                    if (aretagseis[mytagi])
                    {
                        //console.log("this tag is a closing tag!");

                        if (aretagssis[mytagi])
                        {
                            throw new Error("the tag cannot be both a closing and starting tag " +
                                "since it was not self-closing!");
                        }
                        //else;//do nothing
                    }
                    else if (aretagssis[mytagi])
                    {
                        //console.log("this tag is a starting tag!");

                        if (aretagseis[mytagi])
                        {
                            throw new Error("the tag cannot be both a closing and starting tag " +
                                "since it was not self-closing!");
                        }
                        //else;//do nothing
                    }
                    else
                    {
                        throw new Error("the tag is not a starting tag, nor is it a closing tag, nor " +
                            "is it a self-closing tag, but it must be one of those options!");
                    }
                }
                //console.log("OLD BEFORE SETTING LEVELS clv = " + clv);

                if (aretagsscs[mytagi]);
                else if (aretagseis[mytagi]) clv--;
                //else;//do nothing
                //console.log("NEW clv = " + clv);

                for (let k = i; k < i + mytag.length; k++)
                {
                    mylvs[k] = clv;
                    //console.log("NEW mylvs[" + k + "] = " + mylvs[k]);
                }
                //console.log("OLD AFTER SETTING LEVELS clv = " + clv);

                if (aretagsscs[mytagi]);
                else if (aretagssis[mytagi]) clv++;
                //else;//do nothing
                //console.log("NEW clv = " + clv);

                i += mytag.length - 1;
                //console.log("NEW i = " + i);

                continue;
            }
            else
            {
                if (mytagi < 0 || (mytagi > alltagis.length - 1 && alltagis.length > 0) ||
                    alltagis.length === 0)
                {
                    //do nothing valid
                }
                else throw new Error("mytagi was set incorrectly!");

                mylvs[i] = clv;
            }
            //console.log("NEW mylvs[" + i + "] = " + mylvs[i]);
        }//end of i for loop
        //console.log("FINAL  rule = " + rule);
        //console.log("FINAL mylvs = ", mylvs);


        //begin error checking the levels here before returning
        if (mylvs.length === rule.length);
        else throw new Error("invalid number of levels found!");
        for (let i = 0; i < rule.length; i++)
        {
            if (mylvs[i] < 1 || mylvs[i] > rule.length - 1)
            {
                throw new Error("invalid level found at i = " + i + "!");
            }
            //else;//do nothing
        }
        if (mylvs[0] === mylvs[rule.length - 1] && mylvs[0] === 1);
        else throw new Error("the start and end levels should be the same, but they were not!");

        //need to make sure that the starting tags and the ending tags or tag pair indexes
        //all have levels that are the same
        for (let n = 0; n < alltagis.length; n++)
        {
            let pi = getTagPairIndex(rule, alltagis[n], alltagis);
            //console.log("pi = " + pi);
            //console.log("alltagis[" + n + "] = " + alltagis[n]);
            //console.log("mylvs[" + pi + "] = " + mylvs[pi]);
            //console.log("mylvs[alltagis[" + n + "]] = " + mylvs[alltagis[n]]);
            
            if (mylvs[pi] === mylvs[alltagis[n]]);
            else
            {
                throw new Error("found at least one pair of tags at (" + pi + " and " + alltagis[n] +
                    ") that do not have the same level!");
            }
        }//end of n for loop

        return mylvs;
    }


    function getLevelsDisplayStrOrStrs(rule, levels, useonedigitforlevelsperstr = true)
    {
        if (levels === undefined || levels === null) return null;
        else if (levels.length < 1) return [""];
        else
        {
            let maxlevel = levels[0];
            let maxleveli = 0;
            for (let n = 0; n < levels.length; n++)
            {
                if (maxlevel < levels[n])
                {
                    maxlevel = levels[n];
                    maxleveli = n;
                }
                //else;//do nothing
            }
            console.log("maxlevel = " + maxlevel);
            console.log("maxleveli = " + maxleveli);

            if (maxlevel < 1 || maxleveli < 0 || ((maxleveli > levels.length - 1) && levels.length > 0))
            {
                throw new Error("illegal maximum level present!");
            }
            //else;//do nothing

            //need to know the biggest power of 10 underneath n
            const maxlevelstr = "" + maxlevel;
            console.log("maxlevelstr.length = " + maxlevelstr.length);
                
            const mypow = maxlevelstr.length;
            console.log("FINAL mypow = " + mypow);
            
            let mypowoften = 1;
            if (useonedigitforlevelsperstr)
            {
                for (let n = 0; n < mypow; n++) mypowoften *= 10;
                console.log("FINAL mypowoften = " + mypowoften);
            }
            //else;//do nothing
            
            //111112222...10...22221111 to
            //111112222...0...22221111
            //0          010         0

            //log ones place 90
            //log tens place 01
            //log hundreds place
            //...

            let mystrs = [];
            for (let n = 0; n < mypow; n++)
            {
                console.log("n = " + n);

                let mynumpow = 1;
                if (useonedigitforlevelsperstr)
                {
                    for (let k = 0; k < n + 1; k++) mynumpow *= 10;
                    console.log("mynumpow = " + mynumpow);
                }
                //else;//do nothing

                let str = "";
                for (let i = 0; i < levels.length; i++)
                {
                    if (useonedigitforlevelsperstr)
                    {
                        //console.log("levels[" + i + "] = " + levels[i]);
                        //console.log("(levels[" + i + "] % " + mynumpow + ") = " +
                        //    (levels[i] % mynumpow));
                        //console.log(mynumpow + " / 10 = " + (mynumpow / 10));
                        //console.log("((levels[" + i + "] % " + mynumpow + ") / (" + mynumpow +
                        //    " / 10)) = " + ((levels[i] % mynumpow) / (mynumpow / 10)));
                        
                        let myval = Math.trunc((levels[i] % mynumpow) / (mynumpow / 10));
                        //console.log("myval = " + myval);

                        if (n === 0 || i === 0 || i + 1 === levels.length)
                        {
                            //display it...
                            str += "" + myval;
                        }
                        else
                        {
                            if (i + 1 < levels.length)
                            {
                                let mynextval = Math.trunc((levels[i + 1] % mynumpow) / (mynumpow / 10));
                                //console.log("mynextval = " + mynextval);

                                let myprevval = Math.trunc((levels[i - 1] % mynumpow) / (mynumpow / 10));
                                //console.log("myprevval = " + myprevval);

                                if (myval !== mynextval || myprevval !== myval) str += "" + myval;
                                else str += " ";
                            }
                            else throw new Error("this case must have been handled already above!");
                        }
                    }
                    else str += "" + levels[i];
                }//end of i for loop
                mystrs[n] = "" + str;
                console.log("NEW mystrs[" + n + "] = " + mystrs[n]);
            }//end of n for loop
            console.log("");

            if (rule === undefined || rule === null) console.log("");
            else console.log(rule);
            for (let p = 0; p < mypow; p++)
            {
                console.log(mystrs[p] + " = FINAL mystrs[" + p + "]!");
            }
            return mystrs;
        }
    }
    function getLevelsAndDisplayStrOrStrs(rule, useonedigitforlevelsperstr,
        alltagis = getAllTagIndexes(rule))
    {
        return getLevelsDisplayStrOrStrs(rule, getLevelsForAllTags(rule, alltagis),
            useonedigitforlevelsperstr);
    }
    function getLevelsAndDisplayStrs(rule, alltagis = getAllTagIndexes(rule))
    {
        return getLevelsAndDisplayStrOrStrs(rule, true, alltagis);
    }
    function getLevelsAndDisplayStr(rule, alltagis = getAllTagIndexes(rule))
    {
        return getLevelsAndDisplayStrOrStrs(rule, false, alltagis);
    }
    function getLevelsDisplayStrs(levels, rule = "")
    {
        return getLevelsDisplayStrOrStrs(rule, levels, true);
    }
    function getLevelsDisplayStr(levels, rule = "")
    {
        let mystrs = getLevelsDisplayStrOrStrs(rule, levels, false);
        if (mystrs === null) return null;
        else if (mystrs.length < 1) return "";
        else return "" + mystrs[0];
    }

    function isValidTagsMarkup(rule, alltagis = getAllTagIndexes(rule))
    {
        //need to make sure that the start indexes and the end indexes have the same number
        //need to make sure that we don't have this: <b><u><i> ... </i></b></u> or rather /b/u/i ... /i/b/u
        
        //pair tag indexes must be on the same level
        //if they are not, then the markup is invalid
        //need to make sure that there is proper closing with nesting otherwise
        //-kill or open in editing mode

        try
        {
            let mydispstrs = getLevelsAndDisplayStrs(rule, alltagis);
            if (mydispstrs === undefined || mydispstrs === null || mydispstrs.length < 1);
            else
            {
                console.log(rule + " (rule)");
                for (let p = 0; p < mydispstrs.length; p++)
                {
                    let mypowten = 1;
                    for (let k = 0; k < p; k++) mypowten *= 10;
                    console.log(mydispstrs[p] + " (levels, " + mypowten + "s place)");
                }
            }
            return true;
        }
        catch(err)
        {
            console.error("there was a problem getting the levels!");
            console.error(err);
            return false;
        }
        //return false;
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

        //we can see anyone above, but the style must be after one of them.
        let mytagis = getAllTagIndexes(rule);
        console.log("genmarkup: mytagis = ", mytagis);
        
        let mytags = getAllTags(rule, mytagis);
        console.log("genmarkup: mytags = ", mytags);

        let stis = getStartingOrEndingTagIndexes(rule, mytagis, true);
        console.log("genmarkup: stis = ", stis);
        
        let etis = getStartingOrEndingTagIndexes(rule, mytagis, false);
        console.log("genmarkup: etis = ", etis);

        for (let n = 0; n < mytagis.length; n++)
        {
            let pairi = getTagPairIndex(rule, mytagis[n], mytagis);
            console.log("genmarkup call 1: pair tag index for indx (" + mytagis[n] + ") = " + pairi);

            if (pairi < 0 || (pairi > rule.length - 1 && rule.length > 0) || rule.length === 0)
            {
                throw new Error("the tag found at index " + mytagis[n] + " has an invalid pair index!");
            }
            //else;//do nothing
            
            let opairi = getTagPairIndex(rule, pairi, mytagis);
            console.log("genmarkup call 2: pair tag index for indx (" + mytagis[n] + ") = " + pairi);
            console.log("genmarkup: pair tag index for indx (" + pairi + ") = " + opairi);
            if (mytagis[n] === opairi);
            else throw new Error("the indexes for the pairs must match up, but they did not!");
        }

        //console.log(getLevelsDisplayStrs([1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,
        //    9,9,9,10,100,10,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,4,4,4,4,3,3,3,3,3,2,2,2,2,2,1,1,1,1,1]));

        //console.log(getLevelsAndDisplayStrs(rule, mytagis));

        if (isValidTagsMarkup(rule, mytagis));
        else
        {
            //run the code again and get the error message and then do something about it...
            //open the editing mode...
            throw new Error("NOT DONE YET 9-20-2023 3:11 AM!");
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
                                    if (isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
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
                        if (isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
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
                            if (isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
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
                                    if (isTagIndexOnListOfIndexes(rule, i, stis))
                                    {
                                        let pi = getTagPairIndex(rule, i, mytagis);
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
                                    if (isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
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
                                    if (isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
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
                <li key={mytypestr + gameobj.name + index}
                    dangerouslySetInnerHTML={createMarkUp(generateMarkUpForDisplayFromRule(rule))} />);
        }
        else
        {
            mylis = arr.map((rule, index) =>
                <ul key={"edit" + mytypestr + gameobj.name + index}>
                    <li key={"current" + mytypestr + gameobj.name + index}>
                        <textarea key={"current" + mytypestr + "rawtext" + gameobj.name + index}
                            id={"current" + mytypestr + "rawtext" + gameobj.name + index}
                            value={rule} style={{width: "1100px"}}
                            onChange={(event) => handleEditChange(event, userules, usebasic)} />
                    </li>
                    <li key={mytypestr + gameobj.name + index}
                        dangerouslySetInnerHTML={generateAndCreateMarkUpForDisplayFrom(rule, false)} />
                </ul>
            );
        }
        return mylis;
    }

    function changeEditingMode(event, userules, usebasic)
    {
        console.log("event.target = ", event.target);
        console.log("event.target.id = " + event.target.id);
        console.log("event.target.value = ", event.target.value);
        console.log("userules = " + userules);
        console.log("usebasic = " + usebasic);

        if (userules)
        {
            if (usebasic) setEditBasic(!editbasic);
            else setEditVegas(!editvegas);
        }
        else setEditStrats(!editstrats);

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
        console.log("notediting = " + notediting);

        if (notediting)
        {
            //now save all of the changes to state...
            //need to update the games object
            //also need to call setGames method
            //need access to it...
            //need to rebuild the games object before calling setGames
            //need to get all of the updates and then overrite state with the new rules...
            //need a way to add rules in editing mode...
            throw new Error("NOT DONE YET 9-23-2023 4:15 AM!");
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

    return (
        <div>
            <h1>Rules And Strategies For <u>{gameobj.name}</u>:</h1>
            <details>
                <summary>Rules:</summary>
                <p>Basic:<button
                    onClick={(event) => changeEditingMode(event, true, true)}>Edit Basic Rules</button></p>
                <ul>{editbasic ? mybasicruleeditlis : mybasicrulelis}</ul>
                <p>Vegas Style:<button
                    onClick={(event) => changeEditingMode(event, true, false)}>
                        Edit Vegas Style Rules</button></p>
                <ul>{editvegas ? myvegasruleeditlis : myvegasrulelis}</ul>
            </details>
            <details>
                <summary>Strategies:<button
                    onClick={(event) => changeEditingMode(event, false, false)}>Edit Strategies</button>
                </summary>
                <ul>{editstrats ? mystratsruleeditlis : mystratlis}</ul>
            </details>
        </div>
    );
}

export default RulesNStrategies;
