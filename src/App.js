import logo from './logo.svg';
import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import GameSetup from "./GameSetup";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:id/about">
          <About />
        </Route>
        <Route path="/:id/setup">
          <GameSetup />
        </Route>
        <Route path="*/*">
          <h1>ERROR: 404 PAGE NOT FOUND!</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
