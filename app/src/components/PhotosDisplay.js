import React, { Component } from "react";

class PhotosDisplay extends Component {
  render() {
    return (
      <div className="container">
        {this.props.currentPhotos.map(el => {
          console.log(el.user);
          return (
            <div>
              <img src={el.image} key={el.image} alt="logo" />
              <h6>
                {el.createdTime}
              </h6>
            </div>
          );
        })}
      </div>
    );
  }
}

export { PhotosDisplay };
