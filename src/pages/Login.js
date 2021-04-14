import React from 'react';
import styled from 'styled-components';

import {Grid, Text, Button, Input} from '../elements/index';

import {history} from '../redux/configureStore';

const Login = () => {
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
                        placeholder="Email"
                        />
                </Grid>
                <Grid is_flex margin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 20px 5px 20px"
                        padding="12px"
                        placeholder="Password"
                        alt="비밀번호"/>
                </Grid> 
            </SignupBody>
            <SignupBtns>
            <Button width="40%" margin="10px 0" alt="로그인" 
                radius="8px" size="1.2vw" color="white"
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