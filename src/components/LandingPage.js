import React, { Component } from 'react';
import Wrapper from './Wrapper';
import axios from 'axios';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

class LandingPage extends Component {

	state = {
		isSignedIn: false
	}

	componentDidMount() {
		if (localStorage.token) {
			axios({
				method: "get",
				url: `http://localhost:3001/users/`,
				headers: { authorization: `Bearer ${localStorage.token}` }
			})
				.then(response => {
					console.log('App successfully recieves a response', response)
					this.setState({
						isSignedIn: true,
					});
				})
				.catch(err => console.log(err))
		} else {
			this.setState({
				isSignedIn: false
			})
		}
	}

	signedIn = () => {
		this.setState({
			isSignedIn: true
		})
	}

	signedOut = () => {
		this.setState({
			isSignedIn: false
		})
	}

	render() {
		if (this.state.isSignedIn) {
			return (
				<div>
					<Wrapper signedOut={this.signedOut} />
				</div>
			);
		} else {
			return (
				<div>
					<SignInForm signedIn={this.signedIn} />
					<SignUpForm signedIn={this.signedIn} />
				</div>
			)
		}
	}
}

export default LandingPage;