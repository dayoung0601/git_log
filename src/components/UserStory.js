import React from 'react';
import styled from 'styled-components';

import  {BsPlusCircleFill as EditImgBtn}  from 'react-icons/bs'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/user";
import { history } from "../redux/configureStore";

const UserStory = (props) => {
    const dispatch = useDispatch('')
    const user_info = useSelector((state) => state.user.user);
    console.log(user_info.githubUrl);

    //제일 처음에 렌더링 될때 
    
    return (
        <React.Fragment>
                <ProfileImgBox>
                    <ProfileImg
                        src={user_info.profileImgUrl}></ProfileImg>
                    <EditImg onClick={() => 
                    history.push("/setting")
                    }>Edit</EditImg>
                </ProfileImgBox>
                <ProfileUserInfo>
                    <UserName>{user_info.nickname}</UserName>
                    <UserGithub>{user_info.githubUrl}</UserGithub>
                    <UserIntro>{user_info.bio}</UserIntro>    
                </ProfileUserInfo>
        </React.Fragment>
    );
};

UserStory.defaultProps = {
    user_info: {
        profile:"https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
        nickname: "g0garen",
        github_address:"http://github/com/g0garden",
        Introduction:"자기소개",
    },
    
}

const ProfileImgBox = styled.div`
    position: relative;
    width:100%;
    /* border-bottom:1px solid grey; */
    margin: 4px auto;

`;

const ProfileImg = styled.div`
    position: relative;
    top: 10px;
    width: 7.2vw;
    aspect-ratio: 1/1;
    border-radius: 100px;
    background-image:url("https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"); 
    /* url("${(props) => props.src}"); */
    margin: 30px auto 15px auto;
    cursor:pointer;
`;


const EditImg = styled.div`
    /* position: absolute; */
    margin: 20px auto 30px auto;
    /* top: 70px;
    left: 52%; */
    font-size: 0.7vw;
    text-decoration:underline;
    text-align:center;
    width: 2.2vw;
    border-radius: 100px;
    cursor:pointer;
    &:hover{
        color: blue;
    }
`;

const ProfileUserInfo = styled.div`
    width:100%;
    /* border: 1px solid red; */
    margin: 4px auto;

`;


const UserName = styled.div`
    width:45%;
    margin:4px auto;
    padding: 4px;
    text-align:center;
    /* border: 1px solid grey; */
`;

const UserGithub = styled.div`
    width:45%;
    margin:4px auto;
    padding: 4px;
    text-align:center;
    
`;

const UserIntro = styled.div`
    width:45%;
    margin:4px auto;
    padding: 4px;
    text-align:center;
    
`;




export default UserStory;