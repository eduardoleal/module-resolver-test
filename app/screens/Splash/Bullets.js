import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SCREEN_WIDTH } from '$helpers/constants';

const styles = StyleSheet.create({
  bulletsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 40,
    width: SCREEN_WIDTH,
    height: 8,
    backgroundColor: 'transparent',
  },
  bullet: {
    width: 8,
    height: 8,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },
});

class Bullets extends Component {
  constructor(props) {
    super(props);

    this.state = { current: this.props.current, bullets: this.props.data };
  }

  updateCurrentBullet(value) {
    this.setState({ current: value });
  }

  renderBullet(index) {
    const op = (index === this.state.current) ? 1 : 0.3;

    return (
      <View key={`bullet${index}`} style={[styles.bullet, { opacity: op }]} />
    );
  }

  render() {
    return (
      <View style={styles.bulletsContainer}>
        {this.state.bullets.map((item, index) => this.renderBullet(index))}
      </View>
    );
  }
}

export default Bullets;
