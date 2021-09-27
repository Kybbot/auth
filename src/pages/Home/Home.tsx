import React from 'react';

import { useAuth } from '../../context/AuthContext';
import { getUserData } from '../../api/userApi';

const Home: React.FC = () => {
	const { logout } = useAuth();
	const [userData, setUserData] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);

	const logoutHandler = () => {
		logout();
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

				alert(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
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
		</>
	);
};

export default Home;
