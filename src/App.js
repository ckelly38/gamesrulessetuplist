import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import {Switch, Route} from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import GameSetup from "./GameSetup";

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

  if (loaded);
  else
  {
    return (
      <div className="App">
        <NavBar />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:id/about">
          <About games={games} />
        </Route>
        <Route path="/:id/setup">
          <GameSetup games={games} />
        </Route>
        <Route path="*/*">
          <h1>ERROR: 404 PAGE NOT FOUND!</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
