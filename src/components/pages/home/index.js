import React, { Component } from 'react';
import { replace } from 'react-router-redux';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { onLogin } from '../../../actions/auth';

class Home extends Component {

	OnLogin(data){
		if(data.accessToken){
			this.props.login(data);
		}
	}

	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		if (nextProps.isLoggedIn === true) {
			
		}
	}

	render(){
		return (
			<div className="wrapper">
				<form className="form-signin text-center">       
					<h5 className="form-signin-heading ">Please login</h5>
					<FacebookLogin
					appId="337669133430158"
					fields="name,email,picture"
					cssClass="facebook-button-class"
					callback={(data) => { this.OnLogin(data) } } />  
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (details) => {
			dispatch(onLogin(details));
			dispatch(replace('/pokemon')); 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
