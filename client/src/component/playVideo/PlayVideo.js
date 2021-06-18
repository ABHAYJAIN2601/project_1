import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { allVideo, soloVideo } from "../../redux";
import "./playvideo.css";
import Comments from "../SingleVideo/Comments";
import SingleVideo from "../SingleVideo/SingleVideo";
const PlayVideo = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(soloVideo(props.match.params.videoId));
    dispatch(allVideo());
  }, []);
  return (
    <div className="single-video-view">
      <div className="single-left-side">
        {props.loadingvideo ? (
          <p>Loading</p>
        ) : (
          <>
            <SingleVideo videoDetails={props.video} isTool={true} />{" "}
            <Comments
              Likes={props.video.likes}
              videoId={props.video._id}
              videoComment={props.video.comments}
            />
          </>
        )}
      </div>
      <div className="single-right-side">
        <h1>Recommend videos</h1>
        {props.loadingVideo ? (
          <h1>loading...</h1>
        ) : (
          <>
            {props.videos.map((video, index) => {
              return <SingleVideo videoDetails={video} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loadingvideo: state.user.loadingvideo,
  video: state.user.video,
  loadingVideo: state.user.loadingVideo,
  videos: state.user.allVideo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlayVideo);
