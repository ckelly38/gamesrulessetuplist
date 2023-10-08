import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import AddAGame from "./AddAGame";
import GameRulesStatsSetupRenderer from "./GameRulesStatsSetupRenderer";
import TagLevelsClass from './TagLevelsClass';


function App() {
  const [games, setGames] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  function screenEachGameObj(gameobj)
  {
    console.log("gameobj = ", gameobj);
    /*
    "name": "name",
    "id": 0,
    "MinNumberOfPlayers": 0,
    "MaxNumberOfPlayers": 0,
    "NumberOfPlayersExcluding": [],
    "NumberOfDecks": 0,
    "AverageMinutes": 0,
    "KindOfDeck": "A normal 52 card deck that has the 4 suits and no jokers",
    "image": "url",
    "description": "",
    "rules": {
        "basic": [],
        "vegasstyle": []
    },
    "strategies": []
    */

    const mytaglvs = new TagLevelsClass("");

    //name, kind, image, description, and all rules
    const basickeysarr = ["name", "KindOfDeck", "image", "description"];
    for (let item in basickeysarr)
    {
      if (mytaglvs.doesInputHaveUnnecessaryCharacters({input: "" + gameobj[item]}))
      {
          console.error("handleChange: input (" + gameobj[item] + ") has illegal characters in it!");
          console.log("changes aborted!");
          return false;
      }
      //else;//do nothing
    }
    for (let n = 0; n < gameobj.rules.basic.length; n++)
    {
      if (mytaglvs.doesInputHaveUnnecessaryCharacters({input: "" + gameobj.rules.basic[n]}))
      {
          console.error("handleChange: input (" + gameobj.rules.basic[n] +
            ") has illegal characters in it!");
          console.log("changes aborted!");
          return false;
      }
      //else;//do nothing
    }
    for (let n = 0; n < gameobj.rules.vegasstyle.length; n++)
    {
      if (mytaglvs.doesInputHaveUnnecessaryCharacters({input: "" + gameobj.rules.vegasstyle[n]}))
      {
          console.error("handleChange: input (" + gameobj.rules.vegasstyle[n] +
            ") has illegal characters in it!");
          console.log("changes aborted!");
          return false;
      }
      //else;//do nothing
    }
    for (let n = 0; n < gameobj.strategies.length; n++)
    {
      if (mytaglvs.doesInputHaveUnnecessaryCharacters({input: "" + gameobj.strategies[n]}))
      {
          console.error("handleChange: input (" + gameobj.strategies[n] +
            ") has illegal characters in it!");
          console.log("changes aborted!");
          return false;
      }
      //else;//do nothing
    }
    return true;
  }

  useEffect(() => {
    fetch("http://localhost:3000/games").then((response) => response.json()).then((response) => {
      console.log("response = ", response);
      for (let n = 0; n < response.length; n++)
      {
        if (screenEachGameObj(response[n]));//they are safe
        else
        {
          console.error("game response[" + n + "] is not safe: ", response[n]);
          throw new Error("found at least one game at index n = " + n + " that was not safe!");
        }
      }
      setGames(response);
      setIsLoaded(true);
    }).catch((err) => {
      console.error("there was a problem getting the games from the server!");
      console.error(err);
      alert("Error: there was a problem getting the games from the server!");
    });
  }, []);

  console.log("loaded = " + loaded);
  console.log("games = ", games);

  function varMustBeDefinedBool(myvar, myvarname = "myvar")
  {
    if (myvar === undefined || myvar === null)
    {
      throw new Error("" + myvarname + " must be a defined boolean variable, but it was not defined!");
    }
    else
    {
      if (myvar === true || myvar === false) return true;
      else
      {
        throw new Error("" + myvarname + " must be a defined boolean variable, but it was not a boolean!");
      }
    }
  }

  function updateOrAddOrDeleteGame(nwgameobj, useupdate, usedelgame)
  {
    console.log("APP: addGame: nwgameobj = ", nwgameobj);
    console.log("APP: addGame: useupdate = " + useupdate);
    console.log("APP: addGame: usedelgame = " + usedelgame);
    if (nwgameobj === undefined || nwgameobj === null)
    {
      throw new Error("the game object that we want to add to the list of games must be defined and " +
        "not null!");
    }
    //else;//do nothing

    varMustBeDefinedBool(useupdate, "useupdate");
    varMustBeDefinedBool(usedelgame, "usedelgame");

    if (useupdate === usedelgame)
    {
      if (useupdate)
      {
        throw new Error("both useupdate and usedelgame cannot be true because we cannot both update " +
          "and delete the same game!");
      }
      //else;//do nothing valid adding the game
    }
    //else;//do nothing valid must be either updating or deleting the game
    setIsLoaded(false);

    let mthdstr = "";
    if (usedelgame) mthdstr = "DELETE";
    else
    {
      if (useupdate) mthdstr = "PATCH";
      else mthdstr = "POST";
    }
    console.log("APP: addGame: mthdstr = " + mthdstr);

    let myidstr = "";
    if (usedelgame || useupdate) myidstr = "" + nwgameobj.id;
    //else;//do nothing
    console.log("APP: addGame: myidstr = " + myidstr);
    
    let configobj = {
      method: mthdstr,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(nwgameobj)
    };
    fetch("http://localhost:3000/games/" + myidstr, configobj).then((response) => response.json())
    .then((response) => {
      console.log("APP: addGame: response = ", response);
      console.log("APP: addGame: useupdate = " + useupdate);
      console.log("APP: addGame: usedelgame = " + usedelgame);
      const mynwgameobj = response;
      let nwgames = null;
      if (usedelgame)
      {
        //update the state here, but take the idstr and find it then filter it out keep the rest
        nwgames = games.filter((game) => (game.id !== Number(myidstr)));
      }
      else
      {
        if (useupdate)
        {
          //updating a specific game, like deleting a game:
          //take the id and find it, then change it, and return updated list with map, then set it
          nwgames = games.map((game) => {
            if (game.id === Number(myidstr)) return nwgameobj;
            else return game;
          });
        }
        else
        {
          //adding a new game
          nwgames = [...games];
          nwgames.push(mynwgameobj);
        }
      }
      setGames(nwgames);
      setIsLoaded(true);
    }).catch((err) => {
      console.error("there was a problem puting the new game on the server!");
      console.error(err);
      alert("Error: there was a problem puting the new game on the server!");
    });
  }
  function addGame(nwgameobj)
  {
    updateOrAddOrDeleteGame(nwgameobj, false, false);
  }
  function updateGame(nwgameobj)
  {
    updateOrAddOrDeleteGame(nwgameobj, true, false);
  }
  function deleteGame(nwgameobj)
  {
    updateOrAddOrDeleteGame(nwgameobj, false, true);
  }

  if (loaded)
  {
    return (
      <Switch>
        <Route exact path="/">
          <NavBar />
          <Home games={games} />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/new">
          <>
            <NavBar />
            <AddAGame addGame={addGame} />
          </>
        </Route>
        <Route exact path="/about">
          <GameRulesStatsSetupRenderer games={games} type="STATS" updateGame={updateGame} />
        </Route>
        <Route path="/:id/about">
          <GameRulesStatsSetupRenderer games={games} type="STATS" updateGame={updateGame} />
        </Route>
        <Route exact path="/stats">
          <GameRulesStatsSetupRenderer games={games} type="STATS" updateGame={updateGame} />
        </Route>
        <Route path="/:id/stats">
          <GameRulesStatsSetupRenderer games={games} type="STATS" updateGame={updateGame} />
        </Route>
        <Route exact path="/setup">
          <GameRulesStatsSetupRenderer games={games} type="SETUP" updateGame={updateGame} />
        </Route>
        <Route path="/:id/setup">
          <GameRulesStatsSetupRenderer games={games} type="SETUP" updateGame={updateGame} />
        </Route>
        <Route exact path="/rules">
          <GameRulesStatsSetupRenderer games={games} type="RULES" updateGame={updateGame} />
        </Route>
        <Route path="/:id/rules">
          <GameRulesStatsSetupRenderer games={games} type="RULES" updateGame={updateGame} />
        </Route>
        <Route path="*/*">
          <>
            <NavBar />
            <h1>ERROR: 404 PAGE NOT FOUND!</h1>
          </>
        </Route>
      </Switch>
    );
  }
  else
  {
    return (
      <div className="App">
        <NavBar />
        <p>Loading...</p>
      </div>
    );
  }
}

export default App;
