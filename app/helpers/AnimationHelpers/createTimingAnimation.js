import {
  Animated,
} from 'react-native';

function createTimingAnimation(baseValue, finalValue, timing, easing) {
  return Animated.timing(baseValue, {
    toValue: finalValue,
    duration: timing,
    easing,
  });
}

export default createTimingAnimation;
