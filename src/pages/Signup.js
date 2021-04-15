import React from 'react';
import styled from 'styled-components';
import signup from '../scss/signup.css';
import {AiFillGithub} from 'react-icons/ai';

import {Grid, Text, Image, Input, Button } from '../elements';
import {nickNameCheck, pwMatch, pwContinuous, emailCheck, githubCheck} from '../shared/common';
import {useSelector, useDispatch} from "react-redux";
import { actionCreators } from "../redux/modules/user";

import { history } from "../redux/configureStore";

import axios from 'axios';
// import { set } from 'immer/dist/internal';


const Signup = (props) => {
    const dispatch  = useDispatch();

    const [nickname, setNickname] = React.useState('');
    const [nickNameDup, setNicknameDup] = React.useState(false);
    const [pw, setPw] = React.useState('');
    const [pwCheck, setPwCheck] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailDup, setEmailDup] = React.useState(false);
    const [github, setGithub] = React.useState('');


//CheckEmailAPI(email)
//서버에 이메일 중복확인 요청 함수
const CheckEmailAPI = (email) => {                      
    console.log(email)
    const API = 'http://13.125.167.83/api/signup/email-check';
    axios.post(API,{
        email:email,
    },
    {
        headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
        },
    })
    .then((res) => {
        console.log('이메일중복확인!', res)
        if(res === false){
            alert('이미 등록된 이메일 입니다!');
            setEmailDup(false);
        }else{
            alert('사용 가능한 이메일 입니다 :)');
            setEmailDup(true);
        }
    })
}

//checkNickNameAPI

const checkNickNameAPI = (nickname) => {                      
    console.log(nickname)
    const API = 'http://13.125.167.83/api/signup/nickname-check';
    axios.post(API,{
        nickname:nickname,
    },
    {
        headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
        },
    })
    .then((res) => {
        console.log('이메일중복확인!', res)
        if(res === false){
            alert('이미 등록된 닉네임 입니다!');
            setNicknameDup(false);
        }else{
            alert('사용 가능한 닉네임 입니다 :)');
            setNicknameDup(true);
        }
    })
}

//chekcGirHubUrl
// const checkGitHubUrl = (github) => {
//     console.log(github)
//     //https://github.com/g0garden
//     const github_base = 'https://github.com/'
//     const Github_URL = {github_base};
//     axios.post(Github_URL, {

//         githubUrl:
//         }
//         ).then((res) => {
//         console.log('깃헙주소있나요?', res)
//     })

// }





    //해당 조건 충족 여부에 따라 info 알려주기
const changeNickname = (e) => {

    setNickname(e.target.value);
    const nickNameInfo = document.querySelector('ul.checkNickname li:nth-child(1)');

    if(!nickNameCheck(e.target.value)){
        nickNameInfo.classList.add('error');
        nickNameInfo.classList.remove('ok');
    } else {
        nickNameInfo.classList.add('ok');
        nickNameInfo.classList.remove('error');
    }
}

const changeGithub = (e) => {
    
    setGithub(e.target.value);
    const githubInfo = document.querySelector('ul.checkGithub li:nth-child(1)');

    if(!githubCheck(e.target.value)){
        githubInfo.classList.add('error');
        githubInfo.classList.remove('ok');        
    }else{
        githubInfo.classList.add('ok');
        githubInfo.classList.remove('error');  
    }
}

