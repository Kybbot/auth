import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Home, Login, Signup } from '../pages';
import { routesConstants } from '../constants';
import { useAuth } from '../context/AuthContext';

const Routes = () => {
	const { isLoggedIn } = useAuth();

	return (
		<BrowserRouter>
			{isLoggedIn ? (
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
