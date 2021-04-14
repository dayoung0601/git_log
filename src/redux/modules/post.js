import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";

// axios.default.baseURL = "http://13.125.167.83";

const initialState = {
  list: [],
  detailPost: [],
  // paging:{ start: null, next: null, size: 10 },
  // is_loading: false
};

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// actionCreators: createAction
const setPost = createAction(SET_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

// 메인 페이지: 게시글 전체목록 조회
const fetchPost = (postId) => {
  return function (dispatch, getState, { history }) {
    const API = "http://13.125.167.83/api/posts?page=0&size=10";
    axios.get(API, {
      headers: {
        "Content-Type": "application/json",
      },
      // data: JSON.stringify({}),
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      // dispatch(setPost(res.data));
    }).catch((err) => {
      console.error(err);
    });
  };
};

// const fetchPost = () => {
//   return function (dispatch, getState, { history }) {
//     const API = "http://13.125.167.83/api/posts?page=0&size=10";
//     fetch(API, {
//       method: 'GET',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify({})
//     })
//       .then((response) => response.json())
//       .then((result) => {
//       console.log(result);
//       });
//   };
// };

// 스토리 페이지
const fetchPostByUser = (userId) => {
  return function (dispatch, getState, { history }) {
    axios.get(`/api/post/${userId}`).then((res) => {
      dispatch(setPost(res.data));
    });
  };
};

const createPost = (post) => {
  return function (dispatch, getState, { history }) {
    console.log("createPost", post);
    axios.post(`/api/post`, post).then((res) => {
      history.push("/");
    });
  };
};

const deletePost = (postId) => {
  return function (dispatch, getState, { history }) {
    axios.delete(`/api/post/${postId}`).then((res) => {
      history.push("/");
    });
  };
};

const updatePost = (postId, post) => {
  return function (dispatch, getState, { history }) {
    axios.put(`/api/post/${postId}`, post).then((res) => {
      history.push("/");
    });
  };
};

// reducer: handleActions
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost = action.payload.post;
      }),
  },
  initialState
);

// actionCreator export
const actionCreators = {
  addPost,
  fetchPostByUser,
  fetchPost,
  createPost,
  deletePost,
  updatePost,
  setPost,
};

export { actionCreators };