const changePw = (e) => {

    const targetPw = e.target.value;
    setPw(targetPw);
    const pwInfo_len = document.querySelector('ul.checkPw li:nth-child(1)');
    const pwInfo_match = document.querySelector('ul.checkPw li:nth-child(2)');
    const pwInfo_continuous = document.querySelector('ul.checkPw li:nth-child(3)');

    if (targetPw.length < 10) {
        pwInfo_len.classList.add('error');
        pwInfo_len.classList.remove('ok');
    } else {
        pwInfo_len.classList.remove('error');
        pwInfo_len.classList.add('ok');
    }

    if (!pwMatch(targetPw)) {
        pwInfo_match.classList.add('error');
        pwInfo_match.classList.remove('ok');
    } else {
        pwInfo_match.classList.add('ok');
        pwInfo_match.classList.remove('error');
    }

    if (pwContinuous(targetPw)) {
        pwInfo_continuous.classList.add('error');
        pwInfo_continuous.classList.remove('ok');
    } else {
        pwInfo_continuous.classList.add('ok');
        pwInfo_continuous.classList.remove('error');
        }
    }

    //비밀번호 확인하기
    //비밀번호와 일치하면 info 색깔 초록색으로 바꿔주기
    const changePwMatch = (e) => {
        const checkPw = e.target.value;
        setPwCheck(checkPw);
        const RePwInfo = document.querySelector('ul.reCheckPw li:nth-child(1)');
    
        if (pw === checkPw) {
            RePwInfo.classList.add('ok');
            RePwInfo.classList.remove('error');
        } else {
            RePwInfo.classList.add('error');
            RePwInfo.classList.remove('ok');
        }
    }

    //github 주소 url 받기 
    // const changeGithub  = (e) => {
    //     const checkGithub = e.target.value;
    //     setGithub(checkGithub);
    //     const GithubInfo = document.querySelector('ul.checkGithub li:nth-child(1)');}



