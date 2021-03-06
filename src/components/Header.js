import React from 'react';
import styled from 'styled-components';

import { Grid, Text, Image, Button } from '../elements';
import {AiFillGithub} from 'react-icons/ai';
import git_log_horizontal from "../static/git_log_horizontal.svg";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from "../redux/modules/user";
import {history} from '../redux/configureStore';


const Header = (props) => {
    const dispatch = useDispatch();
    //스토어에서 state값 가져오기
    const is_login = useSelector((state) => state.user.is_login); //.user모듈에서
    console.log(is_login)
    const user_info = useSelector((state) => state.user.user);
    console.log(user_info);
    const profileImgUrl = localStorage.getItem("profileImgUrl")
    //console.log(profileImgUrl);
    

        return (
            <HeaderContainer>
        <Grid is_flex>
            <Logo onClick={() => {
                history.push('/');
            }}>
                <img src={git_log_horizontal}/>
            </Logo>

            { is_login ? (
            <HeaderBtns className="login">           
            <LogOutBtn onClick={() => {
                    dispatch(actionCreators.logOut())
                    history.push('/');
                }}
                >log out</LogOutBtn>
            <ProfileImg src={user_info.profileImgUrl}
                        onClick={() => {
                            history.push(`/story/${user_info.nickname}`);
                            //history.push('/setting');
                        }}/>
            </HeaderBtns>    
            ) : (
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
            )}
        </Grid>
        </HeaderContainer>
    )
}

Header.defaultProps = {
    user_info: {
        profile:
        "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
    },
};
const HeaderContainer = styled.div`
    margin: 0px;
    padding: 15px 20px;
    width: 100%;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
`;

const Logo = styled.div`
    margin: 0px;
    width: 10%;
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