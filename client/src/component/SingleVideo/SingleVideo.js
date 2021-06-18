import React from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import moment from "moment";
import "./singlevideo.css";
import { updateViews } from "../../redux";
const SingleVideo = (props) => {
  const openVideo = () => {
    window.location.href =
      "http://localhost:3000/videoId/" + props.videoDetails._id;
  };
  return (
    <>
      <div className="single-video-div">
        <ReactPlayer
          url={"http://localhost:5000/static/" + props.videoDetails.videoUrl}
          controls={props.isTool}
          className="react-player"
          onClick={props.isTool ? <>fasle</> : openVideo}
          onStart={() => props.updateViews(props.videoDetails._id)}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
        <div className="headline-date-view">
          <div>
          <img
            className="avatar"
            src={
              "http://localhost:5000/static/Avatars/avatar" +
              props.videoDetails.user_id.avatar +
              ".svg"
            }
            alt="user-avatar"
          />
          <p className="video-username">{props.videoDetails.user_id.username}</p>
          </div>
          
          
         
        </div>
        <div className="video-description">
          <div>
          <p className="video-headline">{props.videoDetails.headline}</p>
          <div className="views-date">
          <p className="video-views">{props.videoDetails.views} views</p>
          <p className="video-date">
            {moment(props.videoDetails.date).format('LL')}
          </p>
          </div>
         
          </div>
       
          <p>{props.videoDetails.description}</p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    updateViews: function (videoId) {
      dispatch(updateViews(videoId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleVideo);
