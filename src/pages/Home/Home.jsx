import React from 'react';

import TokenProvider from '../../api/token';
import { getUserData } from '../../api/userApi';

const Home = () => {
	const [userData, setUserData] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const logoutHandler = () => {
		TokenProvider.setTokens(null);
		document.location.reload();
	};

	React.useEffect(() => {
		const fetcData = async () => {
			try {
				setLoading(true);
				const result = await getUserData();
				setUserData(result.data.body.message);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};

		fetcData();
	}, []);

	return (
		<div>
			<h1>Home</h1>
			{loading ? (
				'Loading'
			) : (
				<>
					<p>{userData && userData}</p>
					<button type='button' onClick={logoutHandler}>
						Logout
					</button>
				</>
			)}
		</div>
	);
};

export default Home;
