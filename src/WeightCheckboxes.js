import React, { Component } from 'react';
import './WeightCheckboxes.css';

class WeightCheckboxes extends Component {
  render() {
    if (!this.props.weightArray) {
      return null;
    }

    const weightCheckboxes = [];
    this.props.weightArray.forEach((weight) => {
      weightCheckboxes.push(
        <li key={weight}>
          <label>
            <input
              className="weight-checkbox"
              type="checkbox"
              checked={this.props.weightMap[weight]}
              onChange={() => this.props.onChange(weight)}
            /> {weight}
          </label>
        </li>
      );
    });
    return weightCheckboxes;
  }
}

export default WeightCheckboxes;
