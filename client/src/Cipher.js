import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Homepage from './component/homepage/Homepage';
export const Taxblock = (props) => {
    let callContainer;
    const isUserLoggedin = useSelector((state) => state.user.isLoggedIn);
    if (isUserLoggedin === false) {
      callContainer = <><Route exact path="/" component={Signin} /></>;
    } else {
      callContainer = <Route path="/" component={Homepage} />;
    }
    return (

				<div className="App">
				<Router>
      <Switch>
        <Route
          exact
          path="/signup"
          component = {Signup}
        />
        </Switch>
        {callContainer}
        </Router>
        
				</div>

    )
}


export default Taxblock;
