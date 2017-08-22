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

// PAGINATION = = =
// new Array(this.state.itemsPerPage).map((el, i) => {
//   return [
//     this.photos[this.state.currentPage * this.state.itemsPerPage + (i + 1)]
//   ];
// });

class App extends Component {
  constructor() {
    super();

    this.state = {
      photos: photos,
      displayedPhotos: [
        photos[0],
        photos[1],
        photos[2],
        photos[3],
        photos[4],
        photos[5]
      ],
      currentPage: 1,
      itemsPerPage: 6,
      timeFilter: "DESC",
      usernameFilter: "DESC",
      likesFilter: "DESC",
      commentsFilter: "DESC"
    };
  }

  handleTimeFilter = () => {
    const order = this.state.timeFilter;
    this.state.displayedPhotos = this.state.photos.sort(function(a, b) {
      if (a.createdTime > b.createdTime) {
        return order === "DESC" ? -1 : 1;
      } else {
        return order === "DESC" ? 1 : -1;
      }
    });
    this.setState({
      displayedPhotos: [
        this.state.displayedPhotos[0],
        this.state.displayedPhotos[1],
        this.state.displayedPhotos[2],
        this.state.displayedPhotos[3],
        this.state.displayedPhotos[4],
        this.state.displayedPhotos[5]
      ],
      timeFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  handleUserNameSort = () => {
    const order = this.state.usernameFilter;
    this.state.displayedPhotos = this.state.photos.sort(function(a, b) {
      if (a.user > b.user) {
        return order === "DESC" ? -1 : 1;
      } else {
        return order === "DESC" ? 1 : -1;
      }
    });
    this.setState({
      displayedPhotos: [
        this.state.displayedPhotos[0],
        this.state.displayedPhotos[1],
        this.state.displayedPhotos[2],
        this.state.displayedPhotos[3],
        this.state.displayedPhotos[4],
        this.state.displayedPhotos[5]
      ],
      usernameFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  commentsSort = () => {
    const order = this.state.commentsFilter;
    this.state.displayedPhotos = this.state.photos.sort(function(a, b) {
      if (a.numberOfComments > b.numberOfComments) {
        return order === "DESC" ? -1 : 1;
      } else {
        return order === "DESC" ? 1 : -1;
      }
    });
    this.setState({
      displayedPhotos: [
        this.state.displayedPhotos[0],
        this.state.displayedPhotos[1],
        this.state.displayedPhotos[2],
        this.state.displayedPhotos[3],
        this.state.displayedPhotos[4],
        this.state.displayedPhotos[5]
      ],
      commentsFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  likesSort = () => {
    const order = this.state.likesFilter;
    this.state.displayedPhotos = this.state.photos.sort(function(a, b) {
      if (a.likes > b.likes) {
        return order === "DESC" ? -1 : 1;
      } else {
        return order === "DESC" ? 1 : -1;
      }
    });
    this.setState({
      displayedPhotos: [
        this.state.displayedPhotos[0],
        this.state.displayedPhotos[1],
        this.state.displayedPhotos[2],
        this.state.displayedPhotos[3],
        this.state.displayedPhotos[4],
        this.state.displayedPhotos[5]
      ],
      likesFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  handleInstagramFilter = e => {
    this.state.displayedPhotos = this.state.photos.filter(photo => {
      return photo.filter === e.target.value;
    });
    this.setState({
      displayedPhotos: [
        this.state.displayedPhotos[0] || {},
        this.state.displayedPhotos[1] || {},
        this.state.displayedPhotos[2] || {},
        this.state.displayedPhotos[3] || {},
        this.state.displayedPhotos[4] || {},
        this.state.displayedPhotos[5] || {}
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
