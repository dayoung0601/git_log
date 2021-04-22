import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import "moment";
import moment from "moment";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (comment_id, post_id) => ({
  comment_id, post_id
}));

const initialState = {
  list: {
   post_id:[],
  },
};

const getCommentAPI = (post_id) => {

  return function (dispatch, getState, { history }) {
    if(!post_id){
      return;
    }

    axios({
      method: "GET",
      url: `http://13.125.167.83/api/posts/${post_id}/comments`,
      // headers: {
      //   "Accept": "application.json",
      //   "Content-Type": "application/json"
      // },
    }).then((res) => {
      console.log(res.data)
      let docs=res.data;
      let comment_list = [];

      docs.forEach((doc) => {
        let comment = {
          comment_id: doc.id,
          comment: doc.content,
          createdAt: doc.createdAt,
          createdBy: doc.createdBy,
        }
        comment_list.unshift(comment);
      })
      console.log(comment_list);
      dispatch(setComment(comment_list, post_id));
    })
    .catch((err) => {
      console.error("getComment에러", err);
    });
  };
};

const addCommentAPI = (post_id, comment) => {
  console.log(post_id, comment);
  return function (dispatch, getState, { history }){
      axios({
      method: "POST",
      url: `http://13.125.167.83/api/posts/${post_id}/comments`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": localStorage.getItem("token"),
      },
      data: {
        content: comment,
      }
      
    }).then((res) => {
      console.log(res)
      dispatch(addComment(comment));
    }).catch((err) => {
      console.error("댓글 등록 실패", err);
    });
  };
};

const deleteCommentAPI = (comment_id, post_id) => {
  return function (dispatch, getState, { history }){
    axios.delete(`http://15.164.217.16/api/posts/${post_id}/comments/${comment_id}`)  
      .then((res) => {
        dispatch(deleteComment(comment_id, post_id));
      }).catch((err) => {
        window.alert("게시물 삭제에 문제가 있어요!")
      })
  }
}

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => 
    produce(state, (draft) => {
      draft.list[action.payload.post_id] = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state, action) => 
    produce(state, (draft) => {
      if(!draft.list[action.payload.post_id]){
        draft.list[action.payload.post_id] = [action.payload.comment]
        return
      }
      draft.list[action.payload.post_id].unshift(action.payload.comment)
    }),
    [DELETE_COMMENT]: (state, action) => 
    produce(state, (draft) => {
      draft.list.filter((c) => {if (c.comment_id !== action.payload.comment_id){
        return c;
      }
    });
    }),
  },
  initialState
);

const actionCreators = {
  getCommentAPI,
  addCommentAPI,
  deleteCommentAPI
};

export { actionCreators };
