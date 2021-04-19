import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import { set } from 'immer/dist/internal';

// actions
// const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const LOGIN_CHECK = "LOGIN_CHECK";

// actionCreators: createAction
// const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const loginCheck = createAction(LOGIN_CHECK, (token) => ({ token }));

// initial State
const initialState = {
  user: null,
  is_login: false,
  is_me: false,
};

//API요청(middleware actions)
//id=email
const signupAPI = (email, nickname, pw, pwCheck, github) => {
  return function (dispatch, getState, { history }) {
    console.log(nickname, pw);

    const API = "http://13.125.167.83/api/signup";
    console.log(API);
    axios
      .post(
        API,
        {
          password: pw,
          passwordConfirm: pwCheck,
          nickname: nickname,
          email: email,
          githubUrl: `https://github.com/${github}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => response)
      .then((result) => {
        window.alert("회원가입이 되었습니다!");
        history.push("/");
      });
  };
};

//로그인
const loginAPI = (nickname, pw) => {
  return function (dispatch, getState, { history }) {
    console.log(nickname, pw);
    const API = "http://13.125.167.83/api/login";
    axios({
      method: "post",
      url: API,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      },
      data: JSON.stringify({
        nickname : nickname,
        password: pw,
      }),
    })
    .then((res) => {
      let token = res.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      let decoded = jwt_decode(token);
      localStorage.setItem("nickname", decoded.nickname);
      localStorage.setItem("profileImgUrl", decoded.profileImgUrl);
      dispatch(getUserInofoAPI({
        nickname: nickname,
        password: pw,
      }))
      history.push('/');
    })
      .catch((err) => {
        console.log(err);
        alert("로그인실패!");
      });
  };
};

// const getUserInfo = () => {
//   return function (dispatch, getState, { history }) {
//     axios.get("/api/user").then((res) => {
//       console.log("getUserInfo", res);
//       dispatch(
//         setUser({
//           email: res.data.email,
//           nickname: res.data.nickname,
//         })
//       );
//     });
//   };
// };

//로그인 상태 유지 체크
// const loginCheck = () => {
//   return function (dispatch, getState, { history }) {
//     //const token = "token_ken";
//     const token = localStorage.getItem('token');
//     console.log(token);
//     if (token) {
//       dispatch(
//         setUser({
//           nickname: 'nickname',
//           profileImg : '',
//         })
//       );
//     } else {
//       console.log(token);
//       // dispatch(logoutCheck());
//     }
//   };
// };

const logoutCheck = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    dispatch(logOut());
    history.replace("/");
  };
};


// reducer: handleActions(immer를 통한 불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
        localStorage.removeItem("profileImgUrl");
        draft.user = null;
        draft.is_login = false;
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.token;
      }),
  },
  initialState
);

// actionCreator export
const actionCreators = {
  logOut,
  getUser,
  signupAPI,
  loginAPI,
  loginCheck,
  logoutCheck,
  getUserInfoAPI,
};

export { actionCreators };
