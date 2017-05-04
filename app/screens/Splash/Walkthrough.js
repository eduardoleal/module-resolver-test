import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  PanResponder,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '$helpers/constants';
import { TextLatoBold } from '$components/TextLato';
import { scale } from '$helpers/ScaleHelpers';
import { createTimingAnimation } from '$helpers/AnimationHelpers';
import Slide from './Slide';
import Bullets from './Bullets';
import { Pica, VideoTest, Dog } from './assets';

const DATA = [
  { title: 'Revenda sem precisar comprar', subtitle: 'SÓ TEM LUCRO, NÃO TEM GASTO', isVideo: true, media: VideoTest },
  { title: 'Entregue pessoalmente', subtitle: 'VOCÊ RECEBE OS PRODUTOS  E DISTRIBUI EM MÃOS', isVideo: true, media: VideoTest },
  { title: 'ou acompanhe a entrega direta', subtitle: 'A LUA FAZ A ENTREGA PARA SEUS CLIENTES', isVideo: true, media: VideoTest },
  /*{ title: 'Título 2', subtitle: 'Subtitulo 2', isVideo: false, media: Dog },
  { title: 'Título 2', subtitle: 'Subtitulo 2', isVideo: false, media: Pica },*/
];

const MAX_DATA_INDEX = DATA.length - 1;
const MAX_CONTAINER_X = -(MAX_DATA_INDEX) * SCREEN_WIDTH;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;
let currentSlide = 0;
let swipeAllowed = true;
let isSwiping = false;
let isChangingSlide = false;

