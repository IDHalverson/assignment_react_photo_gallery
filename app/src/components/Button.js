import React, { Component } from "react";

class Button extends Component {
  render() {
    const { sortBy, handler, type } = this.props;

    return (
      <button onClick={handler} className="btn btn-default">
        Sort {type} By {sortBy}
      </button>
    );
  }
}

export { Button };
