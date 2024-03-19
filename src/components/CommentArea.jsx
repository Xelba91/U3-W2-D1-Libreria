import { Component, useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = function (props) {
  // state = {
  //   comments: [],
  //   isLoading: true,
  //   isError: false,
  // };
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchComments = function () {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.selectedBookAsin, {
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
        // this.setState({ comments: comments, isLoading: false, isError: false });
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        // this.setState({ isLoading: false, isError: true });
        setIsLoading(false);
        setIsError(true);
      });
  };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.selectedBookAsin !== this.props.selectedBookAsin) {
  //     this.setState({ isLoading: true });
  //     this.fetchComments();
  //   }
  // }
  useEffect(() => {
    if (props.selectedBookAsin) {
      setIsLoading(true);
      fetchComments();
    }
  }, [props.selectedBookAsin]);

  // componentDidMount() {
  //   if (this.props.selectedBookAsin) {
  //     this.fetchComments();
  //   } else {
  //     this.setState({ isLoading: false });
  //   }
  // }

  useEffect(() => {
    if (props.selectedBookAsin) {
      fetchComments();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      {props.selectedBookAsin && <AddComment asin={props.selectedBookAsin} />}
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
