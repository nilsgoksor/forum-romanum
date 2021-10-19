import { render, screen, mockState } from "../../test-utils";
import { Posts } from "./Posts";

test("renders Posts and checks it displays the posts", async () => {
  const firstPostBody = mockState.posts[0].body;

  render(<Posts posts={mockState.posts} />);

  expect(screen.getByText(firstPostBody)).toBeTruthy();
});
