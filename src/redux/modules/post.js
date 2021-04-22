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
        console.error("게시물을 가져오는데 문제가 있습니다", err);
      });
  };
};

// 스토리 페이지 : 해당 유저 게시글 목록 조회
const getPostByUserAPI = (userId) => {
  return function (dispatch, getState, { history }) {
    axios.get(``).then((res) => {
      dispatch(setPost(res.data));
    });
  };
};

// 게시물 등록하기
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
        console.error("작성 실패", err);
      });
    history.push("/");
  };
};

// 게시물 수정하기
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
        console.error("작성 실패", err);
      });
    history.push("/");
  };
};

// 게시물 삭제하기
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
        window.alert("게시물 삭제에 문제가 있어요!");
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
        //     // -1은 중복되는 값이 없다는 것. ...acc, cur 것에 추가로 넣어준다.
        //     return [...acc, cur];
        //   }else {
        //     acc[acc.findIndex((a) => a.id === cur.id)] = cur;
        //     return acc;
        //   }
        // }, []);
      }),
    // [EDIT_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     // indIndex: 배열 중에 (p) => 뒤에 조건에 맞는 idx를 찾아 준다)
    //     let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
    //     // immer 에 스프레드 문법을 사용한 이유 :  수정할 때 이미지는 바꿀 수도 있고 안바꿀 수도 있는데
    //     // 그 상황을 굳이 if 문으로 나눠서 쓰지 않고  spread 문법을 사용해 유지하거나 수정시에만 내용이 반영되도록 한다.
    //     draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    //   }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        if (idx !== -1) {
          // 배열에서 idx 위치의 요소 1개를 지웁니다.
          draft.list.splice(idx, 1);
        }
      }),
    [EDIT_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((l) => l.id === action.payload.post_id);
        // 배열에서 몇 번째에 있는 지 찾은 다음, is_like를 action에서 가져온 값으로 바꾸기!
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
