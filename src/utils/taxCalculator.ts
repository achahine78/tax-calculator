import type { TaxBrackets } from "../api/taxBracket";

export type ProcessedTaxBracket = {
    min: number;
    max?: number;
    rate: number;
    taxableIncome: number;
    taxOwed: number;
};

export type TaxCalculation = {
    annualIncome: number;
    totalTax: number;
    effectiveRate: number;
    taxesPerBracket: ProcessedTaxBracket[];
};

export const calculateTaxes = (
    annualIncome: number,
    taxBrackets: TaxBrackets,
) => {
    let totalTax = 0;
    const taxesPerBracket = [];

    for (const bracket of taxBrackets) {
        const min = bracket.min;
        const max = bracket.max ?? Infinity;
        const rate = bracket.rate;

        const taxable = Math.max(0, Math.min(annualIncome, max) - min);
        const tax = taxable * rate;

        totalTax += tax;

        taxesPerBracket.push({
            ...bracket,
            taxableIncome: taxable,
            taxOwed: tax,
        });
    }

    return {
        annualIncome,
        totalTax: totalTax,
        effectiveRate: totalTax / annualIncome,
        taxesPerBracket: taxesPerBracket,
    };
};
