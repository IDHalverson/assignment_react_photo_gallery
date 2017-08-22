import React, { Component } from "react";

class PhotosDisplay extends Component {
  render() {
    return (
      <div className="container">
        {this.props.currentPhotos.map(el => {
          if (!Object.keys(el).length) {
            return "";
          }
          return (
            <div key={el.image}>
              <img src={el.image} key={el.image} alt="logo" />
              <h6>
                Posted By: {el.user}
              </h6>
              <h6>
                Created At: {el.createdTime}
              </h6>
              <h6>
                Likes: {el.likes}
              </h6>
              <h6>
                Comments: {el.numberOfComments}
              </h6>
            </div>
          );
        })}
      </div>
    );
  }
}

export { PhotosDisplay };
