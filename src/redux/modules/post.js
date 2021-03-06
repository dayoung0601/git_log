import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const EDIT_LIKE = "EDIT_LIKE";

// actionCreators: createAction
const setPost = createAction(SET_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const editLike = createAction(EDIT_LIKE, (like, post_id) => ({
  like,
  post_id,
}));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 10 },
  is_loading: false,
};

const initialPost = {
  contents: "",
  imgUrl: "",
  writerNickname: "",
  writerProfile: "",
  createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
  modifiedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
  commentList: [],
  commentCnt: 0,
  heartCnt: 0,
  uploading: false,
  preview: null,
  is_like: false,
};

const instance = axios.create({
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "multipart/form-data",
  },
  timeout: 5000,
});

const getPostAPI = (post) => {
  return function (dispatch, getState, { history }) {
    const is_login = getState().user.is_login;

    axios({
      method: "GET",
      url: `http://13.125.167.83/api/posts?page=0&size=10`,
    })
      .then((res) => {
        // console.log(res)
        let docs = res.data.content;
        let post_list = [];

        docs.forEach((doc) => {
          // let like_info = false;
          // if (is_login) {
          //   like_info = dispatch(likeActions.getLikeAPI(doc.id));
          //   console.log(like_info);
          // }

          let post = {
            post_id: doc.id,
            content: doc.content,
            imgUrl: doc.imgUrl,
            writerNickname: doc.createdBy,
            writerProfile: doc.accountResponseDto.profileImgUrl,
            createdAt: doc.createdAt,
            modifiedAt: doc.modifiedAt,
            commentList: doc.comments,
            commentCnt: doc.commentCnt,
            heartCnt: doc.heartCnt,
          };

          post_list.push(post);
        });
        dispatch(setPost(post_list));
      })
      .catch((err) => {
        console.error("???????????? ??????????????? ????????? ????????????", err);
      });
  };
};

// ????????? ????????? : ?????? ?????? ????????? ?????? ??????
const getPostByUserAPI = (userId) => {
  return function (dispatch, getState, { history }) {
    axios.get(``).then((res) => {
      dispatch(setPost(res.data));
    });
  };
};

// ????????? ????????????
const addPostAPI = (form) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://13.125.167.83/api/posts",
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": localStorage.getItem("token"),
      },
      timeout:5000,
    })
      .then((res) => {
        console.log(res);
        dispatch(addPost());
      })
      .catch((err) => {
        console.error("?????? ??????", err);
      });
    history.push("/");
  };
};

// ????????? ????????????
const editPostAPI = (post_id, content, img) => {
  return function (dispatch, getState, { history }) {
    const form_edit = new FormData();
    form_edit.append("content", content);
    form_edit.append("img", img);
    console.log(form_edit);
    console.log(post_id);

    axios({
      method: "put",
      url: `http://13.125.167.83/api/posts/${post_id}`,
      data: form_edit,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        let post = {
          content: content,
          img: img,
        };
        dispatch(editPost(post_id, post));
      })
      .catch((err) => {
        console.error("?????? ??????", err);
      });
    history.push("/");
  };
};

// ????????? ????????????
const deletePostAPI = (post_id) => {
  console.log(post_id);
  return function (dispatch, getState, { history }) {
    axios
      .delete(`http://13.125.167.83/api/posts/${post_id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(deletePost(post_id));
        history.replace("/");
      })
      .catch((err) => {
        window.alert("????????? ????????? ????????? ?????????!");
      });
  };
};

// reducer: handleActions
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
        // draft.list = draft.list.reduce((acc, cur) => {
        //   if(acc.findIndex(a => a.id === cur.id) === -1){
        //     // -1??? ???????????? ?????? ????????? ???. ...acc, cur ?????? ????????? ????????????.
        //     return [...acc, cur];
        //   }else {
        //     acc[acc.findIndex((a) => a.id === cur.id)] = cur;
        //     return acc;
        //   }
        // }, []);
      }),
    // [EDIT_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     // indIndex: ?????? ?????? (p) => ?????? ????????? ?????? idx??? ?????? ??????)
    //     let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
    //     // immer ??? ???????????? ????????? ????????? ?????? :  ????????? ??? ???????????? ?????? ?????? ?????? ????????? ?????? ?????????
    //     // ??? ????????? ?????? if ????????? ????????? ?????? ??????  spread ????????? ????????? ??????????????? ??????????????? ????????? ??????????????? ??????.
    //     draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    //   }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        if (idx !== -1) {
          // ???????????? idx ????????? ?????? 1?????? ????????????.
          draft.list.splice(idx, 1);
        }
      }),
    [EDIT_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((l) => l.id === action.payload.post_id);
        // ???????????? ??? ????????? ?????? ??? ?????? ??????, is_like??? action?????? ????????? ????????? ?????????!
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
        console.log(idx);
      }),
  },
  initialState
);

// actionCreator export
const actionCreators = {
  addPost,
  setPost,
  editPost,
  deletePost,
  getPostAPI,
  getPostByUserAPI,
  addPostAPI,
  editPostAPI,
  deletePostAPI,
  editLike,
  // editLikeAPI,
};

export { actionCreators };
