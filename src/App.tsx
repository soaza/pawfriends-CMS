import "./App.css";
import * as React from "react";

import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import DogPage from "./Pages/DogPage";
import ExcoPage from "./Pages/ExcoPage";
import MainPage from "./Pages/MainPage";
import ActivityPage from "./Pages/ActivityPage";

const { useState, useEffect } = React;

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") == "true";
    setUserAuthenticated(isLoggedIn);
  }, []);
  const location = useLocation();

  if (userAuthenticated == false)
    return <LoginPage setUserAuthenticated={setUserAuthenticated} />;

  return (
    <>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={HomePage}></Route>
        <Route
          exact
          path="/login"
          component={() => (
            <LoginPage setUserAuthenticated={setUserAuthenticated} />
          )}
        ></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/dogs" component={DogPage}></Route>
        <Route path="/exco" component={ExcoPage}></Route>
        <Route path="/main" component={MainPage}></Route>
        <Route path="/activity" component={ActivityPage}></Route>
      </Switch>
    </>
  );
}

export default App;
