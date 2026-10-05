import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { HomePage } from "../src/features/home/HomePage";
describe("adult entry and informational accessibility", () => {
  beforeEach(() => localStorage.clear());
  it("requires self-confirmation before mounting the store and remembers entry", async () => {
    const user = userEvent.setup();
    const view = render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: "Adults 21+ Only" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next device" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Exit" })).toHaveAttribute(
      "href",
      "https://www.google.com/",
    );
    expect(screen.getByRole("button", { name: "Enter Site" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("heading", { name: "Discover The Vape Hub" }),
    ).toBeInTheDocument();
    expect(document.getElementById("main")).toHaveFocus();
    view.unmount();
    render(<HomePage />);
    expect(
      screen.queryByRole("button", { name: "Enter Site" }),
    ).not.toBeInTheDocument();
  });
  it("provides one expanded FAQ panel and centralized unconfirmed hours", async () => {
    localStorage.setItem("vape-hub:adult-entry:v1", "confirmed");
    const user = userEvent.setup();
    render(<HomePage />);
    const id = screen.getByRole("button", { name: "Do I need to bring ID?" });
    id.focus();
    await user.keyboard("{Enter}");
    expect(id).toHaveAttribute("aria-expanded", "true");
    const online = screen.getByRole("button", { name: "Can I order online?" });
    await user.click(online);
    expect(id).toHaveAttribute("aria-expanded", "false");
    expect(online).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", { name: "Can I order online?" }),
    ).toHaveTextContent("Online ordering is not available");
    expect(screen.getByText("Hours are being confirmed")).toBeInTheDocument();
    expect(document.querySelector('a[href="#"]')).toBeNull();
  });
});
