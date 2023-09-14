import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import GameSetup from "./GameSetup";
import GameRulesSetupRenderer from "./GameRulesSetupRenderer";

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
      <div className="App">
        <Switch>
          <Route exact path="/">
            <NavBar />
            <Home games={games} />
          </Route>
          <Route exact path="/home">
            <Redirect to="/" />
          </Route>
          <Route exact path="/about">
            <GameRulesSetupRenderer games={games} type="ABOUT" />
          </Route>
          <Route exact path="/setup">
            <GameRulesSetupRenderer games={games} type="SETUP" />
          </Route>
          <Route path="/:id/about">
            <GameRulesSetupRenderer games={games} type="ABOUT" />
          </Route>
          <Route path="/:id/setup">
            <GameRulesSetupRenderer games={games} type="SETUP" />
          </Route>
          <Route path="*/*">
            <>
              <NavBar />
              <h1>ERROR: 404 PAGE NOT FOUND!</h1>
            </>
          </Route>
        </Switch>
      </div>
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
