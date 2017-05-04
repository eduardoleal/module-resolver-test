import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '$helpers/constants';
import { createTimingAnimation } from '$helpers/AnimationHelpers';
import { LuaLogo } from './assets';


const styles = StyleSheet.create({
  logoLua: {
    position: 'absolute',
    width: 54,
    height: 54,
    backgroundColor: 'transparent',
    opacity: 1,
  },
});

class Intro extends Component {
  constructor(props) {
    super(props);

    this.logoPosition = new Animated.ValueXY({
      x: (SCREEN_WIDTH * 0.5) - 27,
      y: (SCREEN_HEIGHT * 1.5),
    });
    this.opacityValue = new Animated.Value(0);
    this.state = {};
  }

  componentDidMount() {
    Animated.parallel([
      createTimingAnimation(this.logoPosition, {
        x: (SCREEN_WIDTH * 0.5) - 27,
        y: (SCREEN_HEIGHT * 0.5) - 27 }, 2000,
        Easing.out(Easing.cubic)),
      createTimingAnimation(this.opacityValue, 1, 1000, Easing.inOut(Easing.quad)),
    ]).start(() => { this.animateOut(); });
  }

  animateOut() {
    createTimingAnimation(
      this.opacityValue, 0, 500,
      Easing.inOut(Easing.quad)).start(() => { this.props.onLogoAnimationComplete(); });
  }

  render() {
    return (
      <Animated.Image
        source={LuaLogo}
        style={[styles.logoLua, this.logoPosition.getLayout(), { opacity: this.opacityValue }]}
      />
    );
  }
}

export default Intro;
