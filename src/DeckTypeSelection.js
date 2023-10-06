import React from "react";

function DeckTypeSelection({gameobj, handleChange, myotherdecktype})
{
    return (<>
        <select id="deck-type" value={gameobj.KindOfDeck} onChange={handleChange}>
            <option value="A normal 52 card deck that has the 4 suits and no jokers">Normal</option>
            <option value="Special Deck that comes with the game">Special</option>
            <option value={myotherdecktype}>Other</option>
        </select>
        <input id="otherdecktype" type="text"  style={{width: "400px"}}
            placeholder="other deck type..." value={myotherdecktype} onChange={handleChange} />
    </>);
}

export default DeckTypeSelection;
