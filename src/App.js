import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import GameRulesStatsSetupRenderer from "./GameRulesStatsSetupRenderer";

function App() {
  const [games, setGames] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/games").then((response) => response.json()).then((response) => {
      console.log("response = ", response);
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
        <Route exact path="/about">
          <GameRulesStatsSetupRenderer games={games} type="STATS" />
        </Route>
        <Route path="/:id/about">
          <GameRulesStatsSetupRenderer games={games} type="STATS" />
        </Route>
        <Route exact path="/stats">
          <GameRulesStatsSetupRenderer games={games} type="STATS" />
        </Route>
        <Route path="/:id/stats">
          <GameRulesStatsSetupRenderer games={games} type="STATS" />
        </Route>
        <Route exact path="/setup">
          <GameRulesStatsSetupRenderer games={games} type="SETUP" />
        </Route>
        <Route path="/:id/setup">
          <GameRulesStatsSetupRenderer games={games} type="SETUP" />
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
