import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Splash from '$screens/Splash';
import SignUpNavigator from './SignUpNavigator';
import LoginNavigator from './LoginNavigator';


export const RootNavigator = StackNavigator({
  Splash: {
    screen: Splash,
    path: 'splash',
  },
  SignUp: {
    screen: SignUpNavigator,
    path: 'signUp',
  },
  Login: {
    screen: LoginNavigator,
    path: 'login',
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});

const RootNavigatorWithNavigationState = ({ dispatch, nav }) => (
  <RootNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
    })}
  />
);

RootNavigatorWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps)(RootNavigatorWithNavigationState);
