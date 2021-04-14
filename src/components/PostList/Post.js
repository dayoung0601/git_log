import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";

import CommentList from "./CommentList";
import Count from "./Count";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../../redux/modules/post';


const Post = (props) => {
  const dispatch  = useDispatch();

  useEffect(() => {
    dispatch(postActions.fetchPost());
  }, [])

  return (
    <React.Fragment>
        <PostContainer>
          <PostBody1 src={props.image_url}>
            <img width="100%" height="auto" src={props.image_url} />
          </PostBody1>

          <PostBody2>

            <Body1Writer>
              <Grid flex margin="0px">
                <ProfileImg src={props.user_info.profile} />
                <Text bold margin="0px">
                  {props.user_info.nickname}
                </Text>
              </Grid>
            </Body1Writer>

            <Body2Contents>
              <Text margin="0px">{props.contents}</Text>
              <Text size="8pt" color="grey" margin="1px">
                {props.insert_dt}
              </Text>
            </Body2Contents>

            <Body3CommentList>
              <CommentList />
            </Body3CommentList>

            <Body4Count>
              <Count />
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

Post.defaultProps = 
  {
    post_id: 0,
    user_info: {
      nickname: "_nickname",
      profile:
        "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
    },
    image_url:
      "http://image.dongascience.com/Photo/2018/12/2d5efe44bdd02f3e2ec4e99189d89d18.jpg",
    contents: "개발자 커뮤니티, 깃로그",
    comment_cnt: 8,
    like_cnt: 20,
    insert_dt: "2021-04-12 00:00:00",
  };



const PostContainer = styled.div`
  width: 100%;
  margin: auto;
  border: 2px solid #eee;
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
`;

const PostBody2 = styled.div`
  width: 40%;
`;

const Body1Writer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 10%;
  padding-left: 10px;
`;

const Body2Contents = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  border-bottom: 2px solid #eee;
  overflow: hidden;
  padding-left: 10px;
`;

const Body3CommentList = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 51%;
  overflow: hidden;
  padding-left: 10px;
`;

const Body4Count = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 7%;
  border-top: 2px solid #eee;
  align-items: center;
  display: flex;
  padding: 13px 10px 9px 10px;
`;

const Body5CommentWrite = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: space-between;
  padding: 9px 10px 12px 10px;
`;

const ProfileImg = styled.img`
  width: 9%;
  aspect-ratio: 1/1;
  border-radius: 100px;
  background-image: url("${(props) => props.src}");
  margin-right: 0px;
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
