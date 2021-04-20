import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";

import { useSelector } from "react-redux";

import heart from "../../static/heart.svg";
import comment from "../../static/comment.svg";
import { BiHeart } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";

const Count = (props) => {
 
  const heartCnt = useSelector((state) => state.post.list.heartCnt);
  const commentCnt = useSelector((state) => state.post.list.commentCnt);

  return (
    <React.Fragment>
       <BiHeart size="13px"/>
            <Text blod size="0.7vw" margin="0px 5px 0px 2px">
              {heartCnt}
            </Text>
            <BiMessage size="12px" />
            <Text blod size="0.7vw" margin="0px 5px 0px 2px">
              {commentCnt}
            </Text>
    </React.Fragment>
  );
};

Count.defaultProps = 
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


const CommentInput = styled.input`
  outline: none;
  border: none;
  width: 75%;
  font-size: 0.7vw;
`;

const CommentBtn = styled.button`
  background-color: white;
  outline: none;
  border: none;
  color: grey;
  font-size: 0.7vw;
`;

export default Count;
