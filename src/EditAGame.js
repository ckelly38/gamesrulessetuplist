import React from "react";

function EditAGame(props)
{
    return (
        <div>
            <div>
                <select id="fonts-drop-down">{null}</select>
                <input type="number" step="0.25" id="fontsize" placeholder="font size" />
                <button id="bold" className="">B</button>
                <button id="italics" className="">I</button>
                <button id="underline" className="">U</button>
                <select id="font-color">{null}</select>
            </div>
            <div>
                {/*load the rules here*/}
                {/*load the pieces that are allowed to be styled here*/}
                {/*have some way to preview it before the changes are official*/}
                {/*<RulesNStrategies key={game.id} games={games} gameobj={game} />*/}
            </div>
        </div>
    );
}

export default EditAGame;