import React from 'react';
import styled from 'styled-components';

import {Grid, Text, Button, Input} from '../elements/index';

const Login = () => {
    return (
        <React.Fragment>
            <SignupWrap>
            <SignupHeader>
            <Grid is_flex>
                    <Text size="2.2rem" bold>Login</Text>
                </Grid>
            </SignupHeader>
            <SignupBody>
            <Grid is_flex margin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        placeholder="Email"
                        />
                </Grid>
                <Grid is_flexmargin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        padding="0 0 0 4px"
                        placeholder="Password"
                        alt="비밀번호"/>
                </Grid> 
            </SignupBody>
            <SignupBtns>
                <Button width="40%" margin="10px 0" alt="회원가입" 
                radius="8px" size="18px"  color="white">Login</Button>
                <Button width="40%" margin="10px 0" alt="로그인" 
                radius="8px" size="18px" bg="#ffffff" color="#24292e">SignUp</Button>
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

const SignupBody = styled.div`

`;


const SignupBtns = styled.div`
    display: flex;
    justify-content: space-evenly;
    width:100%;
    margin: 10px;

`;


export default Login;