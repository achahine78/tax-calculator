type TaxBracket = {
    min: number;
    max?: number;
    rate: number;
};

export type TaxBrackets = TaxBracket[];

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
            taxable_income: taxable,
            tax_owed: tax,
        });
    }

    return {
        annualIncome,
        totalTax: totalTax,
        effectiveRate: totalTax / annualIncome,
        taxesPerBracket: taxesPerBracket,
    };
};
