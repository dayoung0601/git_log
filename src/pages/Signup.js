import React from 'react';
import styled from 'styled-components';
import {AiFillGithub} from 'react-icons/ai';

import {Grid, Text, Image, Input, Button } from '../elements';

const Signup = (props) => {

    return (
        <React.Fragment>
            <SignupWrap>
            <SignupHeader>
                <Grid is_flex>
                    <Text size="2.1vw" bold>Create Account</Text>
                </Grid>
                <Grid is_flex>
                    <Text size="0.8vw" bold="400">🎈Use your email for registration</Text>
                </Grid>
                {/* <Grid is_flex>
                    <Button>
                        <AiFillGithub/>Sign up with Github
                    </Button>
                    
                </Grid> */}
            </SignupHeader>
            
            <SignupBody>
            <InputWrap>
                <Grid is_flex width="100%" margin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        placeholder="Email"/>
                    <Button  width="20%" margin="0px 30px 0px 0px" padding="10px"
                        size="0.5vw" color="white">중복확인</Button>
                </Grid>
                <Grid is_flex width="100%" margin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        placeholder="Nickname"/>
                    <Button  width="20%" margin="0px 30px 0px 0px" padding="10px" 
                    size="0.5vw" color="white">중복확인</Button>
                </Grid>
                <Grid is_flex margin="5px auto">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        placeholder="PassWord"/>
                </Grid>
                <Grid is_flex margin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        placeholder="PassWord check"/>
                </Grid>
                <Grid is_flexmargin="5px 0">
                <Input 
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        padding="0 0 0 4px"
                        placeholder="Github address"/>
                </Grid> 
                </InputWrap>
            </SignupBody>
            <SignupBtns>
                <Button width="40%" margin="10px 0" alt="회원가입" 
                radius="8px" size="1.2vw"  color="white">Sign Up</Button>
                <Button width="40%" margin="10px 0" alt="로그인" 
                radius="8px" size="1.2vw" bg="#ffffff" color="#24292e">Sign In</Button>
            </SignupBtns>
        </SignupWrap>
        
        </React.Fragment>
        
        
    );
};

const SignupWrap = styled.div`
    width: 25%;
    margin:-8px auto 15px auto;
    /* margin: 8% auto; */
    padding: 8px;
    border: 1px solid #24292e ;
    border-radius: 8px;
    /* background-color:#f6f8fa; */
    
    @media (max-width: 767px){
        
    }

`;

const SignupHeader = styled.div`


`;

const SignupBody = styled.div`

`;

const SignupBtns = styled.div`
    display: flex;
    justify-content: space-evenly;
    width:100%;
    margin: 10px 0px;

`;

const InputWrap = styled.div`
    padding: 8px;

`;




export default Signup;