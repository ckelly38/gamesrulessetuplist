import React, {useState} from "react";
import GameFormRule from "./GameFormRule";

function GameFormRules({myrules, setMyRules, type, handleChange})
{
    console.log("myrules = ", myrules);
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

    function handleRuleChange(event)
    {
        console.log("event.target = ", event.target);
        console.log("event.target.id = " + event.target.id);
        console.log("event.target.value = " + event.target.value);
        console.log("event.target.checked = " + event.target.checked);

        if (userules)
        {
            //id === "basicrule" integernumber immediately after it
            //id === "vegasrule" integernumber immediately after it
            //id === "nwrule" integernumber immediately after it
            let myrulepids = ["basicrule", "vegasrule", "nwrule"];
            let myruleindx = -1;
            for (let n = 0; n < myrulepids.length; n++)
            {
                if (event.target.id.indexOf(myrulepids[n]) === 0)
                {
                    myruleindx = n;
                    break;
                }
                //else;//do nothing
            }
            console.log("myruleindx = " + myruleindx);

            if (myruleindx < 0 || (myruleindx > myrulepids.length - 1 && myrulepids.length > 0))
            {
                throw new Error("handleChange: NEED TO DO SOMETHING HERE TO HANDLE THE ID (" +
                    event.target.id + ")!");
            }
            else
            {
                console.log("myrulepids[" + myruleindx + "] = " + myrulepids[myruleindx]);

                if (event.target.id === myrulepids[myruleindx])
                {
                    throw new Error("handleChange: no id num found and used for the element is not " +
                        "allowed!");
                }
                //else;//do nothing safe to proceed

                let mynumberstr = event.target.id.substring(myrulepids[myruleindx].length);
                console.log("mynumberstr = " + mynumberstr);

                let myidnum = Number(mynumberstr);
                if (isNaN(myidnum))
                {
                    throw new Error("handleChange: illegal id num found and used for the element!");
                }
                //else;//do nothing now it is safe to proceed

                //need to somehow know what changed...
                //we have the change from event.target.value

                let mynwruleobj = {...myrules[myidnum - 1]};
                const usechecked = ((myruleindx > 0 || myruleindx === 0) && myruleindx < 2);
                const myvalkey = (usechecked ? "checked" : "value"); 
                let myobjkey = "";
                if (myruleindx === 0) myobjkey = "isbasic";
                else if (myruleindx === 1) myobjkey = "isvegas";
                else if (myruleindx === 2) myobjkey = "text";
                else throw new Error("illegal value found and used for the myruleindx!");
                console.log("usechecked = " + usechecked);
                console.log("myvalkey = " + myvalkey);
                console.log("myobjkey = " + myobjkey);
                
                if (myobjkey === "text")
                {
                    //check to make sure the input does not have invalid characters in it
                    if (handleChange({input: "" + event.target[myvalkey]}))
                    {
                        console.error("handleChange: input (" + event.target[myvalkey] +
                            ") has illegal characters in it!");
                        console.log("changes aborted!");
                        return;
                    }
                    else mynwruleobj[myobjkey] = event.target[myvalkey];
                }
                else mynwruleobj[myobjkey] = event.target[myvalkey];
                
                console.log("mynwruleobj = ", mynwruleobj);

                let mynwrules = myrules.map((rule) => ((rule.id === mynwruleobj.id) ? mynwruleobj : rule));
                setMyRules(mynwrules);
            }
        }
        else
        {
            //check to make sure the input does not have invalid characters in it
            if (handleChange({input: "" + event.target.value}))
            {
                console.error("handleChange: input (" + event.target.value +
                    ") has illegal characters in it!");
                console.log("changes aborted!");
                return;
            }
            else
            {
                let mynumberstr = event.target.id.substring(10);
                console.log("mynumberstr = " + mynumberstr);

                let myidnum = Number(mynumberstr);
                if (isNaN(myidnum))
                {
                    throw new Error("handleChange: illegal id num found and used for the element!");
                }
                //else;//do nothing now it is safe to proceed

                //need to somehow know what changed...
                //we have the change from event.target.value

                let mynwruleobj = {...myrules[myidnum - 1]};
                mynwruleobj.text = event.target.value;
                console.log("mynwruleobj = ", mynwruleobj);

                let mynwrules = myrules.map((rule) => ((rule.id === mynwruleobj.id) ? mynwruleobj : rule));
                setMyRules(mynwrules);
            }
        }
    }

    function addRule(event)
    {
        const mynwidstr = (userules ? "rule" : "strategy") + (myrules.length + 1);
        let nwrules = null;
        if (userules)
        {
            nwrules = [...myrules, {
                id: mynwidstr,
                isbasic: false,
                isvegas: false,
                text: ""
            }];
        }
        else
        {
            nwrules = [...myrules, {
                id: mynwidstr,
                text: ""
            }];
        }
        setMyRules(nwrules);
    }

    const myruleobjs = myrules.map((rule) => {
        console.log("GENOBJS: rule = ", rule);
        let ruleidlenindx = -1;
        if (userules) ruleidlenindx = 4;
        else ruleidlenindx = 8;
        return (
            <GameFormRule key={rule.id} mid={Number(rule.id.toString().substring(ruleidlenindx))}
                rules={myrules} type={type} handleChange={handleRuleChange} />
    )});

    
    return (
        <>
            {myruleobjs}
            <button type="button" onClick={addRule}>Add More {userules ? "Rules" : "Strategies"}</button>
        </>
    );
}

export default GameFormRules;
