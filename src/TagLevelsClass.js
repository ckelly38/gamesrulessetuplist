class TagLevelsClass {
    constructor(mrule)
    {
        this.rule = mrule;
    }

    getAllTagIndexes(rule)
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

    getTagFromIndex(rule, tagsi)
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

    getAllTags(rule, alltagis = this.getAllTagIndexes(rule))
    {
        const mycntxt = this;
        let tags = alltagis.map((tagsi) => mycntxt.getTagFromIndex(rule, tagsi));
        return tags;
    }

    isStartingOrEndingTag(rule, tagindx, usestart, mytagis = this.getAllTagIndexes(rule))
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

        let mytags = this.getAllTags(rule, mytagis);

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
    isStartingTag(rule, tagsi, alltagis = this.getAllTagIndexes(rule))
    {
        return this.isStartingOrEndingTag(rule, tagsi, true, alltagis);
    }
    isEndingTag(rule, tagsi, alltagis = this.getAllTagIndexes(rule))
    {
        return this.isStartingOrEndingTag(rule, tagsi, false, alltagis);
    }


    isTagIndexOnListOfIndexes(rule, tagsi, alltagis = this.getAllTagIndexes(rule))
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


    getStartingOrEndingTagIndexes(rule, alltagis, usestart)
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
            let isstart = this.isStartingTag(rule, alltagis[n], alltagis);
            let isend = this.isEndingTag(rule, alltagis[n], alltagis);
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
    getStartingTagIndexs(rule, alltagis = this.getAllTagIndexes(rule))
    {
        return this.getStartingOrEndingTagIndexes(rule, alltagis, true);
    }
    getEndingTagIndexs(rule, alltagis = this.getAllTagIndexes(rule))
    {
        return this.getStartingOrEndingTagIndexes(rule, alltagis, false);
    }


    getTagPairIndex(rule, tagindx, alltagis = this.getAllTagIndexes(rule))
    {
        const stis = this.getStartingTagIndexs(rule, alltagis);
        const etis = this.getEndingTagIndexs(rule, alltagis);
        const mytag = this.getTagFromIndex(rule, tagindx);
        //console.log("getpairindex: alltags = ", this.getAllTags(rule, alltagis));
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
                        let ctag = this.getTagFromIndex(rule, etis[n]);
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
                        let ctag = this.getTagFromIndex(rule, stis[n]);
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


    areAllTagsStartingOrEndingTags(rule, usestart, alltagis = this.getAllTagIndexes(rule))
    {
        if (alltagis === undefined || alltagis === null) return null;
        //else;//do nothing
        
        let startingtis = this.getStartingTagIndexs(rule, alltagis);
        let endingtis = this.getEndingTagIndexs(rule, alltagis);

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
    areAllTagsStartingTags(rule, alltagis = this.getAllTagIndexes(rule))
    {
        return this.areAllTagsStartingOrEndingTags(rule, true, alltagis);
    }
    areAllTagsEndingTags(rule, alltagis = this.getAllTagIndexes(rule))
    {
        return this.areAllTagsStartingOrEndingTags(rule, false, alltagis);
    }

    areAllTagsSelfClosing(rule, alltagis = this.getAllTagIndexes(rule))
    {
        let startingtags = this.areAllTagsStartingTags(rule, alltagis);
        let endingtags = this.areAllTagsEndingTags(rule, alltagis);

        //the tag must be on both to be self closing
        let areallselfclosing = [];
        for (let n = 0; n < alltagis.length; n++)
        {
            areallselfclosing[n] = (startingtags[n] && endingtags[n]);
        }
        return areallselfclosing;
    }


    getLevelsForAllTags(rule, alltagis = this.getAllTagIndexes(rule))
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
        let mytags = this.getAllTags(rule, alltagis);
        let aretagssis = this.areAllTagsStartingTags(rule, alltagis);
        let aretagseis = this.areAllTagsEndingTags(rule, alltagis);
        let aretagsscs = this.areAllTagsSelfClosing(rule, alltagis);
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
            let pi = this.getTagPairIndex(rule, alltagis[n], alltagis);
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


    getLevelsDisplayStrOrStrs(rule, levels, useonedigitforlevelsperstr = true)
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
            //console.log("maxlevel = " + maxlevel);
            //console.log("maxleveli = " + maxleveli);

            if (maxlevel < 1 || maxleveli < 0 || ((maxleveli > levels.length - 1) && levels.length > 0))
            {
                throw new Error("illegal maximum level present!");
            }
            //else;//do nothing

            //need to know the biggest power of 10 underneath n
            const maxlevelstr = "" + maxlevel;
            //console.log("maxlevelstr.length = " + maxlevelstr.length);
                
            const mypow = maxlevelstr.length;
            //console.log("FINAL mypow = " + mypow);
            
            let mypowoften = 1;
            if (useonedigitforlevelsperstr)
            {
                for (let n = 0; n < mypow; n++) mypowoften *= 10;
                //console.log("FINAL mypowoften = " + mypowoften);
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
                //console.log("n = " + n);

                let mynumpow = 1;
                if (useonedigitforlevelsperstr)
                {
                    for (let k = 0; k < n + 1; k++) mynumpow *= 10;
                    //console.log("mynumpow = " + mynumpow);
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
                //console.log("NEW mystrs[" + n + "] = " + mystrs[n]);
            }//end of n for loop
            console.log("");

            if (rule === undefined || rule === null) console.log("");
            else console.log(rule + " (rule)");
            for (let p = 0; p < mypow; p++)
            {
                console.log(mystrs[p] + " = FINAL mystrs[" + p + "]!");
            }
            return mystrs;
        }
    }
    getLevelsAndDisplayStrOrStrs(rule, useonedigitforlevelsperstr,
        alltagis = this.getAllTagIndexes(rule))
    {
        return this.getLevelsDisplayStrOrStrs(rule, this.getLevelsForAllTags(rule, alltagis),
            useonedigitforlevelsperstr);
    }
    getLevelsAndDisplayStrs(rule, alltagis = this.getAllTagIndexes(rule))
    {
        return this.getLevelsAndDisplayStrOrStrs(rule, true, alltagis);
    }
    getLevelsAndDisplayStr(rule, alltagis = this.getAllTagIndexes(rule))
    {
        return this.getLevelsAndDisplayStrOrStrs(rule, false, alltagis);
    }
    getLevelsDisplayStrs(levels, rule = "")
    {
        return this.getLevelsDisplayStrOrStrs(rule, levels, true);
    }
    getLevelsDisplayStr(levels, rule = "")
    {
        let mystrs = this.getLevelsDisplayStrOrStrs(rule, levels, false);
        if (mystrs === null) return null;
        else if (mystrs.length < 1) return "";
        else return "" + mystrs[0];
    }

    isValidTagsMarkup(rule, alltagis = this.getAllTagIndexes(rule))
    {
        //need to make sure that the start indexes and the end indexes have the same number
        //need to make sure that we don't have this: <b><u><i> ... </i></b></u> or rather /b/u/i ... /i/b/u
        
        //pair tag indexes must be on the same level
        //if they are not, then the markup is invalid
        //need to make sure that there is proper closing with nesting otherwise
        //-kill or open in editing mode

        try
        {
            let mydispstrs = this.getLevelsAndDisplayStrs(rule, alltagis);
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

    getRawIndexRelativeToParts(myparts, txtonlyindx, myformattingparts, usestart)
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

        if (usestart === undefined || usestart === null)
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

    getSelectedTextAndDOMObj()
    {
        let myselect = window.getSelection();
        let docselect = document.selection;
        let usedocselect = false;
        console.log("myselect = ", myselect);
        console.log("docselect = ", docselect);
        
        if (myselect === undefined || myselect === null || myselect.toString().length < 1)
        {
            if (docselect === undefined || docselect === null) return null;
            else
            {
                if (docselect.createRange().text.length < 1) return null;
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

        if (myseltext.length < 1) return null;
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

        let myretobj = {
            mydomnd: mydomnd,
            myseltext: myseltext
        };
        return myretobj;
    }

    getRawTextStartAndEndIndexs(israwtext, treatasrawtext, myhtmlsi, myhtmlei,
        myseltxtdomndobj, myruletext, mytagis, stagis, etagis, mytagnms, mytaglvs)
    {
        let rawtextsi = -1;
        let rawtextei = -1;
        if (israwtext || treatasrawtext)
        {
            //best case position for selection is absolute
            //the rule text is myseltxtdomndobj.mydomnd.textContent

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
            //in this case, one rule is displayed text only (myseltxtdomndobj.mydomnd.textContent)
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
                console.log("myseltxtdomndobj.mydomnd.textContent.charAt(mytxtonlyi=" + mytxtonlyi +
                    ") = " + myseltxtdomndobj.mydomnd.textContent.charAt(mytxtonlyi));
                if (myruletext.charAt(i) === myseltxtdomndobj.mydomnd.textContent.charAt(mytxtonlyi))
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
            rawtextsi = mytaglvs.getRawIndexRelativeToParts(myparts, myhtmlsi, myformattingparts, true);
            rawtextei = mytaglvs.getRawIndexRelativeToParts(myparts, myhtmlei, myformattingparts, false);

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

        return [rawtextsi, rawtextei];
    }

    getFinalRawTextStartAndEndIndexs(stagis, mytagis, rawtextsi, rawtextei, mytaglvs,
        mytagnms, myruletext)
    {
        let minsindx = -1;
        let minsi = -1;
        let notagsbeforeoratsi = true;
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
                        if (notagsbeforeoratsi) notagsbeforeoratsi = false;
                        //else;//do nothing
                        
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
        console.log("notagsbeforeoratsi = " + notagsbeforeoratsi);

        if (notagsbeforeoratsi)
        {
            let diffsitagis = [];
            for (let n = stagis.length - 1; n > -1 && n < stagis.length; n--)
            {
                if (stagis[n]) diffsitagis[n] = mytagis[n] - rawtextsi;
                else diffsitagis[n] = -1;
                console.log("diffsitagis[" + n + "] = " + diffsitagis[n]);
            }

            let minvdiff = -1;
            let minvdiffi = -1;
            for (let n = stagis.length - 1; n > -1 && n < stagis.length; n--)
            {
                if (stagis[n])
                {
                    if (diffsitagis[n] < 0);
                    else
                    {
                        if (minvdiff < 0)
                        {
                            minvdiff = diffsitagis[n];
                            minvdiffi = n;
                        }
                        else
                        {
                            if (diffsitagis[n] < minvdiff)
                            {
                                minvdiff = diffsitagis[n];
                                minvdiffi = n;
                            }
                            //else;//do nothing
                        }
                    }
                }
                //else;//do nothing
            }
            console.log("minvdiff = " + minvdiff);
            console.log("minvdiffi = " + minvdiffi);

            if (minvdiffi < 0 || minvdiffi > stagis.length - 1)
            {
                //not a valid value unless none are found no starting tags are found
                //only valid when no tags are found
                if (stagis.length < 1);
                else
                {
                    throw new Error("no starting tag indexes were found! Only ending tag indexes " +
                        "were found!");
                }
            }
            else
            {
                console.log("found what we are looking for!");

                minsi = minvdiffi;
                minsindx = mytagis[minsi];
                notagsbeforeoratsi = false;

                console.log("NEW minsindx = " + minsindx);
                console.log("NEW minsi = " + minsi);
                console.log("NEW notagsbeforeoratsi = " + notagsbeforeoratsi);
            }
        }
        //else;//do nothing
        console.log("FINAL minsindx = " + minsindx);
        console.log("FINAL minsi = " + minsi);
        console.log("FINAL notagsbeforeoratsi = " + notagsbeforeoratsi);

        if (notagsbeforeoratsi)
        {
            if (minsindx < 0 || minsindx > myruletext.length - 1);
            else throw new Error("invalid value found and used here for minsindx index value!");

            if (minsi < 0 || minsi > mytagis.length - 1);
            else throw new Error("invalid value found and used here for minsi index!");
        }
        else
        {
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
        }
        
        
        const finrawtextsi = (notagsbeforeoratsi ? rawtextsi :
            ((minsindx < rawtextsi) ? minsindx : rawtextsi));
        console.log("rawtextsi = " + rawtextsi);
        console.log("finrawtextsi = " + finrawtextsi);

        const mytagpi = (notagsbeforeoratsi ? -1 : 
            mytaglvs.getTagPairIndex(myruletext, mytagis[minsi], mytagis));
        console.log("mytagpi = " + mytagpi);

        let mytagpilen = -1;
        if (notagsbeforeoratsi);
        else
        {
            mytagpilen = mytagnms[minsi].length;
            if (mytagnms[minsi] === "\b")
            {
                if (myruletext.charAt(mytagpi + 2) === 'b');
                else mytagpilen += 2;
            }
            //else;//do nothing
        }
        console.log("mytagpilen = " + mytagpilen);
        console.log("mytagpi + mytagpilen = " + (mytagpi + mytagpilen));
        console.log("rawtextei = " + rawtextei);

        let finrawtextei = -1;
        if (mytagpi + mytagpilen < rawtextei) finrawtextei = rawtextei;
        else finrawtextei = mytagpi + mytagpilen;
        console.log("finrawtextei = " + finrawtextei);

        return [finrawtextsi, finrawtextei];
    }

    getTreatAsRawText(israwtext, mytagis, myhtmlei, maxdiff)
    {
        let treatasrawtext = false;
        if (israwtext) treatasrawtext = true;
        else
        {
            //need to make sure that the raw rule has no tags in it for this to be true
            //if there are no tag indexes, then treat as rawtext with escape characters
            //if the entire selection is before all of the tag indexes, then treat as raw text
            //otherwise it is not safe to do that
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

        return treatasrawtext;
    }

    getRuleTextAndIsRawTextObj(myseltxtdomndobj, gameobj, basicrules, vegasrules, strats)
    {
        if (myseltxtdomndobj === null || myseltxtdomndobj === undefined)
        {
            throw new Error("the selected text domnd obj must be defined and not null!");
        }
        //else;//do nothing

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
            let myindx = myseltxtdomndobj.mydomnd.id.indexOf(mybeginsrawidstrs[k]);
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
        //console.log("myseltxtdomndobj.mydomnd.id = " + myseltxtdomndobj.mydomnd.id);
        
        let mydispidindx = -1;
        for (let k = 0; k < mybeginsdispidstrs.length; k++)
        {
            let myindx = myseltxtdomndobj.mydomnd.id.indexOf(mybeginsdispidstrs[k]);
            //console.log("mybeginsdispidstrs[" + k + "] = " + mybeginsdispidstrs[k]);
            console.log("myindx = " + myindx);

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

        const myruleidnumstr = myseltxtdomndobj.mydomnd.id.substring(mypartidstr.length);
        console.log("myruleidnumstr = " + myruleidnumstr);

        if (myruleidnumstr.length < 1 || isNaN(myruleidnumstr))
        {
            throw new Error("illegal value found and used for the rule index here!");
        }
        //else;//do nothing

        const ruleindx = Number(myruleidnumstr);
        console.log("ruleindx = " + ruleindx);

        let mytypestr = null;
        if (israwtext) mytypestr = myrulestratstypes[myrawidindx];
        else mytypestr = myrulestratstypes[mydispidindx];
        console.log("mytypestr = " + mytypestr);

        let myrulesarr = null;
        if (mytypestr === "basic") myrulesarr = basicrules;
        else if (mytypestr === "vegas") myrulesarr = vegasrules;
        else if (mytypestr === "strats") myrulesarr = strats;
        else throw new Error("invalid rule type was found and used here!");

        const myruletext = myrulesarr[ruleindx];
        console.log("myruletext = " + myruletext);

        const myruletxtandisrawobj = {
            myruletext: "" + myruletext,
            israwtext: israwtext,
            ruleindx: ruleindx,
            mytypestr: "" + mytypestr
        };
        return myruletxtandisrawobj;
    }


    getFinalFormattedSelectedTextDataObj(myseltxtdomobj, gameobj, basicrules, vegasrules, strats)
    {
        const mytaglvs = new TagLevelsClass("");
        let myseltxtdomndobj = null;
        if (myseltxtdomobj === undefined || myseltxtdomobj === null)
        {
            myseltxtdomndobj = mytaglvs.getSelectedTextAndDOMObj();
        }
        else myseltxtdomndobj = myseltxtdomobj;
        if (myseltxtdomndobj === undefined || myseltxtdomndobj === null) return null;
        //else;//do nothing
        console.log("myseltxtdomndobj = ", myseltxtdomndobj);

        //use the event target to get the dom node to get the rule index to get the rule
        //or we could use the selection to get the dom node to get the rule index to get the rule

        //unless it is in the raw text, if it is the rendered version, it will be text only,
        //styleing info will not be visible or even part of it

        //we always want to use the selected text to determine against the raw text
        //unless we are on the raw text
        
        const myruletxtandrawtxtobj = mytaglvs.getRuleTextAndIsRawTextObj(myseltxtdomndobj, gameobj,
            basicrules, vegasrules, strats);
        const myruletext = "" + myruletxtandrawtxtobj.myruletext;
        const israwtext = myruletxtandrawtxtobj.israwtext;
        console.log("myruletext = " + myruletext);
        console.log("israwtext = " + israwtext);

        console.log("myseltxtdomndobj.myseltext = " + myseltxtdomndobj.myseltext);
        console.log("myseltxtdomndobj.mydomnd.textContent = " + myseltxtdomndobj.mydomnd.textContent);

        //we cannot rely on the offsets in the select object to be valid end points
        //but we can get the index of the seltext
        //from there we could calculate the end index
        const myhtmlsi = myseltxtdomndobj.mydomnd.textContent.indexOf(myseltxtdomndobj.myseltext);
        console.log("myhtmlsi = " + myhtmlsi);

        if (myhtmlsi < 0 || (myhtmlsi > myseltxtdomndobj.mydomnd.textContent.length - 1 &&
            myseltxtdomndobj.mydomnd.textContent.length > 0) ||
            myseltxtdomndobj.mydomnd.textContent.length === 0)
        {
            throw new Error("illegal value found and used for the htmlsi index!");
        }
        //else;//do nothing

        const myhtmlei = myhtmlsi + myseltxtdomndobj.myseltext.length;
        console.log("myhtmlei = " + myhtmlei);

        if (myhtmlei < 0 || myhtmlei > myseltxtdomndobj.mydomnd.textContent.length)
        {
            throw new Error("illegal value found and used for the htmlei index!");
        }
        //else;//do nothing

        const maxdiff = myruletext.length - myseltxtdomndobj.mydomnd.textContent.length;
        console.log("maxdiff = " + maxdiff);

        if (maxdiff < 0)
        {
            throw new Error("illegal maxdiff between the rule and the rendered text lengths " +
                "found and used here!");
        }
        //else;//do nothing


        

        //we can see anyone above, but the style must be after one of them.
        const mytagis = mytaglvs.getAllTagIndexes(myruletext);
        console.log("mytagis = " + mytagis);

        const treatasrawtext = mytaglvs.getTreatAsRawText(israwtext, mytagis, myhtmlei, maxdiff);
        console.log("israwtext = " + israwtext);
        console.log("treatasrawtext = " + treatasrawtext);


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


        const [rawtextsi, rawtextei] = mytaglvs.getRawTextStartAndEndIndexs(israwtext, treatasrawtext,
            myhtmlsi, myhtmlei, myseltxtdomndobj, myruletext, mytagis, stagis, etagis, mytagnms, mytaglvs);
        console.log("rawtextsi = " + rawtextsi);
        console.log("rawtextei = " + rawtextei);

        const fmtseltextstr = myruletext.substring(rawtextsi, rawtextei);
        console.log("myruletext.substring(rawtextsi=" + rawtextsi + ", rawtextei=" + rawtextei +
            ") = fmtseltextstr = " + fmtseltextstr);
        console.log("myseltxtdomndobj.myseltext = " + myseltxtdomndobj.myseltext);
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

        //we want to know starting tags and ending tags around the selected text
        //if the tag index is a starting tag and if it is at or just before rawtextsi
        //and if an ending index is found after rawtextsi and before or after rawtextei
        //then it is included

        const mylvs = mytaglvs.getLevelsForAllTags(myruletext, mytagis);
        console.log("mylvs = ", mylvs);

        const mydispstrs = mytaglvs.getLevelsDisplayStrOrStrs(myruletext, mylvs, true);
        console.log("mydispstrs = ", mydispstrs);

        const [finrawtextsi, finrawtextei] =
            mytaglvs.getFinalRawTextStartAndEndIndexs(stagis, mytagis, rawtextsi, rawtextei, mytaglvs,
                mytagnms, myruletext);
        console.log("finrawtextsi = " + finrawtextsi);
        console.log("finrawtextei = " + finrawtextei);
        
        const finfmtseltextstr = myruletext.substring(finrawtextsi, finrawtextei);
        console.log("myruletext.substring(finrawtextsi=" + finrawtextsi + ", finrawtextei=" +
            finrawtextei + ") = finfmtseltextstr = " + finfmtseltextstr);
        
        const myfinfmtseltxtobj = {
            finfmtseltextstr: "" + finfmtseltextstr,
            myruletext: "" + myruletext,
            finrawtextsi: finrawtextsi,
            finrawtextei: finrawtextei,
            fmtseltextstr: "" + fmtseltextstr,
            rawtextsi: rawtextsi,
            rawtextei: rawtextei,
            myseltxtdomndobj: myseltxtdomndobj,
            israwtext: israwtext,
            treatasrawtext: treatasrawtext,
            myhtmlsi: myhtmlsi,
            myhtmlei: myhtmlei,
            maxdiff: maxdiff,
            mytaglvs: mytaglvs,
            ruleindx: myruletxtandrawtxtobj.ruleindx,
            mytypestr: "" + myruletxtandrawtxtobj.mytypestr
        };
        
        return myfinfmtseltxtobj;
    }

    
    doesInputHaveUnnecessaryCharacters(inputobj)
    {
        console.log("AddAGame screener: inputobj = ", inputobj);
        if (inputobj.input === undefined || inputobj.input === null)
        {
            throw new Error("AddAGame screener: the input string was null and must be defined!");
        }
        //else;//do nothing
        console.log("screener: inputobj.input.length = " + inputobj.input.length);

        for (let i = 0; i < inputobj.input.length; i++)
        {
            //need to screen for "" before end of the string
            //need to screen for < or > or / or =
            //console.log("inputobj.input.charAt(" + i + ") = " + inputobj.input.charAt(i));
            if (inputobj.input.charAt(i) === '<')
            {
                console.log("may have found a tag start here at i = " + i + "!");
                let errmsg = "";
                for (let k = i + 1; k < inputobj.input.length; k++)
                {
                    if (inputobj.input.charAt(k) === '"')
                    {
                        errmsg = "AddAGame screener: illegal character " +
                            "found. Found < then \" after it!";
                    }
                    else if (inputobj.input.charAt(k) === '>')
                    {
                        errmsg = "AddAGame screener: illegal character found. " +
                            "Found < then > after it!";
                    }
                    else if (inputobj.input.charAt(k) === '=')
                    {
                        errmsg = "AddAGame screener: illegal character found. " +
                            "Found < then = after it!";
                    }
                    else
                    {
                        if (k === i + 1)
                        {
                            if (inputobj.input.charAt(k) === '/')
                            {
                                errmsg = "AddAGame screener: illegal character found. " +
                                    "Found < then / after it!";
                            }
                            else if (inputobj.input.charAt(k) === '>')
                            {
                                errmsg = "AddAGame screener: illegal character found. " +
                                    "Found < then > after it!";
                            }
                            //else;//do nothing
                        }
                        //else;//do nothing
                    }

                    if (errmsg.length > 0)
                    {
                        console.error(errmsg);
                        alert("Error: input = " + inputobj.input + " is illegal! " + errmsg);
                        return true;
                    }
                }//end of k for loop
            }
            //else;//do nothing should be safe
        }//end of i for loop
        console.log("AddAGame screener: input object is safe!");
        return false;
    }
    screener(inputobj) { return this.doesInputHaveUnnecessaryCharacters(inputobj);}

    generateMarkUpForDisplayFromRule(rule)
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

        if (this.screener({input: "" + rule}))
        {
            //revert to orig
            console.error("No HTML!");
            alert("HTML forbidden here!");
            throw new Error("No HTML allowed!");
        }
        //else;//do nothing safe

        
        //const mytaglvs = new TagLevelsClass(rule);


        //we can see anyone above, but the style must be after one of them.
        let mytagis = this.getAllTagIndexes(rule);
        console.log("genmarkup: mytagis = ", mytagis);
        
        let mytags = this.getAllTags(rule, mytagis);
        console.log("genmarkup: mytags = ", mytags);

        let stis = this.getStartingOrEndingTagIndexes(rule, mytagis, true);
        console.log("genmarkup: stis = ", stis);
        
        let etis = this.getStartingOrEndingTagIndexes(rule, mytagis, false);
        console.log("genmarkup: etis = ", etis);

        for (let n = 0; n < mytagis.length; n++)
        {
            let pairi = this.getTagPairIndex(rule, mytagis[n], mytagis);
            console.log("genmarkup call 1: pair tag index for indx (" + mytagis[n] + ") = " + pairi);

            if (pairi < 0 || (pairi > rule.length - 1 && rule.length > 0) || rule.length === 0)
            {
                throw new Error("the tag found at index " + mytagis[n] + " has an invalid pair index!");
            }
            //else;//do nothing
            
            let opairi = this.getTagPairIndex(rule, pairi, mytagis);
            console.log("genmarkup call 2: pair tag index for indx (" + mytagis[n] + ") = " + pairi);
            console.log("genmarkup: pair tag index for indx (" + pairi + ") = " + opairi);
            if (mytagis[n] === opairi);
            else throw new Error("the indexes for the pairs must match up, but they did not!");
        }

        //console.log(this.getLevelsDisplayStrs([1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,6,6,6,
        //    7,7,7,8,8,8,9,9,9,10,100,10,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,4,4,4,4,3,3,3,3,3,2,2,2,2,2,
        //    1,1,1,1,1]));

        //console.log(this.getLevelsAndDisplayStrs(rule, mytagis));

        if (this.isValidTagsMarkup(rule, mytagis));
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
                                    if (this.isTagIndexOnListOfIndexes(rule, i, stis))
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
                        if (this.isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
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
                            if (this.isTagIndexOnListOfIndexes(rule, i, stis)) tagstr = "" + otag;
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
                                    if (this.isTagIndexOnListOfIndexes(rule, i, stis))
                                    {
                                        let pi = this.getTagPairIndex(rule, i, mytagis);
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
                                    if (this.isTagIndexOnListOfIndexes(rule, i, stis))
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
                                    if (this.isTagIndexOnListOfIndexes(rule, i, stis))
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

    createMarkUp(content)
    {
        return {__html: "" + content};
    }

    generateAndCreateMarkUpForDisplayFrom(rule, throwerrors = true)
    {
        if (throwerrors) return this.createMarkUp(this.generateMarkUpForDisplayFromRule(rule));
        else
        {
            try
            {
                return this.createMarkUp(this.generateMarkUpForDisplayFromRule(rule));
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
                    return this.createMarkUp('<div style="color: red">Attempted to enter HTML and ' +
                        'it is not allowed!</div>');
                }
                //else;//do nothing
                return this.createMarkUp('<div style="color: red">' + rule + "<br /><span>" + errindxstr +
                    "</span>" + err + "</div>");
            }
            //return null;
        }
    }
}

export default TagLevelsClass;
