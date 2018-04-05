import React, { Component } from 'react';
import './WeightResults.css';

export const NO_WEIGHT_MESSAGE = 'Notice: Unable to make a barbell with the targeted weight.';
export const LEFTOVER_WEIGHT_MESSAGE = 'Notice: No plates available to add {leftoverWeight} lbs to the barbell.';
export const ADD_WEIGHT_MESSAGE = 'Add these weights to each side of the barbell to get {calculatedWeight} lbs:'

class WeightResults extends Component {
  render() {
     if (this.props.calculatedWeights.length === 0) {
      return (
        <div className="notice">
          {NO_WEIGHT_MESSAGE}
        </div>
      );
    }

    let weightElements = [];
    this.props.calculatedWeights.forEach((weightObj) => {
      weightElements.push(<div key={weightObj.weight}>{weightObj.count} x {weightObj.weight} lbs</div>);
    });

    let leftoverWeightElement = null;
    if (this.props.leftoverWeight) {
      leftoverWeightElement = (
        <div className="notice">
          {LEFTOVER_WEIGHT_MESSAGE.replace('{leftoverWeight}', this.props.leftoverWeight)}
        </div>
      );
    }

    return (
      <div className="weight-results">
        {leftoverWeightElement}
        <p>{ADD_WEIGHT_MESSAGE.replace('{calculatedWeight}', this.props.calculatedWeight)}</p>
        {weightElements}
      </div>
    );
  }
}

export default WeightResults;
