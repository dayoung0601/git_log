//언젠가는..!
import React from 'react';
import styled from 'styled-components';

import {Grid, Text, Image, Input, Button } from '../elements';
import {nickNameCheck, pwMatch, pwContinuous, emailCheck, githubCheck} from '../shared/common';
import {useSelector, useDispatch} from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators } from "../redux/modules/user";

import { history } from "../redux/configureStore";

import axios from "axios";


const Setting = (props) => {
    const dispatch = useDispatch();


    const is_uploading = useSelector((state) => state.image.is_uploading);
    const preview = useSelector((state) => state.image.preview);
//이미지 업로드하기
const fileInput = React.useRef();
const selectImg = (e) => {
    // changed 된 event (e.target은 input)
    console.log(e.target.files); // input 이 가진 files 객체
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
    reader.onloadend = () => {0
        console.log(reader.reasult);
        dispatch(imageActions.setPreview(reader.result));
    };
};



//이미지 등록(저장)

//이미지 


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
                    <p>프로필 사진을 선택해주세요!</p>
                    <input
                        type='file'
                        ref={fileInput}
                        onChange={selectImg}
                        //uploadiong중에는 사용자가 파일 input못하게
                        //disabled가 false일때만 업로드 가능
                        disabled={is_uploading}
                        />
                    <ProfileEditBtn onClick={() => {
                        console.log("저장하기!")
                        //사진수정하기 = 
                        //history.push('/story')
                        
                    }}>저장하기</ProfileEditBtn>
                    </PostInfoBox>
                </PostInfo>
            </SettingWrap>
            
        </React.Fragment>
    );
};

Setting.defaultProps = {
    user_info: {
        profile:
        "https://seongbinko-naver-bucket.s3.ap-northeast-2.amazonaws.com/common/default_profile.jpg",
    },
    
}

export default Setting;

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
    }
    & h2{
        display: block;
        margin-bottom:10px;
    }
    & p{
        display:block;
        font-size: 0.9vw;
        color: darkgray;
        margin-bottom:30px;
    }
    & input{
        display:inline-block;
        padding-left: 10px;   
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