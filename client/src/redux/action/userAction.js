import setAuthenticationToken from "../../component/setAuthenticationToken";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  SIGNUP_USER,
  LOGIN_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
  USER_VIDEO,
  ALL_VIDEO,
  VIDEO_COMMENT,
  ADD_COMMENT,
  SOLO_VIDEO,
  UPLOAD_VIDEO,
  ADD_LIKE
} from "./userType";


export const signupUser = (username, password) => {
  return function (dispatch) {
    var OPTIONS = {
      url: "/signup",
      method: "POST",
      data: {
        username: username,
        password: password
      },

      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        const message = res.data.message;
        let err='';
        if(res.data.message){
          if(res.data.message==='Password Not Matched!'){
            err='* Passwords do not match'
          }
        }
        if(res.data.err){
          if(res.data.err.errors){

            err='* Please enter a valid username'
            }
            if(res.data.err.keyPattern){
              if(Object.keys(res.data.err.keyPattern)[0]==='username'){
                  err='This username already exists.'
              }else{
                err='This username is already registered.' 
              }
              
            }
        }

        dispatch({
          type: SIGNUP_USER,
          payload: message,
          Valid:err,
        });
        window.location.href = "/"
      })
      .catch((err) => console.log(err));
  };
};

export const loginUser = (username, password) => {
  return function (dispatch) {
    var OPTIONS = {
      url: "/login",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        const message = res.data.message;

        if (message === "User Found") {
          const token = res.data.token;
          localStorage.setItem("jwtToken", token);
          setAuthenticationToken(token);
          dispatch(setCurrentUser(jwt.decode(token)));
          dispatch({
            type: LOGIN_USER,
            payload: message,
            isLoggedIn: true,
          });
          window.location.href = "/"
        } else {
          dispatch({
            type: LOGIN_USER,
            payload: message,
            isLoggedIn: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const setCurrentUser = (user) => {
  return function (dispatch) {
 

    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };
};

export const logoutUser = () => {
  return function (dispatch) {

          localStorage.removeItem("jwtToken");
          setAuthenticationToken(false);
          dispatch(setCurrentUser({}));
          dispatch({
            type: LOGOUT_USER,
          });

          window.location.href = "/";
      
  };
};

export const uploadVideo = (details) => {
  return function (dispatch) {
    console.log(details);
    const formData = new FormData();
    formData.append("video", details.video);
    formData.append("headline", details.headline);
    formData.append("description", details.description);
    var config = {
      method: "post",
      url: "/uploadVideo",
      data:formData,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const profile = res.data;

        dispatch({
          type: UPLOAD_VIDEO,
          payload: profile,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};


export const userVideo = () => {
  return function (dispatch) {
    var config = {
      method: "get",
      url: "/userVideo",
      headers: {
        "content-type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const list = res.data;
        console.log(list)
        dispatch({
          type: USER_VIDEO,
          payload:list,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const allVideo = () => {
  return function (dispatch) {
    var config = {
      method: "get",
      url: "/allVideo",
      headers: {
        "content-type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const list = res.data;
        console.log(list)
        dispatch({
          type: ALL_VIDEO,
          payload:list,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const commentList = (videoId) => {
  return function (dispatch) {
    var config = {
      method: "get",
      url: "/videoComment/"+videoId,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const list = res.data;
        console.log(list)
        dispatch({
          type:VIDEO_COMMENT,
          payload:list,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const addComment = (videoId,comment) => {
  return function (dispatch) {
    var config = {
      method: "post",
      url: "/addComment/"+videoId,
      headers: {
        "content-type": "application/json",
      },
      data:{videoId,comment}
    };

    axios(config)
      .then((res) => {
        const list = res.data;
        console.log(list)
        dispatch({
          type:ADD_COMMENT,
          payload:list,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const soloVideo = (videoId) => {
  console.log(videoId);
  return function (dispatch) {
    var config = {
      method: "get",
      url: "/soloVideo/"+videoId,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const list = res.data;
        console.log(list)
        dispatch({
          type:SOLO_VIDEO,
          payload:list,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
export const updateViews = (videoId) => {
  console.log(videoId);
  return function (dispatch) {
    var config = {
      method: "get",
      url: "/updateView/"+videoId,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const list = res.data;
        // console.log(list)
        // dispatch({
        //   type:SOLO_VIDEO,
        //   payload:list,
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const addLike= (videoId) => {
  console.log(videoId);
  return function (dispatch) {
    var config = {
      method: "get",
      url: "/addLike/"+videoId,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const list = res.data;
      
        dispatch({
          type:ADD_LIKE,
          payload:list,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};