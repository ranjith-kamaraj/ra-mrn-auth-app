import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const authCtx = useContext(AuthContext);

	async function signupHandler({ email, password }) {
		setIsAuthenticated(true);
		try {
			const token = await createUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert('Authentication failed', 'Could not create the user, please check your input and try again later.')
			setIsAuthenticated(false);
		}
	};

	if (isAuthenticated) {
		return <LoadingOverlay message="Creating User...." />
	}


	return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
