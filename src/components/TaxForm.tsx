import { useCallback, useMemo, useState } from "react";
import { NumericalInput } from "./NumericalInput";
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
    const taxes = useMemo(
        () => calculateTaxes(annualIncome, taxBrackets),
        [annualIncome, taxBrackets],
    );

    const onSubmit = useCallback(
        (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            executeFetchTaxBracket(taxYear);
        },
        [taxYear, executeFetchTaxBracket],
    );

    return (
        <form onSubmit={onSubmit} className="tax-form" aria-label="tax-form">
            <NumericalInput
                value={annualIncome}
                label="Annual Income"
                onChange={setAnnualIncome}
            />
            <NumericalInput
                value={taxYear}
                label="Tax Year"
                onChange={setTaxYear}
            />
            <Button type="submit" loading={isPending}>
                Calculate Taxes
            </Button>
            {taxBrackets.length > 0 && <TaxTable taxes={taxes} />}
            {error &&
                error.errors?.map((err, i) => <ErrorBox error={err} key={i} />)}
        </form>
    );
};
