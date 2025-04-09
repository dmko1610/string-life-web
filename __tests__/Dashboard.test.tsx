import React from "react";
import Home from "@/app/dashboard/page";
import { fetchInstrumentsSafe } from "@/services/instrumentService";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/services/instrumentService", () => ({
  fetchInstrumentsSafe: jest.fn()
}));

const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push })
}));

describe("Dashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays instruments", async () => {
    (fetchInstrumentsSafe as jest.Mock).mockResolvedValueOnce([
      { id: "1", name: "Fender Stratocaster", type: "Electro" }
    ]);
    render(<Home />);

    expect(await screen.findByText("Fender Stratocaster")).toBeInTheDocument();
    expect(screen.getByText("Electro")).toBeInTheDocument();
  });

  describe("when no instruments", () => {
    it("displays empty state", async () => {
      (fetchInstrumentsSafe as jest.Mock).mockResolvedValueOnce([]);
      render(<Home />);

      expect(
        await screen.findByText(/No instruments found/i)
      ).toBeInTheDocument();
    });
  });

  describe("while loading", () => {
    it("displays skeleton loader", async () => {
      (fetchInstrumentsSafe as jest.Mock).mockImplementationOnce(
        () => new Promise(() => {})
      );
      render(<Home />);

      expect(await screen.findByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });
  });

  describe("when button is pressed", () => {
    it("navigates to add-instrument", async () => {
      (fetchInstrumentsSafe as jest.Mock).mockReturnValueOnce([]);
      render(<Home />);

      const button = await screen.findByRole("button", { name: /Click me/i });
      await fireEvent.click(button);

      expect(push).toHaveBeenCalledWith("/add-instrument");
    });
  });
});
