import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";

import heart from "../../static/heart.svg";
import comment from "../../static/comment.svg";

const Count = (props) => {
  return (
    <React.Fragment>
      <Icon src={heart} />
      <Text blod margin="0px 5px 0px 2px">
        {props.like_cnt}
      </Text>
      <Icon src={comment} />
      <Text blod margin="0px 5px 0px 2px">
        {props.comment_cnt}
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


const Icon = styled.img`
  margin: 0px 5px 0px 5px;
  width: 4%;
`;

export default Count;
