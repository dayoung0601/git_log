import React from "react";
import styled from "styled-components"; 

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Post from "../components/PostList/Post"


const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);

    // 본인만 게시글 수정 기능 만들 때 사용

    console.log(post_list);
   

    React.useEffect(() => {
            dispatch(postActions.getPostAPI());
    }, []);

    return (
        <React.Fragment>
            {post_list.map((p, idx) => {
                 return <Post key={p.id} {...p}/>
            })}
            {/* <Post/> */}
        </React.Fragment>
        )
}

export default PostList;