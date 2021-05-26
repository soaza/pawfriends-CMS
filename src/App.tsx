import "./App.css";

import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

function App() {
  const location = useLocation();

  return (
    <>
      <Switch location={location} key={location.pathname}>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/" component={LoginPage}></Route>
      </Switch>
    </>
  );
}

export default App;
