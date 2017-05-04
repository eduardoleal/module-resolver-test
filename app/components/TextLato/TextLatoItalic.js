import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const TextLatoItalic = ({ children }) => (
  <Text style={{ fontFamily: 'LatoItalic' }}>
    {children}
  </Text>
);

TextLatoItalic.propTypes = {
  children: PropTypes.node,
};

TextLatoItalic.defaultProps = {
  children: '',
};

export default TextLatoItalic;
