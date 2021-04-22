import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Input } from "../../elements";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as commentActions} from "../../redux/modules/comment";
import {history} from "../../redux/configureStore";


const CommentItem = (props) => {
  console.log(props.post_id);

  return (
    <React.Fragment>
        <CommentUnit>
        <Grid flex>
          <ProfileImg src={props.user_info.profile} />
          <Text bold size="0.9vw">{props.createdBy}</Text>
        </Grid>
        <Grid>
        <Text size="0.9vw" margin="0px" >{props.comment}</Text>
        </Grid>
      </CommentUnit>
    </React.Fragment>
  );
};

CommentItem.defaultProps = {
  user_info: {
    nickname: "_nickname",
    profile:
      "https://seongbinko-naver-bucket.s3.ap-northeast-2.amazonaws.com/common/default_profile.jpg",
  },
  comment: "댓글입니다 :)",
};

const ProfileImg = styled.img`
  width: 9%;
  aspect-ratio: 1/1;
  border-radius:100px;
  background-image: url("${(props) => props.src}");
  margin-right: 5px;
`;

const CommentUnit = styled.div`
  width: 100%;
  padding: 10px;
`;

export default CommentItem;
