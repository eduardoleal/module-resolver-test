import {
  Animated,
} from 'react-native';

function createSpringAnimation(baseValue, finalValue, timing, easing) {
  return Animated.timing(baseValue, {
    toValue: finalValue,
    duration: timing,
    easing,
  });
}

export default createSpringAnimation;
