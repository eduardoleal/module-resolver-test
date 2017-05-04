import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const TextLatoLight = ({ children }) => (
  <Text style={{ fontFamily: 'LatoLight' }}>
    {children}
  </Text>
);

TextLatoLight.propTypes = {
  children: PropTypes.node,
};

TextLatoLight.defaultProps = {
  children: '',
};

export default TextLatoLight;
