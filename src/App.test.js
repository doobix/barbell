import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('WeightCheckboxes')).toHaveLength(2);
    expect(wrapper.find('WeightResults')).toHaveLength(1);
  });

  it('changing weight works correctly', () => {
    const expectedResults = 'Add these weights to each side of the barbell to get 200 lbs:';
    const wrapper = mount(<App />);
    wrapper.find('.input-weight').simulate('change', {
      target: { value: 200 },
    });
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.weight-results p').text()).toBe(expectedResults);
  });
});
