import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./src/mocks/server";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
});

afterAll(() => server.close());
