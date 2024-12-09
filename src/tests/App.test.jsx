import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import App from "../App.jsx";

describe("App component", () => {
  it("should generate a booking number and calculate the total price", async () => {
    render(<App />);
    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, {
      target: { value: "2024-12-25" },
    });
    fireEvent.change(timeInput, {
      target: { value: "18:00" },
    });
    fireEvent.change(playersInput, {
      target: { value: "4" },
    });
    fireEvent.change(lanesInput, {
      target: { value: "2" },
    });

    for (let i = 0; i < 4; i++) {
      const addShoeButton = screen.getByText("+");
      fireEvent.click(addShoeButton);

      const shoeInput = screen.getByLabelText(`Shoe size / person ${i + 1}`);
      fireEvent.change(shoeInput, { target: { value: "38" } });
    }

    const bookButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(screen.getByDisplayValue("ABC123")).toBeInTheDocument();
      expect(screen.getByDisplayValue("2")).toBeInTheDocument();
      expect(screen.getByText("680 sek")).toBeInTheDocument();
    });
  });

  it("should load confirmation from sessionStorage", async () => {
    console.log(sessionStorage.getItem("confirmation"));

    render(<App />);
    const navButton = screen.getAllByRole("img")[0];
    fireEvent.click(navButton);

    const confirmationLink = screen.getByText(/Confirmation/i);
    fireEvent.click(confirmationLink);
    screen.debug();
    expect(await screen.findByText("Sweet, let's go!")).toBeInTheDocument();
  });

  it("should be able to see a message that no reservations are made", async () => {
    sessionStorage.clear();
    render(<App />);
    const navButton = screen.getAllByRole("img");
    expect(navButton).toBeDefined();
    fireEvent.click(navButton[0]);
    const confirmation = screen.getByText(/Confirmation/i);
    expect(confirmation).toBeInTheDocument();
    fireEvent.click(confirmation);
    const noReservationsMessage = await screen.findByText(
      /Ingen bokning gjord!/i
    );
    expect(noReservationsMessage).toBeInTheDocument();
  });
});
