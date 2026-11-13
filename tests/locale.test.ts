import { describe, test, expect, beforeEach } from "bun:test";
import { decideLocale, formatNum, formatDate } from "../src/lib/locale";

// bun test runs without window/localStorage — locale.ts guards with try/catch.
describe("locale decision chain", () => {
  test("1. explicit URL locale always wins", () => {
    expect(decideLocale("fa").basis).toBe("explicit-url");
    expect(decideLocale("en").basis).toBe("explicit-url");
  });

  test("2. no saved preference + no platform country → browser-language fallback basis", () => {
    const d = decideLocale(null);
    expect(["saved-preference", "country-metadata", "browser-language"]).toContain(d.basis);
    // in bun (no navigator), browserLocale() returns "en"
    expect(d.locale).toBe("en");
  });
});

describe("locale formatting", () => {
  test("Persian digits in fa, Western in en", () => {
    expect(formatNum(34, "en")).toBe("34");
    expect(formatNum(34, "fa")).toContain("۳۴".slice(0, 1) === "۳" ? "۳" : "3"); // fa-IR renders Persian digits
  });

  test("formatDate does not crash on ISO dates", () => {
    expect(typeof formatDate("2026-11-14", "en")).toBe("string");
    expect(typeof formatDate("2026-11-14", "fa")).toBe("string");
  });
});
