import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { PhotosDisplay } from "./PhotosDisplay";
import { InstagramFilter } from "./InstagramFilter";
import { Button } from "./Button";

const photos = require("../photos").data.map(post => {
  return {
    image: post.images.standard_resolution.url,
    user: post.user.username,
    caption: post.caption ? post.caption.text : "",
    likes: post.likes ? post.likes.count : "",
    createdTime: Number(post.created_time),
    filter: post.filter,
    numberOfComments: post.comments.count
  };
});

var filters = [
  "None",
  "Normal",
  "Lark",
  "Reyes",
  "Valencia",
  "Inkwell",
  "Ludwig"
];

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
      timeFilter: "DESC",
      usernameFilter: "DESC",
      likesFilter: "DESC",
      commentsFilter: "DESC"
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
  handleUserNameSort = () => {
    const order = this.state.usernameFilter;
    photos.sort(function(a, b) {
      if (a.user > b.user) {
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
      usernameFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  commentsSort = () => {
    const order = this.state.commentsFilter;
    photos.sort(function(a, b) {
      if (a.numberOfComments > b.numberOfComments) {
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
      commentsFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  likesSort = () => {
    const order = this.state.likesFilter;
    photos.sort(function(a, b) {
      if (a.likes > b.likes) {
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
      likesFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  handleInstagramFilter = e => {
    const filteredphotos = photos.filter(photo => {
      return photo.filter === e.target.value;
    });
    this.setState({
      displayedPhotos: [
        filteredphotos[0] || {},
        filteredphotos[1] || {},
        filteredphotos[2] || {},
        filteredphotos[3] || {},
        filteredphotos[4] || {},
        filteredphotos[5] || {}
      ]
    });
  };
  render() {
    const {
      displayedPhotos,
      handleTimeFilter,
      timeFilter,
      usernameFilter,
      commentsFilter,
      likesFilter
    } = this.state;

    return (
      <div className="App">
        <Button
          handler={this.handleTimeFilter}
          sortBy={timeFilter}
          type={"Time"}
        />
        <Button
          handler={this.handleUserNameSort}
          sortBy={usernameFilter}
          type={"User Name"}
        />
        <Button handler={this.likesSort} sortBy={likesFilter} type={"Likes"} />
        <Button
          handler={this.commentsSort}
          sortBy={commentsFilter}
          type={"Number of Comments"}
        />
        <InstagramFilter
          options={filters}
          handler={this.handleInstagramFilter}
        />
        <PhotosDisplay currentPhotos={displayedPhotos} />
      </div>
    );
  }
}

export default App;
