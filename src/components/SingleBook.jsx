import { Card } from "react-bootstrap";

const SingleBook = function (props) {
  const handleClick = () => {
    props.onSelect(props.book);

    // book={b}
    // onSelect={selectBook}

    // selected={selectedBookAsin === b.asin}
  };

  return (
    <>
      <Card onClick={handleClick} style={{ border: props.selected ? "3px solid red" : "none" }}>
        <Card.Img variant="top" src={props.book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{props.book.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleBook;
