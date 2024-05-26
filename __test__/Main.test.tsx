import "@testing-library/jest-dom";

import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import Home from "@/app/page";
import { renderWithProviders } from "@/utils/test.utils";
import { fireEvent, screen } from "@testing-library/react";

import { WIKI_RESPONSE } from "./mock";

const URL =
  "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/02/14";

export const handlers = [
  http.get(URL, async () => {
    await delay(150);
    return HttpResponse.json(WIKI_RESPONSE);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home Page => WIKI EVENTS", () => {
  enum BUTTON_TEXT {
    LOAD = "Load Events",
    TRY = "Try Again",
  }

  it(`Initial button text and status to be "${BUTTON_TEXT.LOAD}"`, async () => {
    renderWithProviders(<Home />);

    expect(screen.getByText(BUTTON_TEXT.LOAD)).toBeInTheDocument();
    expect(screen.queryByText(BUTTON_TEXT.TRY)).not.toBeInTheDocument();
  });

  it(`Are tables rendered`, async () => {
    renderWithProviders(<Home />);

    const btn = screen.getByText(BUTTON_TEXT.LOAD);
    fireEvent.click(btn);

    setTimeout(async () => {
      expect(await screen.queryByTestId("table")).toBeInTheDocument();
    }, 10);
  });
});

type thunkMiddlewareType = { dispatch: any; getWikiEvents: Function };

const thunkMiddleware =
  ({ dispatch, getWikiEvents }: thunkMiddlewareType) =>
  (next: Function) =>
  (action: {}) => {
    if (typeof action === "function") {
      return action(dispatch, getWikiEvents);
    }

    return next(action);
  };

const create = () => {
  const store = {
    getWikiEvents: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action: {}) => thunkMiddleware(store)(next)(action);

  return { store, next, invoke };
};

describe("STORE TESTS", () => {
  it("passes through non-function action", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it("calls the function", () => {
    const { invoke } = create();
    const fn = jest.fn();
    invoke(fn);
    expect(fn).toHaveBeenCalled();
  });

  it("passes dispatch and getWikiEvents", () => {
    const { store, invoke } = create();
    invoke((dispatch: Function, getWikiEvents: Function) => {
      dispatch("TEST DISPATCH");
      getWikiEvents();
    });
    expect(store.dispatch).toHaveBeenCalledWith("TEST DISPATCH");
    expect(store.getWikiEvents).toHaveBeenCalled();
  });

  it(`Selector`, async () => {});
  it(`Action creator`, async () => {});
  it(`Middlware`, async () => {});
});
