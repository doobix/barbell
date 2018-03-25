import React, { Component } from 'react';
import './WeightResults.css';

class WeightResults extends Component {
  render() {
     if (this.props.calculatedWeights.length === 0) {
      return (
        <div className="notice">
          Notice: Unable to make a barbell with the targeted weight.
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
          Notice: No plates available to add {this.props.leftoverWeight} lbs to the barbell.
        </div>
      );
    }

    return (
      <div className="weight-results">
        {leftoverWeightElement}
        <p>Add these weights to each side of the barbell to get {this.props.calculatedWeight} lbs:</p>
        {weightElements}
      </div>
    );
  }
}

export default WeightResults;
