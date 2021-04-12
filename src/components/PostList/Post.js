import React from "react";
import styled from "styled-components"; 

const Post = (props) => {

    return (
        <React.Fragment>
            <div>img</div>
            <div>user_info</div>
            <div>contents</div>
            <div>comments</div>
            <div>like_cnt/comment_cnt</div>
            <div>commentsWrite</div>
            <div></div>
          
        </React.Fragment>    
        )
}

Post.defalutProps ={
    id: 0,
    user_info: {
        nickname: "0sae",
        user_profile: "",
    },
    image_url: "",
    contents: "",
    comment_cnt: 8,
    like_cnt: 20,
    insert_dt: "2021-04-12 10:00:00",
}

export default Post;