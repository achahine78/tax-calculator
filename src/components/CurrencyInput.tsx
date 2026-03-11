type Props = {
    value: number;
    onChange: (num: number) => void;
    locale?: string;
    currency?: string;
};

export const CurrencyInput = ({
    value = 0,
    onChange,
    locale = "en-US",
    currency = "USD",
    ...props
}: Props) => {
    // const format = (num: number) =>
    //     new Intl.NumberFormat(locale, {
    //         style: "currency",
    //         currency,
    //     }).format(num);

    // const formattedValue = format(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d.-]/g, "");
        const numeric = parseFloat(raw);

        if (!isNaN(numeric)) {
            onChange?.(numeric);
        } else {
            onChange?.(0);
        }
    };

    return <input {...props} value={value} onChange={handleChange} />;
};
