import { describe, it, expect } from "vitest";
import { calculateTaxes } from "./taxCalculator";
import type { TaxBrackets } from "../api/taxBracket";

const taxBracket2022: TaxBrackets = [
    {
        max: 50197,
        min: 0,
        rate: 0.15,
    },
    {
        max: 100392,
        min: 50197,
        rate: 0.205,
    },
    {
        max: 155625,
        min: 100392,
        rate: 0.26,
    },
    {
        max: 221708,
        min: 155625,
        rate: 0.29,
    },
    {
        min: 221708,
        rate: 0.33,
    },
];

describe("calculateTaxes", () => {
    describe("tax calculations", () => {
        it("calculates tax correctly for no income", () => {
            const result = calculateTaxes(0, taxBracket2022);
            expect(result.totalTax).toBe(0);
        });

        it("calculates tax correctly for income in first bracket", () => {
            const result = calculateTaxes(50000, taxBracket2022);
            expect(result.totalTax.toFixed(2)).toBeCloseTo(7500);
        });

        it("calculates tax correctly for income in medium bracket", () => {
            const result = calculateTaxes(100000, taxBracket2022);
            expect(result.totalTax.toFixed(2)).toBeCloseTo(17739.17);
        });

        it("calculates tax correctly for income in the top (unbounded) bracket", () => {
            const result = calculateTaxes(1234567, taxBracket2022);
            expect(result.totalTax.toFixed(2)).toBeCloseTo(385587.65);
        });
    });

    describe("taxableIncome per bracket", () => {
        it("correctly assigns taxable income no income users", () => {
            const result = calculateTaxes(0, taxBracket2022);
            expect(result.taxesPerBracket[0].taxableIncome).toBe(0);
            expect(result.taxesPerBracket[1].taxableIncome).toBe(0);
            expect(result.taxesPerBracket[2].taxableIncome).toBe(0);
            expect(result.taxesPerBracket[3].taxableIncome).toBe(0);
            expect(result.taxesPerBracket[4].taxableIncome).toBe(0);
        });

        it("correctly assigns taxable income to applicable brackets and clamps inapplicable brackets to 0", () => {
            const result = calculateTaxes(100000, taxBracket2022);
            expect(result.taxesPerBracket[0].taxableIncome).toBe(50197);
            expect(result.taxesPerBracket[1].taxableIncome).toBe(49803);
            expect(result.taxesPerBracket[2].taxableIncome).toBe(0);
            expect(result.taxesPerBracket[3].taxableIncome).toBe(0);
            expect(result.taxesPerBracket[4].taxableIncome).toBe(0);
        });
    });

    describe("taxOwed per bracket", () => {
        it("correctly calculates tax owed per bracket", () => {
            const result = calculateTaxes(100000, taxBracket2022);

            expect(result.taxesPerBracket[0].taxOwed.toFixed(2)).toBeCloseTo(
                7529.55,
            );
            expect(result.taxesPerBracket[1].taxOwed.toFixed(2)).toBeCloseTo(
                10209.61,
            );
            expect(result.taxesPerBracket[2].taxOwed).toBe(0);
            expect(result.taxesPerBracket[3].taxOwed).toBe(0);
            expect(result.taxesPerBracket[4].taxOwed).toBe(0);
        });
    });

    describe("effectiveRate", () => {
        it("calculates the effective rate as totalTax / annualIncome", () => {
            const result = calculateTaxes(100000, taxBracket2022);
            expect(result.effectiveRate).toBeCloseTo(result.totalTax / 100000);
        });

        it("returns effectiveRate of 0 when annualIncome is 0 (avoids NaN)", () => {
            const result = calculateTaxes(0, taxBracket2022);
            expect(result.effectiveRate).toBe(0);
        });
    });
});
