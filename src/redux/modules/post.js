import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

// actionCreators: createAction
const setPost = createAction(SET_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id) => ({ post_id }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 10 },
  is_loading: false,
};

const initialPost = {
  imgUrl:
    "https://pbs.twimg.com/profile_images/1246486049964068865/PMGeB3d0_400x400.jpg",
  uploading: false,
  preview: null,
  commentCnt: 0,
  heartCnt: 0,
  createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const getPostAPI = (post) => {
  return function (dispatch, getState, { history }) {
    const API = "http://13.125.167.83/api/posts?page=0&size=10";
    axios
      .get(API)
      .then((res) => {
        // console.log(res.data.content);
        // console.log(res.data.pageable);
        let docs = res.data.content;

        let post_list = [];

        docs.forEach((doc) => {
          let post = {
            id: doc.id,
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
// const addPostAPI = (form) => {
//   return function (dispatch, getState, { history }) {
//     axios
//       .post("http://13.125.167.83/api/posts", form, {
//         headers:
//         {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': localStorage.getItem("token"),
//         },
//       }
//       ).then((res) => {
//         console.log(res);
//         dispatch(addPost());
//       })
//       .catch((err) => {
//         console.error("작성 실패", err);
//       });
//       history.push("/");
//   };
// };

// 게시물 수정하기
const editPostAPI = (post_id, post) => {
  return function (dispatch, getState, { history }) {
    
    if(!post_id){
      console.log("게시물 정보가 없어요!");
      return;
    }
     
    // 기존에 있던 프리뷰를 불러와서
      const _image = getState().image.preview;
      const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
      const _post = getState().post.list[_post_idx];
      console.log(_post);

      
      // if(_image === _post.imgUrl){
      //   axios.put(`http://13.125.167.83/api/post/${post_id}`, {
      //     ..._edit, 
        
      //   ).then((res) => {
      
        
      // }

      history.push("/");
    // });
  };
};

// 게시물 삭제하기
const deletePost = (post_id) => {
  return function (dispatch, getState, { history }) {
    axios.delete(`http://13.125.167.83/api/post/${post_id}`).then((res) => {
      history.push("/");
    });
  };
};

// 좋아요 기능 추가++++ : likePost, dislikePost

// reducer: handleActions
export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list(...action.payload.post);
      }),
    [SET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post;
      }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
      // indIndex: 배열 중에 (p) => 뒤에 조건에 맞는 idx를 찾아 준다)
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        // immer 에 스프레드 문법을 사용한 이유 :  수정할 때 이미지는 바꿀 수도 있고 안바꿀 수도 있는데
        // 그 상황을 굳이 if 문으로 나눠서 쓰지 않고  spread 문법을 사용해 유지하거나 수정시에만 내용이 반영되도록 한다.
        draft.list[idx] = {...draft.list[idx], ...action.payload.post};
      }),
  },
  initialState
);
 
// actionCreator export
const actionCreators = {
  addPost,
  setPost,
  editPost,
  getPostAPI,
  getPostByUserAPI,
  editPostAPI,
  deletePost,
};

export { actionCreators };
