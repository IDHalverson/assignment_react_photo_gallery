import React, { Component } from "react";

class MakePages extends Component {
  render() {
    const { pageArray, handler } = this.props;
    return (
      <div className="container">
        <button value={"back"} onClick={handler}>
          Go back{" "}
        </button>
        {pageArray.map((el, i) => {
          return (
            <button onClick={handler} key={i + 1} value={i + 1}>
              {" "}{i + 1}
            </button>
          );
        })}
        <button onClick={handler} value={"forward"}>
          Go forward{" "}
        </button>
      </div>
    );
  }
}

export { MakePages };
