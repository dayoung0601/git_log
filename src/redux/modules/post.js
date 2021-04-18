import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// actionCreators: createAction
const setPost = createAction(SET_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 10 },
  is_loading: false,
};

const initialPost = {
  imgUrl: "https://pbs.twimg.com/profile_images/1246486049964068865/PMGeB3d0_400x400.jpg",
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

// 메인 페이지: 전체 게시글 목록 조회
// const getPostAPI = (postId) => {
//   return function (dispatch, getState, { history }) {
//     axios
//       .get("/posts?page=0&size=10", {
//         data: JSON.stringify({}),
//       })
//       .then((response) => response.json())
//       .then((result) => {
//         dispatch(setPost(result.data));
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };
// };



// 스토리 페이지 : 해당 유저 게시글 목록 조회
const getPostByUserAPI = (userId) => {
  return function (dispatch, getState, { history }) {
    axios.get(`/api/post/${userId}`)
      .then((res) => {
      dispatch(setPost(res.data));
    });
  };
};



const getPostAPI = (post) => {
  return function (dispatch, getState, { history }) {
    const API = "http://13.125.167.83/api/posts?page=0&size=10";
    axios
      .get(API)
      .then((res) => {
        console.log(res.data.content);
        // console.log(res.data.pageable);
        let docs = res.data.content;
        console.log(docs);

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
          post_list.unshift(post);
        });

        console.log(post_list);

        dispatch(setPost(post_list));
      })
      .catch((err) => {
        console.error("게시물을 가져오는데 문제가 있습니다", err);
      });
  };
};


// 게시물 등록하기
// const addPostAPI = (content="") => {
//   return function (dispatch, getState, { history }) {
    
//         const _post = {
//           ...initialPost,
//           content:content,
//           createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),  //initalPost에 있지만 그 시점마다 업데이트 해줘야 하니까
//           // heartCnt:0,
//           // heartId: [],
//         };

//         // const _image =  getState().image.preview;


//         axios.post("http://13.125.167.83/api/posts")
//           .then((res) => {
//         dispatch(addPost());
//         history.push("/");
//       })
//       .catch((err) => {
//         console.error("작성 실패", err);
//       });
//   };
// };

// 게시물 삭제하기
const deletePost = (postId) => {
  return function (dispatch, getState, { history }) {
    axios.delete(`/api/post/${postId}`).then((res) => {
      history.push("/");
    });
  };
};

// 게시물 수정하기
const updatePost = (postId, post) => {
  return function (dispatch, getState, { history }) {
    axios.put(`/api/post/${postId}`, post).then((res) => {
      history.push("/");
    });
  };
};

// 좋아요 기능 추가++++ : likePost, dislikePost

// reducer: handleActions
export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [SET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post;
        console.log(draft.list);
      }),
  },
  initialState
);

// actionCreator export
const actionCreators = {
  addPost,
  setPost,
  getPostAPI,
  getPostByUserAPI,
  // addPostAPI,
  deletePost,
  updatePost,
};

export { actionCreators };
