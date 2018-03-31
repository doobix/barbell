import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import WeightCheckboxes from './WeightCheckboxes';

const WEIGHT_ARRAY = [45, 25, 10];
const WEIGHT_MAP = {
  45: true,
  25: false,
  10: true,
};

const defaultPropsGenerator = (overrides) => ({
  onChange: jest.fn(),
  weightArray: WEIGHT_ARRAY,
  weightMap: WEIGHT_MAP,
  ...overrides,
});

const setupMount = (props) => {
  props = defaultPropsGenerator(props);
  return mount(
    <WeightCheckboxes {...props} />
  );
}

describe('WeightCheckboxes', () => {
  it('renders correctly', () => {
    const wrapper = setupMount();
    const checkboxes = wrapper.find('input');
    expect(checkboxes).toHaveLength(3);
    expect(checkboxes.get(0).props).toHaveProperty('checked', true);
    expect(checkboxes.get(1).props).toHaveProperty('checked', false);
    expect(checkboxes.get(2).props).toHaveProperty('checked', true);
  });

  it('triggers onChange when changing checkbox', () => {
    const mockOnChange = jest.fn();
    const wrapper = setupMount({
      onChange: mockOnChange,
    });
    expect(mockOnChange).not.toHaveBeenCalled();
    wrapper.find('input').first().simulate('change', { target: { checked: false } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
