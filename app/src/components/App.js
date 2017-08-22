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
var sortedPhotos = photos;
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
      photos: photos,
      displayedPhotos: [],
      currentPage: 0,
      itemsPerPage: 6,
      timeFilter: "DESC",
      usernameFilter: "DESC",
      likesFilter: "DESC",
      commentsFilter: "DESC"
    };
    this.state.displayedPhotos = this.paginate(this.state.photos);
  }

  paginate = photos => {
    const displayedPhotos = sortedPhotos;
    const currentPage = this.state.currentPage;
    const itemsPerPage = this.state.itemsPerPage;
    const arrayLength = Array.apply("1", Array(this.state.itemsPerPage));
    const paginatedPhotos = [];
    arrayLength.forEach((el, i) => {
      paginatedPhotos.push(
        displayedPhotos[itemsPerPage * currentPage + i] || {}
      );
    });
    return paginatedPhotos;
  };

  handleTimeFilter = () => {
    const order = this.state.timeFilter;
    sortedPhotos = this.state.photos.sort(function(a, b) {
      if (a.createdTime > b.createdTime) {
        return order === "DESC" ? -1 : 1;
      } else {
        return order === "DESC" ? 1 : -1;
      }
    });
    this.setState({
      displayedPhotos: this.paginate(sortedPhotos),
      timeFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  handleUserNameSort = () => {
    const order = this.state.usernameFilter;
    const paginatedPhotos = this.paginate(this.state.displayedPhotos);
    this.setState({
      displayedPhotos: paginatedPhotos.sort(function(a, b) {
        if (a.user > b.user) {
          return order === "DESC" ? -1 : 1;
        } else {
          return order === "DESC" ? 1 : -1;
        }
      }),
      usernameFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  commentsSort = () => {
    const order = this.state.commentsFilter;
    const paginatedPhotos = this.paginate(this.state.displayedPhotos);
    this.setState({
      displayedPhotos: paginatedPhotos.sort(function(a, b) {
        if (a.numberOfComments > b.numberOfComments) {
          return order === "DESC" ? -1 : 1;
        } else {
          return order === "DESC" ? 1 : -1;
        }
      }),
      commentsFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  likesSort = () => {
    const order = this.state.likesFilter;
    const paginatedPhotos = this.paginate(this.state.displayedPhotos);
    this.setState({
      displayedPhotos: this.state.photos.sort(function(a, b) {
        if (a.likes > b.likes) {
          return order === "DESC" ? -1 : 1;
        } else {
          return order === "DESC" ? 1 : -1;
        }
      }),
      likesFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  handleInstagramFilter = e => {
    const paginatedPhotos = this.paginate(this.state.displayedPhotos);
    //const displayedPhotos = this.state.displayedPhotos;
    if (e.target.value === "None") {
      this.setState({
        displayedPhotos: paginatedPhotos
      });
    } else {
      this.setState({
        displayedPhotos: paginatedPhotos.filter(photo => {
          return photo.filter === e.target.value;
        })
      });
    }
  };
  render() {
    const {
      displayedPhotos,
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
