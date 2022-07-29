import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Blog } from "./Blog";
import { Notification } from "./Notification";
import app from "../App";

test("renders content", () => {
  const blog = {
    author: "Irmeli",
    title: "Irmelin salaiset päiväkirjat",
    url: "www.irmelidiaries.com",
  };

  // render(<Notification message="asdf" style="error" />);
  const { container } = render(
    <Blog blog={blog} handleLike={app.addLike} isOwner={true} />
  );
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Irmelin salaiset päiväkirjat");
  expect(div).not.toHaveTextContent("www.irmelidiaries.com");
  // screen.debug();
  // const element = screen.getByText("Irmelin salaiset päiväkirjat");
  // expect(element).toBeDefined();
});
