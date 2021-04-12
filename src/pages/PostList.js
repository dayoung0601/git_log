import React from "react";
import styled from "styled-components"; 

import {useSelector, useDispatch} from "react-redux";

import Post from "../components/PostList/Post"


const PostList = (props) => {


    return (
        <React.Fragment>
            <Post/>
        </React.Fragment>
        )
}

export default PostList;