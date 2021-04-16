// 확인
// 하나 더 푸쉬

import "./App.css";
import React from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Header from "../components/Header";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";

function App() {
  return (
    <React.Fragment>
      <Background>
        <Responsive>
          <Header />
          <ConnectedRouter history={history}>
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={PostList} />
            <Route path="/write" exact component={PostWrite} />
          </ConnectedRouter>
          {/* 버튼에 권한주기 */}
          <WriteBtn
            onClick={() => history.push("/write")}
          >+ 새 글 등록</WriteBtn>
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
  width: 60vw;
  margin: auto;
`;

const WriteBtn = styled.div`
  width: 150px;
  height:45px;
  border-radius:50px;
  background-color: #eee;
  color: #212121;
  box-sizing: border-box;
  font-size: 1.2em;
  font-weight: 500;
  padding: 10px;
  position: fixed;
  bottom: 120px;
  right: 100px;
  text-align: center;
  vertical-align: middle;
  border: #eee;
  box-shadow:#eee;
`;

export default App;
