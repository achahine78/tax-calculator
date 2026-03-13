type TaxBracket = {
    min: number;
    max?: number;
    rate: number;
};

export type TaxBrackets = TaxBracket[];

export type TaxBracketResponse = {
    tax_brackets: TaxBrackets;
};

export type APIError = {
    code: "INTERNAL_SERVER_ERROR" | string;
    field?: "";
    message?: string;
};

export type TaxBracketError = {
    errors: APIError[];
};

export const fetchTaxBracket = async (year: number) => {
    const res = await fetch(
        `http://localhost:5001/tax-calculator/tax-year/${year}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    return res.json();
};
