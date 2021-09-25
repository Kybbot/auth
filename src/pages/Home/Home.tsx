import React from 'react';

import TokenProvider from '../../api/token';
import { getUserData } from '../../api/userApi';

const Home: React.FC = () => {
	const [userData, setUserData] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);

	const logoutHandler = () => {
		TokenProvider.removeTokens();
		document.location.reload();
	};

	React.useEffect(() => {
		const fetchData = async () => {
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

		fetchData();
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
