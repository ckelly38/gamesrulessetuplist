import React from "react";

function GameFormRule({handleChange, mid})
{
    return (
        <div id={"rule" + mid}>
            <label htmlFor="nwrule" id="nwrulelbl">Rule #{mid}: </label>
            <input id={"nwrule" + mid} type="text" placeholder="Rule:" onChange={handleChange} /><br />
            <input required={true} type="radio" id={"basicrule" + mid} name="kindofrule" value="basic"
                onChange={handleChange} />
            <label htmlFor={"basicrule" + mid} id={"basicrulelbl" + mid}>Basic Rule</label>
            <input required={true} type="radio" id={"vegasrule" + mid} name="kindofrule" value="vegas"
                onChange={handleChange} />
            <label htmlFor={"vegasrule" + mid} id={"vegasrulelbl" + mid}>Vegas Rule</label>
        </div>
    );
}

export default GameFormRule;
