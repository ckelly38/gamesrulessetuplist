import React from "react";

function GameFormRule({rules, type, handleChange, mid})
{
    console.log("rules.length = " + rules.length);
    console.log("mid = " + mid);
    console.log("type = " + type);

    let userules = false;
    if (type === undefined || type === null || type.length < 1)
    {
        throw new Error("type must be defined and not null and not empty!");
    }
    else
    {
        if (type === "rules" || type === "RULES" || type === "Rules") userules = true;
        else if (type === "strategies" || type === "Strategies" || type === "Strategies") userules = false;
        else throw new Error("invalid type (" + type + ") found and used here!");
    }
    console.log("userules = " + userules);
    
    return (
        <div id={(userules ? "rule" : "strategy") + mid}>
            <label htmlFor={(userules ? "nwrule" : "nwstrategy") + mid}
                id={(userules ? "nwrulelbl" : "nwstrategylbl") + mid}>
                    {userules ? "Rule" : "Strategy"} #{mid}: </label>
            <input id={(userules ? "nwrule" : "nwstrategy") + mid} type="text"
                style={{width: "900px", height: "100px"}} placeholder={userules ? "Rule:" : "Strategy:"}
                value={rules[mid - 1].text} onChange={handleChange} /><br />
            {userules ? (
                <>
                    <input required={true} type="radio" id={"basicrule" + mid} name={"kindofrule" + mid}
                        value="basic" checked={rules[mid - 1].isbasic} onChange={handleChange} />
                    <label htmlFor={"basicrule" + mid} id={"basicrulelbl" + mid}>Basic Rule</label>
                    <input required={true} type="radio" id={"vegasrule" + mid} name={"kindofrule" + mid}
                        value="vegas" checked={rules[mid - 1].isvegas} onChange={handleChange} />
                    <label htmlFor={"vegasrule" + mid} id={"vegasrulelbl" + mid}>Vegas Rule</label>
                </>
            ): null}
        </div>
    );
}

export default GameFormRule;
