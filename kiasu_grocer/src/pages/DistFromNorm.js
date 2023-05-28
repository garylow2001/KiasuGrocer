import React from "react";
import { CalculatePairDouble } from "./OutputDoubles";

class DistanceFromNormal extends React.Component {
  state = {
    input1: 0,
    input2: 0,
    output: 0,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: Number(value) });
  };

  handleCalculate = () => {
    const { input1, input2 } = this.state;
    const output = CalculatePairDouble(input1, input2);
    this.setState({ output });
  };

  render() {
    const { input1, input2, output } = this.state;

    return (
      <div>
        <h1>Distance From Normal</h1>
        <label>
          Input 1:
          <input type="number" name="input1" value={input1} onChange={this.handleInputChange} />
        </label>
        <label>
          Input 2:
          <input type="number" name="input2" value={input2} onChange={this.handleInputChange} />
        </label>
        <button onClick={this.handleCalculate}>Calculate</button>
        <div>Output: {output}</div>
      </div>
    );
  }
}

export default DistanceFromNormal;

