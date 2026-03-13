import { describe, it, expect } from "vitest";
import { formatMoney, formatTaxBracket, formatRate } from "./formatting";

describe("formatMoney", () => {
    it("formats a whole number in USD by default", () => {
        expect(formatMoney({ num: 1000 })).toBe("$1,000.00");
    });

    it("formats a decimal value in USD", () => {
        expect(formatMoney({ num: 1234.56 })).toBe("$1,234.56");
    });

    it("formats zero", () => {
        expect(formatMoney({ num: 0 })).toBe("$0.00");
    });

    it("formats large numbers with thousands separators", () => {
        expect(formatMoney({ num: 1000000 })).toBe("$1,000,000.00");
    });

    it("respects a custom currency (CAD)", () => {
        const result = formatMoney({ num: 1000, currency: "CAD" });
        expect(result).toContain("1,000.00");
        expect(result).toMatch(/CA\$|CAD/);
    });
});

describe("formatTaxBracket", () => {
    it("returns an empty string when both min and max are undefined", () => {
        expect(formatTaxBracket()).toBe("");
    });

    it("returns only the max when min is 0 (falsy) and max is provided", () => {
        // min=0 is falsy, so only max should appear
        expect(formatTaxBracket(0, 50000)).toBe("$50,000.00");
    });

    it("returns only the min when max is not provided", () => {
        expect(formatTaxBracket(50000)).toBe("$50,000.00");
    });

    it("returns a range string when both min and max are truthy", () => {
        expect(formatTaxBracket(50000, 100000)).toBe(
            "$50,000.00 - $100,000.00",
        );
    });

    it("returns only the max when min is undefined", () => {
        expect(formatTaxBracket(undefined, 50000)).toBe("$50,000.00");
    });
});

describe("formatRate", () => {
    it("formats a standard rate to one decimal place", () => {
        expect(formatRate(0.15)).toBe("15.0%");
    });

    it("formats a rate with a decimal correctly", () => {
        expect(formatRate(0.205)).toBe("20.5%");
    });

    it("formats zero", () => {
        expect(formatRate(0)).toBe("0.0%");
    });

    it("rounds to one decimal place", () => {
        expect(formatRate(0.1234)).toBe("12.3%");
        expect(formatRate(0.1255)).toBe("12.6%");
    });
});
