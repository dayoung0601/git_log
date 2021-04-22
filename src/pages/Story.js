import React, { useEffect } from 'react';
import styled from 'styled-components';

import PostList from '../pages/PostList';
import { useDispatch, useSelector} from 'react-redux';
import UserStory from '../components/UserStory';
import { actionCreators } from '../redux/modules/user';

const Story = (props) => {
    const dispatch = useDispatch("");
    const user_info = useSelector((state) => state.user.user);
    console.log(user_info.nickname);
    const nickname = user_info.nickname;

    React.useEffect(() => {
        dispatch(actionCreators.getUserInfoAPI(nickname));
    }, []);


    return (
        <UserStoryContainer>
            <ProfileInfoBox>
                <UserStory/>
            </ProfileInfoBox>
            {/* 게시글 */}
            <UserPostListBox>
                
            </UserPostListBox>
        </UserStoryContainer>
    );
};

Story.defaultProps = {
    user_info: {
        profile:"https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
        nickname: "g0garen",
        github_address:"http://github/com/g0garden",
        Introduction:"자기소개",
    },
    
}

export default Story;

const UserStoryContainer = styled.div`
    width:100%;
    /* border : 1px solid grey; */
    box-sizing: border-box;


`;

const ProfileInfoBox = styled.div`
    width: 100%;
    /* border : 1px solid blue; */
    margin: 4px auto;
    box-sizing: border-box;
`;



const UserPostListBox = styled.div`
    width: 100%;
    /* border : 1px solid blue; */
    margin: 4px auto;
`;