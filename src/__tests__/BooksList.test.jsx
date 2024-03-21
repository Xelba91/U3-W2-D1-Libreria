import { render, screen } from "@testing-library/react";
import BookList from "../components/BookList";
import fantasy from "../data/fantasy.json";

it("creates a list with 10 users when the fetch inside the useEffect resolves", () => {
  render(<BookList books={fantasy} />);

  const bookslist = screen.getAllByTestId("list-element");
  // stiamo aspettando indefinitamente che le Promise nel componente vengano risolte
  // la loro risoluzione provocherà una lista di utenti nella pagina
  expect(bookslist).toHaveLength(150);
});
