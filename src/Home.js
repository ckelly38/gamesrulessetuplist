import React from "react";
import { NavLink } from "react-router-dom";

function Home({games})
{
    const gameobjs = games.map((game) => (
        <li key={game.id} id={game.id}>
            <p>{game.name}:</p>
            <NavLink style={{paddingLeft: "20px", paddingRight: "20px", color: "red"}}
                to={"/about/" + game.id}>About</NavLink>
            <NavLink style={{paddingLeft: "20px", paddingRight: "20px", color: "red"}}
                to={"/setup/" + game.id}>Setup</NavLink>
            <NavLink style={{paddingLeft: "20px", paddingRight: "20px", color: "red"}}
                to={"/rules/" + game.id}>Rules And Strategies</NavLink>
        </li>
    ));
    
    //https://static.wikia.nocookie.net/tronuprisings/images/6/6b/Argon_Park.png
    //https://static.wikia.nocookie.net/tronuprisings/images/6/6b/Argon_Park.png/revision/latest?cb=20131128164544
    //https://c4.wallpaperflare.com/wallpaper/71/679/615/tron-uprising-wallpaper-preview.jpg
    //width: "1000px", height: "561px"
    return (
        <div style={{backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/71/679/615/tron-uprising-wallpaper-preview.jpg")',
            width: "1260px", height: "791px", backgroundRepeat: "no-repeat", backgroundSize: "cover",
            color: "red", backgroundColor: "orange"}}>
            <h1>Home</h1>
            <ul style={{marginLeft: "100px"}}>{gameobjs}</ul>
        </div>
    );
}

export default Home;
