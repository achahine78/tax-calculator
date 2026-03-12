export const formatMoney = ({
    num,
    locale = "en-US",
    currency = "USD",
}: {
    num: number;
    locale?: string;
    currency?: string;
}) =>
    new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(num);

export const formatTaxBracket = (min?: number, max?: number) => {
    const result = [];
    if (min) {
        result.push(formatMoney({ num: min }));
    }

    if (max) {
        result.push(formatMoney({ num: max }));
    }

    return result.join(" - ");
};

export const formatRate = (num: number) => {
    return `${(num * 100).toFixed(1)}%`;
};
