import React from "react";
import { Grid, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import axios from "axios";

import preview_empty from "../static/preview_empty.png";


const Upload = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.is_uploading);

  const imageRef = React.useRef(null);
  const selectFile = (e) => {
    // changed 된 event (e.target은 input)
    // console.log(e.target.files); // input 이 가진 files 객체
    // console.log(e.target.files[0]); //선택한 파일이 어떻게 저장되어 있나 확인
    const image = imageRef.target.files[0];
    if (image === undefined){
      dispatch(imageActions.setPreview("preview_empty.png"))
      return
    }

  };

  return (
    <React.Fragment>
      <Button>
        <input 
        type="file" 
        ref={imageRef} 
        style= {{ display: 'none' }}
        onChange={selectFile}
        disabled={is_uploading} 
        />
        이미지 업로드
      </Button>
    </React.Fragment>
  );
};

export default Upload;
