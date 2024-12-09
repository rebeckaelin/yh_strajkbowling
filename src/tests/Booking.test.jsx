import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi, it, describe, expect } from "vitest";
import Booking from "../views/Booking";
import { MemoryRouter } from "react-router-dom";

describe("Booking component", () => {
  it("should be able to reserve a lane on a specific date and time", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);

    expect(dateInput).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
    expect(playersInput).toBeInTheDocument();
    expect(lanesInput).toBeInTheDocument();

    fireEvent.change(dateInput, { target: { value: "2024-12-10" } });
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    fireEvent.change(playersInput, { target: { value: "4" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    expect(dateInput.value).toBe("2024-12-10");
    expect(timeInput.value).toBe("15:00");
    expect(playersInput.value).toBe("4");
    expect(lanesInput.value).toBe("1");
  });

  it("should show an error message if not all fields are provided with data", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    const bookingButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookingButton);
    const errorMessage = await screen.findByText(
      /Alla fälten måste vara ifyllda/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should show error message if players > number of lanes", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, { target: { value: "2024-12-10" } });
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    fireEvent.change(playersInput, { target: { value: "5" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    for (let i = 0; i < 5; i++) {
      const addShoeButton = screen.getByText("+");
      fireEvent.click(addShoeButton);

      const shoeInput = screen.getByLabelText(`Shoe size / person ${i + 1}`);
      fireEvent.change(shoeInput, { target: { value: "38" } });
    }

    const bookButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookButton);

    const errorMessage = await screen.findByText(
      /Det får max vara 4 spelare per bana/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should show error message if no shoes are chosen", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, { target: { value: "2024-12-10" } });
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    fireEvent.change(playersInput, { target: { value: "2" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    const bookButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookButton);

    const errorMessage = await screen.findByText(
      /Antalet skor måste stämma överens med antal spelare/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should show error message if players > number of shoes", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, { target: { value: "2024-12-10" } });
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    fireEvent.change(playersInput, { target: { value: "3" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    for (let i = 0; i < 2; i++) {
      const addShoeButton = screen.getByText("+");
      fireEvent.click(addShoeButton);

      const shoeInput = screen.getByLabelText(`Shoe size / person ${i + 1}`);
      fireEvent.change(shoeInput, { target: { value: "38" } });
    }

    const bookButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookButton);

    const errorMessage = await screen.findByText(
      /Antalet skor måste stämma överens med antal spelare/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should show an error message if not all shoe sizes are filled", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, { target: { value: "2024-12-10" } });
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    fireEvent.change(playersInput, { target: { value: "2" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    for (let i = 0; i < 2; i++) {
      const addShoeButton = screen.getByText("+");
      fireEvent.click(addShoeButton);
    }
    const shoeInput = screen.getByLabelText(`Shoe size / person 1`);
    fireEvent.change(shoeInput, { target: { value: "38" } });

    const bookButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookButton);

    const errorMessage = await screen.findByText(
      /Alla skor måste vara ifyllda/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should allow the user to change the shoe size for each player", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, { target: { value: "2024-12-10" } });
    fireEvent.change(timeInput, { target: { value: "15:00" } });
    fireEvent.change(playersInput, { target: { value: "1" } });
    fireEvent.change(lanesInput, { target: { value: "1" } });

    for (let i = 0; i < 1; i++) {
      const addShoeButton = screen.getByText("+");
      fireEvent.click(addShoeButton);

      const shoeInput = screen.getByLabelText(`Shoe size / person ${i + 1}`);
      fireEvent.change(shoeInput, { target: { value: "38" } });
      expect(shoeInput.value).toBe("38");
      fireEvent.change(shoeInput, { target: { value: "39" } });
      expect(shoeInput.value).toBe("39");
    }
  });

  it("should allow the user to remove a shoe size field by clicking the '-' button", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    for (let i = 0; i < 3; i++) {
      const addShoeButton = screen.getByText("+");
      fireEvent.click(addShoeButton);

      const shoeInput = screen.getByLabelText(`Shoe size / person ${i + 1}`);
      fireEvent.change(shoeInput, { target: { value: "38" } });
    }

    const removeShoeButtons = screen.getAllByText("-");
    expect(removeShoeButtons.length).toBe(3);
    fireEvent.click(removeShoeButtons[1]);
    await waitFor(() => {
      const updatedRemoveButtons = screen.getAllByText("-");
      expect(updatedRemoveButtons.length).toBe(2);
    });
  });

  it("should be a button to confirm the reservation", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const bookingButton = screen.getByText(/strIIIIIike!/i);
    expect(bookingButton).toBeDefined();
  });
});