const styles = StyleSheet.create({
  slideContainer: {
    top: 0,
    left: 0,
    width: SCREEN_WIDTH * DATA.length,
    height: SCREEN_HEIGHT,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  slide: {
    backgroundColor: '#FFFFFF',
  },
  image: {
    resizeMode: 'cover',
  },
  fullScreen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  title: {
    fontSize: scale(34),
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: scale(32),
  },
  subtitle: {
    fontSize: scale(12),
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: scale(12),
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: SCREEN_WIDTH * 0.82,
    alignSelf: 'center',
    marginTop: scale(60),
  },
});

class Walkthrough extends Component {

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY({ x: 0, y: 0 });
    this.opacityValue = new Animated.Value(0);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // position.setValue({ x: gesture.dx, y: 0 });
        isSwiping = true;
        this.updateDragPosition(gesture.dx);
      },
      onPanResponderRelease: (event, gesture) => this.releaseGestureHandler(gesture),
    });

    this.state = { panResponder, slides: DATA, isReady: true, position };
  }

  /* ------- LIFECYCLE ----------- */
  componentDidMount() {
    if (this.state.isReady === true) {
      this.stopAdjacentVideos(0);
      createTimingAnimation(this.opacityValue, 1, 500, Easing.inOut(Easing.cubic)).start();
    }
  }
  /* ------- LIFECYCLE ----------- */

  /* ------- ANIMATION AND SWIPE CONTROL ----------- */
  onSwipeAnimationComplete() {
    swipeAllowed = true;
    isSwiping = false;
    // isChangingSlide = false;
    this.interval = setTimeout(() => {
      isChangingSlide = false;
    }, 100);
    this.stopAdjacentVideos(currentSlide);
  }

  onVideoComplete() {
    if (isSwiping === false) {
      isSwiping = true;
      swipeAllowed = false;
      this.resetRelevantVideos();
      this.forceSwipe('left');
    }
  }

  releaseGestureHandler(gesture) {
    isSwiping = false;

    if (gesture.dx > SWIPE_THRESHOLD) {
      this.forceSwipe('right');
    } else if (gesture.dx < -SWIPE_THRESHOLD) {
      this.forceSwipe('left');
    } else {
      this.resetPosition();
    }
  }

  resetPosition() {
    const finalXPosition = -(SCREEN_WIDTH * currentSlide);

    Animated.spring(this.state.position, {
      toValue: { x: finalXPosition, y: 0 },
    }).start(() => this.onSwipeAnimationComplete());
  }

  updateDragPosition(newX, newY = 0) {
    if (swipeAllowed === true && isChangingSlide === false) {
      const currentX = -(SCREEN_WIDTH * currentSlide);
      let finalX;
      let resetVideosVideos = true;

      if (currentSlide === 0 && newX > 0) {
        finalX = 0;
        resetVideosVideos = false;
      } else if (currentSlide >= MAX_DATA_INDEX && (currentX + newX) < MAX_CONTAINER_X) {
        finalX = MAX_CONTAINER_X;
        resetVideosVideos = false;
      } else {
        finalX = currentX + newX;
      }

      // console.warn('aiushuaishuias', currentX, newX, MAX_CONTAINER_X);
      if (resetVideosVideos === true) this.resetRelevantVideos();
      else this.stopAdjacentVideos(currentSlide);
      this.state.position.setValue({ x: finalX, y: newY });
    }
  }

  resetRelevantVideos() {
    if (currentSlide === 0) {
      this.resetFirstVideo();
    } else if (currentSlide === MAX_DATA_INDEX) {
      this.resetLastVideo();
    } else {
      this.resetMiddleVideos();
    }
  }

  forceSwipe(direction) {
    if (isChangingSlide === false) {
      let newSlideIndex;

      if (direction === 'right' && currentSlide === 0) {
        newSlideIndex = 0;
      } else if (direction === 'left' && currentSlide >= MAX_DATA_INDEX) {
        newSlideIndex = DATA.length - 1;
      } else {
        newSlideIndex = (direction === 'right') ? newSlideIndex = currentSlide - 1 : newSlideIndex = currentSlide + 1;
      }

      if (currentSlide !== newSlideIndex) {
        currentSlide = newSlideIndex;
        swipeAllowed = false;
        isChangingSlide = true;
        this.bullets.updateCurrentBullet(newSlideIndex);

        Animated.timing(this.state.position, {
          toValue: { x: -(SCREEN_WIDTH * currentSlide), y: 0 },
          duration: 250,
        }).start(() => this.onSwipeAnimationComplete());
      }
    }
  }
  /* ------- ANIMATION AND SWIPE CONTROL ----------- */

  /* ------- VIDEO PLAYBACK CONTROL ----------- */
  resetFirstVideo() {
    this[`slide${0}`].resetVideo();
    this[`slide${1}`].resetVideo();
  }

  resetLastVideo() {
    this[`slide${MAX_DATA_INDEX}`].resetVideo();
    this[`slide${MAX_DATA_INDEX - 1}`].resetVideo();
  }

  resetMiddleVideos() {
    this[`slide${currentSlide}`].resetVideo();
    this[`slide${currentSlide + 1}`].resetVideo();
    this[`slide${currentSlide - 1}`].resetVideo();
  }

  stopAdjacentVideos(current) {
    DATA.map((item, index) => {
      if (index !== current) {
        this[`slide${index}`].stopVideo();
      }

      return index;
    });
  }
  /* ------- VIDEO PLAYBACK CONTROL ----------- */

  /* ------- RENDER ----------- */
  renderMediaByType(item, index) {
    if (item.isVideo === true) {
      return (
        <Slide
          ref={(slide) => { this[`slide${index}`] = slide; }}
          config={item}
          onVideoComplete={() => this.onVideoComplete()}
        />
      );
    }

    return (
      <Image
        style={[styles.fullScreen, styles.image]}
        source={item.media}
      />
    );
  }

  renderSlides(item, index) {
    return (
      <View
        key={index}
        style={[styles.fullScreen, styles.slide]}
      >
        {this.renderMediaByType(item, index)}
        <View
          style={styles.textContainer}
        >
          <TextLatoBold style={{ textAlign: 'center', paddingTop: scale(15) }}>
            <Text
              style={styles.title}
            >
              {item.title}
            </Text>
          </TextLatoBold>

          <TextLatoBold style={{ textAlign: 'center' }}>
            <Text
              style={styles.subtitle}
            >
              {item.subtitle}
            </Text>
          </TextLatoBold>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Animated.View
          style={[
            styles.slideContainer,
            this.state.position.getLayout(),
            { opacity: this.opacityValue },
          ]}
          {...this.state.panResponder.panHandlers}
        >
          {this.state.slides.map((item, index) => this.renderSlides(item, index))}
        </Animated.View>
        <Bullets
          ref={(instance) => { this.bullets = instance; }}
          current={currentSlide}
          data={DATA}
        />
      </View>
    );
  }
}
/* ------- RENDER ----------- */

export default Walkthrough;
