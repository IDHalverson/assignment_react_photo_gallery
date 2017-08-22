import React, { Component } from "react";

class PhotosDisplay extends Component {
  render() {
    return (
      <div className="container">
        {this.props.currentPhotos.map(el => {
          return (
            <div>
              <img src={el.image} key={el.image} alt="logo" />
              <h6>
                {el.user} :Made:
                {el.createdTime} space:
                {el.likes} likes
                {el.numberOfComments} comments
              </h6>
            </div>
          );
        })}
      </div>
    );
  }
}

export { PhotosDisplay };
