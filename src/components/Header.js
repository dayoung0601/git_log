import React from 'react';
import { Grid, Text, Image, Button } from '../elements';
import {AiFillGithub} from 'react-icons/ai';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    //스토어에서 state값 가져오기
    const is_login = useSelector((state) => state.user.is_login); //.user모듈에서
    console.log(is_login);
    
    if(is_login){
        return (
        <Grid is_flex>
            <Logo>
                <AiFillGithub/> Git_log
            </Logo>
            <HeaderBtns className="login">
                <Image width="50%" margin="10px 10px 10px 0" alt="회원가입" 
                radius="8px" size="0.9vw" color="white"
                src="https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"/>
            </HeaderBtns>
        </Grid>
        
        
    );}
    return (
        <Grid is_flex>
            <Logo>
                <AiFillGithub/> Git_log
            </Logo>
            
            <HeaderBtns className="login">
                <Button width="50%" margin="10px 10px 10px 0" alt="회원가입" 
                radius="8px" size="0.9vw"  color="white">SignUp</Button>
                <Button width="50%" margin="10px 0 10px 10px" alt="로그인" 
                radius="8px" size="0.9vw" bg="#ffffff" color="#24292e">Login</Button>
            </HeaderBtns>
        </Grid>
        
        
    );
};

const Logo = styled.div`
    margin: 20px;
    width: 50%;
    font-weight: 600;
    font-size: 1.8vw;

`;

const HeaderBtns = styled.div`
    width: 30%;
    display: flex;
    justify-content: space-evenly;
    width:10%;
    margin: 10px;

`;

export default Header;