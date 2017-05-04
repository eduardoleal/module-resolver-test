import React, { Component } from 'react';
import { ScrollView, Text, Button, StatusBar } from 'react-native';

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <Text>HOMEEEE</Text>
        <Button
          onPress={() => this.props.navigation.navigate('ContextualFAQ')}
          title="Show ContextualFAQ"
        />
        <Button
          onPress={() => this.props.navigation.navigate('SignUp')}
          title="Show SignUp Tabs"
        />
      </ScrollView>
    );
  }
}

export default Home;
