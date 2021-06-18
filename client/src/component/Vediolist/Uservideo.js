import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { userVideo } from "../../redux";
import SingleVideo from "../SingleVideo/SingleVideo";
import "./videolist.css";
const UserVideo = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userVideo());
  }, []);

  return (
    <div className="user-video">
      <h1>Your Uploaded Videos</h1>
      {props.loadingList ? (
        <h1>loading...</h1>
      ) : (
        <>
          {props.allVideo.map((video, index) => {
            return (
              <>
                <SingleVideo videoDetails={video} isTool={false} />
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loadingList: state.user.loadingList,
  allVideo: state.user.allVideo,
});
const mapDispatchtoProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchtoProps)(UserVideo);
