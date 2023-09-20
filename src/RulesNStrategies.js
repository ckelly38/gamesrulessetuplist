import React from "react";
import './App.css';

function RulesNStrategies({games, gameobj})
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
                        //just render the escape character
                        //console.log("render the escape character at i = " + i + "!");
                        i++;
                    }
                    else if (rule.charAt(i + 1) === "i" || rule.charAt(i + 1) === "u")
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
        if (rule.charAt(tagsi + 1) === "i" || rule.charAt(tagsi + 1) === "u")
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
                console.error("the starting tag is actually an ending tag!");
            }
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
        throw new Error("NOT DONE YET 9-19-2023 4:30 AM!");
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
        throw new Error("NOT DONE YET 9-19-2023 4:30 AM!");
    }

    function generateMarkUpForDisplayFromRule(rule)
    {
        //need some way of Bolding, Underlining, Italicizing, Changing the Font Color, Changing the Font,
        //adding a new line like both br and p
        //How about /b /i /u /br /p
        //when the next character is r use /b/
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
            
            let opairi = getTagPairIndex(rule, pairi, mytagis);
            console.log("genmarkup call 2: pair tag index for indx (" + mytagis[n] + ") = " + pairi);
            console.log("genmarkup: pair tag index for indx (" + pairi + ") = " + opairi);
            if (mytagis[n] === opairi);
            else throw new Error("the indexes for the pairs must match up, but they did not!");
        }

        console.log(getLevelsDisplayStrs([1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,
            9,9,9,10,100,10,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,4,4,4,4,3,3,3,3,3,2,2,2,2,2,1,1,1,1,1]));

        /*
        let rulemkup = "";
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
                        //just render the escape character
                        console.log("render the escape character at i = " + i + "!");
                        rulemkup += rule.charAt(i);
                        i++;
                    }
                    else if (rule.charAt(i + 1) === "i" || rule.charAt(i + 1) === "u")
                    {
                        //render the italics or under line here
                        console.log("render the italics or underline at i = " + i + "!");
                    }
                    else if (rule.charAt(i + 1) === "b")
                    {
                        if (i + 2 < rule.length)
                        {
                            if (rule.charAt(i + 2) === "r")
                            {
                                //render the new line here
                                console.log("render the new line here at i = " + i + "!");
                            }
                            else
                            {
                                //render the bold here
                                console.log("render the bold here at i = " + i + "!");
                            }
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
        //*/

        return rule;
    }

    function createMarkUp(content)
    {
        return {__html: "" + content};
    }

    let mybasicrulelis = gameobj.rules.basic.map((rule, index) =>
        <li key={"basic" + gameobj.name + index}
        dangerouslySetInnerHTML={createMarkUp(generateMarkUpForDisplayFromRule(rule))} />);
    let myvegasrulelis = gameobj.rules.vegasstyle.map((rule, index) =>
        <li key={"vegas" + gameobj.name + index}
        dangerouslySetInnerHTML={createMarkUp(generateMarkUpForDisplayFromRule(rule))} />);
    let mystratlis = gameobj.strategies.map((rule, index) =>
        <li key={"strats" + gameobj.name + index}
        dangerouslySetInnerHTML={createMarkUp(generateMarkUpForDisplayFromRule(rule))} />);
    
    return (
        <div>
            <h1>Rules And Strategies For <u>{gameobj.name}</u>:</h1>
            <details>
                <summary>Rules:</summary>
                <p>Basic:</p>
                <ul>{mybasicrulelis}</ul>
                <p>Vegas Style:</p>
                <ul>{myvegasrulelis}</ul>
            </details>
            <details>
                <summary>Strategies:</summary>
                <ul>{mystratlis}</ul>
            </details>
        </div>
    );
}

export default RulesNStrategies;
