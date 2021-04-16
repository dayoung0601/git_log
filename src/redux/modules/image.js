import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";

const initialState ={
    image_url: "",
    uplaoding: false,
    preview: null,
};

// actions
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const UPLOADING = "UPLOADING";
const SET_PREVIEW = "SET_PREVIEW";
 
// actionCreators: createAction
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// middleware



// reducer: handleActions
export default handleActions(
    {
        [UPLOAD_IMAGE]: (state, action) =>
        produce(state, (draft) => {
            draft.image_url = action.payload.image_url;
        }),
        [UPLOADING]: (state, action) =>
        produce(state, (draft) => {
            draft.uploading = action.payload.uplaoding;
        }),
        [SET_PREVIEW]: (state, action) =>
        produce(state, (draft) => {
            draft.preview = action.payload.preview;
        }),
    },
    initialState
);

const actionCreators = {
    uploadImage,
    setPreview,
    uploading,
};

export { actionCreators };