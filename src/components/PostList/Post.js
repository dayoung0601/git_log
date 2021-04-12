// 안녕하세요 !

import React from "react";
import styled from "styled-components";

import CommentItem from "./CommentItem";
import Count from "./Count";
import { Grid, Input, Text } from "../../elements";
import heart from "../../static/heart.svg";
import comment from "../../static/comment.svg";

const Post = (props) => {
  console.log(props.user_info.profile);

  return (
    <React.Fragment>
      <PostContainer>
        <PostBody1 src={props.image_url}>
            <img width="100%" height="auto" src={props.image_url}/>
        </PostBody1>

        <PostBody2>

          <Body1Writer>
            <Grid flex>
              <ProfileImg>
                  <img width="100%" height="auto" src={props.user_info.profile}/>
              </ProfileImg>
              <Text bold>{props.user_info.nickname}</Text>
            </Grid>
          </Body1Writer>

          <Body2Contents>
            <Text>{props.contents}</Text>
            <Text size="8pt" color="grey">
              {props.insert_dt}
            </Text>
          </Body2Contents>

          <Body3CommentList>
            <CommentItem />
          </Body3CommentList>

          <Body4Count>
              <Icon src={heart} />
              <Text blod margin="0px 5px 0px 5px">
                {props.like_cnt}
              </Text>
              <Icon src={comment} />
              <Text blod margin="0px 5px 0px 5px">
                {props.comment_cnt}
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

Post.defaultProps = {
  id: 0,
  user_info: {
    nickname: "_nickname",
    profile:
      "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
  },
  image_url:
    "https://media.vlpt.us/images/huurray/post/f827a6c4-7dc5-4239-bd7e-c19352ad8044/javascript.gif",
  contents: "개발자들의 커뮤니티, 깃로그",
  comment_cnt: 8,
  like_cnt: 20,
  insert_dt: "2021-04-12 10:00:00",
};

const PostContainer = styled.div`
  width: 100%;
  margin: auto;
  border: 2px solid #eee;
  box-sizing: border-box;
  display: flex;
  position:relative;
  top: 50px;
`;

const PostBody1 = styled.div`
  width: 60%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: 50% 50% ;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin:auto;
`;

const PostBody2 = styled.div`
  width: 40%;
`;

const Body1Writer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 8%;
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
  height: 53%;
  overflow: hidden;
  padding: 10px;
`;

const Body4Count = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 7%;
  border-top: 2px solid #eee;
  align-items: center;
  display: flex;
  padding: 10px;
`;

const Body5CommentWrite = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 7%;
  display:flex;
  justify-content: space-between;
  padding: 10px;
`;

const ProfileImg = styled.div`
  width: 8%;
  aspect-ratio: 1/1;
  border-radius:100%;
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
  width:85%;
`;

const CommentBtn = styled.button`
  background-color: white;
  outline: none;
  border: none;
  color: grey;
`;



export default Post;
