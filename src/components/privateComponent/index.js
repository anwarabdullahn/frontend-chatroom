import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToken } from '../../utils/api';
import { isEmpty } from 'lodash';
import { setCurrentUser, logoutUserSuccess } from '../../redux/auth/action';

class PrivateRoute extends Component {
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (!isEmpty(token)) {
			this.props.setCurrentUser();
			setToken(token);
		} else {
			this.props.logoutUserSuccess();
		}
	}

	render() {
		const Component = this.props.component;
		return (
			<Route {...this.props} render={() => (this.props.isAuthenticated ? <Component {...this.props} /> : <Redirect to="/" />)} />
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { setCurrentUser, logoutUserSuccess })(PrivateRoute);