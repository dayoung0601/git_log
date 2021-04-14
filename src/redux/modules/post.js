import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from 'moment';

// axios.default.baseURL ='';

const initialState = {
  list:[],
  detailPost:[],
  // paging:{ start: null, next: null, size: 10 },
  // is_loading: false
};

const initialPost = {
  list: [
    {id: 0,
      user_info: {
        nickname: "nickname",
        profile:
          "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
      },
      image_url:
        "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
      contents: "initialPost 두번째 게시물",
      comment_cnt: 10,
      like_cnt: 5,
      insert_dt: "2021-04-13",
    },
    {id: 1,
      user_info: {
        nickname: "nickname",
        profile:
          "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
      },
      image_url:
        "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
      contents: "initialPost 세번째 게시물",
      comment_cnt: 5,
      like_cnt: 5,
      insert_dt: "2021-04-13",
    },
    {id: 2,
      user_info: {
        nickname: "nickname",
        profile:
          "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
      },
      image_url:
        "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
      contents: "initialPost 첫번째 게시물",
      comment_cnt: 0,
      like_cnt: 5,
      insert_dt: "2021-04-13",
    },
  ]
};


// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// actionCreators: createAction
const setPost = createAction(SET_POST, (post)=> ({ post }));
const addPost = createAction(ADD_POST, (post)=> ({ post }));

// 유저 스토리 페이지
const fetchPostByUser = (userId) => {
  return function (dispatch, getState, {history}) {
    axios.get(`/api/post/${userId}`).then((res) => {
      dispatch(setPost(res.data));
    })
  }
}

const createPost = (post) => {
  return function (dispatch, getState, { history }) {
    console.log('createPost', post);
    axios.post(`/api/post`, post).then((res) => {
      history.push('/');
    });
  };
};

const deletePost = (postId) => {
  return function (dispatch, getState, { history }) {
    axios.delete(`/api/post/${postId}`).then((res) => {
      history.push('/');
    });
  };
};

const updatePost = (postId, post) => {
  return function (dispatch, getState, { history }) {
    axios.put(`/api/post/${postId}`, post).then((res) => {
      history.push('/');
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
    produce (state, (draft) =>{
      draft.detailPost = action.payload.post;
    })
  },
  initialState
);


// actionCreator export
const actionCreators = {
  addPost,
  fetchPostByUser,
  createPost,
  deletePost,
  updatePost,
  setPost,
};

export { actionCreators };
