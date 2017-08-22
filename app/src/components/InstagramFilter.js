import React, { Component } from "react";

class InstagramFilter extends Component {
  render() {
    const { handler, options } = this.props;
    return (
      <div className="container">
        <select onChange={handler}>
          {options.map(el => {
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
