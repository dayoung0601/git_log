import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";

import CommentItem from "./CommentItem";
import Count from "./Count";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import post, { actionCreators as postActions } from "../../redux/modules/post";

import heart from "../../static/heart.svg";
import comment from "../../static/comment.svg";


const Post = (props) => {


  return (
    <React.Fragment>
      <PostContainer>
        <PostBody1 src={props.imgUrl}>
          <img width="100%" height="auto" src={props.imageUrl} />
        </PostBody1>

        <PostBody2>
          <Body1Writer>
            <Grid flex margin="12px 0px">
              <ProfileImg src={props.writerProfile} />
              <Text bold margin="0px">
                {props.writerNickname}
              </Text>
            </Grid>
          </Body1Writer>

          <Body2Contents>
            <Text margin="0px">{props.content}</Text>
            <Text size="8pt" color="grey" margin="1px">
              {props.createdAt}
            </Text>
          </Body2Contents>

          <Body3CommentList>
         
              <CommentItem />
          
          </Body3CommentList>

          <Body4Count>
            <Icon src={heart} />
            <Text blod margin="0px 5px 0px 2px">
              {props.heartCnt}
            </Text>
            <Icon src={comment} />
            <Text blod margin="0px 5px 0px 2px">
              {props.commentCnt}
            </Text>
          </Body4Count>

          <Body5CommentWrite>
            <CommentInput placeholder="댓글 달기" />
            <CommentBtn>게시</CommentBtn>
          </Body5CommentWrite>
        </PostBody2>
      </PostContainer>
    </React.Fragment>
  );
};


const PostContainer = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: 30px;
  border: 1.5px solid #eee;
  box-sizing: border-box;
  display: flex;
  position: relative;
  top: 50px;
  
`;

const PostBody1 = styled.div`
  width: 60%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: 50% 50%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: auto;
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
  height: 10%;
  padding-left: 10px;
`;

const Body2Contents = styled.div`
  box-sizing: border-box;
  border-bottom: 1.5px solid #eee;
  width: 100%;
  height: 20%;
  overflow: hidden;
  padding-left: 10px;
`;

const Body3CommentList = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 52%;
  overflow: hidden;
  padding-left: 10px;
`;

const Body4Count = styled.div`
  box-sizing: border-box;
  border-top: 1.5px solid #eee;
  width: 100%;
  height: 7%;
  align-items: center;
  display: flex;
  padding: 13px 10px 9px 10px;
`;

const Body5CommentWrite = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  padding: 9px 10px 12px 10px;
`;

const ProfileImg = styled.img`
  width: 9%;
  aspect-ratio: 1/1;
  border-radius: 100px;
  background-image: url("${(props) => props.src}");
  margin-right: 5px;
`;

const Icon = styled.img`
  margin: 0px 5px 0px 5px;
  width: 4%;
`;

const CommentInput = styled.input`
  outline: none;
  border: none;
  width: 85%;
`;

const CommentBtn = styled.button`
  background-color: white;
  outline: none;
  border: none;
  color: grey;
`;

export default Post;
