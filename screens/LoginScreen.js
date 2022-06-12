import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../utils/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';


function LoginScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authCtx = useContext(AuthContext);

	async function loginHandler({ email, password }) {
		setIsAuthenticated(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed', 'Please check your credentials or try again later');
      setIsAuthenticated(false);
    }
	};

	if (isAuthenticated) {
		return <LoadingOverlay message="Logging you in...." />
	}


  return <AuthContent isLogin onAuthenticate={loginHandler}  />;
}

export default LoginScreen;
