import React,{useState} from 'react';
import {connect} from 'react-redux';
import {loginUser} from "../src/redux"
const Signin = (props) => {
  const [username,setusername] = useState("");
  const [password,setPassword] = useState("");
  const [errromsg,setError] = useState("");


    return (
        <div className='signin-div'>
        <h1>
        Sign in
      </h1>
      <p>username</p>
      <input type="text" placeholder='Type your username' name="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
      <p>Password</p>
      <input type="password" placeholder='Password' name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <p className='message'>{errromsg}</p>

      <button onClick={()=>props.loginUser(username,password)}>Sign in</button>
      <a href='/signup'>Don't have account? Sign up now</a>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: function (username,password) {
      dispatch(loginUser(username,password))
    },
  }
};

export default connect(null, mapDispatchToProps)(Signin)
