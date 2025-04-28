import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App basics", () => {
  it("renders with initial count of 0", () => {
    render(<App />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("increments counter when button is clicked", () => {
    render(<App />);

    const incrementButton = screen.getByText("Přičíst");

    fireEvent.click(incrementButton);

    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.click(incrementButton);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("displays success message", () => {
    render(<App />);

    expect(
      screen.getByText("Aplikace byla úspěšně aktualizována.")
    ).toBeInTheDocument();
  });

  it("does not displays error alert", () => {
    render(<App />);


  });
});
