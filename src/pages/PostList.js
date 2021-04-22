import React from "react";
import styled from "styled-components"; 
import { AiFillEdit } from "react-icons/ai";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";

import Post from "../components/PostList/Post"


const PostList = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const post_list = useSelector((state) => state.post.list);
    const me = localStorage.getItem('nickname');

    React.useEffect(() => {
            dispatch(postActions.getPostAPI());
    }, []);

    return (
        <React.Fragment>
            {post_list.map((p, idx) => {
                // 옵셔널 체이닝: 유저가 null 일때를 위하여
               if (p.writerNickname === me){
                return <Post key={p.post_id} {...p} is_me/>
               } else {
                return <Post key={p.post_id} {...p}/>
               }
            })}
    
            { is_login && <WriteBtn
            onClick={() => history.push("/write")} 
            ><AiFillEdit color="#ffffff" size="60%"/></WriteBtn> }
        </React.Fragment>
        )
} 

const WriteBtn = styled.button`
width: 5%; 
aspect-ratio: 1/1;
border-radius: 40%;
background-color: #0d2636;
position: fixed;
top: 130px;
right: 150px;
border: none;
focus{outline:none};
font-size:1rem;
font-weight:500;
&:hover{
        color: #eee;
        background-color:#f1e05a;
        cursor: pointer;
        outline: none;
    }
`;

export default PostList;