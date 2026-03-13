import { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";
import { YearInput } from "./YearInput";
import { calculateTaxes } from "../utils/taxCalculator";
import { TaxTable } from "./TaxTable";
import { Button } from "./Button";
import "./TaxForm.css";
import { ErrorBox } from "./ErrorBox";
import { useFetchTaxBracket } from "../hooks/useFetchTaxBracket";

export const TaxForm = () => {
    const [annualIncome, setAnnualIncome] = useState(0);
    const [taxYear, setTaxYear] = useState(0);

    const {
        data,
        error,
        isPending,
        mutate: executeFetchTaxBracket,
    } = useFetchTaxBracket();

    const taxBrackets = data?.tax_brackets ?? [];
    const taxes = calculateTaxes(annualIncome, taxBrackets);

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        executeFetchTaxBracket(taxYear);
    };

    return (
        <form onSubmit={onSubmit} className="tax-form">
            <CurrencyInput
                value={annualIncome}
                label="Annual Income"
                onChange={setAnnualIncome}
            />
            <YearInput value={taxYear} label="Tax Year" onChange={setTaxYear} />
            <Button type="submit" loading={isPending}>
                Calculate Taxes
            </Button>
            <TaxTable taxes={taxes} />
            {error && error.errors?.map((err) => <ErrorBox error={err} />)}
        </form>
    );
};
