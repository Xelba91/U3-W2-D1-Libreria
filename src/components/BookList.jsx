import React, { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Container, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedBookAsin: null,
  };

  selectBook = (b) => {
    this.setState({ selectedBookAsin: b.asin });
  };

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            {/* Colonna sinistra contenente la griglia dei libri */}
            <Col md={8}>
              <Row className="justify-content-center mt-5">
                <Col xs={12} md={4} className="text-center">
                  <Form.Group>
                    <Form.Control
                      type="search"
                      placeholder="Cerca un libro"
                      value={this.state.searchQuery}
                      onChange={(e) => this.setState({ searchQuery: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row xs={2} md={3} lg={4} className=" p-0 my-2">
                {this.props.books
                  .filter((b) => b.title.toLowerCase().includes(this.state.searchQuery))
                  .map((b) => (
                    <Col xs={12} md={3} key={b.asin}>
                      <SingleBook
                        book={b}
                        onSelect={this.selectBook}
                        selected={this.state.selectedBookAsin === b.asin}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
            {/* Colonna destra contenente il CommentArea */}
            <Col md={4} className="sticky-top" style={{ top: "20px", maxHeight: "90vh", overflowY: "auto" }}>
              {/* Passa l'asin del libro selezionato al CommentArea */}
              {this.state.selectedBookAsin && <CommentArea selectedBookAsin={this.state.selectedBookAsin} />}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BookList;
