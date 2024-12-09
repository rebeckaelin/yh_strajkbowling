import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./strajk-bowling/src/mocks/server";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen());

beforeEach(() => {
  // sessionStorage.clear();
});

afterEach(() => {
  // vi.restoreAllMocks();
  cleanup();
});

afterAll(() => server.close());
