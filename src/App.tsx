import { AuthProvider } from './context/AuthContext';
import Routes from './routes';

const App = () => {
	return (
		<div className='App'>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</div>
	);
};

export default App;