// signup버튼 눌렀을때 빈칸체크하기
const signUp = () => {
    
    if(email === '') {
        alert('이메일을 입력해주세요!')
        return false;
    }
    
    if(nickname === '') {
        alert('닉네임을 입력해주세요!')
        return false;
    }

    if (emailDup === false) {
        alert('이메일 중복확인을 해주세요!');
        return false;
    }


    if (nickNameDup === false) {
        alert('닉네임 중복확인을 해주세요!');
        return false;
    }

    
    if(!emailCheck(email)) {
        alert('이메일 형식을 지켜주세요!');
        return false;
    }

    if(github === '') {
        alert('깃허브 주소를 입력해주세요!')
        return false;
    }

    //깃허브 형식 체크 -> 유효한 url인지
    // if(!githubCheck(github)) {
    //     alert('깃허브 주소를 다시 확인해주세요!');
    //     return false;
    // }

    dispatch(actionCreators.signupAPI(email, nickname, pw, pwCheck, github));
}



    return (
        <React.Fragment>
            <SignupWrap>
            <SignupHeader>
                <Grid>
                    {/* <Title>🎈Join Git_log</Title> */}
                    <Title>Create your Account🎈</Title>
                    {/* <subTitle>Join Git_log</subTitle> */}
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
                        placeholder="Email"
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px"
                        padding="12px 4px" 
                        _onChange={(e) => {
                            setEmail(e.target.value)}}/>
                    <Button  
                        width="20%" 
                        margin="0px 30px 0px 0px" 
                        padding="10px"
                        size="0.5vw" 
                        color="white"
                        _onClick={()=>{  
                            if(!emailCheck(email)) {
                                alert('이메일 형식을 지켜주세요!');
                                return false;
                            }
                            //이메일중복확인 API
                            CheckEmailAPI(email);
                        }}>중복확인</Button>
                </Grid>
                
                <Grid is_flex width="100%" margin="5px 0">
                <Input 
                        placeholder="Nickname"
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        _onClick={() => {
                            // console.log("ㅇㅇ");
                            document.querySelector('.checkNickname').style.display = 'block';
                        }}
                        _onChange={(e) => {
                            // console.log(e.target.value);
                            changeNickname(e);
                        }}
                        />
                    <Button  
                        width="20%" 
                        margin="0px 30px 0px 0px" padding="10px" 
                        size="0.5vw" color="white"
                        _onClick={() => {
                            if(!nickNameCheck(nickname)){
                                alert('닉네임은 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다.');
                                return false;
                            }
                            checkNickNameAPI(nickname);
                        }} >중복확인</Button>
                </Grid>
                <InfoUl className="checkNickname">
                    <li>6자 이상의 영문 혹은 영문과 숫자를 조합 </li>
                    <li>닉네임 중복확인</li>
                </InfoUl> 
                <Grid is_flex margin="5px auto">
                <Input  
                        placeholder="PassWord"
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        _onClick={() => {
                            document.querySelector('.checkPw').style.display = 'block';
                        }}
                        _onChange={(e) => {
                            changePw(e)
                        }}/>
                </Grid>
                <InfoUl className="checkPw">
                    <li>10글자 이상 입력</li>
                    <li>영문/숫자/특수문자(공백 제외)만 허용,2개 이상의 조합</li>
                    <li>동일한 숫자 3개 이상 연속 사용 불가</li>
                </InfoUl> 
                <Grid is_flex margin="5px 0">
                <Input 
                        placeholder="PassWord check"
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        _onClick={() => {
                            document.querySelector('.reCheckPw').style.display = 'block';
                        }}
                        _onChange={(e) => {
                            changePwMatch(e)
                        }}
                        />
                </Grid>
                <InfoUl className="reCheckPw">
                    <li>동일한 비밀번호를 입력</li>
                </InfoUl>
                <Grid is_flex width="100%" margin="5px 0">
                <Input 
                        placeholder="Nickname"
                        type="text" 
                        width="85%" 
                        margin="5px 0px 5px 35px" 
                        _onClick={() => {
                            // console.log("ㅇㅇ");
                            document.querySelector('.checkGithub').style.display = 'block';
                        }}
                        _onChange={(e) => {
                            // console.log(e.target.value);
                            changeGithub(e);
                        }}
                        />
                    <Button  
                        width="20%" 
                        margin="0px 30px 0px 0px" padding="10px" 
                        size="0.5vw" color="white"
                        _onClick={() => {
                            if(!githubCheck(github)){
                                alert('영문 혹은 영문과 숫자 조합만 가능');
                                return false;
                            }
                            //checkGitHub(github);
                        }} >check!</Button>
                </Grid>
                {/*유효성 체크API */}
                <InfoUl className="checkGithub">
                    <li> 본인 깃허브주소의 아이디만 입력하세요 : )</li>
                    <li> ex) https://github.com/아이디</li>
                </InfoUl> 
                </InputWrap>
            </SignupBody>
            <SignupBtns>
                <Button 
                    width="40%" margin="10px 0" alt="회원가입" 
                    radius="8px" size="1.2vw"  color="white" 
                    _onClick={signUp}
                    >Sign Up</Button>
                <Button width="40%" margin="10px 0" alt="로그인" 
                radius="8px" size="1.2vw" bg="#ffffff" color="#24292e"
                _onClick={() => {
                    history.push('/login');
                }}
                >Sign In</Button>
            </SignupBtns>
        </SignupWrap>
        
        </React.Fragment>
        
        
    );
};

const SignupWrap = styled.div`
    width: 50%;
    /* margin:-8px auto 15px auto; */
    margin: 10% auto;
    padding: 8px;
    border: 1px solid #24292e ;
    border-radius: 8px;
    /* background-color:#f6f8fa; */
    
    @media (max-width: 767px){

    }

`;

const SignupHeader = styled.div`


`;

const Title = styled.div`
    margin: 50px auto 50px auto;
    font-size: 2.2vw;
    font-weight:600;
    text-align: center;

`;

// const subTitle = styled.div`
//     margin: 5px auto 10px auto;
//     font-size: 1.2vw;
//     color: lightgray;
//     text-align: center;

// `;

const SignupBody = styled.div`

`;

const SignupBtns = styled.div`
    display: flex;
    justify-content: space-evenly;
    width:100%;
    margin: 10px 0px 20px 0px;

`;

const InputWrap = styled.div`
    padding: 8px;

`;

const InfoUl = styled.ul`
    width:100%;
    font-size: 0.7vw;
    color:#666666;
    position: relative;
    left:20px;
    font-weight: 400
`;




export default Signup;