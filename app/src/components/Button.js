import React, { Component } from "react";

class Button extends Component {
  render() {
    const { sortBy, handler } = this.props;

    return (
      <button onClick={handler} className="btn btn-default">
        Sort By {sortBy}
      </button>
    );
  }
}

export { Button };
