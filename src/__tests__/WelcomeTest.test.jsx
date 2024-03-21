import React from "react";
import { render, screen } from "@testing-library/react";
import Welcome from "../components/Welcome";

test("renders welcome message", () => {
  render(<Welcome />);
  const welcomeElement = screen.getByText(/Benvenuti in EpiBooks!/i);
  expect(welcomeElement).toBeInTheDocument();
});

// 1 - Verifica che il componente Welcome venga montato correttamente.
