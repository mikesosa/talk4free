import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { checkTypeUser } from "./controllers/ApiRequests";
import Home from "./components/Home";
import "./App.scss";
import Pricing from "./components/Pricing";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    imageUrl: ""
  });

  // ========================================================================

  const updateLogin = async res => {
    setUserInfo({
      userName: res.userName,
      email: res.email,
      imageUrl: res.imageUrl
    });
    setIsAdmin(await checkTypeUser(res.email));
    setIsLoggedIn(res.isSignedIn);
  };

  // ========================================================================

  return (
    <Router>
      <NavBar isLoggedIn={updateLogin} />
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <Home
              {...props}
              userInfo={userInfo}
              isAdmin={isAdmin}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
        <Route path="/pricing" exact component={Pricing} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
