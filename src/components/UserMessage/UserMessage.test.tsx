import { render, screen } from "../../test-utils";

import { UserMessage } from "./UserMessage";

test("renders UserMessage and checking the message", async () => {
  const userMessage = "test";

  render(
    <UserMessage message={userMessage} type="success" handleClose={() => {}} />
  );

  expect(screen.getByText(userMessage)).toBeTruthy();
});
