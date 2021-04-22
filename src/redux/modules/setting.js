// import {createAction, handleActions} from "redux-actions";
// import { produce } from 'immer';
// import axios from 'axios';

// //actions
// const SET_PROFILE = "SET_PROFILE";
// const EDIT_PROFILE = "EDIT_PROFILE";
// const ADD_PROFILE = "ADD_PROFILE";

// //acionCreators 
// const setProfile = createAction(SET_PROFILE, (profile_img) => ({ profile_img }));
// const addProfile = createAction(ADD_PROFILE, (profile_img) => ({ profile_img }));
// const editProfile = createAction(EDIT_PROFILE, (profile_img) => ({profile_img}));

// const initialState = {
// img:"",
// };

// // {
//             //     form,
//             // },
//             // {
//             // headers : {
//             //     'Content-Type': 'multipart/form-data',
//             //     'Authorization': localStorage.getItem("token"),
//             // },


// //editProfileImgAPI
// const editProfileImgAPI = (form) => {
//     return function(dispatch, getState, {history}){
//         console.log('확인', form.get('img'));
//         const API = "http://13.125.167.83/api/settings"
//         axios({
//             method: "post",
//             url : API,
//             data : form,
//             headers : {
//                 'Content-Type': 'multipart/form-data',
//                 'Authorization': localStorage.getItem("token"),
//             },
//             withCredentials : true
//         }).then((res) => {
//             console.log(res);
//             dispatch(editProfile());
//         })
//         .catch((err) => {
//             console.log('수정 실패', err);
//         });
//         history.push('/story')
//     };
// };


// //reducer
// export default handleActions(
//     {
//     [SET_PROFILE] : (state, action) => produce(state, (draft) => {
//         draft.img = action.payload.profile_img;
//     }),
//     [EDIT_PROFILE] : (state, action) => produce(state, (draft) => {
//         draft.img = action.payload.profile_img;
//     }), 
//     },
//     initialState
// );

// // actionCreator export
// const actionCreators = {
//     addProfile,
//     setProfile,
//     editProfile,
//     editProfileImgAPI,
// };

// export { actionCreators };