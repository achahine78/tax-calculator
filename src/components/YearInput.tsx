type Props = {
    value: number;
    onChange: (num: number) => void;
    label?: string;
    additionalInfo?: string;
};

export const YearInput = ({
    value = 0,
    onChange,
    label,
    additionalInfo,
    ...props
}: Props) => {
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
            <input {...props} value={value} onChange={handleChange} />
            {additionalInfo ? <div>{additionalInfo}</div> : null}
        </div>
    );
};
