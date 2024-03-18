import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";

class BookList extends Component {
  state = {
    searchQuery: "",
  };

  // Fai un refactor della struttura del tuo componente BookList: dovranno esserci due colonne. Una a sinistra contenente la griglia con i libri e una sulla destra con il componente CommentArea. Entrambi dovranno essere sempre visibili. Se inizialmente nessun libro è selezionato, il CommentArea non deve mostrare alcun contenuto. Infine, rimuovi il componente CommentArea dall'interno di SingleBook.

  render() {
    return (
      <>
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
        <Row className="g-2 mt-3">
          {this.props.books
            .filter((b) => b.title.toLowerCase().includes(this.state.searchQuery))
            .map((b) => (
              <Col xs={12} md={4} key={b.asin}>
                <SingleBook book={b} />
              </Col>
            ))}
        </Row>
      </>
    );
  }
}

export default BookList;
