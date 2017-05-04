import React, { Component } from 'react';
import { Video } from 'expo';
import {
  StyleSheet,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '$helpers/constants';

const styles = StyleSheet.create({
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

class Slide extends Component {
  constructor(props) {
    super(props);

    this.state = { mute: false, repeat: true, paused: false };
  }

  onVideoProgress(videoInfo) {
    if (this.state.paused === false) {
      const percenPlayed = (videoInfo.currentTime / this.videoDuration) * 100;
      if (percenPlayed > 90) this.props.onVideoComplete();
    }
  }

  resetVideo() {
    if (this.state.paused === true) {
      this.player.seek(0);
      this.setState({ paused: false });
    }
  }

  stopVideo() {
    this.player.seek(0);
    this.setState({ paused: true });
  }

  render() {
    return (
      <Video
        source={this.props.config.media}
        ref={(instance) => { this.player = instance; }}
        rate={1.0}
        volume={1.0}
        muted={this.state.mute}
        resizeMode="cover"
        repeat={this.state.repeat}
        paused={this.state.paused}
        onProgress={(info) => { this.onVideoProgress(info); }}
        onLoad={(info) => { this.videoDuration = info.duration; }}
        style={styles.slide}
      />
    );
  }
}

export default Slide;
