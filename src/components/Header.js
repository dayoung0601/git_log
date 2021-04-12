import React from 'react';
import { Grid, Text, Image, Button } from '../elements';
import {AiFillGithub} from 'react-icons/ai';

import styled from 'styled-components';

const Header = () => {
    return (
        <Grid is_flex>
            <Logo>
                <AiFillGithub/> Git_log
            </Logo>
            {/*변경 예정입니다 */}
            <HeaderBtns>
                <Button width="50%" margin="10px 10px 10px 0" alt="회원가입" 
                radius="8px" size="0.9vw"  color="white">회원가입</Button>
                <Button width="50%" margin="10px 0 10px 10px" alt="로그인" 
                radius="8px" size="0.9vw" bg="#ffffff" color="#24292e">로그인</Button>
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