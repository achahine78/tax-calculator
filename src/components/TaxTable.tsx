import { formatMoney, formatRate, formatTaxBracket } from "../utils/formatting";
import type { TaxCalculation } from "../utils/taxCalculator";

import "./TaxTable.css";

type Props = {
    taxes: TaxCalculation;
};

export const TaxTable = ({ taxes }: Props) => {
    return (
        <div className="tax-table-container">
            <div className="tax-table-header">
                <div className="tax-table-header__column">
                    <div>Gross Income</div>
                    <div>{formatMoney({ num: taxes.annualIncome })}</div>
                </div>
                <div className="tax-table-header__column">
                    <div>Total Tax</div>
                    <div>{formatMoney({ num: taxes.totalTax })}</div>
                </div>
                <div className="tax-table-header__column">
                    <div>Effective Rate</div>
                    <div>{formatRate(taxes.effectiveRate)}</div>
                </div>
            </div>
            <div className="tax-table">
                <div className="tax-table__row">
                    <div className="tax-table__column">Tax Bracket</div>
                    <div className="tax-table__column">Rate</div>
                    <div className="tax-table__column">Tax Owed</div>
                </div>
                {taxes.taxesPerBracket.map(({ max, min, rate, taxOwed }) => (
                    <div className="tax-table__row">
                        <div className="tax-table__column">
                            {formatTaxBracket(min, max)}
                        </div>
                        <div className="tax-table__column">
                            {formatRate(rate)}
                        </div>
                        <div className="tax-table__column">
                            {formatMoney({ num: taxOwed })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
