import {
    SIGNUP_USER,
    LOGIN_USER,
    SET_CURRENT_USER,
    LOGOUT_USER,
    SHOW_PROFILE,
    USER_VIDEO,
    ALL_VIDEO,
    ADD_COMMENT,
    VIDEO_COMMENT,
    SOLO_VIDEO,
    UPLOAD_VIDEO,
    ADD_LIKE
  } from "../action/userType";


  const initialState = {
    isLoggedIn: false,
    user_id: "",
    action: "Signup",
    msg: "",
    err:'',
    passmsg: "",
    userDetails: {},
    profile: {},
    userVideo: [],
    allVideo: [],
    video:{},
    loadingvideo:true,
    loading: true,
    loadingList:true,
    loadingComment:true,
    loadingVideo:true,
    isUpload:false
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_USER:
        return {
          ...state,
          msg: action.payload,
          err:action.Valid,
           };
  
      case LOGIN_USER:
        return {
          ...state,
          msg: action.payload,
          isLoggedIn: action.isLoggedIn,
        };
  
      case SET_CURRENT_USER:
        return {
          ...state,
          userDetails: action.payload,
          isLoggedIn: true,
        };
  
      case LOGOUT_USER:
        return {
          ...state,
          isLoggedIn: false,
        };

  
      case SHOW_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false,
        };
        case UPLOAD_VIDEO:
          return{
            ...state,
            isUpload:true
          }
        case USER_VIDEO:
        return {
          ...state,
          allVideo: action.payload,
          loadingList:false
        };

        case ALL_VIDEO:
          return {
            ...state,
            allVideo: action.payload,
            loadingVideo:false
          };
          case SOLO_VIDEO:
            return {
              ...state,
              video: action.payload,
              loadingvideo:false
            };
          case VIDEO_COMMENT:
            return{
              ...state,
              loadingComment:false,
              allVideo: state.allVideo.map((video) => {
                if (video._id === action.payload.videoId) {
                  return {
                    ...video,
                    comments: [...action.payload.comment],
                  };
                } else return video;
              }),
            };
            case ADD_COMMENT:
              return{
                ...state,
                video: {
                  ...state.video,
                  comments : [action.payload.comment,...state.video.comments,],
                }
                   
                      
              };
              case ADD_LIKE:
                return{
                  ...state,
                  video:  {
                    ...state.video,
                    likes: [...state.video.likes,state.userDetails.username],
                  }
                };
      default:
        return state;
    }
  };
  
  export default userReducer;