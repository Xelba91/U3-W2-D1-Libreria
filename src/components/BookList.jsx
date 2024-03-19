import React, { useState } from "react";
import SingleBook from "./SingleBook";
import { Col, Container, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = function (props) {
  // Definizione degli stati per il campo di ricerca e l'asin del libro selezionato
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookAsin, setSelectedBookAsin] = useState(null);

  // Funzione per selezionare un libro
  const selectBook = (b) => {
    // Imposta lo stato con l'asin del libro selezionato
    setSelectedBookAsin(b.asin);
  };

  return (
    <>
      <Container fluid>
        <Row>
          {/* Colonna sinistra per la griglia dei libri */}
          <Col md={8}>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={4} className="text-center">
                {/* Campo di ricerca */}
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Cerca un libro"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row xs={2} md={3} lg={4} className=" p-0 my-2">
              {props.books
                .filter((b) => b.title.toLowerCase().includes(searchQuery))
                .map((b) => (
                  <Col xs={12} md={3} key={b.asin}>
                    <SingleBook
                      book={b}
                      onSelect={selectBook}
                      // Indica se il libro è selezionato o meno
                      selected={selectedBookAsin === b.asin}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          {/* Colonna destra per il CommentArea */}
          <Col md={4} className="sticky-top" style={{ top: "20px", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Passa l'asin del libro selezionato al CommentArea se è stato selezionato un libro */}
            {selectedBookAsin && <CommentArea selectedBookAsin={selectedBookAsin} />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookList;
