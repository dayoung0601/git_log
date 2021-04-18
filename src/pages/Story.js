import React from 'react';
import styled from 'styled-components';

const Story = () => {


    return (
        <UserStoryContainer>
            <ProfileInfoBox>
                <ProfileImgBox>
                    <ProfileImg shape="circle">이미지</ProfileImg>
                    <EditImg>+</EditImg>   
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
    
}

export default Story;

const UserStoryContainer = styled.div`
    width:100%;
    border : 1px solid grey;
    box-sizing: border-box;


`;

const ProfileInfoBox = styled.div`
    width: 100%;
    border : 1px solid blue;
    margin: 4px auto;
    box-sizing: border-box;
`;

const ProfileImgBox = styled.div`

`;

const ProfileImg = styled.div`
    width: 30px;
    aspect-ratio: 1/1;
    border-radius: 100px;
    background-image: url("${(props) => props.src}");
    margin-right: 0px;
    cursor:pointer;
`;


const EditImg = styled.div`
`;

const ProfileUserInfo = styled.div`

`;

const UserName = styled.div`

`;

const UserGithub = styled.div`

`;

const UserIntro = styled.div`

`;


const UserPostListBox = styled.div`

`;
