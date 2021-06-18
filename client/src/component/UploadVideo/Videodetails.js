import React,{useState} from 'react';
import { connect } from 'react-redux';
import {uploadVideo} from "../../redux";
import "./uploadform.css";

const Loanform = (props) => {
    const [ videoDetails, setvideoDetails ] = useState({
		    video: '',
        headline:'',
        description:'',
        wait:true,
        err:""
	});
  
  const changeHandler = (event) => {
    const name = event.target.name;
    if (name === "video") {
      const files = event.target.files;
      setvideoDetails((prevValue) => {
        return {
          ...prevValue,
          [name]: files[0],
        };
      });
    } else {
      const value = event.target.value;
      setvideoDetails((prevValue) => {
        return {
          ...prevValue,
          [name]: value
        };
      });
    }
  };

  const check=()=>{
    if(videoDetails.video && videoDetails.headline &&videoDetails.description){
      props.uploadVideo(videoDetails);
    }else{
      setvideoDetails({err:"fill it completely"});
    }
  }
    return (
        <div className="loanform">
            <h1>Upload Video</h1>
            <input type='file' name="video" placeholder="Applicant Name"vaule={videoDetails.name} onChange={changeHandler}></input>
            <input type='text' name="headline" placeholder="Headline" vaule={videoDetails.headline} onChange={changeHandler}></input>
            <input type='text' name="description" placeholder="description" vaule={videoDetails.description} onChange={changeHandler}></input>
            <button onClick={check} >Upload it</button>
            {videoDetails.err?<p>{videoDetails.err}</p>:null}
            {props.isUpload?<h3>Video uploaded</h3>:null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isUpload:state.user.isUpload
})

const mapDispatchtoProps = (dispatch) => {
    return {
      uploadVideo: function (loanDetails) {
        dispatch(uploadVideo(loanDetails));
      },
    };
  };
  

export default connect(mapStateToProps, mapDispatchtoProps)(Loanform)
