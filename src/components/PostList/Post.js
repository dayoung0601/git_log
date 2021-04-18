import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";

import CommentItem from "./CommentItem";
import Count from "./Count";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/post";
import { history } from "../../redux/configureStore";

import heart from "../../static/heart.svg";
import { BiHeart } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import { BiHighlight } from "react-icons/bi";
import { BiTrashAlt } from "react-icons/bi";


const Post = React.memo((props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <PostContainer>
        <PostBody1 src={props.imgUrl}/>
          {/* <img width="100%" height="auto" src={props.imgUrl}/>
        </PostBody1> */}

        <PostBody2>
          <Body1Writer>
            <Grid flex>
              <ProfileImg src={props.writerProfile} />
              <Text bold margin="0px" size="1vw">
                {props.writerNickname}
              </Text>
            {/* {props.is_me && ()} */}
            <IconBtn 
              margin="0px 0px 0px 40px"
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 history.push(`/write/${props.id}`)
               }}
              ><BiHighlight size="12px" margin="auto" color="grey"/>
              </IconBtn >
              <IconBtn   
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 dispatch(postActions.deletePostAPI(props.id));
               }}
               ><BiTrashAlt size="12px" margin="auto" color="grey"/>
               </IconBtn >
            </Grid> 
              
          </Body1Writer>

          <Body2Contents>
            <Text size="1vw" margin="0px">{props.content}</Text>
            <Text size="0.5vw" color="grey" margin="1px">
              {props.createdAt}
            </Text>
          </Body2Contents>

          <Body3CommentList>

              <CommentItem />
          
          </Body3CommentList>

          <Body4Count>
            <BiHeart size="13px"/>
            <Text blod size="1vw" margin="0px 5px 0px 2px">
              {props.heartCnt}
            </Text>
            <BiMessage size="12px"/>
            <Text blod size="1vw" margin="0px 5px 0px 2px">
              {props.commentCnt}
            </Text>
          </Body4Count>

          <Body5CommentWrite>
            <CommentInput placeholder="댓글 달기"/>
            <CommentBtn>게시</CommentBtn>
          </Body5CommentWrite>
        </PostBody2>
      </PostContainer>
    </React.Fragment>
  );
});


const PostContainer = styled.div`
  width: 100%;
  min-width:500px;
  margin: auto;
  margin-bottom: 30px;
  border: 1.5px solid #eee;
  box-sizing: border-box;
  display: flex;
  position: relative;
  top: 50px;
  
`;

const PostBody1 = styled.img`
  width: 60%;
  aspect-ratio: 1/1;
  object-fit: cover;
  overflow: hidden;
  object-position: 50% 50%;
  background-image: url("${(props) => props.src}");
  box-sizing: border-box;
`;

const PostBody2 = styled.div`
  width: 40%;
  box-sizing: border-box;
  border-left: 1.5px solid #eee;
`;

const Body1Writer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 14%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Body2Contents = styled.div`
  box-sizing: border-box;
  border-bottom: 1.5px solid #eee;
  width: 100%;
  height: 16%;
  overflow: hidden;
  padding-left: 10px;
`;

const Body3CommentList = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 54%;
  overflow: hidden;
  padding: 10px;
`;

const Body4Count = styled.div`
  box-sizing: border-box;
  border-top: 1.5px solid #eee;
  width: 100%;
  height: 7%;
  align-items: center;
  display: flex;
  padding: 14px 10px 6px 10px;
`;

const Body5CommentWrite = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 9%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
`;

const ProfileImg = styled.img`
  width: 10%;
  aspect-ratio: 1/1;
  border-radius: 100px;
  background-image: url("${(props) => props.src}");
  margin-right: 5px;
`;

const IconBtn = styled.div`
  align: right;
  margin:5px;
  align-content: center;
  display:flex;
  size:1vw;
  &:hover{
        color: #eee;
        cursor: pointer;
`;

const CommentInput = styled.input`
  outline: none;
  border: none;
  width: 70%;
  font-size: 1vw;
`;

const CommentBtn = styled.button`
  background-color: white;
  outline: none;
  border: none;
  color: grey;
  font-size: 1vw;
`;

export default Post;
