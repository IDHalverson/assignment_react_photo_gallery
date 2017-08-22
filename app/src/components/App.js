import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

const photos = require("../photos").data.map(post => {
  return {
    image: post.link,
    user: post.user.username,
    caption: post.caption ? post.caption.text : "",
    likes: post.likes ? post.likes.count : "",
    createdTime: Number(post.created_time)
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
