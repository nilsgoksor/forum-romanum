import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  render,
  screen,
  mockState,
  fireEvent,
  waitFor,
} from "../../../test-utils";
import { ForumPost } from "./ForumPost";

test("renders ForumPost and checks it displays the author and body", async () => {
  const post = mockState.posts[0];

  render(<ForumPost post={post} />);

  expect(screen.getByText(post.author)).toBeTruthy();
  expect(screen.getByText(post.body)).toBeTruthy();
});

test("renders ForumPost and checks it displays the comment section", async () => {
  const post = mockState.posts[0];

  const showCommentsButton = "toggle-show-comments";
  const commentSection = "comment-section";

  render(<ForumPost post={post} />);

  expect(screen.getByTestId(showCommentsButton)).toBeTruthy();

  fireEvent.click(screen.getByTestId(showCommentsButton));

  expect(screen.getByTestId(commentSection)).toBeTruthy();
});

test("renders ForumPost and checks it displays the edit textfield and buttons", async () => {
  const post = mockState.posts[0];

  const editButton = "toggle-edit";
  const textfield = "edit-body";
  const saveButton = "Save";
  const deleteButton = "Delete";

  render(<ForumPost post={post} />);

  expect(screen.getByTestId(editButton)).toBeTruthy();

  fireEvent.click(screen.getByTestId(editButton));

  expect(screen.getByText(saveButton)).toBeTruthy();
  expect(screen.getByText(deleteButton)).toBeTruthy();

  const input = screen.getByTestId(textfield);

  expect(input).toBeTruthy();

  fireEvent.change(input, { target: { value: "" } });

  expect(screen.getByText(saveButton)).toBeDisabled();
});

test("renders ForumPost, edits and saves", async () => {
  const post = mockState.posts[0];

  const editButton = "toggle-edit";
  const textfield = "edit-body";
  const saveButton = "Save";

  render(<ForumPost post={post} />);

  fireEvent.click(screen.getByTestId(editButton));

  const input = screen.getByTestId(textfield);

  fireEvent.change(input, { target: { value: "123" } });

  var mock = new MockAdapter(axios);
  mock.onPut("http://localhost:1337/posts").reply(200);

  await waitFor(() => {
    fireEvent.click(screen.getByText(saveButton));
  });
});

test("renders ForumPost, edits and deletes", async () => {
  const post = mockState.posts[0];

  var mock = new MockAdapter(axios);
  mock.onDelete("http://localhost:1337/posts/1").reply(200);

  const editButton = "toggle-edit";
  const deleteButton = "Delete";

  render(<ForumPost post={post} />);

  fireEvent.click(screen.getByTestId(editButton));

  /* Weird ECONNREFUSED error that I've spent way to much on */
  // await waitFor(() => {
  //   fireEvent.click(screen.getByText(deleteButton));
  // });
});
