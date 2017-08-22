import React, { Component } from "react";
const photos = require("../photos").data.map(post => {
  return {
    image: post.images.standard_resolution.url,
    user: post.user.username,
    caption: post.caption ? post.caption.text : "",
    likes: post.likes ? post.likes.count : "",
    createdTime: Number(post.created_time),
    filter: post.filter,
    numberOfComments: post.comments.length
  };
});
class PhotosDisplay extends Component {
  render() {
    return (
      <div className="container">
        {this.props.currentPhotos.map(el => {
          console.log(el.user);
          return <img src={el.image} key={el.image} alt="logo" />;
        })}
      </div>
    );
  }
}

export { PhotosDisplay };
