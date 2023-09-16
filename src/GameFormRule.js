import React from "react";

function GameFormRule({handleChange, mid})
{
    return (
        <div id={"rule" + mid}>
            <label htmlFor="nwrule" id="nwrulelbl">Rule Num: </label>
            <input id="nwrule" type="text" placeholder="Rule:" onChange={handleChange} /><br />
            <input required={true} type="radio" id="basicrule" name="kindofrule" value="basic"
                onChange={handleChange} />
            <label htmlFor="basicrule" id="basicrulelbl">Basic Rule</label>
            <input required={true} type="radio" id="vegasrule" name="kindofrule" value="vegas"
                onChange={handleChange} />
            <label htmlFor="vegasrule" id="vegasrulelbl">Vegas Rule</label>
        </div>
    );
}

export default GameFormRule;
