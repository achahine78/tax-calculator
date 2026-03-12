import { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";
import { YearInput } from "./YearInput";
import { useMutation } from "@tanstack/react-query";
import { fetchTaxBracket } from "../api/taxBracket";
import { calculateTaxes } from "../utils/taxCalculator";
import { TaxTable } from "./TaxTable";
import { Button } from "./Button";
import "./TaxForm.css";

export const TaxForm = () => {
    const [annualIncome, setAnnualIncome] = useState(0);
    const [taxYear, setTaxYear] = useState(0);
    const [taxBrackets, setTaxBrackets] = useState([]);

    const taxes = calculateTaxes(annualIncome, taxBrackets);
    console.log(taxes);

    const mutation = useMutation({
        mutationFn: fetchTaxBracket,
        retry: 2,
        retryDelay: (attempt) => attempt * 1000, // exponential backoff
        onSuccess: (data) => {
            setTaxBrackets(data.tax_brackets);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(taxYear);
    };
    return (
        <form onSubmit={onSubmit} className="tax-form">
            <CurrencyInput
                value={annualIncome}
                label="Annual Income"
                onChange={setAnnualIncome}
            />
            <YearInput value={taxYear} label="Tax Year" onChange={setTaxYear} />
            <Button type="submit">Calculate Taxes</Button>
            <TaxTable taxes={taxes} />
        </form>
    );
};
