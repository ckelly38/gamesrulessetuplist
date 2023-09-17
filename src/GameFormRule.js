import React from "react";

function GameFormRule({rules, handleChange, mid})
{
    console.log("rules.length = " + rules.length);
    console.log("mid = " + mid);
    
    return (
        <div id={"rule" + mid}>
            <label htmlFor={"nwrule" + mid} id={"nwrulelbl" + mid}>Rule #{mid}: </label>
            <input id={"nwrule" + mid} type="text" placeholder="Rule:" value={rules[mid - 1].text}
            onChange={handleChange} /><br />
            <input required={true} type="radio" id={"basicrule" + mid} name={"kindofrule" + mid}
                value="basic" checked={rules[mid - 1].isbasic} onChange={handleChange} />
            <label htmlFor={"basicrule" + mid} id={"basicrulelbl" + mid}>Basic Rule</label>
            <input required={true} type="radio" id={"vegasrule" + mid} name={"kindofrule" + mid}
                value="vegas" checked={rules[mid - 1].isvegas} onChange={handleChange} />
            <label htmlFor={"vegasrule" + mid} id={"vegasrulelbl" + mid}>Vegas Rule</label>
        </div>
    );
}

export default GameFormRule;
