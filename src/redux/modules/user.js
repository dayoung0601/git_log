import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { set } from 'immer/dist/internal';

// actions
// const LOG_IN = "LOG_IN";
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';
const LOGIN_CHECK = 'LOGIN_CHECK';

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
  is_me:false,
};

//API요청(middleware actions)
//id=email
const signupAPI = (email, nickname, pw, pwCheck, github) => {
  return function (dispatch, getState, { history }) {
    // console.log(nickname, pw);
    
    const API = 'http://13.125.167.83/api/signup';
    console.log(API);
    axios.post(API,
      {
        password: pw,
        passwordConfirm:pwCheck,
        nickname: nickname,
        email:email,
        githubUrl:`https://github.com/${github}`,
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      },
      })
      .then((response) => response)
      .then((result) => {
        window.alert('회원가입이 되었습니다!');
        history.push('/');
      });
  };
};

//로그인 
const loginAPI = (nickname, pw) => {
  return function (dispatch, getState, {history}){
    //console.log(nickname, pw)
    const API = 'http://13.125.167.83/api/login';
    axios.post(API, 
      {
        nickname : nickname,
        password : pw,
      },
      {
      headers : {
        'Content-type': 'application/json', 
        'Accept': 'application/json' 
      },
      withCredentials: true//cors관련 
    })
    .then((response) => {
      
      localStorage.setItem('token', response.data.token);
      let decoded = jwt_decode(response.data.token);
      localStorage.setItem('nickname', decoded.nickname);
      localStorage.setItem('profileImgUrl', decoded.profileImgUrl);
      
      dispatch(setUser
        ({ nickname : nickname,
          }))
    history.push('/');
  })
    .catch((err) => {
      console.log(err);
      alert('로그인실패!')
    })
  }
};


//해당유저의 정보 가져오기 : Story의 유저정보
const getUserInfoAPI = (nickname) => {
  return function (dispatch, getState, { history }) {
    const API = `http://13.125.167.83/story/${nickname}`;
    axios
      .get(API)
      .then((res) => {
        console.log(res.data);
        let doc = res.data.account;
        console.log(doc);

        // let user_info = [];
          let user = {
            nickname : doc.nickname,
            bio : doc.bio,
            profileImgUrl: doc.profileImgUrl,
            githubUrl: doc.githubUrl, 
        }
          console.log(user);
          dispatch(setUser(user));
      })
      .catch((err) => {
        console.error("게시물을 가져오는데 문제가 있습니다", err);
      });
    };
  };

//로그인 상태 유지 체크
// const loginCheck = () => {
//   return function (dispatch, getState, { history }) {
//     const nickName = JSON.parse(localStorage.getItem('nickname'))
//     console.log('유저인포!!', nickName)
//     if (token && nickName){
//       dispatch(
//         setUser({
//           nickname: nickname,
//         })
//       );
//     } else {
//       console.log(token);
//       dispatch(logoutCheck());
//     }
//   };
// };


const logoutCheck = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
    history.replace('/');
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
        localStorage.removeItem('token');
        localStorage.removeItem("nickname");
        localStorage.removeItem("profileImgUrl");
        draft.user = null;
        draft.is_login = false;
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        localStorage.getItem("token");
        localStorage.getItem("nickname");
        localStorage.getItem("profileImgUrl");
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