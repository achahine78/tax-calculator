type Props = {
    value: number;
    onChange: (num: number) => void;
    locale?: string;
    currency?: string;
    label?: string;
    additionalInfo?: string;
};

export const CurrencyInput = ({
    value = 0,
    onChange,
    locale = "en-US",
    currency = "USD",
    label,
    additionalInfo,
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

    return (
        <div>
            {label ? <div>{label}</div> : null}
            <input
                {...props}
                className="currency-input"
                value={value}
                onChange={handleChange}
            />
            {additionalInfo ? <div>{additionalInfo}</div> : null}
        </div>
    );
};
