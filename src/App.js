import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import AddAGame from "./AddAGame";
import GameRulesStatsSetupRenderer from "./GameRulesStatsSetupRenderer";


function App() {
  const [games, setGames] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  function doesInputHaveUnnecessaryCharacters(inputobj)
  {
      console.log("AddAGame screener: inputobj = ", inputobj);
      if (inputobj.input === undefined || inputobj.input === null)
      {
          throw new Error("AddAGame screener: the input string was null and must be defined!");
      }
      //else;//do nothing
      console.log("screener: inputobj.input.length = " + inputobj.input.length);

      for (let i = 0; i < inputobj.input.length; i++)
      {
          //need to screen for "" before end of the string
          //need to screen for < or > or / or =
          //console.log("inputobj.input.charAt(" + i + ") = " + inputobj.input.charAt(i));
          if (inputobj.input.charAt(i) === '<')
          {
              console.log("may have found a tag start here at i = " + i + "!");
              let errmsg = "";
              for (let k = i + 1; k < inputobj.input.length; k++)
              {
                  if (inputobj.input.charAt(k) === '"')
                  {
                      errmsg = "AddAGame screener: illegal character " +
                          "found. Found < then \" after it!";
                  }
                  else if (inputobj.input.charAt(k) === '>')
                  {
                      errmsg = "AddAGame screener: illegal character found. " +
                          "Found < then > after it!";
                  }
                  else if (inputobj.input.charAt(k) === '=')
                  {
                      errmsg = "AddAGame screener: illegal character found. " +
                          "Found < then = after it!";
                  }
                  else
                  {
                      if (k === i + 1)
                      {
                          if (inputobj.input.charAt(k) === '/')
                          {
                              errmsg = "AddAGame screener: illegal character found. " +
                                  "Found < then / after it!";
                          }
                          else if (inputobj.input.charAt(k) === '>')
                          {
                              errmsg = "AddAGame screener: illegal character found. " +
                                  "Found < then > after it!";
                          }
                          //else;//do nothing
                      }
                      //else;//do nothing
                  }

                  if (errmsg.length > 0)
                  {
                      console.error(errmsg);
                      alert("Error: input = " + inputobj.input + " is illegal! " + errmsg);
                      return true;
                  }
              }//end of k for loop
          }
          //else;//do nothing should be safe
      }//end of i for loop
      console.log("AddAGame screener: input object is safe!");
      return false;
  }

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

    //name, kind, image, description, and all rules
    const basickeysarr = ["name", "KindOfDeck", "image", "description"];
    for (let item in basickeysarr)
    {
      if (doesInputHaveUnnecessaryCharacters({input: "" + gameobj[item]}))
      {
          console.error("handleChange: input (" + gameobj[item] + ") has illegal characters in it!");
          console.log("changes aborted!");
          return false;
      }
      //else;//do nothing
    }
    for (let n = 0; n < gameobj.rules.basic.length; n++)
    {
      if (doesInputHaveUnnecessaryCharacters({input: "" + gameobj.rules.basic[n]}))
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
      if (doesInputHaveUnnecessaryCharacters({input: "" + gameobj.rules.vegasstyle[n]}))
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
      if (doesInputHaveUnnecessaryCharacters({input: "" + gameobj.strategies[n]}))
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

  function addGame(nwgameobj)
  {
    console.log("APP: addGame: nwgameobj = ", nwgameobj);
    if (nwgameobj === undefined || nwgameobj === null)
    {
      throw new Error("the game object that we want to add to the list of games must be defined and " +
        "not null!");
    }
    //else;//do nothing
    setIsLoaded(false);
    
    let configobj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(nwgameobj)
    };
    fetch("http://localhost:3000/games", configobj).then((response) => response.json())
    .then((response) => {
      console.log("response = ", response);
      const mynwgameobj = response;
      let nwgames = [...games];
      nwgames.push(mynwgameobj);
      setGames(nwgames);
      setIsLoaded(true);
    }).catch((err) => {
      console.error("there was a problem puting the new game on the server!");
      console.error(err);
      alert("Error: there was a problem puting the new game on the server!");
    });
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
            <AddAGame screener={doesInputHaveUnnecessaryCharacters} addGame={addGame} />
          </>
        </Route>
        <Route exact path="/about">
          <GameRulesStatsSetupRenderer games={games} type="STATS"
            screener={doesInputHaveUnnecessaryCharacters} />
        </Route>
        <Route path="/:id/about">
          <GameRulesStatsSetupRenderer games={games} type="STATS"
            screener={doesInputHaveUnnecessaryCharacters} />
        </Route>
        <Route exact path="/stats">
          <GameRulesStatsSetupRenderer games={games} type="STATS"
            screener={doesInputHaveUnnecessaryCharacters} />
        </Route>
        <Route path="/:id/stats">
          <GameRulesStatsSetupRenderer games={games} type="STATS"
            screener={doesInputHaveUnnecessaryCharacters} />
        </Route>
        <Route exact path="/setup">
          <GameRulesStatsSetupRenderer games={games} type="SETUP"
            screener={doesInputHaveUnnecessaryCharacters} />
        </Route>
        <Route path="/:id/setup">
          <GameRulesStatsSetupRenderer games={games} type="SETUP"
            screener={doesInputHaveUnnecessaryCharacters} />
        </Route>
        <Route exact path="/rules">
          <GameRulesStatsSetupRenderer games={games} type="RULES"
            screener={doesInputHaveUnnecessaryCharacters} />
        </Route>
        <Route path="/:id/rules">
          <GameRulesStatsSetupRenderer games={games} type="RULES"
            screener={doesInputHaveUnnecessaryCharacters} />
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
