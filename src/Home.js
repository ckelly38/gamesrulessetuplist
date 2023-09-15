import React from "react";
import { NavLink } from "react-router-dom";

function Home({games})
{
    const gameobjs = games.map((game) => (
        <li key={game.id} id={game.id}>
            <p>{game.name}:</p>
            <ul>
                <li>
                    <NavLink to={"/" + game.id + "/about"}>About</NavLink>
                </li>
                <li>
                    <NavLink to={"/" + game.id + "/setup"}>Setup</NavLink>
                </li>
                <li>
                    <NavLink to={"/" + game.id + "/rules"}>Rules And Strategies</NavLink>
                </li>
            </ul>
        </li>
    ));

    return (
        <div>
            <h1>Home</h1>
            <ul>{gameobjs}</ul>
        </div>
    );
}

export default Home;
