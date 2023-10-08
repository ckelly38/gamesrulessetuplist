import React from "react";
import "./App.css";

function EditAGame({mid, mydataobj, setMyDataObj, tempsize, setTempSize, refresh, sizefocus, sizeblur,
    colors, setColors})
{
    if (mid === undefined || mid === null)
    {
        throw new Error("mid must be defined!");
    }
    //else;//do nothing

    let fndcurrentcolor = false;
    for (let n = 0; n < colors.length; n++)
    {
        if (colors[n] === mydataobj.color)
        {
            fndcurrentcolor = true;
            break;
        }
        //else;//do nothing
    }
    console.log("EDITAGAME: fndcurrentcolor = " + fndcurrentcolor);

    if (fndcurrentcolor);
    else
    {
        let nwcolorlist = [...colors, mydataobj.color];
        setColors(nwcolorlist);
    }
    console.log("EDITAGAME: colors = " + colors);
    

    function listFonts()
    {
        //https://granneman.com/webdev/coding/css/fonts-and-formatting/web-browser-font-defaults
        //https://stackoverflow.com/questions/3368837/list-every-font-a-users-browser-can-display
        const fontCheck = new Set([
            // Windows 10
          'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara',
          'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima',
          'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact',
          'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode',
          'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue',
          'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei',
          'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text',
          'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script',
          'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun', 'Sitka',
          'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings',
          'Wingdings', 'Yu Gothic',
            // macOS
            'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow',
            'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed',
            'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps',
            'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter',
            'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier', 'Courier New', 'Didot', 'DIN Alternate',
            'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue',
            'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo',
            'Microsoft Sans Serif', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate',
            'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times',
            'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino'
          ].sort());
          
          (async() => {
            await document.fonts.ready;
          
            const fontAvailable = new Set();
          
            for (const font of fontCheck.values()) {
              if (document.fonts.check(`12px "${font}"`)) {
                fontAvailable.add(font);
              }
            }
          
            //console.log('Available Fonts:', [...fontAvailable.values()]);
            return fontAvailable;
          })();
        return fontCheck;
    }
    
    //https://stackoverflow.com/questions/3368837/list-every-font-a-users-browser-can-display
    function getAllFamilies()
    {
        const fontFaces = listFonts();
        //console.log("EDIT-A-GAME: fontFaces = ", fontFaces);

        return [...new Set(fontFaces)];
    }

    function getFirstNonZeroIndex(mystr)
    {
        if (mystr === undefined || mystr === null || mystr.length < 1)
        {
            throw new Error("my string must have at least one character on it!");
        }
        //else;//do nothing

        let myfrstnonzeroi = -1;
        for (let i = 0; i < mystr.length; i++)
        {
            if (mystr.charAt(i) === "0");
            else
            {
                myfrstnonzeroi = i;
                break;
            }
        }
        //console.log("myfrstnonzeroi = " + myfrstnonzeroi);

        if (myfrstnonzeroi < 0 || myfrstnonzeroi > mystr.length - 1)
        {
            throw new Error("illegal value for the myfrstnonzeroi index found and used here!");
        }
        //else;//do nothing

        return myfrstnonzeroi;
    }

    function convertHEXtoDecimal(myHEXvalue)
    {
        if (myHEXvalue === undefined || myHEXvalue === null || myHEXvalue.length < 1 ||
            myHEXvalue.length > 6 || !(myHEXvalue.length === 3 || myHEXvalue.length === 6))
        {
            throw new Error("illegal myHEXvalue value it must be defined!");
        }
        //else;//do nothing

        if (myHEXvalue.length === 3)
        {
            let mynwHEXval = "";
            for (let i = 0; i < myHEXvalue.length; i++)
            {
                mynwHEXval += myHEXvalue.charAt(i) + myHEXvalue.charAt(i);
            }
            return convertHEXtoDecimal(mynwHEXval);
        }
        else if (myHEXvalue.length === 6)
        {
            const myHexChars = "0123456789ABCDEF";
            const mypowsofsxteen = [1, 16, 256, 4096, 65536, 1048576];
            //console.log("myHEXvalue = " + myHEXvalue);
            
            let mydecnum = 0;
            for (let i = 0; i < myHEXvalue.length; i++)
            {
                //console.log("EDIT-A-GAME: myHEXvalue.charAt(" + i + ") = " + myHEXvalue.charAt(i));
                let matchi = -1;
                for (let k = 0; k < myHexChars.length; k++)
                {
                    if (myHEXvalue.charAt(i) === myHexChars.charAt(k))
                    {
                        //console.log("match found at k = " + k);
                        matchi = k;
                        break;
                    }
                    //else;//do nothing
                }
                //console.log("EDIT-A-GAME: matchi = " + matchi);
                //console.log("EDIT-A-GAME: myHexChars.length = " + myHexChars.length);

                if (matchi < 0 || matchi > myHexChars.length - 1)
                {
                    throw new Error("illegal hex character found at i = " + i + "! The character is: " +
                        myHEXvalue.charAt(i) + "!");
                }
                //else;//do nothing

                let n = (6 - i - 1);
                //console.log("EDIT-A-GAME: 6 - i - 1 = n = " + n);
                //console.log("EDIT-A-GAME: matchi = " + matchi);
                //console.log("EDIT-A-GAME: mypowsofsxteen[" + n + "] = " + mypowsofsxteen[n]);
                let mytempdecval = matchi * mypowsofsxteen[n];
                //console.log("EDIT-A-GAME: mytempdecval = " + mytempdecval);
                mydecnum += mytempdecval;
            }//end of i for loop
            //console.log("EDIT-A-GAME: mydecnum = " + mydecnum);

            return mydecnum;
        }
        else throw new Error("illegal myHEXvalue value it must be defined!");
    }
    
    function convertDecimalToHEX(num)
    {
        //console.log("EDIT-A-GAME: num = " + num);
        if (num === undefined || num === null || isNaN(num) || num < 0)
        {
            throw new Error("the num must be a positive or zero defined number!");
        }
        //else;//do nothing

        //first identify the largest power of 16 that can fit in it...
        //if it is too big to be a HEX color error out...
        const mypowsofsxteen = [1, 16, 256, 4096, 65536, 1048576];

        if (num > mypowsofsxteen[mypowsofsxteen.length - 1] * 16 - 1)
        {
            throw new Error("number is too big to be a HEX color!");
        }
        //else;//do nothing

        let mymxpowi = -1;
        for (let n = mypowsofsxteen.length - 1; n < mypowsofsxteen.length && n > -1; n--)
        {
            if (num === mypowsofsxteen[n] || (num === 0 && mypowsofsxteen[n] === 1))
            {
                mymxpowi = n;
                break;
            }
            else if (num > mypowsofsxteen[n])
            {
                if (n === mypowsofsxteen.length - 1)
                {
                    //use this
                    mymxpowi = n;
                    break;
                }
                else
                {
                    if (num < mypowsofsxteen[n + 1])
                    {
                        //use this
                        mymxpowi = n;
                        break;
                    }
                    else if (num === mypowsofsxteen[n + 1])
                    {
                        //use this
                        mymxpowi = n + 1;
                        break;
                    }
                    //else;//do nothing
                }
            }
            //else;//do nothing move on
        }//end of n for loop
        //console.log("EDIT-A-GAME: mymxpowi = " + mymxpowi);

        if (mymxpowi < 0 || mymxpowi > mypowsofsxteen.length - 1)
        {
            throw new Error("illegal value found and used for mymxpowi index here!");
        }
        //else;//do nothing
        
        //console.log(num / mypowsofsxteen[mymxpowi]);
        //console.log(num % mypowsofsxteen[mymxpowi]);

        let mymaxnum = Math.trunc(num / mypowsofsxteen[mymxpowi]);
        //console.log("EDIT-A-GAME: mymaxnum = " + mymaxnum);

        let myresstr = "";
        let myorestr = "";
        for (let n = mypowsofsxteen.length - 1; n < mypowsofsxteen.length && n > -1; n--)
        {
            if (n === mymxpowi)
            {
                if (mymaxnum < 10 && (mymaxnum > 0 || mymaxnum === 0)) myresstr += "" + mymaxnum;
                else if (mymaxnum === 10) myresstr += "A";
                else if (mymaxnum === 11) myresstr += "B";
                else if (mymaxnum === 12) myresstr += "C";
                else if (mymaxnum === 13) myresstr += "D";
                else if (mymaxnum === 14) myresstr += "E";
                else if (mymaxnum === 15) myresstr += "F";
                else throw new Error("illegal number found here!");
                break;
            }
            else myresstr += "0";
        }
        //console.log("EDIT-A-GAME: NEW myresstr = " + myresstr);

        let remainder = num % mypowsofsxteen[mymxpowi];
        //console.log("EDIT-A-GAME: remainder = " + remainder);

        if (remainder < 16)
        {
            if (mymaxnum < 10 && (mymaxnum > 0 || mymaxnum === 0)) myresstr += "" + mymaxnum;
            else if (mymaxnum === 10) myresstr += "A";
            else if (mymaxnum === 11) myresstr += "B";
            else if (mymaxnum === 12) myresstr += "C";
            else if (mymaxnum === 13) myresstr += "D";
            else if (mymaxnum === 14) myresstr += "E";
            else if (mymaxnum === 15) myresstr += "F";
            else throw new Error("illegal number found here!");
        }
        else myorestr = convertDecimalToHEX(num % mypowsofsxteen[mymxpowi]);
        //console.log("EDIT-A-GAME: FINAL num = " + num);
        //console.log("EDIT-A-GAME: FINAL mymxpowi = " + mymxpowi);
        //console.log("EDIT-A-GAME: FINAL divisor = " + mypowsofsxteen[mymxpowi]);
        //console.log("EDIT-A-GAME: FINAL remainder = " + remainder);
        //console.log("EDIT-A-GAME: FINAL myresstr = " + myresstr);
        //console.log("EDIT-A-GAME: FINAL myorestr = " + myorestr);

        if (myorestr.length < 1 && myresstr.length > 0){
            if (myresstr.length < 6)
            {
                let myfresstr = "" + myresstr;
                for (let n = myresstr.length; n < 6; n++)
                {
                    myfresstr += "0";
                }
                return myfresstr;
            }
            else return myresstr;
        }
        else
        {
            //0009
            //000099
            //take these two strings and then get the first non-zero number on both of them...
            //for the remainder will be the last characters...
            //for the other string will be the last characters may even be the first characters...
            const myfrstnonzeroi = getFirstNonZeroIndex(myresstr);
            const myoresfrstnonzeroi = getFirstNonZeroIndex(myorestr);
            //console.log("EDIT-A-GAME: myfrstnonzeroi = " + myfrstnonzeroi);
            //console.log("EDIT-A-GAME: myoresfrstnonzeroi = " + myoresfrstnonzeroi);
            //console.log("EDIT-A-GAME: myresstr.substring(0, " + myfrstnonzeroi + " + 1) = " +
            //    myresstr.substring(0, myfrstnonzeroi + 1));
            //console.log("EDIT-A-GAME: myorestr.substring(" + myoresfrstnonzeroi + ") = " +
            //    myorestr.substring(myoresfrstnonzeroi));
            
            let zerostr = "";
            for (let n = myfrstnonzeroi + 1; n < myoresfrstnonzeroi && n < 6; n++)
            {
                zerostr += "0";
            }
            //console.log("EDIT-A-GAME: zerostr = " + zerostr);

            let myfinalstr = myresstr.substring(0, myfrstnonzeroi + 1) + zerostr +
                myorestr.substring(myoresfrstnonzeroi);
            //console.log("EDIT-A-GAME: FINAL myfinalstr = " + myfinalstr);
            
            if (myfinalstr.length === 6);
            else throw new Error("the return string must have a length of 6!");
            return myfinalstr;
        }
    }

    function getListOfColors(numcolors, scolorHEX, ecolorHEX)
    {
        if (scolorHEX === undefined || scolorHEX === null || scolorHEX.length < 1)
        {
            throw new Error("illegal scolorHEX value it must be defined!");
        }
        //else;//do nothing
        if (ecolorHEX === undefined || ecolorHEX === null || ecolorHEX.length < 1)
        {
            throw new Error("illegal ecolorHEX value it must be defined!");
        }
        //else;//do nothing
        if (numcolors === undefined || numcolors === null || isNaN(numcolors))
        {
            throw new Error("the numcolors must be a defined number!");
        }
        //else;//do nothing

        //hex value is #FF,FF,FF for white no ,s
        //HEX is base 16: 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F
        //range, black and white
        //black 0,0,0 white FFFFFF or just F,F,F or 255, 255, 255
        //number of items requested by the user then all we need to do is convert that to numbers
        //const totalnumcolors = 255 * 255 * 255;
        //console.log("EDIT-A-GAME: totalnumcolors = " + totalnumcolors);
        //console.log("EDIT-A-GAME: scolorHEX = " + scolorHEX);
        //console.log("EDIT-A-GAME: ecolorHEX = " + ecolorHEX);

        //color 0 is black
        //color 255 is blue
        //color ?
        //last color is white
        //rgb(r,g,b)
        //rgba(r,g,b,a)

        //take the scolorHEX and convert it to a number
        //take the ecolorHEX and convert it to a number

        const mysdecinum = convertHEXtoDecimal(scolorHEX);
        const myedecinum = convertHEXtoDecimal(ecolorHEX);

        //let us say we have a list of numbers: 1,2,3,4,5,6,7,8,9,10
        //let us say that we have a starting number and an ending number 1 and 10
        //let us say that we want 5 numbers: (end + 1 - start) / n = step
        //console.log((10-1)/5);

        const step = Math.trunc((myedecinum + 1 - mysdecinum) / numcolors);
        //console.log("EDIT-A-GAME: step = " + step); 

        //FFFFFF
        //543210 power of 16
        //total values = 16^6

        let mycolorsnumarr = [];
        for (let n = 0; n < numcolors; n++)
        {
            if (n === 0) mycolorsnumarr[n] = mysdecinum;
            else if (n < 0 || n > numcolors)
            {
                throw new Error("illegal value found and used for index n here!");
            }
            else mycolorsnumarr[n] = mycolorsnumarr[n - 1]  + step;
            //console.log("mycolorsnumarr[" + n + "] = " + mycolorsnumarr[n]);
        }//end of n for loop

        let mycolorsarr = [];
        for (let n = 0; n < numcolors; n++)
        {
            if (n === 0) mycolorsarr[n] = convertDecimalToHEX(mycolorsnumarr[n]);
            else if (n < 0 || n > numcolors)
            {
                throw new Error("illegal value found and used for index n here!");
            }
            else mycolorsarr[n] = convertDecimalToHEX(mycolorsnumarr[n]);
            //console.log("mycolorsarr[" + n + "] = " + mycolorsarr[n]);
        }
        return mycolorsarr;
    }
    //console.log(convertHEXtoDecimal("FFFFFF"));
    //console.log(convertDecimalToHEX(-1));//error negative number
    //console.log(convertDecimalToHEX(0));
    //console.log(convertDecimalToHEX(1));
    //console.log(convertDecimalToHEX(16));
    //console.log(convertDecimalToHEX(17));
    //console.log(convertDecimalToHEX(256));
    //console.log(convertDecimalToHEX(257));
    //console.log(convertDecimalToHEX(4096));
    //console.log(convertDecimalToHEX(4097));
    //console.log(convertDecimalToHEX(65536));
    //console.log(convertDecimalToHEX(65537));
    //console.log(convertDecimalToHEX(1048576));
    //console.log(convertDecimalToHEX(1048577));
    //console.log(convertDecimalToHEX(16777215));
    //console.log(convertDecimalToHEX(16777216));//error not a hex color
    //console.log(getListOfColors(10, "000", "FFF"));
    //console.log(getListOfColors(16, "000101", "FFFFFF"));
    //debugger;

    function getColorsOfRainbow()
    {
        //red, orange, yellow, green, blue, indigo, violet
        return ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#7F00FF"];
    }

    function getSimpleListOfColors()
    {
        const myroygbivarr = getColorsOfRainbow();
        const bwarr = ["#000000", "#FFFFFF"];
        let myretarr = [];
        for (let n = 0; n < myroygbivarr.length; n++) myretarr[n] = myroygbivarr[n];
        for (let n = 0; n < bwarr.length; n++) myretarr[n + myroygbivarr.length] = bwarr[n];
        return myretarr;
    }

    const mycoloropts = colors.map((color) => (
        <option key={color} value={color}
            style={{color: "" + color, backgroundColor: "" + color}}>TEXT</option>)
    );
    console.log("EDIT-A-GAME: mycoloropts = ", mycoloropts);

    const myfontsoptsarr = getAllFamilies().map((family) => 
        <option key={family} value={family}>{family}</option>);
    console.log("EDIT-A-GAME: myfontsoptsarr = ", myfontsoptsarr);

    //refresh emoji button from: https://emojicombos.com/refresh
    return (
        <div style={{fontSize: "18px", display: "inline"}}>
            <select id={"fonts-drop-down" + mid} value={mydataobj.name} onChange={refresh}>
                {myfontsoptsarr}</select>
            <input type="number" step="0.25" style={{width: "50px"}} id={"fontsize"+mid}
                placeholder="size" value={tempsize} onChange={(event) => setTempSize(event.target.value)}
                onFocus={sizefocus} onBlur={sizeblur} />
            <button id={"bold" + mid} onClick={refresh}
                className={mydataobj.isbold ? "styleused" : ""}><b>B</b></button>
            <button id={"italics" + mid} onClick={refresh}
                className={mydataobj.isitalics ? "styleused" : ""}><i>I</i></button>
            <button id={"underline" + mid} onClick={refresh}
                className={mydataobj.isunderline ? "styleused" : ""}><u>U</u></button>
            <select id={"font-color" + mid} value={mydataobj.color} style={{color: mydataobj.color}}
                onChange={refresh}>{mycoloropts}</select>
            <button id={"refresh" + mid} onClick={refresh}>↻</button>
        </div>
    );
}

export default EditAGame;
