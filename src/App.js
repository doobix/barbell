import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableWeights: [45, 25, 10, 5, 2.5],
      barbellWeight: 45,
      inputWeight: 135,
      calculatedWeights: [],
      leftoverWeight: 0,
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Barbell Weight Calculator</h1>
        </header>
        <div className="content">
          <form onSubmit={e => this.calculateWeights(e)}>
            <input type="number" value={this.state.inputWeight} onChange={e => this.setWeight(e)} />
            <button type="submit">Calculate!</button>
          </form>
          {this.renderWeights()}
        </div>
      </div>
    );
  }

  setWeight(e) {
    this.setState({
      inputWeight: e.target.value,
    });
  }

  calculateWeights(event) {
    event.preventDefault();
    event.stopPropagation();

    const calculatedWeights = [];
    let oneSideWeights = (this.state.inputWeight - this.state.barbellWeight) / 2;

    this.state.availableWeights.forEach((weight) => {
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
    });

    this.setState({
      calculatedWeights,
      leftoverWeight: oneSideWeights * 2,
    });
  }

  renderWeights() {
    if (this.state.calculatedWeights.length === 0) {
      return null;
    }

    let weightElements = [];
    this.state.calculatedWeights.forEach((weightObj) => {
      weightElements.push(<div key={weightObj.weight}>{weightObj.count} x {weightObj.weight} lbs</div>);
    });

    let leftoverWeightElement = null;
    if (this.state.leftoverWeight) {
      leftoverWeightElement = (<div>Notice: Unable to find weights to add {this.state.leftoverWeight} lbs to the barbell.</div>);
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
