import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Input } from "../../elements";

const CommentItem = (props) => {
  return (
    <React.Fragment>
      <div flex-direction="column">
        <Grid flex>
          <ProfileImg>
            <img width="100%" height="auto" src={props.user_info.profile} />
          </ProfileImg>
          <Text bold>{props.user_info.nickname}</Text>
          <br></br>
          <Text>{props.comment}</Text>
        </Grid>
        
      </div>
    </React.Fragment>
  );
};

CommentItem.defaultProps = {
  user_info: {
    nickname: "_nickname",
    profile:
      "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
  },
  comment: " 댓글입니다 :)",
};

const ProfileImg = styled.div`
  width: 8%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-right: 5px;
`;

export default CommentItem;
