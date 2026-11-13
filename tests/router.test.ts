import { describe, test, expect } from "bun:test";
import { parseRoute, buildRoute, swapLocale } from "../src/lib/router";

describe("router", () => {
  test("parses bare root", () => {
    expect(parseRoute("")).toEqual({ locale: null, view: "home", param: null });
    expect(parseRoute("#/")).toEqual({ locale: null, view: "home", param: null });
  });

  test("parses explicit localized URLs and never redirects them", () => {
    expect(parseRoute("#/fa/topics")).toEqual({ locale: "fa", view: "topics", param: null });
    expect(parseRoute("#/en/topic/t-git")).toEqual({ locale: "en", view: "topic", param: "t-git" });
    expect(parseRoute("#/fa/")).toEqual({ locale: "fa", view: "home", param: null });
  });

  test("treats unknown views as home with locale preserved", () => {
    const r = parseRoute("#/fa/nonsense/x");
    expect(r.locale).toBe("fa");
    expect(r.view).toBe("home");
  });

  test("buildRoute round-trips", () => {
    expect(buildRoute("fa", "topic", "t-git")).toBe("#/fa/topic/t-git");
    expect(parseRoute(buildRoute("en", "assistant")).view).toBe("assistant");
  });

  test("swapLocale returns equivalent page in the other language", () => {
    const sw = swapLocale("#/fa/topic/t-git");
    expect(sw).toEqual({ href: "#/en/topic/t-git", nextLocale: "en" });
    const sw2 = swapLocale("#/en/roadmap");
    expect(sw2?.href).toBe("#/fa/roadmap");
    expect(swapLocale("") ?? null).toBeNull();
  });
});
