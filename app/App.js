import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { cacheFontsAsync } from '$helpers/CacheHelpers';
import { registerForPushNotificationsAsync } from '$helpers/PushNotificationHelpers';
import { STATUS_BAR_HEIGHT, SCHEMA_PREFIX } from '$helpers/constants';
import createStore from '$helpers/createStore';
import { RootNavigator } from '$navigators';
import * as LatoFonts from '$fonts/Lato';

const store = createStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentWillMount() {
    if (cacheFontsAsync(LatoFonts)) {
      this.setState({ isReady: true });
    }

    registerForPushNotificationsAsync();
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <RootNavigator
          // paddingTop to avoid statusBar overlap
          style={{ paddingTop: STATUS_BAR_HEIGHT }}
          uriPrefix={SCHEMA_PREFIX}
        />
      </Provider>
    );
  }
}

export default App;
