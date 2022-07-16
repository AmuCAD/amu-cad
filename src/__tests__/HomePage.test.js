import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import HomePage from "../pages/HomePage";

describe("<HomePage />", () => {
  render(
    <Router>
      <HomePage />
    </Router>,
  );

  it("renders start button", () => {
    const button = screen.getByText("지금 시작하기");
    expect(button).toBeInTheDocument();
  });
});
