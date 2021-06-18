import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux';
import "./header.css";
const Header = (props) => {
    return (
        <div className='header'>
            <Link to='/'>Home</Link>
            <Link  to='/upload-video'>Upload Video</Link>
            <Link to='/my-uploads'>Your videos</Link>
            <a href="#" onClick={()=>props.logoutUser()}>Logout</a>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => {
    return {
      logoutUser: function () {
        dispatch(logoutUser())
      },
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Header)
  

