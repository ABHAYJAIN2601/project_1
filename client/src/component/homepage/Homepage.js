import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import UserVideo from '../Vediolist/Uservideo'
import Header  from '../header/Header'
import Home from '../home/Home'
import  UploadVideo  from '../UploadVideo/Videodetails'
import PlayVideo from '../playVideo/PlayVideo'

const homepage = (props) => {
    return (
        <div className="view-port">
        <Header/>
        <div className="view-area">
        <Switch>
        <Route
          exact
    
          path="/"
          component = {Home}
        />
        <Route
          exact
    
          path="/my-uploads"
          component = {UserVideo}
        />
        <Route
          exact
          
          path="/upload-video"
          component = {UploadVideo}
        />
        <Route
          exact
          
          path="/videoId/:videoId"
          component = {PlayVideo}
        />
        </Switch>
        </div>
        
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(homepage)
