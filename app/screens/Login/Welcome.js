import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextLatoItalic } from '$components/TextLato';
import { colorStyles } from '$config';

const styles = StyleSheet.create({
  sloganWrapper: {
    flex: 1,
    alignSelf: 'center',
  },
});

const Welcome = () => (
  <View style={styles.sloganWrapper}>
    <TextLatoItalic>
      <Text style={colorStyles.dustyGray}>
        Welcome
      </Text>
    </TextLatoItalic>
  </View>
);

export default Welcome;
