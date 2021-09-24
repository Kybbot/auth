import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Home, Login, Signup } from '../pages';

import { routesConstants } from '../constants';

import TokenProvider from '../api/token';

const Routes = () => {
	const isAuth = !!TokenProvider.getAccessToken();

	return (
		<BrowserRouter>
			{isAuth ? (
				<Switch>
					<Route exact path={routesConstants.home} component={Home} />
					<Redirect to={routesConstants.home} />
				</Switch>
			) : (
				<Switch>
					<Route exact path={routesConstants.login} component={Login} />
					<Route path={routesConstants.signup} component={Signup} />
					<Redirect to={routesConstants.login} />
				</Switch>
			)}
		</BrowserRouter>
	);
};

export default Routes;
