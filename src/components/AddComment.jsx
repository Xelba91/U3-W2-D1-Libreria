import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = function (props) {
  const [comment, setComment] = useState({
    comment: "", // Cambiato da "comment" a "text"
    rate: 1,
    elementId: props.asin,
  });

  useEffect(() => {
    setComment({ ...comment, elementId: props.asin });
  }, [props.asin]);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYzMTFhMDcxYWZhZjAwMTkxNTY2ZWYiLCJpYXQiOjE3MTA0Mjg1NzYsImV4cCI6MTcxMTYzODE3Nn0.P9iro7jpWRHV5ciBePMfX4Cl20zYvs-Y5pGNs037EVI",
        },
      });
      if (response.ok) {
        alert("Recensione inviata!");
        // Resettare il form
        setComment({
          comment: "",
          rate: 1,
          elementId: props.asin,
        });
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.text}
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) =>
              setComment({
                ...comment, // Mantenere le altre proprietà intatte
                rate: e.target.value, // Aggiornare solo il valore di rate
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
