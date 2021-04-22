import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";

import CommentItem from "./CommentItem";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/post";
import { actionCreators as likeActions } from "../../redux/modules/like";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { history } from "../../redux/configureStore";

import commentIcon from "../../static/commentIcon.svg";
import { BiHeart } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { BiHighlight } from "react-icons/bi";
import { BiTrashAlt } from "react-icons/bi";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Post = React.memo((props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(likeActions.getLikeAPI());
    dispatch(commentActions.getCommentAPI(post_id));
  }, []);

  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);
  const comment_list = useSelector(
    (state) => state.comment.list[props.post_id]
  );
  const likeList = useSelector((state) => state.post.list);
  // const userLikes = likeList.filter((l) => l.user_id == user_info?.uid);
  // let isLike;
  // if (userLikes) {
  //   isLike = userLikes.findIndex((l) => l.post_id === props.id) !== -1;
  // }
  const post_id = props.post_id;
  const is_comment = comment_list ? true : false;
  const [comment, setComment] = useState();
  const changeComment = (e) => {
    setComment(e.target.value);
  };
  const commentSubmit = comment ? true : false;

  // 좋아요 버튼 누르기
  // const [active, setActive] = useState(false);
  // 좋아요 여부
  const [isLike, setIsLike] = useState(false);

  const addComment = () => {
    console.log(post_id, comment);
    dispatch(commentActions.addCommentAPI(post_id, comment));
  };

  const likeSubmit = () => {
    if (!is_login) {
      window.alert("로그인 해주세요:)");
      return;
    }
    let post_id = props.post_id;
    let cnt = props.heartCnt + 1;
    console.log("좋아요 post_id", post_id);
    console.log("isLike", isLike);
    console.log("좋아요 전 cnt", props.heartCnt);
    console.log("좋아요 후 cnt", cnt);
    console.log(isLike);
    // dispatch(likeActions.addLikeAPI(post_id, isLike));
    // console.log("isLike", isLike);
  };

  const dislikeSubmit = () => {
    let post_id = props.post_id;
    let cnt = props.heartCnt - 1;
    console.log("좋아요 취소 post_id", post_id);
    console.log("isLike", isLike);
    console.log("좋아요 취소 전 cnt", props.heartCnt);
    console.log("좋아요 취소 후 cnt", cnt);
    // dispatch(likeActions.deleteLikeAPI(post_id, isLike));
  };

  return (
    <React.Fragment>
      <PostContainer>
        <PostBody1 src={props.imgUrl} />

        <PostBody2>
          <Body1Writer>
            <Grid flex>
              <Grid flex>
                <ProfileImg src={props.writerProfile} />
                <Text bold margin="0px" size="0.9vw">
                  {props.writerNickname}
                </Text>
              </Grid>
              {props.is_me && (
                <div style={{ display: "flex", float: "right" }}>
                  <IconBtn
                    margin="0px 0px 0px 40px"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(props.post_id);
                      history.push(`/write/${props.post_id}`);
                    }}
                  >
                    <BiHighlight size="15px" margin="auto" color="grey" />
                  </IconBtn>
                  <IconBtn
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(props.post_id);
                      dispatch(postActions.deletePostAPI(props.post_id));
                      window.location.reload();
                    }}
                  >
                    <BiTrashAlt size="15px" margin="auto" color="grey" />
                  </IconBtn>
                </div>
              )}
            </Grid>
          </Body1Writer>

          <Body2Contents>
            <Text size="0.9vw" margin="0px">
              {props.content}
            </Text>
            <Text size="0.5vw" color="grey" margin="1px">
              {props.createdAt}
            </Text>
          </Body2Contents>

          <Body3CommentList>
            {is_comment
              ? comment_list[post_id].map((c, idx) => {
                  console.log(is_comment);
                  return <CommentItem key={c.comment_id} {...c} />;
                })
              : null}
          </Body3CommentList>

          <Body4Count>
            {/* {isLike ? (
              <FavoriteIcon
                cursor="pointer"
                style={{color:"#F59C9C"}}
                onClick={dislikeSubmit}
              />
            ) : (
              <FavoriteBorderIcon
                cursor="pointer"
                style={{color:"#CBCBCB"}}
                onClick={likeSubmit}
              />
            )} */}

            <div
              onClick={(e) => {
                if (isLike) {
                  setIsLike(false);
                } else {
                  setIsLike(true);
                }
                e.stopPropagation();
                console.log(props.post_id, isLike);
                if (user_info && !isLike) {
                  dispatch(likeActions.addLikeAPI(props.post_id, isLike));
                } else if (user_info && isLike) {
                  dispatch(likeActions.deleteLikeFB(props.id, isLike));
                } else {
                  // window.alert('로그인 후 사용할 수 있습니다! :)');
                }
              }}
            >
              {isLike ? (
                <svg
                  aria-label="좋아요 상태"
                  fill="#fe5e7e"
                  height="17"
                  viewBox="0 0 48 48"
                  width="17"
                  // onClick={dislikeSubmit}
                >
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              ) : (
                <svg
                  aria-label="좋아요 하기 전"
                  fill="#262626"
                  height="17"
                  viewBox="0 0 48 48"
                  width="17"
                  // onClick={likeSubmit}
                >
                  <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              )}
            </div>
            <Text blod size="1.1vw" margin="0px 7px 0px 4px">
              {props.heartCnt}
            </Text>
            <div>
            <BsChat margin="0px"/>
            </div>
            <Text blod size="1.1vw" margin="0px 7px 0px 4px">
              {props.commentCnt}
            </Text>
          </Body4Count>

          <Body5CommentWrite>
            <CommentInput
              type="text"
              placeholder="댓글 달기"
              onChange={changeComment}
              value={comment}
            />
            {/* {commentSubmit? ()} */}
            <CommentBtn onClick={addComment}>게시</CommentBtn>
          </Body5CommentWrite>
        </PostBody2>
      </PostContainer>
    </React.Fragment>
  );
});

