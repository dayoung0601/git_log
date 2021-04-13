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

const Icon = styled.img`
  margin: 0px 5px 0px 5px;
  width: 4%;
`;

export default Count;
