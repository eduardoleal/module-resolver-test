import { TabNavigator } from 'react-navigation';
import {
  Email,
  Name,
  Password,
  Document,
} from '$screens/SignUp';

const SignUpNavigator = TabNavigator({
  Email: {
    screen: Email,
  },
  Name: {
    screen: Name,
  },
  Password: {
    screen: Password,
  },
  Document: {
    screen: Document,
  },
}, {
  tabBar: {
    visible: false,
  },
  title: 'SignUp',
});

export default SignUpNavigator;
