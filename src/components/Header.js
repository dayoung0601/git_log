import React from 'react';
import { Grid, Text, Image, Button } from '../elements';
import {AiFillGithub} from 'react-icons/ai';

import styled from 'styled-components';

import {history} from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux/modules/user';

const Header = (props) => {
    const dispatch = useDispatch();
    //스토어에서 state값 가져오기
    const is_login = useSelector((state) => state.user.is_login); //.user모듈에서
    //const local_token = localStorage.getItem("token") ? true : false;
    // console.log(is_login);
    
    if(is_login){
        return (
        <Grid is_flex>
            <Logo onClick={() => {
                history.push('/');
            }}>
                <AiFillGithub/> Git_log
            </Logo>
            <HeaderBtns className="login">
            <LogOutBtn onClick=
                        {() => {
                            dispatch(actionCreators.logOut())
                        }
                    }>log out</LogOutBtn>
            <ProfileImg src={props.user_info.profile}
                        onClick={() => {
                            history.push('/story');
                            //history.push('/setting');
                        }}/>
            
            {/* <Image width="50%" shape="circle" 
                radius="8px" size="0.9vw" color="white"
                src="https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"/>
                이미지 */}
            </HeaderBtns>
        </Grid>
        
        
    );} else{
    return (
        <Grid is_flex>
            <Logo onClick={() => {
                history.push('/');
            }}>
                <AiFillGithub/> Git_log
            </Logo>
            
            <HeaderBtns className="login">
                <Button width="50%" margin="10px 10px 10px 0" alt="회원가입" 
                radius="8px" size="0.9vw"  color="white"
                _onClick={() => {
                    history.push('/signup');
                }}
                >SignUp</Button>
                <Button width="50%" margin="10px 0 10px 10px" alt="로그인" 
                radius="8px" size="0.9vw" bg="#ffffff" color="#24292e"
                _onClick={() => {
                    history.push('/login');
                }}
                >Login</Button>
            </HeaderBtns>
        </Grid>
        
        
    );
};}

Header.defaultProps = {
    user_info: {
        profile:
        "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
    },
};

const Logo = styled.div`
    margin: 20px;
    width: 50%;
    font-weight: 600;
    font-size: 1.8vw;
    cursor: pointer;
`;

const ProfileImg = styled.img`
    width: 30%;
    aspect-ratio: 1/1;
    border-radius: 100px;
    background-image: url("${(props) => props.src}");
    margin-right: 0px;
    cursor:pointer;
`;

const HeaderBtns = styled.div`
    width: 11%;
    display: flex;
    justify-content: space-evenly;

`;

const LogOutBtn = styled.button`
    width: 60%;
    background-color:#24292e;
    color: white;
    /* margin-right: 0px;
    padding-right: 4px; */
    font-size:0.9vw;
    border-radius: 20px;
    cursor:pointer;
    &:hover{
        background-color:white;
        color: #24292e;
    }
`;

export default Header;