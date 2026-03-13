import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TaxTable } from "./TaxTable";
import type { TaxCalculation } from "../utils/taxCalculator";

const baseTaxes: TaxCalculation = {
    annualIncome: 100000,
    totalTax: 18141.105,
    effectiveRate: 0.18141105,
    taxesPerBracket: [
        {
            max: 47630,
            min: 0,
            rate: 0.15,
            taxableIncome: 47630,
            taxOwed: 7144.5,
        },
        {
            max: 95259,
            min: 47630,
            rate: 0.205,
            taxableIncome: 47629,
            taxOwed: 9763.945,
        },
        {
            max: 147667,
            min: 95259,
            rate: 0.26,
            taxableIncome: 4741,
            taxOwed: 1232.66,
        },
        {
            max: 210371,
            min: 147667,
            rate: 0.29,
            taxableIncome: 0,
            taxOwed: 0,
        },
        {
            min: 210371,
            rate: 0.33,
            taxableIncome: 0,
            taxOwed: 0,
        },
    ],
};

describe("TaxTable", () => {
    describe("header", () => {
        it("displays the annual income", () => {
            render(<TaxTable taxes={baseTaxes} />);
            expect(screen.getByText("$100,000.00")).toBeInTheDocument();
        });

        it("displays the total tax", () => {
            render(<TaxTable taxes={baseTaxes} />);
            expect(screen.getByText("$18,141.11")).toBeInTheDocument();
        });

        it("displays the effective rate", () => {
            render(<TaxTable taxes={baseTaxes} />);
            expect(screen.getByText("18.1%")).toBeInTheDocument();
        });
    });

    describe("table", () => {
        it("renders column headers", () => {
            render(<TaxTable taxes={baseTaxes} />);
            expect(screen.getByText("Tax Bracket")).toBeInTheDocument();
            expect(screen.getByText("Rate")).toBeInTheDocument();
            expect(screen.getByText("Tax Owed")).toBeInTheDocument();
        });

        it("renders a row for each tax bracket", () => {
            render(<TaxTable taxes={baseTaxes} />);
            const rows = document.querySelectorAll(".tax-table__row");
            expect(rows).toHaveLength(baseTaxes.taxesPerBracket.length + 1);
        });

        it("formats each bracket range correctly", () => {
            render(<TaxTable taxes={baseTaxes} />);
            expect(screen.getByText("$47,630.00")).toBeInTheDocument();
            expect(
                screen.getByText("$47,630.00 - $95,259.00"),
            ).toBeInTheDocument();
            expect(
                screen.getByText("$95,259.00 - $147,667.00"),
            ).toBeInTheDocument();
            expect(
                screen.getByText("$147,667.00 - $210,371.00"),
            ).toBeInTheDocument();

            expect(screen.getByText("$210,371.00")).toBeInTheDocument();
        });

        it("formats each bracket rate correctly", () => {
            render(<TaxTable taxes={baseTaxes} />);
            expect(screen.getByText("15.0%")).toBeInTheDocument();
            expect(screen.getByText("20.5%")).toBeInTheDocument();
            expect(screen.getByText("26.0%")).toBeInTheDocument();
            expect(screen.getByText("29.0%")).toBeInTheDocument();
            expect(screen.getByText("33.0%")).toBeInTheDocument();
        });

        it("formats each bracket tax owed correctly", () => {
            render(<TaxTable taxes={baseTaxes} />);
            expect(screen.getByText("$7,144.50")).toBeInTheDocument();
            expect(screen.getByText("$9,763.95")).toBeInTheDocument();
            expect(screen.getByText("$1,232.66")).toBeInTheDocument();
            expect(screen.getAllByText("$0.00").length).toBe(2);
        });
    });
});
