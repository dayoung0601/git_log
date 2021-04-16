import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Grid, Text, Button, Input, Image } from "../elements/index";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { history } from "../redux/configureStore";

import Upload from "../shared/Upload";

import preview_empty from "../static/preview_empty.png";

const PostWrite = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.list);
  const preview = useSelector((state) => state.image.preview);
  // is_uploading = useSelector((state) => state.image.uploading);

  // // 게시글 사진
  const image_ref = React.useRef("");

  const selectFile = (e) => {
    // changed 된 event (e.target은 input)
    console.log(e.target.files); // input 이 가진 files 객체
    console.log(e.target.files[0]); //선택한 파일이 어떻게 저장되어 있나 확인
    console.log(image_ref.current.files[0]); //ref로도 확인;
  }
  //   const reader = new FileReader();
  //   const file = fileInput.current.files[0];

  //   reader.readAsDataURL(); // readAsDataURL(읽고 싶은 파일) 메서드를 이용한다.
  //   reader.onloadend = () => {
  //     // onloadend: reader가 끝나자마자 다음 것을 수행한다.
  //     console.log(reader.result);
  //     dispatch(imageActions.setPreview(reader.result));
  //   };
  // };

  // // 게시글 내용
  // const [content, setContent] = React.useState("");
  // const changeContent = (e) => {
  //   setContent(e.target.value);
  // };

  // const addPost = () => {
  //   let post = { contet : content };

  //   dispatch(postActions.addPostAPI(content));
  //   dispatch(postActions.uploadImageAPI(fileInput.current.files[0]));
  // };

  const content = React.useRef("");
 
  const addPost = () => {
    let imgUrl=image_ref.current.files[0]
    const form = new FormData();
    form.append("content", content.current.value);
    form.append("imgUrl", imgUrl.current.value);
    for (var key of form.keys()) {
      console.log(key);
    }

    axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      url: "http://15.165.77.77:8080/api/boards",
      data: form,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    history.push("/");
  };

  //   if (!is_login) {
  //     return (
  //       <Grid margin="100px 0px" padding="16px" center>
  //         <Text size="16px">로그인 후 글을 쓸 수 있어요</Text>
  //         <Button
  //           _onClick={() => {
  //             history.replace("/login");
  //           }}
  //         >
  //           로그인 하러가기
  //         </Button>
  //       </Grid>
  //     );
  //   }

  return (
    <React.Fragment>
      <h2>게시글 작성</h2>
      <input type="file" ref={image_ref} />
      <Grid flex margin="20px 0px">
        <Grid>
          <Preview
            // src={preview ? preview : src={preview_empty}}
            src={preview_empty}
          />
        </Grid>
        <Grid>
          <Grid>
            <ContentInput
              rows={16}
              label="게시글 내용"
              placeholder="내용을 입력해주세요"
              // onChange={changeContent}
              ref={content}
            />
          </Grid>
          <Grid>
            <SubmitBtn onClick={addPost}>게시글 업로드</SubmitBtn>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Preview = styled.div`
  width: 84%;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  padding: 12px;
`;

const ContentInput = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  padding: 12px 4px;
  box-sizing: border-box;
  border: none;
  margin-top: 10px;
`;

export default PostWrite;
