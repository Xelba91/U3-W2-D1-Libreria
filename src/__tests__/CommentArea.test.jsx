import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import BookList from "../components/BookList";
import fantasy from "../data/fantasy.json";

it("creates a list with 10 users when the fetch inside the useEffect resolves", () => {
  render(<BookList books={fantasy} />);

  const bookslist = screen.getAllByTestId("list-element");

  fireEvent.click(bookslist);
  // stiamo aspettando indefinitamente che le Promise nel componente vengano risolte
  // la loro risoluzione provocherà una lista di utenti nella pagina
  expect(screen.getByTestId("commentArea")).toBeInTheDocument();
});
