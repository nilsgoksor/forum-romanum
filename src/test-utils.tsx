import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AppProvider, StateI } from "./state";

export const mockState: StateI = {
  isLoggedIn: true,
  user: "Admin",
  userMessage: { message: "TEST", type: "success" },
  posts: [
    {
      id: 1,
      body: "Admin first post",
      author: "Admin",
      nbrOfComments: 0,
      dateCreated: new Date(),
    },
  ],
};

const AllTheProviders: FC = ({ children }) => {
  return <AppProvider initialState={mockState}>{children}</AppProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
