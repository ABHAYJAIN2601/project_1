import React from 'react';
import { Provider } from 'react-redux';
import setAuthenticationToken from './component/setAuthenticationToken.js';
import { setCurrentUser, logoutUser} from './redux';
import jwt from 'jsonwebtoken';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Cipher from "../src/Cipher"; 

if (localStorage.jwtToken) {
	setAuthenticationToken(localStorage.jwtToken);
	jwt.verify(localStorage.jwtToken, 'Cipher', function(err, decode) {
		if (err) {
			store.dispatch(logoutUser());
		} else {
			store.dispatch(setCurrentUser(decode));
		}
	});
}

function App() {

	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
			<Cipher/>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

