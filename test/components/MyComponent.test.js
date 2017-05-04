import React, { Text } from 'react-native';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import MyComponent from '$components/MyComponent';


describe('<MyComponent />', () => {
  it('should render stuff', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.length).to.equal(1);
    expect(wrapper.contains(<Text>I wonder if there will be any problems...</Text>)).to.equal(true);
  });
});
