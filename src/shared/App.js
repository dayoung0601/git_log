import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Header from "../components/Header";
import Signup from '../pages/Signup';
import Login from '../pages/Login';

import { history } from "../redux/configureStore";


function App() {
  return (
    <React.Fragment>
      <Header/>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Signup} />
        <Route path="/login" component={Login} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
