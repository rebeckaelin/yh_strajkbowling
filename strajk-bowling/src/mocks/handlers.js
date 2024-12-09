import { http, HttpResponse } from "msw";

export const handlers = [
  // Mocka POST-anropet till API:et för att skicka bokningen
  http.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    async ({ request }) => {
      const { when, lanes, people } = await request.json();

      // Validera inkommande data
      if (!when || !lanes || !people) {
        return HttpResponse.json(
          {
            success: false,
            message: "Missing data",
          },
          { status: 400 }
        );
      }

      // Mockad bokningsbekräftelse som skickas tillbaka till klienten
      const bookingConfirmation = {
        id: "ABC123", // Bokningsnummer
        when: "2024-12-25T18:00",
        lanes: 2,
        people: 4,
        price: 680,
      };
      sessionStorage.setItem(
        "confirmation",
        JSON.stringify(bookingConfirmation)
      );
      return HttpResponse.json(bookingConfirmation); // Returnerar mockad data
    }
  ),
];
