import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };

  fetchComments() {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.selectedBookAsin, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYzMTFhMDcxYWZhZjAwMTkxNTY2ZWYiLCJpYXQiOjE3MTA0Mjg1NzYsImV4cCI6MTcxMTYzODE3Nn0.P9iro7jpWRHV5ciBePMfX4Cl20zYvs-Y5pGNs037EVI",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((comments) => {
        this.setState({ comments: comments, isLoading: false, isError: false });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        this.setState({ isLoading: false, isError: true });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedBookAsin !== this.props.selectedBookAsin) {
      this.setState({ isLoading: true });
      this.fetchComments();
    }
  }

  componentDidMount() {
    if (this.props.selectedBookAsin) {
      this.fetchComments();
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {this.props.selectedBookAsin && <AddComment asin={this.props.selectedBookAsin} />}
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
