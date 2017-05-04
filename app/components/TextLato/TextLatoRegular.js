import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const TextLatoRegular = ({ children }) => (
  <Text style={{ fontFamily: 'LatoRegular' }}>
    {children}
  </Text>
);

TextLatoRegular.propTypes = {
  children: PropTypes.node,
};

TextLatoRegular.defaultProps = {
  children: '',
};

export default TextLatoRegular;
