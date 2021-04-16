import React from "react";
import { Grid, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import axios from "axios";

const Upload = (props) => {

    const fileInput = React.useRef();

    const selectFile = (e) => {
        console.log(e.target.files);
        console.log(e.target.files[0]);
        console.log(fileInput.current.files[0]);
    };

    const uploadAPI = () => {
        let image = fileInput.current?.files[0];
        
        axios
        .post("", {
            image: fileInput,
        }).then((res) => {

        });
    }
    
    return (
        <React.Fragment>
            <input type="file" 
            ref={fileInput} 
            onChange={selectFile} />
            <Button _onClick={uploadAPI}>업로드하기</Button>
        </React.Fragment>
    );
}

export default Upload;