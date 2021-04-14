import React, { useState } from 'react';
import styled from 'styled-components';

import {Grid, Text, Button, Input} from '../elements/index';
import {actionCreators} from '../redux/modules/user';

import {nickNameCheck, pwMatch, pwContinuous, emailCheck} from '../shared/common';

import {history} from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    //input에서 받아오는 입력값
    const [nickname, setNickname] = React.useState('');
    const [pw, setPw] = React.useState('');

    //그 값들을 받아서 로그인을 클릭했을때 middleware가 api요청
    //받아온 입력값 형식 체크 후 loginAPI요청
    const onLogin = () => {
        
        if(nickname === " " || pw === " " ){
            window.alert("닉네임과 비밀번호를 입력해주세요!");
            return
        }
        
        console.log(email, pw);
        //dispatch(actionCreators.loginCheck());
        //dispatch(actionCreators.loginAPI(email,pw));
    }


    return (
        <React.Fragment>
            <SignupWrap>
            <SignupHeader>
            <Grid is_flex>
                    <Title>Login</Title>
                </Grid>
            </SignupHeader>
            <SignupBody>
            <Grid is_flex width="100%" margin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 20px 5px 20px"
                        padding="12px"
                        placeholder="Nickname"
                        _onChange={(e) => {
                            setNickname(e.target.value)
                        }}
                        />
                </Grid>
                <Grid is_flex margin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 20px 5px 20px"
                        padding="12px"
                        placeholder="Password"
                        alt="비밀번호"
                        _onChange={(e) => {
                            setPw(e.target.value)
                        }}
                        />
                </Grid> 
            </SignupBody>
            <SignupBtns>
            <Button width="40%" margin="10px 0" alt="로그인" 
                radius="8px" size="1.2vw" color="white"
                _onClick={onLogin}
                >Login</Button>
            <Button 
                width="40%" margin="10px 0" alt="회원가입" 
                radius="8px" size="1.2vw"   bg="#ffffff" color="#24292e"
                _onClick={() => {
                    history.push('/signup');
                }}
                >SignUp</Button>
            </SignupBtns>
            </SignupWrap>
        </React.Fragment>
    );
};


const SignupWrap = styled.div`
    width: 25%;
    margin: 8% auto;
    padding: 8px;
    border: 1px solid #24292e ;
    border-radius: 8px;
    /* background-color:#f6f8fa; */
`;


const SignupHeader = styled.div`


`;

const Title = styled.div`
    margin: 50px auto 50px auto;
    font-size: 2.2vw;
    font-weight:600;
    text-align: center;

`;

const SignupBody = styled.div`

`;


const SignupBtns = styled.div`
    display: flex;
    justify-content: space-evenly;
    width:100%;
    margin: 20px -4px;

`;


export default Login;