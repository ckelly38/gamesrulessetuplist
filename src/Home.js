import React from "react";
import { NavLink } from "react-router-dom";

function Home({games})
{
    const gameobjs = games.map((game) => (
        <li key={game.id} id={game.id}>
            <p>{game.name}:</p>
            <NavLink style={{paddingLeft: "20px", paddingRight: "20px"}}
                to={"/" + game.id + "/about"}>About</NavLink>
            <NavLink style={{paddingLeft: "20px", paddingRight: "20px"}}
                to={"/" + game.id + "/setup"}>Setup</NavLink>
            <NavLink style={{paddingLeft: "20px", paddingRight: "20px"}}
                to={"/" + game.id + "/rules"}>Rules And Strategies</NavLink>
        </li>
    ));

    return (
        <div>
            <h1>Home</h1>
            <ul style={{marginLeft: "100px"}}>{gameobjs}</ul>
        </div>
    );
}

export default Home;
