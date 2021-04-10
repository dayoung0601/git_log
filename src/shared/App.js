import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Header from "../components/Header";
import PostList from "../pages/PostList";
import { history } from "../redux/configureStore";

function App() {
  return (
    <React.Fragment>
      <Header/>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
