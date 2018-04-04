import React, { Component } from 'react';
import WeightCheckboxes from './WeightCheckboxes';
import WeightResults from './WeightResults';
import './App.css';

const DEFAULT_WEIGHT = 310;
const DEFAULT_WEIGHT_MAP = {
  55: false,
  45: true,
  35: false,
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
      weights: [55, 45, 35, 25, 10, 5, 2.5],
      weightMap: JSON.parse(localStorage.getItem(LAST_WEIGHT_MAP)) || DEFAULT_WEIGHT_MAP,
      barbellWeight: 45,
      inputWeight: localStorage.getItem(LAST_INPUT_WEIGHT) || DEFAULT_WEIGHT,
      calculatedWeights: [],
      calculatedWeight: 0,
      leftoverWeight: 0,
    };
  }

  componentDidMount() {
    this.calculateWeights();
  }

  render() {
    const firstHalfWeights = [...this.state.weights.slice(0, Math.ceil(this.state.weights.length / 2))];
    const secondHalfWeights = [...this.state.weights.slice(Math.ceil(this.state.weights.length / 2), this.state.weights.length)];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Barbell Weight Calculator</h1>
        </header>
        <div className="content">
          <div className="enter-weight">
            <div className="padding">
              <p>Enter target weight (lbs):</p>
              <form onSubmit={e => this.onCalculateClick(e)}>
                <input className="input-weight" type="number" pattern="\d*" value={this.state.inputWeight} onChange={e => this.setWeight(e)} />
                <button type="submit">Calculate!</button>
              </form>
            </div>

            <div className="padding">
              <p>Available plates:</p>
              <ul className="available-weights">
                <WeightCheckboxes
                  onChange={this.toggleWeightCheckbox.bind(this)}
                  weightArray={firstHalfWeights}
                  weightMap={this.state.weightMap}
                />
              </ul>
              <ul className="available-weights">
                <WeightCheckboxes
                  onChange={this.toggleWeightCheckbox.bind(this)}
                  weightArray={secondHalfWeights}
                  weightMap={this.state.weightMap}
                />
              </ul>
            </div>
          </div>
          <WeightResults
            calculatedWeights={this.state.calculatedWeights}
            calculatedWeight={this.state.calculatedWeight}
            leftoverWeight={this.state.leftoverWeight}
          />
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
      calculatedWeight: this.state.inputWeight - (oneSideWeights * 2),
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
}

export default App;
