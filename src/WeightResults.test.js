import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import WeightResults, { ADD_WEIGHT_MESSAGE, LEFTOVER_WEIGHT_MESSAGE, NO_WEIGHT_MESSAGE } from './WeightResults';

const CALCULATED_WEIGHTS = [{
  weight: 45,
  count: 1,
}, {
  weight: 10,
  count: 2,
}];
const CALCULATED_WEIGHT = 175;

const defaultPropsGenerator = (overrides) => ({
  calculatedWeight: CALCULATED_WEIGHT,
  calculatedWeights: CALCULATED_WEIGHTS,
  leftoverWeight: undefined,
  ...overrides,
});

const setupMount = (props) => {
  props = defaultPropsGenerator(props);
  return mount(
    <WeightResults {...props} />
  );
}

describe('WeightResults', () => {
  it('renders correctly', () => {
    const wrapper = setupMount();
    expect(wrapper.find('.notice')).toHaveLength(0);
    const weightResults = wrapper.find('.weight-results');
    expect(weightResults).toHaveLength(1);
    expect(weightResults.find('p').text()).toBe(ADD_WEIGHT_MESSAGE.replace('{calculatedWeight}', CALCULATED_WEIGHT));
    expect(weightResults.find('div').at(1).text()).toBe('1 x 45 lbs');
    expect(weightResults.find('div').at(2).text()).toBe('2 x 10 lbs');
  });

  it('renders leftover weight correctly', () => {
    const wrapper = setupMount({
      calculatedWeight: 52.5,
      calculatedWeights: [{
        weight: 2.5,
        count: 1,
      }],
      leftoverWeight: 2.5,
    });
    expect(wrapper.find('.weight-results')).toHaveLength(1);
    const notice = wrapper.find('.notice');
    expect(notice).toHaveLength(1);
    expect(notice.text()).toBe(LEFTOVER_WEIGHT_MESSAGE.replace('{leftoverWeight}', 2.5));
  });

  it('renders non-calculatable weight correctly', () => {
    const wrapper = setupMount({
      calculatedWeight: 30,
      calculatedWeights: [],
    });
    expect(wrapper.find('.weight-results')).toHaveLength(0);
    const notice = wrapper.find('.notice');
    expect(notice).toHaveLength(1);
    expect(notice.text()).toBe(NO_WEIGHT_MESSAGE);
  });
});
