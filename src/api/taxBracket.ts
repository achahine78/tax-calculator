export const fetchTaxBracket = async (year: number) => {
    const res = await fetch(
        `http://localhost:5001//tax-calculator/tax-year/${year}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (!res.ok) {
        throw new Error("Failed to fetch tax bracket");
    }

    return res.json();
};
