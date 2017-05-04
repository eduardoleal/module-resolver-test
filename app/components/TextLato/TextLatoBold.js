import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const TextLatoBold = ({ children, style }) => (
  <Text style={[{ fontFamily: 'LatoBold' }, style]}>
    {children}
  </Text>
);

TextLatoBold.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape({}),
};

TextLatoBold.defaultProps = {
  children: '',
  style: {},
};

export default TextLatoBold;
