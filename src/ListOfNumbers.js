import React from "react";

function ListOfNumbers({label, myexs, setMyExs})
{
    function handleNumValChange(event)
    {
        console.log("event.target = ", event.target);
        console.log("event.target.value = " + event.target.value);
        console.log("event.target.id = " + event.target.id);

        let mynwexs = myexs.map((myx) => {
            if (myx.id === event.target.id)
            {
                let nwobj = {...myx};
                nwobj.value = event.target.value;
                return nwobj;
            }
            else return myx;
        });
        setMyExs(mynwexs);
    }

    let inputsarr = myexs.map((myx) => 
        (
            <input key={myx.id} id={myx.id} type="number" step="1" min="0" style={{width: "40px"}}
                value={myx.value} onChange={handleNumValChange} />
        )
    );
    function addInput(event)
    {
        let myidstr = "pex" + (myexs.length + 1);
        setMyExs([...myexs, {
            id: myidstr,
            value: 0
        }]);
    }
    
    const rendinputsarr = inputsarr.map((input) => (
        <div style={{display: "inline"}} key={input.id}>{input}, </div>));

    return (
        <div>{label}: 
            <div style={{display: "inline"}}>{rendinputsarr}</div>
            <button type="button" onClick={addInput}>Add More Exclusions</button>
        </div>
    );
}

export default ListOfNumbers;
