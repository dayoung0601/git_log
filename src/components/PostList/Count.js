import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Input } from "../../elements";

import heart from "../../static/heart.svg";
import comment from "../../static/comment.svg";

const Count = (props) => {
  return (
    <React.Fragment>
      
    </React.Fragment>
  );
};

Count.defaultProps = {
  id: 0,
  user_info: {
    nickname: "_nickname",
    profile:
      "https://www.zdnet.com/a/hub/i/r/2018/10/18/580b4d43-4060-4d90-be23-1f97ef795e4e/resize/1200x900/757c6793f448336b1a2c73a5d46fb971/github-logo.png",
  },
  image_url:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCsASCy83izYeNHlYSp4stqfcCz4g1wg78KbAA_hrnOb72sKQMn0B5eLctnwybLDBphNc&usqp=CAU",
  contents: "개발자들의 커뮤니티, 깃로그",
  comment_cnt: 8,
  like_cnt: 20,
  insert_dt: "2021-04-12 10:00:00",
};

export default Count;
