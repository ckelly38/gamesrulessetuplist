import React from "react";
import GameFormRule from "./GameFormRule";

function GameFormRules({handleChange})
{
    let myruleobjs = new Array();
    function addRule(event)
    {
        myruleobjs.push(<GameFormRule key={"rule" + (myruleobjs.length + 1)} mid={myruleobjs.length + 1}
            handleChange={handleChange} />);
    }
    addRule(null);

    return (
        <>
            {myruleobjs}
            <button onClick={addRule}>Add More Rules</button>
        </>
    );
}

export default GameFormRules;
