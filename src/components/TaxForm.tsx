import { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";
import { YearInput } from "./YearInput";

export const TaxForm = () => {
    const [annualIncome, setAnnualIncome] = useState(0);
    const [taxYear, setTaxYear] = useState(0);

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            annualIncome,
            taxYear,
        });
    };
    return (
        <form onSubmit={onSubmit}>
            <CurrencyInput value={annualIncome} onChange={setAnnualIncome} />
            <YearInput value={taxYear} onChange={setTaxYear} />
            <button type="submit">Submit</button>
        </form>
    );
};
