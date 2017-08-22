import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { PhotosDisplay } from "./PhotosDisplay";
import { Button } from "./Button";

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
      ],
      timeFilter: "DESC"
    };
  }

  handleTimeFilter = () => {
    const order = this.state.timeFilter;
    photos.sort(function(a, b) {
      if (a.createdTime > b.createdTime) {
        if (order === "DESC") {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (order === "DESC") {
          return 1;
        } else {
          return -1;
        }
      }
    });
    this.setState({
      displayedPhotos: [
        photos[0],
        photos[1],
        photos[2],
        photos[3],
        photos[4],
        photos[5]
      ],
      timeFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };

  render() {
    let { displayedPhotos, handleTimeFilter, timeFilter } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Button handler={this.handleTimeFilter} sortBy={timeFilter} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <PhotosDisplay currentPhotos={displayedPhotos} />
      </div>
    );
  }
}

export default App;
