import React, {useRef} from 'react';
import styled from 'styled-components';

import {Grid, Text, Image, Input, Button } from '../elements';
import {nickNameCheck, pwMatch, pwContinuous, emailCheck, githubCheck} from '../shared/common';
import {useSelector, useDispatch} from "react-redux";

import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators } from "../redux/modules/user";

import { history } from "../redux/configureStore";

import axios from "axios";

const Setting = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector((state) => state.image.is_uploading);
    const user_info = useSelector((state) => state.user.user);
    //console.log(user_info);
    const preview = useSelector((state) => state.image.preview);
    
    const [pw, setPw] = React.useState('');
    const [pwConfirm, setPwConfirm] = React.useState('');
    


    React.useEffect(() => {
        if(!user_info){
            return false;
        }
        //이미지경로받기
        dispatch(imageActions.setPreview(user_info.profileImgUrl));
    },[])



//이미지 업로드하기
const fileInput = React.useRef();
const selectImg = (e) => {
    // changed 된 event (e.target은 input)
    //console.log(e.target.files); // input 이 가진 files 객체
    // console.log(e.target.files[0]); //선택한 파일이 어떻게 저장되어 있나 확인
     console.log(fileInput.current.files[0]); //ref로도 확인;
    
    // 이미지 미리보기
    const reader = new FileReader();
    const img = fileInput.current.files[0];
    if(img === undefined){
        dispatch(
            imageActions.setPreview(
                "https://seongbinko-naver-bucket.s3.ap-northeast-2.amazonaws.com/common/default_profile.jpg"
            )
        );
    }
    reader.readAsDataURL(img);
    reader.onloadend = () => {
        // console.log(reader.reasult);
        dispatch(imageActions.setPreview(reader.result));
        //여기에서 editProfile가져와야하는거 아닌가.. 그래야 미리보기에 남아있는거아닌그아..?
    };
};

//비밀번호


//이미지 등록(수정)
const editProfileImg = () => {
    // if(fileInput.current.files[0])

    //빈칸체크, 둘이 매칭
    if(pw === ''){
        alert('새 비밀번호를 입력해주세요!')
        return false;
    }

    if(pwConfirm ===''){
        alert('새 비밀번호를 다시 한 번 입력해주세요!')
        return false;
    }

    if(pw !== pwConfirm){
        alert('비밀번호가 일치하지 않습니다.')
        return false;
    }

    const form = new FormData();
    // if(fileInput.current.files[0] === undefined){
    //     form.append('profileImg', preview)
    // }else{
    //     form.append('profileImg', fileInput.current.files[0]);
    // }
    form.append('profileImg', fileInput.current.files[0]);
    form.append('password', pw)
    form.append('passwordConfirm', pwConfirm)
    console.log(form)
    dispatch(actionCreators.editProfileImgAPI(form))

    history.push(`/story/${user_info.nickname}`)
    
}

    return (
        <React.Fragment>
            <SettingWrap>

                {/* <PostContainer> */}
                <PostInfo>
                <Preview
                // src={preview_empty}
                    src={
                    preview
                        ? preview
                        : "https://seongbinko-naver-bucket.s3.ap-northeast-2.amazonaws.com/common/default_profile.jpg"
                    }
                />
                </PostInfo>
                {/* </PostContainer> */}

                <PostInfo>
                    <PostInfoBox>
                    <h2>프로필 수정</h2>
                    <input
                        type='file'
                        ref={fileInput}
                        onChange={selectImg}
                        //uploadiong중에는 사용자가 파일 input못하게
                        //disabled가 false일때만 업로드 가능
                        disabled={is_uploading}
                        />
                    <InputPW
                        type='text'
                        // ref={password}
                        placeholder="Password"
                        alt="비밀번호"
                        onChange={(e) => {
                            //console.log(e.target.value)
                                setPw(e.target.value)
                        }}/>
                    <InputPW
                        type="text"
                        //ref={passwordConfirm}
                        placeholder="PassWord Confirm"
                        alt="비밀번호확인"
                            onChange={(e) => {
                            setPwConfirm(e.target.value)}}
                        />
                    
                    <ProfileEditBtn onClick={
                        //console.log("저장하기!")
                        //history.push('/story')
                        editProfileImg
                    }>수정하기</ProfileEditBtn>
                    </PostInfoBox>
                </PostInfo>
            </SettingWrap>
            
        </React.Fragment>
    );
};

const SettingWrap = styled.div`
    width: 100%;
    min-width:500px;
    margin: auto;
    margin-bottom: 10%;
    padding:0 5%;
    border: 1.5px solid #eee;
    box-sizing: border-box;
    text-align:center;
    display: flex;
    position: relative;
    top: 50px;
    

`;

const PostInfo = styled.div`
    width:100%;
    
`;

const PostInfoBox = styled.div`
    width: 100%;
    margin: 10% auto;
    text-align:center;
    & input{
        display:inline-block;
        padding-left: 10px;   }
`;

// const PostContainer = styled.div`
//     width: 100%;
//     min-width:500px;
//     margin: auto;
//     margin-bottom:10%;
//     border: 1.5px solid #eee;
//     box-sizing: border-box;
//     text-align:center;
//     position: relative;
//     top: 50px;

// `;

const Preview = styled.img`
    width: 45%;
    aspect-ratio: 1/1;
    margin:10% auto;
    align-content:center;
    position: relative;
    overflow: hidden;
    object-fit:cover;
    background-image: url("${(props) => props.src}");

`;

const InputPW = styled.input`
    width: 65%;
    width: 65%;
    height: 40px;
    padding: 12px 3px;
    box-sizing: border-box;
    border: 1px solid #eee;     
    margin:4px 0;              
`;

const ProfileEditBtn = styled.button`
    display:block;
    width: 65%;
    height: 40px;
    padding: 12px 3px;
    box-sizing: border-box;
    border: none;
    margin: 10px auto 20px auto;
    cursor:pointer;
    &:hover{
        background-color:yellow;
        color:black;
    }

`;

export default Setting;