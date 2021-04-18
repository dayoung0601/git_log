import React from 'react';
import styled from 'styled-components';

import  {BsPlusCircleFill as EditImgBtn}  from 'react-icons/bs'

const Story = (props) => {

    return (
        <UserStoryContainer>
            <ProfileInfoBox>
                <ProfileImgBox>
                    <ProfileImg
                        src={props.user_info.profile}></ProfileImg>
                    <EditImg><EditImgBtn/></EditImg>
                </ProfileImgBox>
                <ProfileUserInfo>
                    <UserName>g0garden</UserName>
                    <UserGithub>http://github/com/g0garden</UserGithub>
                    <UserIntro>간단한 자기소개</UserIntro>    
                </ProfileUserInfo>
            </ProfileInfoBox>
            <UserPostListBox>
                게시물
                게시물
                게시물
            </UserPostListBox>
        </UserStoryContainer>
    );
};

Story.defaultProps = {
    user_info: {
        profile:"https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
        nickname: "g0garen",
        github_address:"http://github/com/g0garden",
        Introduction:"간단한자기소개",
    },
    
}

export default Story;

const UserStoryContainer = styled.div`
    width:100%;
    border : 1px solid grey;
    box-sizing: border-box;


`;

const ProfileInfoBox = styled.div`
    width: 100%;
    /* border : 1px solid blue; */
    margin: 4px auto;
    box-sizing: border-box;
`;

const ProfileImgBox = styled.div`
    position: relative;
    width:100%;
    border-bottom:1px solid grey;
    margin: 4px auto;

`;

const ProfileImg = styled.div`
    position: relative;
    top: 10px;
    width: 7.2vw;
    aspect-ratio: 1/1;
    border-radius: 100px;
    background-image: url("${(props) => props.src}");
    margin: 45px auto;
    cursor:pointer;
`;


const EditImg = styled.div`
    position: absolute;
    margin: 20px auto;
    top: 70px;
    left: 52%;
    font-size: 20px;
    width: 20px;
    aspect-ratio: 1/1;
    border-radius: 100px;
    cursor:pointer;
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


const UserPostListBox = styled.div`
    width: 100%;
    border : 1px solid blue;
    margin: 4px auto;
`;
