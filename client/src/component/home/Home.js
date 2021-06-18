import React,{useEffect} from 'react'
import { connect,useDispatch } from 'react-redux'
import {allVideo} from "../../redux";

import "./home.css"
import SingleVideo from "../SingleVideo/SingleVideo"
const Home = (props) => {
    const dispatch=useDispatch();
useEffect(() => {
  dispatch(allVideo());
}, []);
    return (
        <div className='home'>
                  <div className="video-grid">  {props.loadingVideo?<h1>loading...</h1>:<>{
        props.videos.map((video, index) => {
        return <SingleVideo videoDetails={video} isTool={false}/>
    })}
      </>}</div>
    
      
    
        </div>
    )
}



const mapStateToProps = (state) => ({
    loadingVideo:state.user.loadingVideo,
    videos:state.user.allVideo    
})
const mapDispatchtoProps = (dispatch) => {
return {
 
};
};



export default connect(mapStateToProps, mapDispatchtoProps)(Home)
