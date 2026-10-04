import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HomePage } from "../src/features/home/HomePage";
describe("homepage shopping boundaries and interactions", () => {
  it("supports keyboard device selection and wraps without mismatched labels", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const next = screen.getByRole("button", { name: "Next device" });
    next.focus();
    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("heading", { name: "Midnight" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show Midnight device" }),
    ).toHaveAttribute("aria-pressed", "true");
    await user.click(next);
    await user.click(next);
    expect(screen.getByRole("heading", { name: "Plum" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Previous device" }));
    expect(screen.getByRole("heading", { name: "Copper" })).toBeInTheDocument();
  });
  it("retains poster and essential content with reduced motion", () => {
    render(<HomePage />);
    expect(document.querySelector("canvas")).toBeNull();
    expect(document.querySelector(".stage-poster")).toHaveAttribute(
      "src",
      "/assets/images/device-plum.svg",
    );
    expect(
      screen.getByText(/not products offered for sale/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Online pickup ordering is planned/),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /buy|checkout|add to cart/i }),
    ).not.toBeInTheDocument();
  });
  it("reveals selected category guidance and exposes actual contact destinations", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole("link", { name: /E-liquids Explore/ }));
    expect(document.getElementById("category-liquids")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Call the store" }),
    ).toHaveAttribute("href", "tel:+17199249524");
    expect(
      screen.getByRole("link", { name: "Get directions" }),
    ).toHaveAttribute("href", expect.stringContaining("1281+West+Pueblo"));
  });
  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await user.click(screen.getByRole("link", { name: "Our store" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
