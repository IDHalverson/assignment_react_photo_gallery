import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { PhotosDisplay } from "./PhotosDisplay";

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
console.log(photos);

class App extends Component {
  constructor() {
    super();

    this.state = {
      displayedPhotos: [
        photos[0],
        photos[1],
        photos[2],
        photos[3],
        photos[4],
        photos[5]
      ]
    };
  }
  TimeFilter(e) {}
  render() {
    let { displayedPhotos } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <button onClick={TimeFilter}> Descending </button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <PhotosDisplay currentPhotos={displayedPhotos} />
      </div>
    );
  }
}

export default App;
