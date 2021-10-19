import { render, screen, fireEvent } from "../../test-utils";

import { Header } from "./Header";

test("renders header and checking the title", async () => {
  const headerTitle = "Forum Romanum";

  render(<Header />);

  expect(screen.getByText(headerTitle)).toBeTruthy();
});

test("renders header and logout, login", async () => {
  const logoutButton = "Logout";
  const loginButton = "Login";
  const loginModalButton = "login-modal-button";

  render(<Header />);

  expect(screen.getByText(logoutButton)).toBeTruthy();

  fireEvent.click(screen.getByText(logoutButton));
  expect(screen.getByText(loginButton)).toBeTruthy();

  fireEvent.click(screen.getByText(loginButton));
  expect(screen.getByTestId(loginModalButton)).toBeTruthy();
});
