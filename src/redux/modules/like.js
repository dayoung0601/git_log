import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { actionCreators as postActions } from "../../redux/modules/post";

const SET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

const setLike = createAction(SET_LIKE, (likelist) => ({ likelist }));
const addLike = createAction(ADD_LIKE, (like) => ({ like }));
const deleteLike = createAction(DELETE_LIKE, (like) => ({ like }));

const initialState = {
  list: [],
};

const getLikeAPI = (post_id) => {
  return function (dispatch, getState, { history }) {
    // if (!nickname) {
    //   return ;
    // }

    axios({
      method: "get",
      url: `http://13.125.167.83/api/post/${post_id}/heart`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        let docs = res;
        let list = [];
        // console.log(docs);

        docs.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        dispatch(setLike(list));
      })
      .catch((err) => {
        console.error("좋아요 get 실패", err);
      });
  };
};

const addLikeAPI = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    axios({
      method: "post",
      url: `http://13.125.167.83/api/post/${post_id}/heart`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {
        post_id: post_id,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(addLike(post_id));
      })
      .catch((err) => {
        console.error("좋아요 post 실패", err);
      });
  };
};

const deleteLikeAPI = (post_id) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "delete",
      url: `http://13.125.167.83/api/post/${post_id}/heart`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deleteLike(post_id));
      })
      .catch((err) => {
        console.error("좋아요 delete 실패", err);
      });
  };
};

export default handleActions(
  {
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.likeList;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.like);
      }),
    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.like);
        // let idx = draft.list.findIndex((l) => l.id === action.payload.like_id);
        // draft.list.splice(idx, 1);
      }),
  },
  initialState
);

const actionCreators = {
  setLike,
  getLikeAPI,
  addLikeAPI,
  deleteLikeAPI,
};

export { actionCreators };
