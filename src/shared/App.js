import "./App.css";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Header from "../components/Header";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PostList from "../pages/PostList";

import Story from "../pages/Story";

import PostWrite from "../pages/PostWrite";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/user";

function App() {
  const dispatch = useDispatch();
  const local_token = localStorage.getItem("token") ? true : false;

  //제일 처음에 렌더링 될때마다 로컬에서 토큰으로 로그인을 체크(is_login를 true로)해라
  useEffect(() => {
    if (local_token) {
      dispatch(actionCreators.loginCheck(local_token));
    }
  }, []);

  return (
    <React.Fragment>
      <Background>
        <Header />
        <Responsive>
          <ConnectedRouter history={history}>
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={PostList} />
            <Route path="/write" exact component={PostWrite} />
            <Route path="/write/:id" exact component={PostWrite} />
            <Route path="/story" component={Story} />
          </ConnectedRouter>
        </Responsive>
      </Background>
    </React.Fragment>
  );
}

const Background = styled.div`
  ${(props) => props.theme.border_box};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main_bg_color};
`;

const Responsive = styled.div`
  ${(prop) => prop.theme.responsiveContainer};
  width: 65vw;
  margin: auto;
`;

export default App;
