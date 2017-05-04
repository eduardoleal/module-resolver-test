import { Asset } from 'expo';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '$helpers/constants';
import Intro from './Intro';
import Walkthrough from './Walkthrough';
import { Pica, VideoTest, Dog, LuaLogo } from './assets';


// SPLASH AND WALK STYLES
const styles = StyleSheet.create({
  splashContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#FFF',
  },
  // signUpButtonContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: SCREEN_WIDTH * 0.1,
  //   width: SCREEN_WIDTH * 0.8,
  //   height: 60,
  //   backgroundColor: '#EEFF00',
  // },
});

class Splash extends Component {

  constructor(props) {
    super(props);

    this.state = { playIntro: true, isReady: false };
  }

  componentWillMount() {
    this.cacheResourcesAsync();
  }

  onLogoAnimationComplete() {
    this.setState({ playIntro: false });
  }

  /* ------- PRELOAD ----------- */
  async cacheResourcesAsync() {
    const assetsToLoad = [
      Pica,
      VideoTest,
      Dog,
      LuaLogo,
    ];

    const loaded = [];

    assetsToLoad.map(item => loaded.push(Asset.fromModule(item).downloadAsync()));

    // for (const image of assetsToLoad) {
    //   await Asset.fromModule(image).downloadAsync();
    // }

    await Promise.all(loaded).then(() => {
      this.setState({ isReady: true });
    });
  }
  /* ------- PRELOAD ----------- */

  renderSplashScreen() {
    if (this.state.playIntro === true) {
      return (
        <Intro onLogoAnimationComplete={() => { this.onLogoAnimationComplete(); }} />
      );
    }
    return (
      <Walkthrough />
    );
  }

  render() {
    if (this.state.isReady === false) {
      return (
        <Text>Loading...</Text>
      );
    }

    return (
      <View style={styles.splashContainer}>

        {this.renderSplashScreen()}

        {/* <View style={[{ opacity: styles.signUpButtonContainer }]}>
          <Button
            onPress={() => this.props.navigation.navigate('Login')}
            title="Show SignUp Tabs"
            backgroundColor="#493C8E"
          />
        </View> */}
      </View>
    );
  }
}

// Splash.propTypes = {
//   navigation: PropTypes.number.isRequired,
// };

export default Splash;