const PostContainer = styled.div`
  width: 100%;
  min-width: 500px;
  margin: auto;
  margin-bottom: 30px;
  border: 1.5px solid #eee;
  box-sizing: border-box;
  display: flex;
  position: relative;
  top: 50px;
`;

const PostBody1 = styled.img`
  width: 60%;
  aspect-ratio: 1/1;
  object-fit: cover;
  overflow: hidden;
  object-position: 50% 50%;
  box-sizing: border-box;
`;

const PostBody2 = styled.div`
  width: 50%;
  box-sizing: border-box;
  border-left: 1.5px solid #eee;
`;

const Body1Writer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 14%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Body2Contents = styled.div`
  box-sizing: border-box;
  border-bottom: 1.5px solid #eee;
  width: 100%;
  height: 16%;
  overflow: hidden;
  padding-left: 10px;
`;

const Body3CommentList = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 54%;
  overflow: hidden;
  padding: 10px;
`;

const Body4Count = styled.div`
  box-sizing: border-box;
  border-top: 1.5px solid #eee;
  width: 100%;
  height: 7%;
  align-items: center;
  display: flex;
  padding: 14px 10px 6px 10px;
`;

const Body5CommentWrite = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 9%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
`;

const ProfileImg = styled.img`
  width: 9%;
  aspect-ratio: 1/1;
  border-radius: 100px;
  background-image: url("${(props) => props.src}");
  margin-right: 5px;
`;

const IconBtn = styled.div`
  float: right;
  margin: 5px;
  align-content: center;
  display: flex;
  size: 1.5vw;
  &:hover {
    color: #eee;
    cursor: pointer;
  }
`;

const CommentInput = styled.input`
  outline: none;
  border: none;
  width: 75%;
  font-size: 0.9vw;
`;

const CommentBtn = styled.button`
  background-color: white;
  outline: none;
  border: none;
  color: grey;
  font-size: 0.9vw;
`;

export default Post;
