import React, { useState } from "react";
import { connect } from "react-redux";
import { commentList, addComment ,addLike} from "../../redux";
import moment from "moment";
const Comments = (props) => {
  const [commentDetails, setcommentDetails] = useState({
    comment: "",
    showComment: false,
  });
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setcommentDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const toggleComment = () => {
    let val = !commentDetails.showComment;
    setcommentDetails({ showComment: val });
  };
  const sendComment=()=>{
  
  props.addComment(props.videoId, commentDetails.comment);
  setcommentDetails({comment:"",showComment:true});

  }
  return (
    <div>
      <div className="like-show">
      <p className="like">{props.Likes.length} Likes</p>
        {props.Likes.includes(props.username)?
        <button >Liked</button>:
        <button onClick={() => props.addLike(props.videoId)}>Like</button>}
        <button onClick={toggleComment}>Show Comment</button>
      </div>
      <div className="add-comment">
      <input
        type="text"
        name="comment"
        placeholder="comment"
        vaule={commentDetails.comment}
        onChange={changeHandler}
      ></input>
      <button
        onClick={sendComment}
      >
        Comment
      </button>
      </div>
      
      {commentDetails.showComment ? (
        props.videoComment.map((comments) => {
          return (
            <div className="single-comment">
              <img
                className="avatar"
                src={
                  "http://localhost:5000/static/Avatars/avatar" +
                  comments.avatar +
                  ".svg"
                }
                alt="user-avatar"
              />
              <div>
                <div className="username-date">
                  <p className="username">{comments.user_id.username}</p>
                  <p className="comment-date">
                    {moment(comments.date).fromNow()}
                  </p>
                </div>
                <p className="comment">{comments.comment}</p>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loadingComment: state.user.loadingComment,
  allVideo: state.user.allVideo,
  username:state.user.userDetails.username
});

const mapDispatchtoProps = (dispatch) => {
  return {
    addComment: function (videoId, commentDetails) {
      dispatch(addComment(videoId, commentDetails));
    },
    commentList: function (videoId) {
      dispatch(commentList(videoId));
    },
    addLike:function (videoId) {
      dispatch(addLike(videoId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Comments);
