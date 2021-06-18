import {React,useState} from 'react';
import {connect} from 'react-redux';
import {signupUser} from "../src/redux"
const Signup = (props) => {
    const [username,setusername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmpass] = useState("");
    const [msg,setError] = useState("");
  
    return (
        <div className='signup-div'>
        <h1>
          Sign up
        </h1>
        <p>Username</p>
        <input type="text" name="username" value={username} onChange={(e) => setusername(e.target.value)}/>
        <p>Password</p>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p>Confirm Password</p>
        <input type="password" name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmpass(e.target.value)}/>
        <p className='message'>{msg}</p>
        <button onClick={()=>{props.signupUser(username,password)}}>Sign up</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: function (username,password) {
      dispatch(signupUser(username,password))
    },
  }
};

export default connect(null, mapDispatchToProps)(Signup);
