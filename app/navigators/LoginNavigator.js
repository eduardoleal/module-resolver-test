import { TabNavigator } from 'react-navigation';
import {
  Welcome,
  SignIn,
} from '$screens/Login';

const LoginNavigator = TabNavigator({
  Welcome: {
    screen: Welcome,
    path: 'login/welcome',
  },
  SignIn: {
    screen: SignIn,
    path: 'login/signIn',
  },
}, {
  tabBar: {
    visible: false,
  },
  title: 'Login',
});

export default LoginNavigator;
