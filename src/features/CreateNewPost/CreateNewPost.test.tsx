import { render, screen, fireEvent, waitFor } from "../../test-utils";
import { CreateNewPost } from "./CreateNewPost";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

test("renders createNewPost as logged in and checks create button", async () => {
  const createPostButton = "Create new post";

  render(<CreateNewPost />);

  expect(screen.getByText(createPostButton)).toBeTruthy();
});

test("renders createNewPost as logged in and cancels create post", async () => {
  const createPostButton = "Create new post";
  const createButton = "Create";
  const cancelButton = "Cancel";

  render(<CreateNewPost />);

  fireEvent.click(screen.getByText(createPostButton));

  expect(screen.getByText(createButton)).toBeTruthy();

  fireEvent.click(screen.getByText(cancelButton));

  expect(screen.getByText(createPostButton)).toBeTruthy();
});

test("renders createNewPost as logged in and creates post", async () => {
  const createPostButton = "Create new post";
  const createButton = "Create";
  const inputField = "create-post-input";

  var mock = new MockAdapter(axios);

  mock.onPost("http://localhost:1337/posts").reply(200, {
    data: { id: 1 },
  });

  render(<CreateNewPost />);

  fireEvent.click(screen.getByText(createPostButton));

  expect(screen.getByText(createButton)).toBeDisabled();

  const input = screen.getByTestId(inputField);
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: "123" } });

  expect(screen.getByText(createButton)).toBeEnabled();

  fireEvent.click(screen.getByText(createButton));

  await waitFor(() => {
    expect(screen.getByText(createPostButton)).toBeTruthy();
  });
});
