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
import { createDispatchHook } from "react-redux";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.is_uploading);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const post_id = props.match.params.id;
  console.log(post_id);
  const is_edit = post_id ? true : false;
  // 수정하는 게시물의 정보 가져오기(리덕스에서, 새로고침시 아래 useEffect를 이용해 메인화면으로 다시 돌아가도록 세팅)
  const { history } = props;

  const _post = is_edit && post_list.find((p) => p.post_id === Number(post_id));    //새 글 작성모드일 때는 null
  console.log(post_list);
  console.log(_post);

  // 게시글 내용(괄호 안은 수정할 수 있는 조건(input 창에 value 설정해줘야 수정창에서 이전에 썼던 글이 남아있음)
  const [content, setContent] = React.useState(_post ? _post.content : "");
  const ok_submit = content ? true : false ;

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  React.useEffect(() => {
    // 수정모드 인데, 게시글 정보가 없을 경우
    if (is_edit && !_post){
      console.log("포스트 정보 없음");
      history.goBack();
      return;
    }
    // 수정모드라면?(기존에 업로드한 이미지 프리뷰 띄워주기)
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.imgUrl));
    } else{
      dispatch(imageActions.setPreview("http://desk87.com/assets/images/preview-not-available.jpg"))
    }
  }, []);

  const ImageError = () => {
    window.alert('잘못된 이미지 주소 입니다.ㅠㅠ')
    dispatch(imageActions.setPreview("http://desk87.com/assets/images/preview-not-available.jpg"))
  }


  // 이미지 업로드하기
  const fileInput = React.useRef();
  const selectFile = (e) => {
    // changed 된 event (e.target은 input)
    // console.log(e.target.files); // input 이 가진 files 객체
    // console.log(e.target.files[0]); //선택한 파일이 어떻게 저장되어 있나 확인
    // console.log(fileInput.current.files[0]); //ref로도 확인;

    // 이미지 미리보기
    const reader = new FileReader();
    var img = fileInput.current.files[0];
    if (img === undefined) {
      dispatch(
        imageActions.setPreview(
          "http://desk87.com/assets/images/preview-not-available.jpg"
        )
      );
    }
    reader.readAsDataURL(img);     // readAsDataURL(읽고 싶은 파일) 메서드를 이용한다.
    reader.onloadend = () => {      // onloadend: reader가 끝나자마자 다음 것을 수행한다.
      // console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };


  // 게시물 등록
  const addPost = () => {
    if (!content) {
      window.alert("내용을 입력해주세요 :)");
      return;
    }

    // console.log(content);
    // console.log(fileInput.current.files[0]);
    const form = new FormData();
    form.append("content", content);
    form.append("img", fileInput.current.files[0]);
    dispatch(postActions.addPostAPI(form));

    window.location.reload();
  };

  
  // 게시물 수정
  const editPost = () => {
    if(!content){
      window.alert("빈칸을 채워주세요...")
      return;
    }
    console.log(post_id);

    const img = fileInput.current.files[0];
    dispatch(postActions.editPostAPI(post_id, content, img));
    window.location.reload();
  }



  return (
    <React.Fragment>
      <h2>게시글 작성</h2>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={is_uploading}
      />
      <Grid flex margin="20px 0px">
        <Grid>
          <Preview
            // src={preview_empty}
            src={
              preview
                ? preview
                : "http://desk87.com/assets/images/preview-not-available.jpg"
            }
          />
        </Grid>
        <Grid>
          <Grid>
            <ContentInput
              value={content}
              label="게시글 내용"
              placeholder="내용을 입력해주세요"
              onChange={changeContent}
              disabled={is_uploading}
            />
          </Grid>
          <Grid>
            {is_edit? (
            <SubmitBtn onClick={editPost}>게시글 수정하기</SubmitBtn>
            ) : (
              <SubmitBtn onClick={addPost}>게시글 업로드</SubmitBtn>
          )
          }
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Preview = styled.img`
  width: 91%;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
  object-fit:cover;
  background-image: url("${(props) => props.src}");

`;

const ContentInput = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  aspect-ratio: 1/0.7;
  padding: 12px 3px;
  box-sizing: border-box;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  padding: 12px 3px;
  box-sizing: border-box;
  border: none;
  margin-top: 10px;
`;

export default PostWrite;