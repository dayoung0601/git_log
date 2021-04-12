import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// axios.default.baseURL ='';

// initialState
const initialState = {
  // list:[],
  // detailPost:[],
  // paging:{ start: null, next: null, size: 10 },
  // is_loading: false
};

const initialPost = {
  id: 0,
  user_info: {
    nickname: "_nickname",
    profile:
      "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
  },
  image_url:
    "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
  contents: "개발자들의 커뮤니티, 깃로그",
  comment_cnt: 8,
  like_cnt: 20,
  insert_dt: "2021-04-12 10:00:00",
};

// actions

// actionCreators: createAction

// reducer: handleActions

// actionCreator export
const actionCreators = {};

export { actionCreators };
