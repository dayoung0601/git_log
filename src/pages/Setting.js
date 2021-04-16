import React from 'react';
import styled from 'styled-components';

import {Grid, Text, Image, Input, Button } from '../elements';
import {nickNameCheck, pwMatch, pwContinuous, emailCheck, githubCheck} from '../shared/common';
import {useSelector, useDispatch} from "react-redux";
import { actionCreators } from "../redux/modules/user";

import { history } from "../redux/configureStore";

import axios from 'axios';


const Setting = (props) => {
    return (
        <React.Fragment>
            <SettingWrap>
                <ProfileImg src={props.user_info.profile} />
                <ProfileEditBtn>Image Edit</ProfileEditBtn>
                
                <Input 
                    placeholder=""
                    type="text" 
                    width="85%" 
                    margin="5px 0px 5px 35px"
                    />
                <Input 
                    placeholder=""
                    type="text" 
                    width="85%" 
                    margin="5px 0px 5px 35px"
                    />
                <Input 
                    placeholder=""
                    type="text" 
                    width="85%" 
                    margin="5px 0px 5px 35px"
                    />
                
            </SettingWrap>
        </React.Fragment>
    );
};

Setting.defaultProps = {
    user_info: {
        profile:
        "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
    },
    
}

export default Setting;

const SettingWrap = styled.div`
    border : 1px solid blue;

`;

const ProfileImg = styled.img`
    width: 30%;
    aspect-ratio: 1/1;
    border-radius: 100px;
    background-image: url("${(props) => props.src}");
    margin-right: 0px;
    cursor:pointer;
`;

const ProfileEditBtn = styled.button`
    color:blue;

`;