import React, { Component } from 'react';
import './App.css';

const DEFAULT_WEIGHT = 310;
const DEFAULT_WEIGHT_MAP = {
  45: true,
  25: true,
  10: true,
  5: true,
  2.5: true,
};
const LAST_INPUT_WEIGHT = 'lastInputWeight';
const LAST_WEIGHT_MAP = 'lastWeightMap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weights: [45, 25, 10, 5, 2.5],
      weightMap: JSON.parse(localStorage.getItem(LAST_WEIGHT_MAP)) || DEFAULT_WEIGHT_MAP,
      barbellWeight: 45,
      inputWeight: localStorage.getItem(LAST_INPUT_WEIGHT) || DEFAULT_WEIGHT,
      calculatedWeights: [],
      leftoverWeight: 0,
    };
  }

  componentDidMount() {
    this.calculateWeights();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Barbell Weight Calculator</h1>
        </header>
        <div className="content">
          <div className="enter-weight">
            <p>Enter target weight (lbs):</p>
            <form onSubmit={e => this.onCalculateClick(e)}>
              <input className="input-weight" type="number" value={this.state.inputWeight} onChange={e => this.setWeight(e)} />
              <button type="submit">Calculate!</button>
            </form>
            <div>
              <p>Available plates:</p>
              <ul className="available-weights">
                {this.renderWeightCheckbox(45)}
                {this.renderWeightCheckbox(25)}
                {this.renderWeightCheckbox(10)}
                {this.renderWeightCheckbox(5)}
                {this.renderWeightCheckbox(2.5)}
              </ul>
            </div>
          </div>
          <div className="weight-results">
            {this.renderWeights()}
          </div>
        </div>
      </div>
    );
  }

  setWeight(event) {
    this.setState({
      inputWeight: event.target.value,
    });
  }

  onCalculateClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.calculateWeights();
  }

  calculateWeights() {
    const calculatedWeights = [];
    let oneSideWeights = (this.state.inputWeight - this.state.barbellWeight) / 2;

    this.state.weights.forEach((weight) => {
      if (this.state.weightMap[weight]) {
        let count = 0;
        while (oneSideWeights - weight >= 0) {
          oneSideWeights -= weight;
          count++;
        }
        if (count) {
          calculatedWeights.push({
            weight,
            count,
          });
        }
      }
    });

    this.setState({
      calculatedWeights,
      leftoverWeight: oneSideWeights * 2,
    });

    localStorage.setItem(LAST_INPUT_WEIGHT, this.state.inputWeight);
  }

  toggleWeightCheckbox(weight) {
    const weightMap = {
      ...this.state.weightMap,
      [weight]: !this.state.weightMap[weight],
    };
    this.setState({...this.state, weightMap}, () => {
      localStorage.setItem(LAST_WEIGHT_MAP, JSON.stringify(this.state.weightMap));
      this.calculateWeights();
    });
  }

  renderWeightCheckbox(weight) {
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={this.state.weightMap[weight]}
            onChange={() => this.toggleWeightCheckbox(weight)}
          /> {weight}
        </label>
      </li>
    );
  }

  renderWeights() {
    if (this.state.calculatedWeights.length === 0) {
      return (
        <div className="notice">
          Notice: Unable to make a barbell with the targeted weight.
        </div>
      );
    }

    let weightElements = [];
    this.state.calculatedWeights.forEach((weightObj) => {
      weightElements.push(<div key={weightObj.weight}>{weightObj.count} x {weightObj.weight} lbs</div>);
    });

    let leftoverWeightElement = null;
    if (this.state.leftoverWeight) {
      leftoverWeightElement = (
        <div className="notice">
          Notice: Unable to find weights to add {this.state.leftoverWeight} lbs to the barbell.
        </div>
      );
    }

    return (
      <div>
        {leftoverWeightElement}
        <p>Weights to add to each side of the barbell:</p>
        {weightElements}
      </div>
    );
  }
}

export default App;
