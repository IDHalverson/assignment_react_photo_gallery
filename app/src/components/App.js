import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { PhotosDisplay } from "./PhotosDisplay";
import { InstagramFilter } from "./InstagramFilter";
import { MakePages } from "./MakePages";
import { Button } from "./Button";

const photos = require("../photos").data.map(post => {
  return {
    image: post.images.standard_resolution.url,
    user: post.user.username,
    caption: post.caption ? post.caption.text : "",
    likes: post.likes ? post.likes.count : "",
    createdTime: Number(post.created_time),
    filter: post.filter,
    numberOfComments: post.comments.count,
    linkToPage: post.link
  };
});
var sortedPhotos = photos;

const filters = [
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

    const numberOfPages = Array.apply("P", Array(photos.length / 6));

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
      currentPage: 0,
      itemsPerPage: 6,
      timeFilter: "DESC",
      usernameFilter: "DESC",
      likesFilter: "DESC",
      commentsFilter: "DESC",
      numberOfPages: numberOfPages
    };
  }

  paginate = photos => {
    const displayedPhotos = sortedPhotos;
    const currentPage = this.state.currentPage;
    const itemsPerPage = this.state.itemsPerPage;
    const arrayLength = Array.apply("1", Array(this.state.itemsPerPage));
    const paginatedPhotos = [];
    this.setState({ currentPage: 0 });
    arrayLength.forEach((el, i) => {
      paginatedPhotos.push(
        displayedPhotos[itemsPerPage * currentPage + i] || {}
      );
    });
    this.setState({
      numberOfPages: Array.apply(
        "P",
        Array(displayedPhotos.length / this.state.itemsPerPage)
      )
    });
    return paginatedPhotos;
  };
  ChangePage = e => {
    let newPage;
    if (e.target.value === "back" || e.target.value === "forward") {
      if (e.target.value === "back" && this.state.currentPage > 0) {
        newPage = this.state.currentPage - 1;
      } else {
        if (this.state.currentPage < this.state.numberOfPages.length - 1) {
          newPage = this.state.currentPage + 1;
        }
      }
    } else {
      newPage = e.target.value - 1;
    }
    this.setState({
      currentPage: newPage,
      displayedPhotos: this.paginate(this.state.displayedPhotos)
    });
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
    sortedPhotos = this.state.photos.sort(function(a, b) {
      if (a.user > b.user) {
        return order === "DESC" ? -1 : 1;
      } else {
        return order === "DESC" ? 1 : -1;
      }
    });
    this.setState({
      displayedPhotos: this.paginate(sortedPhotos),
      usernameFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  commentsSort = () => {
    const order = this.state.commentsFilter;
    sortedPhotos = this.state.photos.sort(function(a, b) {
      if (a.numberOfComments > b.numberOfComments) {
        return order === "DESC" ? -1 : 1;
      } else {
        return order === "DESC" ? 1 : -1;
      }
    });
    this.setState({
      displayedPhotos: this.paginate(sortedPhotos),
      commentsFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  likesSort = () => {
    const order = this.state.likesFilter;
    sortedPhotos = this.state.photos.sort(function(a, b) {
      if (a.likes > b.likes) {
        return order === "DESC" ? -1 : 1;
      } else {
        return order === "DESC" ? 1 : -1;
      }
    });
    this.setState({
      displayedPhotos: this.paginate(sortedPhotos),
      likesFilter: order === "DESC" ? "ASC" : "DESC"
    });
  };
  handleInstagramFilter = e => {
    if (e.target.value === "None") {
      this.setState({
        displayedPhotos: this.paginate(this.state.displayedPhotos)
      });
    } else {
      sortedPhotos = this.state.photos.filter(photo => {
        return photo.filter === e.target.value;
      });
      this.setState({
        displayedPhotos: this.paginate(sortedPhotos)
      });
    }
  };
  render() {
    const {
      displayedPhotos,
      timeFilter,
      usernameFilter,
      commentsFilter,
      likesFilter,
      numberOfPages
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
        <MakePages pageArray={numberOfPages} handler={this.ChangePage} />
      </div>
    );
  }
}

export default App;
