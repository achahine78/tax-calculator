import type { TaxCalculation } from "../utils/taxCalculator";

type Props = {
    taxes: TaxCalculation;
};

export const TaxTable = ({ taxes }: Props) => {
    return (
        <div>
            <div>Total Taxes: {taxes.totalTax}</div>
            {taxes.taxesPerBracket.map(({ max, min, rate, taxOwed }) => (
                <div>
                    <div>Max: {max}</div>
                    <div>Min: {min}</div>
                    <div>Rate: {rate}</div>
                    <div>Taxes Owed: {taxOwed}</div>
                </div>
            ))}
            <div>Effective Rate: {taxes.effectiveRate}</div>
        </div>
    );
};
