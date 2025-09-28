import { render, screen } from "@testing-library/react";
import App from "./App";

test("shows todo heading", () => {
  render(<App />);
  const el = screen.getByText(/todo app/i);
  expect(el).toBeTruthy();
});
