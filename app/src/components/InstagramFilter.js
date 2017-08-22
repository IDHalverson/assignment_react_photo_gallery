import React, { Component } from "react";
var filters = [
  "None",
  "Normal",
  "Lark",
  "Reyes",
  "Valencia",
  "Inkwell",
  "Ludwig"
];
class InstagramFilter extends Component {
  render() {
    let { handler } = this.props;
    return (
      <div className="container">
        <select onChange={handler}>
          {filters.map(el => {
            return (
              <option value={el}>
                {" "}{el}{" "}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export { InstagramFilter };
